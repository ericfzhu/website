import type { NextPage } from 'next'
import Head from 'next/head'


const DFormsPage: NextPage = () => {
    return (
        <div className="px-8">
            <Head>
                <title>Discord Forms</title>
                <meta name="viewport" content="width=device-width"/>
                <link rel="icon" href="/white.ico" />
            </Head>

            <main className="min-h-screen py-16 flex-1 flex flex-col items-center">
                <h1 className="font-serif text-6xl m-5 leading-tight">
                    Discord Forms
                </h1>

                <div className="align-middle max-w-screen-md justify-between">
                    Discord Forms aims to improve the user experience by allowing for the creation of new Google Forms documents through a Discord event.
                    The service accesses a shared Google Drive that is accessible by the user, creates a duplicate Google Form through a specific ID, and places it in a new folder.
                    <br/>
                    <br/>
                    This service's use information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">Google API Services User Data Policy</a>, including the Limited Use requirements.
                    No other user data is stored as part of the service.
                </div>
            </main>
        </div>
    )
}

export default DFormsPage
