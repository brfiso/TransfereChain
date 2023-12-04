import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react" 

import { Button } from "@/components/ui/button"

import { EmendaIndicada } from "@/utils/data/emendas"
import { beneficiarios } from "@/utils/data/beneficiarios"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { List } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"

export const columns: ColumnDef<EmendaIndicada>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const data = row.original;
      const { user } = useContext(AuthContext)

      const usuario = user;
      const usuarioValidado = usuario?.cnpj === data.cnpjBeneficiario;
  
      return (
        usuarioValidado && !data.cienciaBeneficiario && (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        )
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nomeBeneficiario",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Beneficiário
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const data = row.original
      const beneficiario = beneficiarios.filter(beneficiario => beneficiario.id === data.cnpjBeneficiario)[0]

      return <div className="text-left font-medium">{`${beneficiario.id} - ${beneficiario.nome}`}</div>
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Emenda Parlamentar
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const data = row.original

      return <div className="text-left font-medium">{`${data.id} - ${data.nomeAutor}`}</div>
    },
  },
  {
    accessorKey: "valorEmenda",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Investimento
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const valor = parseFloat(row.getValue("valorEmenda"))
        const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(valor)

        return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "custeio",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Custeio
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const valor = parseFloat(row.getValue("custeio"))
        const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(valor)

        return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "acao",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Plano de ação
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
  },
  {
    accessorKey: "cnpjBeneficiario",
    header: ({}) => {
        return (<div></div>)
    },
    cell: ({}) => {
      return <div></div>
    },
  },
  {
    accessorKey: "cienciaBeneficiario",
    header: ({}) => {
        return (<div></div>)
    },
    cell: ({}) => {
      return <div></div>
    },
  },
  {
    id: "actions",
    accessorKey: "ações",
    header: "Ações",
    cell: ({ row }) => {
      const data = row.original;
      const { user } = useContext(AuthContext)
      const usuario = user;
      const usuarioValidado = usuario?.cnpj === data.cnpjBeneficiario;
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
            {usuarioValidado && data.cienciaBeneficiario && (
              <>
                <DropdownMenuItem onClick={() => navigate(`/programas/emendas/detalhar/${data.id}`)}>Prestar contas</DropdownMenuItem>
                <DropdownMenuSeparator/>
              </>
            )}
            <DropdownMenuItem>
              Visualizar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }
]