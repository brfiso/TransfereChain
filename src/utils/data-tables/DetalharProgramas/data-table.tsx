import * as React from "react" 

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { user } = useContext(AuthContext)
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
        },
    })

    return (
        <div>
            <div className="flex items-center justify-between py-4">
            
                <Input
                    placeholder="CNPJ do Beneficiário(opcional)"
                    value={(table.getColumn("cnpjBeneficiario")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        table.getColumn("cnpjBeneficiario")?.setFilterValue(event.target.value)
                        }
                    }
                    className="max-w-sm"
                />

                <Input
                    placeholder="Nome do Beneficiário(opcional)"
                    value={(table.getColumn("nomeBeneficiario")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("nomeBeneficiario")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <Input
                    placeholder="Emenda Parlamentar(opcional)"
                    value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("id")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                    Colunas
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {table
                    .getAllColumns()
                    .filter(
                        (column) => column.getCanHide()
                    )
                    .map((column) => {
                        return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                            }
                        >
                            {column.id}
                        </DropdownMenuCheckboxItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="flex space-x-5">
            <div className="flex space-x-2 mb-5 items-center">
                <Checkbox id="minhasEmendasCiencia" onCheckedChange={e => {
                    if(e){
                        table.getColumn("cnpjBeneficiario")?.setFilterValue(user?.cnpj)
                        table.getColumn("cienciaBeneficiario")?.setFilterValue(true)
                    } else {
                        table.getColumn("cnpjBeneficiario")?.setFilterValue("")
                        table.getColumn("cienciaBeneficiario")?.setFilterValue("")
                    }
                }} />
                <div className="grid gap-1.5 leading-none">
                    <label
                    htmlFor="minhasEmendasCiencia"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    Exibir apenas as emendas com ciência do beneficiário
                    </label>
                </div>
            </div>
            <div className="flex space-x-2 mb-5 items-center">
                <Checkbox id="minhasEmendas" onCheckedChange={e => {
                    if(e){
                        table.getColumn("cnpjBeneficiario")?.setFilterValue(user?.cnpj)
                    } else {
                        table.getColumn("cnpjBeneficiario")?.setFilterValue("")
                    }
                }} />
                <div className="grid gap-1.5 leading-none">
                    <label
                    htmlFor="minhasEmendas"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    Exibir apenas as minhas emendas
                    </label>
                </div>
            </div>
        </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            Sem resultados.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >Anterior</Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >Próximo</Button>
            </div>
        </div>
    )
}