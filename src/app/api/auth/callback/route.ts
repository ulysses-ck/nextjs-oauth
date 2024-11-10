import { google } from "googleapis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request, res: Response) {
    const code = req.url.split('?code=')[1]
    if (!code) {
        return new Response('No code provided', { status: 400 })
    }

    const oauth = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
        redirectUri: `http://localhost:3000/api/auth/callback`
    })

    const response = await oauth.getToken(code);

    console.log(response);

    const cookieStore = await cookies();

    if (response.tokens.access_token) {
        cookieStore.set('access_token', response.tokens.access_token)
    }

    if (response.tokens.refresh_token) {
        cookieStore.set('refresh_token', response.tokens.refresh_token)
    }

    return redirect('/')
}

