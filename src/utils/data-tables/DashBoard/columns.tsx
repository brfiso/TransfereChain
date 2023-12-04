import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react" 

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { List } from "@phosphor-icons/react"

import { User } from "@/contexts/AuthContext"
import { api } from "@/services/api"
import { useNavigate } from "react-router-dom"

export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "cpf",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              CPF
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
    {
      accessorKey: "nome",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Cargo
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
    {
      accessorKey: "cnpj",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              CNPJ Relacionado
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
  {
    id: "actions",
    accessorKey: "ações",
    header: "Ações",
    cell: ({ row }) => {
      const navigate = useNavigate()

      async function excluirUsuario(cpf: string){
          const resultado = await api.post(`deleteUser/${cpf}`);
          window.alert(resultado.data.message)
          window.location.reload();
      }

      return (
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <List size={16} />
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={() => excluirUsuario(row.original.cpf)}>
                  Remover
              </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
      )
    },
  }
]