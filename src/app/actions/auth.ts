"use server";
import { cookies } from "next/headers";

export async function auth() {
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token')?.value
    const refresh_token = cookieStore.get('refresh_token')?.value

    const isLoggedIn = access_token && refresh_token

    return {isLoggedIn}
}