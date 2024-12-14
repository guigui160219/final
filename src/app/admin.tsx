import Admin from "~/app/admin/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Guest from "~/app/guest/page";

export default function AdminPage(){
    const router = useRouter()
    const {data: session} = useSession()
    if (session ?.user.isAdmin){
        return <Admin/>
    }
    else{
        return <Guest/>
    }
}