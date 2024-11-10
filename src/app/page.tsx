import { cookies } from "next/headers";
import { ButtonGoogleAuthorize } from "./components/ButtonGoogleAuthorize";

export  default async function Home() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access_token')?.value
  const refresh_token = cookieStore.get('refresh_token')?.value

  const isAuthorized = access_token && refresh_token



  return (
    <div className="w-screen h-screen flex items-center justify-center">
  {
    isAuthorized ? (
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
