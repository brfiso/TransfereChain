import { ufs } from "@/utils/data/ufs"
import { meses } from "@/utils/data/meses"
import { anos } from "@/utils/data/anos"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onComboChange: (value: string) => void;
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
  onComboChange
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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
 
    const [openAnoCombo, setOpenAnoCombo] = React.useState(false)
    const [anoValue, setAnoValue] = React.useState("")

    const [openMesCombo, setOpenMesCombo] = React.useState(false)
    const [mesValue, setMesValue] = React.useState("")

    const [openUfCombo, setOpenUfCombo] = React.useState(false)
    const [ufValue, setUfValue] = React.useState("")
    
    const handleComboChange = (value: string) => {
        onComboChange(value);
    };

    return (
        <div>
            <div className="flex items-center justify-between py-4">
            
                {/* Combobox - Anos - Inicio */}
                <div>
                    <Popover open={openAnoCombo} onOpenChange={setOpenAnoCombo}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openAnoCombo}
                                className="w-[200px] justify-between"
                            >
                                {anoValue
                                    ? anos.find((ano) => ano.value === anoValue)?.label
                                    : "Ano"
                                }
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Ano" />
                                <CommandEmpty>Não existem anos cadastrados.</CommandEmpty>
                                <CommandGroup>
                                    {anos.map((ano) => (
                                    <CommandItem
                                        key={ano.value}
                                        value={ano.value}
                                        onSelect={(currentValue) => {
                                            setAnoValue(currentValue === anoValue ? "" : currentValue)
                                            setOpenAnoCombo(false)
                                            table.getColumn("ano")?.setFilterValue(currentValue)
                                        }}
                                    >
                                        <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            anoValue === ano.value ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                        {ano.label}
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                {/* Combobox - Anos - Fim */}

                {/* Combobox - Mês - Inicio */}
                <div>
                    <Popover open={openMesCombo} onOpenChange={setOpenMesCombo}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openMesCombo}
                                className="w-[200px] justify-between"
                            >
                                {mesValue
                                    ? meses.find((mes) => mes.value === mesValue)?.label
                                    : "Mês"
                                }
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Mês" />
                                <CommandEmpty>Não existem meses cadastrados.</CommandEmpty>
                                <CommandGroup>
                                    {meses.map((mes) => (
                                    <CommandItem
                                        key={mes.value}
                                        value={mes.value}
                                        onSelect={(currentValue) => {
                                            setMesValue(currentValue === mesValue ? "" : currentValue)
                                            setOpenMesCombo(false)
                                            table.getColumn("mes")?.setFilterValue(currentValue)
                                        }}
                                    >
                                        <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            mesValue === mes.value ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                        {mes.label}
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                {/* Combobox - Mês - Fim */}

                {/* Combobox - Uf - Inicio */}
                <div>
                    <Popover open={openUfCombo} onOpenChange={setOpenUfCombo}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openUfCombo}
                                className="w-[200px] justify-between"
                            >
                                {ufValue
                                    ? ufs.find((uf) => uf.value === ufValue)?.label
                                    : "UF"
                                }
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="UF" />
                                <CommandEmpty>Não existem UFs cadastradas.</CommandEmpty>
                                <CommandGroup>
                                    {ufs.map((uf) => (
                                        <CommandItem
                                            key={uf.value}
                                            value={uf.label}
                                            onSelect={currentValue => {
                                                currentValue = ufs.filter(el => el.label.toLowerCase() === currentValue)[0].value
                                                setUfValue(currentValue === ufValue ? "" : currentValue)
                                                setOpenUfCombo(false)
                                                table.getColumn("uf")?.setFilterValue(currentValue)
                                                handleComboChange(currentValue)
                                            }}
                                        >
                                            <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                ufValue === uf.value ? "opacity-100" : "opacity-0"
                                            )}
                                            />
                                            {uf.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                {/* Combobox - Uf - Fim */}

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