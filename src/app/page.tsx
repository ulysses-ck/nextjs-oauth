import Link from "next/link";
import { auth } from "./actions/auth";
import { getEmails } from "./actions/google";
import { ButtonGoogleAuthorize } from "./components/ButtonGoogleAuthorize";

export default async function Home() {
  const { isLoggedIn } = await auth();

  if (!isLoggedIn) {
    return (
      <div>
        <h1 className="text-4xl">Autoriza con Google</h1>
        <ButtonGoogleAuthorize />
      </div>
    )
  }

  const data = await getEmails();
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>
        <h1 className="text-4xl">Autorizado</h1>
        <p>Ya puedes acceder a tus Google Docs y tus correos</p>
        {data && data.messages ? <div>

          <ul className="flex flex-col gap-5">
            {data.messages.map((message) => (
              <li key={message.id}>
                <span>{message.snippet ?? "No contiene texto"}</span>
                <Link
                className="bg-blue-400 text-white p-2 rounded"
                
                href={`/email/${message.id}`}>Ver email</Link>

              </li>
            ))}
          </ul>
        </div> : null}
      </div>
    </div>
  );
}
