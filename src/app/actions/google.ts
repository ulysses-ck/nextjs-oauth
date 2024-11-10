"use server";

import { google } from "googleapis";
import { cookies } from "next/headers";

export async function getConsentScreenUri() {
    const oauth = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
        redirectUri: `http://localhost:3000/api/auth/callback`
    })

    return oauth.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/documents',
        ]
    })
}

export async function listDocs(docId: string) {
    const cookieStore = await cookies();

    const access_token = cookieStore.get('access_token')?.value
    const refresh_token = cookieStore.get('refresh_token')?.value

    if (!access_token || !refresh_token) {
        return new Response('No access token provided', { status: 400 })
    }

    const oauth = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
        redirectUri: `http://localhost:3000/api/auth/callback`
    })



    const tokens = {
        access_token,
        refresh_token
    }

    oauth.setCredentials(tokens)

    const docs = google.docs({ version: 'v1', auth: oauth })

    const res = await docs.documents.get({
        documentId: docId
    })
    return res.data
}