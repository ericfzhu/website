import json
import os
import re
import unicodedata
import requests
from PIL import Image
from dotenv import load_dotenv
from io import BytesIO
import datetime

load_dotenv()


def slugify(value: str) -> str:
    """
    Normalizes string, converts to lowercase, removes non-alpha characters,
    and converts spaces to hyphens.

    Args:
        value (str): The string to slugify

    Returns:
        str: The slugified string
    """
    if re.search(r"[\u4e00-\u9fff]+", value) or re.search(r"[\u3040-\u30ff]+", value):
        value = re.sub(r"[^\w\s-]", "", value)
        return re.sub(r"[-\s]+", "-", value).strip("-_")
    value = (
        unicodedata.normalize("NFKD", str(value))
        .encode("ascii", "ignore")
        .decode("ascii")
    )
    value = re.sub(r"[^\w\s-]", "", value.lower())
    return re.sub(r"[-\s]+", "-", value).strip("-_")


def fetch_covers_data():
    NOTION_DATABASE_ID = os.environ["NOTION_DATABASE_ID"]
    NOTION_API_TOKEN = os.environ["NOTION_API_TOKEN"]
    NOTION_VERSION = os.environ["NOTION_VERSION"]
    url = f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query"
    headers = {
        "Authorization": f"Bearer {NOTION_API_TOKEN}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }
    payload = json.dumps(
        {
            "filter": {
                "or": [
                    {"property": "Status", "select": {"equals": "Reading"}},
                    {"property": "Status", "select": {"equals": "Finished"}},
                    {"property": "Status", "select": {"equals": "To Read"}},
                ]
            }
        }
    )
    response = requests.request("POST", url, headers=headers, data=payload).json()
    results = response.get("results", [])

    # Check if the response contains 'has_more' and 'next_cursor'
    while response.get("has_more"):
        # Update the payload with 'start_cursor' set to 'next_cursor'
        payload = json.dumps(
            {
                "filter": {
                    "or": [
                        {"property": "Status", "select": {"equals": "Reading"}},
                        {"property": "Status", "select": {"equals": "Finished"}},
                        {"property": "Status", "select": {"equals": "To Read"}},
                    ]
                },
                "start_cursor": response.get("next_cursor"),
            }
        )
        # Make the request again with the updated payload
        response = requests.request("POST", url, headers=headers, data=payload).json()
        # Combine the responses
        results.extend(response.get("results", []))

    # response["results"] = results

    # save each title and slugified title into a json file
    with open('src/components/data/library.json') as f:
        library = json.load(f)

    for result in results:
        cover_url = result["properties"]["Cover"]["files"][0]["external"]["url"]
        title = result["properties"]["Name"]["title"][0]["text"]["content"]
        status = result["properties"]["Status"]["select"]["name"]
        book_id = str(result["properties"]["ID"]['unique_id']['number'])
        page_id = result["id"]
        last_edited = result["last_edited_time"]
        date_finished = (
            None
            if status == "Reading" or status == "To Read"
            else result["properties"]["End"]["date"]["start"]
        )
        author = result["properties"]["Author"]["rich_text"][0]["text"]["content"]
        last_edited_time = datetime.datetime.strptime(last_edited, "%Y-%m-%dT%H:%M:%S.%fZ")
        if book_id not in library or last_edited_time > datetime.datetime.strptime(library[book_id].get('last_edited', '1900-01-01T00:00:00.000Z'), "%Y-%m-%dT%H:%M:%S.%fZ"):

            url = f"https://api.notion.com/v1/blocks/{page_id}/children"
            response = requests.request("GET", url, headers=headers).json()
            # Convert response into a markdown file
            markdown_content = ""
            if not os.path.exists(f"public/assets/book_data/{book_id}") and response.get("results", []):
                os.makedirs(f"public/assets/book_data/{book_id}")
            images = 0
            for result in response.get("results", []):
                block_type = result.get("type")
                if block_type == "paragraph":
                    rich_text = result.get("paragraph", {}).get("rich_text", [])
                    text = rich_text[0].get("text", {}).get("content", "") if rich_text else ""
                    markdown_content += f"{text}\n"
                elif block_type == "heading_1":
                    text = result.get("heading_1", {}).get("rich_text", [])[0].get("text", {}).get("content", "")
                    markdown_content += f"# {text}\n"
                elif block_type == "heading_2":
                    text = result.get("heading_2", {}).get("rich_text", [])[0].get("text", {}).get("content", "")
                    markdown_content += f"## {text}\n"
                elif block_type == "quote":
                    text = result.get("quote", {}).get("rich_text", [])[0].get("text", {}).get("content", "")
                    markdown_content += f"> {text}\n"
                elif block_type == "image":
                    image_url = result.get("image", {}).get("file", {}).get("url")
                    image_response = requests.get(image_url)
                    if image_response.status_code == 200:
                        image_path = f"public/assets/book_data/{book_id}/{images}.jpg"
                        os.makedirs(os.path.dirname(image_path), exist_ok=True)
                        with open(image_path, "wb") as file:
                            file.write(image_response.content)
                        markdown_content += f"\n![{images}]({image_path})\n"
                    images += 1

            library[book_id] = {
                "title": title,
                "status": status,
                "date_finished": date_finished,
                "author": author,
                "cover": f"{slugify(title)}_{book_id}",
                "last_edited": last_edited,
                "id": page_id,
                'has_page': True if response.get("results", []) else False
            }

            if markdown_content.strip() != "":
                with open(f"public/assets/book_data/{book_id}/response.md", "w") as file:
                    file.write(markdown_content)

        if not os.path.exists(f"public/assets/covers/{slugify(title)}_{book_id}_md.jpg"):
            image = requests.get(cover_url)
            if image.status_code == 200:
                print(f"Downloading {title} -> {slugify(title)}_{book_id}...")
                # with open(f"public/assets/covers/{slugify(title)}.jpg", "wb") as file:
                #     file.write(image.content)
                # # Resize and compress the image
                img = Image.open(BytesIO(image.content))
                width, height = img.size
                new_width = 300
                new_height = int(new_width * height / width)
                img = img.resize((new_width, new_height), Image.LANCZOS)
                img = img.convert("RGB")
                img.save(
                    f"public/assets/covers/{slugify(title)}_{book_id}_md.jpg",
                    optimize=True,
                    quality=85,
                )
                new_width = 500
                new_height = int(new_width * height / width)
                img = img.resize((new_width, new_height), Image.LANCZOS)
                img = img.convert("RGB")
                img.save(
                    f"public/assets/covers/{slugify(title)}_{book_id}_lg.jpg",
                    optimize=True,
                    quality=85,
                )

        # image = requests.get(cover_url)
        # img = Image.open(f"public/assets/covers/{book_id}.jpg")
        # width, height = img.size
        # new_width = 300
        # new_height = int(new_width * height / width)
        # img = img.resize((new_width, new_height), Image.LANCZOS)
        # img.save(f"public/assets/covers/{book_id}_300px.jpg", optimize=True, quality=85)

    with open("src/components/data/library.json", "w", encoding="utf-8") as file:
        json.dump(library, file, indent=4, ensure_ascii=False)


def fetch_movie_data():
    NOTION_MOVIEDB_ID = os.environ["NOTION_MOVIEDB_ID"]
    NOTION_API_TOKEN = os.environ["NOTION_API_TOKEN"]
    NOTION_VERSION = os.environ["NOTION_VERSION"]
    url = f"https://api.notion.com/v1/databases/{NOTION_MOVIEDB_ID}/query"
    headers = {
        "Authorization": f"Bearer {NOTION_API_TOKEN}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }
    payload = json.dumps(
        {"filter": {"property": "Watched", "date": {"is_not_empty": True}}}
    )
    response = requests.request("POST", url, headers=headers, data=payload).json()

    movies = {}

    for result in response["results"]:
        title = result["properties"]["Name"]["title"][0]["text"]["content"]
        cover_url = result["properties"]["Cover"]["files"][0]["external"]["url"]
        date_finished = result["properties"]["Watched"]["date"]["start"]
        movies[slugify(title)] = {
            "title": slugify(title),
            "date_finished": date_finished,
        }
        if not os.path.exists(f"public/assets/movies/{slugify(title)}_300px.jpg"):
            image = requests.get(cover_url)
            if image.status_code == 200:
                print(f"Downloading {title} -> {slugify(title)}...")
                # with open(f"public/assets/movies/{slugify(title)}.jpg", "wb") as file:
                #     file.write(image.content)

                img = Image.open(BytesIO(image.content))
                width, height = img.size
                new_width = 300
                new_height = int(new_width * height / width)
                img = img.resize((new_width, new_height), Image.LANCZOS)
                img.save(
                    f"public/assets/movies/{slugify(title)}_300px.jpg",
                    optimize=True,
                    quality=85,
                )

        # image = requests.get(cover_url)
        # img = Image.open(BytesIO(image.content))
        # width, height = img.size
        # new_width = 300
        # new_height = int(new_width * height / width)
        # img = img.resize((new_width, new_height), Image.LANCZOS)
        # img.save(f"public/assets/movies/{slugify(title)}_300px.jpg", optimize=True, quality=85)

    with open("src/components/data/movies.json", "w", encoding="utf-8") as file:
        json.dump(movies, file, indent=4, ensure_ascii=False)


def main():
    fetch_covers_data()
    fetch_movie_data()


if __name__ == "__main__":
    main()
