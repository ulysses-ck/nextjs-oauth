import Link from "next/link";
import { auth } from "./actions/auth";
import { getEmails } from "./actions/google";
import { ButtonGoogleAuthorize } from "./components/ButtonGoogleAuthorize";

export default async function Home() {
  const { isLoggedIn } = await auth();
  let data;
  if (isLoggedIn) {
    data = await getEmails();
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {
        isLoggedIn ? (
          <div>
            <h1 className="text-4xl">Autorizado</h1>
            <p>Ya puedes acceder a los documentos y correos de Google</p>
            {data && data.messages ? <div>

              <ul>
                {data.messages.map((message) => (
                  <li key={message.id}>
                    <span>{message.snippet}</span>
                    <Link href={`/email/${message.id}`}><a>Ver email</a></Link>

                  </li>
                ))}
              </ul>
            </div> : null}
          </div>
        ) : (
          <div>
            <h1 className="text-4xl">Autoriza con Google</h1>
            <ButtonGoogleAuthorize />
          </div>
        )
      }
    </div>
  );
}
