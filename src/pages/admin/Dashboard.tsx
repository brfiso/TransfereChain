import { NavBar } from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/contexts/AuthContext"
import { columns } from "@/utils/data-tables/DashBoard/columns"
import { DataTable } from "@/utils/data-tables/DashBoard/data-table"
import { usuarios } from "@/utils/data/usuarios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

export function DashBoard() {
    const data = usuarios
    const { user, userAccess } = useContext(AuthContext)
    const navigate = useNavigate()
    userAccess("administrador")

    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
            <div className="container space-y-20 mb-20">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-blue-600 text-2xl font-bold">Dashboard</h1>
                        <span className="">Gerencie os usuários da aplicação</span> 
                    </div>
                    <Button onClick={() => navigate("/admin/criar")}>Novo usuário</Button>
                </div>
                <div>
                    <DataTable columns={columns} data={data}/>
                </div>
            </div>
        </>  
    )
}