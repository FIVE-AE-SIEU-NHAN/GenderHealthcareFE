import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronUp, ChevronDown, Pencil, Trash2 } from 'lucide-react'
import { Pagination } from '@/components/layouts/pagin/Pagination'
import { EmptyState } from './EmptyState'

type Column<T> = {
  key: keyof T | string
  label: string
  visible: boolean
  sortable?: boolean
  render?: (item: T, index: number) => React.ReactNode
  cellClassName?: string
}

type DataTableProps<T extends { id: string }> = {
  data: T[]
  columns: Column<T>[]

  // Pagin
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void

  // Sort
  sortField: keyof T
  sortDirection: 'asc' | 'desc'
  onSortChange: (field: keyof T, direction: 'asc' | 'desc') => void

  // Action handlers
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  renderActions?: (item: T) => React.ReactNode
}

export function DataTable<T extends { id: string }>({
  data,
  columns,

  currentPage,
  totalPages,
  onPageChange,

  sortField,
  sortDirection,
  onSortChange,

  onEdit,
  onDelete,
  renderActions
}: DataTableProps<T>) {
  const handleSort = (field: keyof T) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc'
    onSortChange(field, newDirection)
  }

  // The number of visible columns, used for the "No results" message colspan.
  const visibleColumnCount = columns.filter((c) => c.visible).length

  return (
    <div className='animate-fade-in-up relative rounded-xl border bg-white shadow-sm max-[1125px]:min-h-[calc(82vh)] min-[1125px]:min-h-[calc(77vh)]'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left text-sm'>
          <thead className='text-muted-foreground bg-gray-50 text-center'>
            <tr>
              {columns.map(
                (col) =>
                  col.visible && (
                    <th
                      key={String(col.key)}
                      onClick={() => col.sortable !== false && handleSort(col.key as keyof T)}
                      className={cn(
                        'px-4 py-3 whitespace-nowrap',
                        col.sortable !== false && 'cursor-pointer select-none'
                      )}
                    >
                      {col.label}{' '}
                      {sortField === col.key &&
                        (sortDirection === 'asc' ? (
                          <ChevronUp className='inline h-4 w-4' />
                        ) : (
                          <ChevronDown className='inline h-4 w-4' />
                        ))}
                    </th>
                  )
              )}
              {renderActions && <th className='px-4 py-3'>Actions</th>}
            </tr>
          </thead>
          <tbody className='text-center'>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id} className='border-t transition-colors hover:bg-blue-50/70'>
                  {columns.map((col) => {
                    if (!col.visible) return null
                    return (
                      <td key={String(col.key)} className={cn('px-4 py-3 align-middle font-medium', col.cellClassName)}>
                        {col.render ? col.render(item, index) : String(item[col.key as keyof T] ?? '')}
                      </td>
                    )
                  })}

                  {/* The renderActions prop handles custom actions, like a DropdownMenu */}
                  {renderActions && <td className='max-w-[30px] px-4 py-3 align-middle'>{renderActions(item)}</td>}
                  {/* Fallback for simple onEdit/onDelete if renderActions is not provided */}
                  {!renderActions && (onEdit || onDelete) && (
                    <td className='max-w-[30px] px-4 py-3 align-middle'>
                      <div className='flex items-center justify-center gap-5'>
                        {onEdit && (
                          <Button
                            className='bg-blue-100 hover:bg-blue-200'
                            size='sm'
                            variant='ghost'
                            onClick={() => onEdit(item)}
                          >
                            <Pencil className='h-4 w-4 text-blue-600' />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            className='bg-red-100 hover:bg-red-200'
                            size='sm'
                            variant='ghost'
                            onClick={() => onDelete(item)}
                          >
                            <Trash2 className='text-destructive h-4 w-4' />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              // A message for when the data array is empty.
              <tr>
                <td colSpan={visibleColumnCount + (renderActions ? 1 : 0)}>
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className='absolute -bottom-2 flex w-full items-center justify-between px-16 md:-bottom-1 lg:bottom-0 xl:bottom-4'
      />
    </div>
  )
}
