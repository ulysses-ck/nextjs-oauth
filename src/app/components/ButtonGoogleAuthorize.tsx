"use client";
import { getConsentScreenUri } from "../actions/google";

export function ButtonGoogleAuthorize() {

    const handleClick = async () => {
        const url = await getConsentScreenUri();
        if (url && typeof window !== "undefined") {
            window.location.replace(url)
        }
    }
    return (
        <button onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Autorizar con Google</button>

    );
}