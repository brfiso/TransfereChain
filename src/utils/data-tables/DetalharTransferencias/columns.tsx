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

import { Documentos } from "@/utils/data/transferenciasEspeciais"

export const columns: ColumnDef<Documentos>[] = [
    {
        accessorKey: "dataUpload",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Data de Upload
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "tipoDocumento",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Tipo do Documento
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "descricao",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Descrição
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "categoria",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Categoria
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        id: "actions",
        accessorKey: "ações",
        header: "Ações",
        cell: ({}) => {
    
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
                <DropdownMenuItem>
                    Visualizar
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    Baixar
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        )
        },
    }
]