import { auth } from "@/app/actions/auth";
import { getEmail } from "@/app/actions/google";

interface IParams {
    id: string;
}

export default async function Page({ params }: { params: Promise<IParams> }) {
    const { id } = await params;

    const { isLoggedIn } = await auth();

    if (!isLoggedIn) {
        return (
            <div>
                <h1>No autorizado</h1>
            </div>
        )
    }

    if (!id) {
        return (
            <div>
                <h1>Id no encontrado</h1>
            </div>
        )
    }

    const email = await getEmail(id);

    return (
        <div>
            <h1>{email.snippet}</h1>
            <p>{email.payload?.body?.data ?? "No contiene texto"}</p>
            {email.internalDate ? <p>Fecha: {new Date(parseInt(email.internalDate)).toLocaleString()}</p> : null}
        </div>
    )
}