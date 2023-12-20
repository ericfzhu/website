import json
import os
import re
import unicodedata
import requests
from dotenv import load_dotenv
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
    # search for chinese characters
    if re.search(r'[\u4e00-\u9fff]+', value):
        # keep chinese characters
        value = re.sub(r'[^\w\s-]', '', value)
        return re.sub(r'[-\s]+', '-', value).strip('-_')
    value = unicodedata.normalize('NFKD', str(value)).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value.lower())
    return re.sub(r'[-\s]+', '-', value).strip('-_')


def fetch_notion_data():
    NOTION_DATABASE_ID = os.environ['NOTION_DATABASE_ID']
    NOTION_API_TOKEN = os.environ['NOTION_API_TOKEN']
    NOTION_VERSION = os.environ['NOTION_VERSION']
    url = f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query"
    headers = {'Authorization': f'Bearer {NOTION_API_TOKEN}', 'Notion-Version': NOTION_VERSION, 'Content-Type': 'application/json'}
    payload = json.dumps({
        "filter": {
            "or": [
            {
                "property": "Status",
                "select": {
                    "equals": "Reading"
                }
            },
            {
                "property": "Status",
                "select": {
                    "equals": "Finished"
                }
            }
            ]
        }
    })
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json()


def main():
    notion_data = fetch_notion_data()

    # save each title and slugified title into a json file
    library = {}

    for result in notion_data["results"]:
        cover_url = result["properties"]["Cover"]["files"][0]["external"]["url"]
        title = result["properties"]["Name"]["title"][0]["text"]["content"]
        status = result["properties"]["Status"]["select"]["name"]
        date_finished = None if status == "Reading" else result["properties"]["End"]["date"]["start"]
        author = result["properties"]["Author"]["rich_text"][0]["text"]["content"]
        library[slugify(title)] = {"title": title, "status": status, "date_finished": date_finished, "author": author}

        if not os.path.exists(f"public/assets/covers/{slugify(title)}.jpg"):
            image = requests.get(cover_url)
            if image.status_code == 200:
                print(f"Downloading {title} -> {slugify(title)}...")
                with open(f"public/assets/covers/{slugify(title)}.jpg", "wb") as file:
                    file.write(image.content)

    with open("src/components/data/library.json", "w") as file:
        json.dump(library, file, indent=4)

if __name__ == "__main__":
    main()