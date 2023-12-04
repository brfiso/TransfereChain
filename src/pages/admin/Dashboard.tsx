import { NavBar } from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/contexts/AuthContext"
import { api } from "@/services/api"
import { columns } from "@/utils/data-tables/DashBoard/columns"
import { DataTable } from "@/utils/data-tables/DashBoard/data-table"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function DashBoard() {
    const { user, userAccess } = useContext(AuthContext)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    userAccess("administrador")

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get("users");
            setData(response.data)
          } catch (error) {
            console.error('Erro ao buscar usuários:', error);
          }
        };
      
        fetchData();
    }, []);

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