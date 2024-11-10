"use client"

import { getConsentScreenUri } from "./actions/google";

export default function Home() {
  const handleClick = async () => {
    const url = await getConsentScreenUri();
    if (url && typeof window !== "undefined") {
      window.location.replace(url)
    }
  }

  return (
    <div>
      <button onClick={handleClick} className="rounded-md">
        Dar permiso a Google  Docs
      </button>
    </div>
  );
}
