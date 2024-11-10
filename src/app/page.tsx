import { auth } from "./actions/auth";
import { ButtonGoogleAuthorize } from "./components/ButtonGoogleAuthorize";

export  default async function Home() {
  const {isLoggedIn} = await auth();
  return (
    <div className="w-screen h-screen flex items-center justify-center">
  {
    isLoggedIn ? (
      <div>
        <h1 className="text-4xl">Autorizado</h1>
        <p>Ya puedes acceder a los documentos de Google</p>
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
