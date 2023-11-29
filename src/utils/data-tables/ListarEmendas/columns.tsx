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

import { Emenda } from "@/utils/data/emendas"
import { useNavigate } from "react-router-dom"

export const columns: ColumnDef<Emenda>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Código da Emenda
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
      accessorKey: "exercicio",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Exercício
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
    {
        accessorKey: "funcionalProgramatica",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Funcional Programática
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "valorTotal",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Val. da Emenda
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
          const valor = parseFloat(row.getValue("valorTotal"))
          const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          }).format(valor)
  
          return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "valorIndicado",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Val. Indicado
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
          const valor = parseFloat(row.getValue("valorIndicado"))
          const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          }).format(valor)
  
          return <div className="text-left font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "valorBloqueado",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Val. Bloqueado
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
      cell: ({ row }) => {
        const valor = parseFloat(row.getValue("valorBloqueado"))
        const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(valor)

        return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "valorPendente",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Val. Pendente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valorPendente"))
      const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      }).format(valor)

      return <div className="text-left font-medium">{formatted}</div>
  },
  },
  {
    accessorKey: "valorTramitando",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Val. Tramitando
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valorTramitando"))
      const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      }).format(valor)

      return <div className="text-left font-medium">{formatted}</div>
  },
  },
  {
    accessorKey: "valorEmpenhado",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Val. Empenhado
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valorEmpenhado"))
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
      const emenda = row.original
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
              <DropdownMenuItem onClick={() => navigate(`/emendas/detalhar/${emenda.id}`)}>
                  Detalhar
              </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
      )
    },
  }
]