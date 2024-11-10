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
        access_type: 'offline',
        response_type: 'code',
        scope: [
            'https://www.googleapis.com/auth/documents',
            'https://www.googleapis.com/auth/drive',
            'https://mail.google.com',
        ]
    })
}

export async function getOAu2hClient( ) {
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token')?.value;
    const refresh_token = cookieStore.get('refresh_token')?.value;

    if(!access_token) {
        throw new Error('No access token found');
    }

    if(!refresh_token) {
        throw new Error('No refresh token found');
    }

    const oauth2 = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
        redirectUri: `http://localhost:3000/api/auth/callback`
    })

    oauth2.setCredentials({ access_token: access_token, refresh_token: refresh_token});

    return oauth2;
}

export async function getEmails () {
    const oauth2client = await getOAu2hClient();

    const gmail = google.gmail({ version: 'v1', auth: oauth2client });

    const response = await gmail.users.messages.list({
        userId: 'me',
        maxResults:10,
    })

    console.log(response.data.messages);

    return response.data;
}

export async function getEmail (id: string) {
    const oauth2client = await getOAu2hClient();

    const gmail = google.gmail({ version: 'v1', auth: oauth2client });

    const response = await gmail.users.messages.get({
        userId: 'me',
        id,
    })

    console.log(response.data);

    return response.data;
}