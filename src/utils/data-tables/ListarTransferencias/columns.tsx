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
import { useNavigate } from "react-router-dom";

import { TransferenciasEspeciais } from "@/utils/data/transferenciasEspeciais"


export const columns: ColumnDef<TransferenciasEspeciais>[] = [
    {
        accessorKey: "nomeEnte",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Nome do Ente
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "uf",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                UF
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "ano",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Ano
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "mes",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Mês
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "tipoEnte",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Tipo Ente
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "ob",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                OB
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "favorecido.cnpjFavorecido",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                CNPJ Favorecido
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "favorecido.nomeFavorecido",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Nome Favorecido
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "categoriaDespesa",
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
        accessorKey: "valor",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Valor
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({ row }) => {
            const valor = parseFloat(row.getValue("valor"))
            const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            }).format(valor)
    
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
          id: "actions",
          accessorKey: "ações",
          header: "Ações",
          cell: ({ row }) => {
          const transferenciaEspecial = row.original
          const navigate = useNavigate()

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
                  <DropdownMenuItem onClick={() => navigate(`/transferenciasEspeciais/detalhar/${transferenciaEspecial.id}`)}>
                    Detalhar
                  </DropdownMenuItem>
              </DropdownMenuContent>
              </DropdownMenu>
          )
          },
    }
]