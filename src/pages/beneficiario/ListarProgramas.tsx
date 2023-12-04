import { columns } from "@/utils/data-tables/ListarProgramas/columns"
import { DataTable } from "@/utils/data-tables/ListarProgramas/data-table"
import { mockProgramas } from "@/utils/data/programas";
import { NavBar } from "@/components/NavBar";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function ListarProgramas(){
    const data = mockProgramas
    const { user, userAccess } = useContext(AuthContext)

    userAccess("beneficiário")
    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
            <div className="container space-y-20 mb-20">
                <div className="flex flex-col">
                    <h1 className="text-blue-600 text-2xl font-bold">Programas</h1>
                    <span className="">Visualize programas na plataforma transfereGov</span> 
                </div>
                <div>
                    <DataTable columns={columns} data={data}/>
                </div>
            </div>
        </>  
    )
}