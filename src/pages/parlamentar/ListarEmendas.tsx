import { columns } from "@/utils/data-tables/ListarEmendas/columns"

import { DataTable } from "@/utils/data-tables/ListarEmendas/data-table"
import { mockEmendas } from "@/utils/data/emendas";
import { NavBar } from "@/components/NavBar";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function ListarEmendas(){
    const data = mockEmendas

    const { user, userAccess } = useContext(AuthContext)
    userAccess("parlamentar")
    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
            <div className="container space-y-20 mb-20">
                <div className="flex flex-col">
                    <h1 className="text-blue-600 text-2xl font-bold">Emendas</h1>
                    <span className="">Visualize o rol de emendas do autor</span> 
                </div>
                <div>
                    <DataTable columns={columns} data={data}/>
                </div>
            </div>
        </>  
    )
}