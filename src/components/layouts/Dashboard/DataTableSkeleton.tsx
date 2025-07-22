import { Skeleton } from '@/components/ui/skeleton'

interface DataTableSkeletonProps {
  columnCount: number
  rowCount?: number
}

export function DataTableSkeleton({ columnCount, rowCount = 10 }: DataTableSkeletonProps) {
  return (
    <div className='rounded-xl border bg-white p-4 shadow-sm'>
      <div className='space-y-3'>
        {/* Table Header */}
        <div className='grid grid-cols-14 gap-4'>
          {Array.from({ length: columnCount }).map((_, i) => (
            <Skeleton key={i} className='col-span-2 h-9 bg-gray-300' />
          ))}
        </div>
        {/* Table Body */}
        {Array.from({ length: rowCount }).map((_, i) => (
          <div key={i} className='grid grid-cols-14 gap-4 border-t pt-3'>
            {/* {Array.from({ length: columnCount }).map((_, j) => ( */}
            <Skeleton className='col-span-14 h-11 bg-gray-200' />
            {/* ))} */}
          </div>
        ))}
      </div>
    </div>
  )
}
