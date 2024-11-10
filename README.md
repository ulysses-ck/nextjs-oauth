# Example project Google OAuth 2 Flow with Next.js

## Prerequisites
- Create a Google Cloud Project
- Generate credentials of type OAuth
- - Authorized Redirect URIs: localhost:3000/[whatever route you want].  In my case, /api/auth/callback
- Setup consent screen
- - Puts own email address and/or others that you want in Test Users. Otherwise, when you try to go to the consent screen, gives an error if your email is not whitelisted

# Environment variables
- Fill up this environment variables in your `.env.local`. This values comes from when you setup the type of credentials.
```
GOOGLE_CLOUD_CLIENT_ID=your-google-cloud-client-id
GOOGLE_CLOUD_CLIENT_SECRET=your-google-cloud-client-secret
```