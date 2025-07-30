import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Loader2, MoreHorizontal, XCircle, Eye } from 'lucide-react'

import type { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import TableToolbar, { FacetFilter } from '@/components/layouts/Dashboard/TableToolbar'
import { DataTable } from '@/components/layouts/Dashboard/DataTable'
import type { Blog } from '@/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import { DataTableSkeleton } from '@/components/layouts/Dashboard/DataTableSkeleton'
import { formatDate } from '@/utils/formatDate'
import { BLOG_STATUS, statusActionMap } from '@/Application/constants/manager/manager.blogConstants'
import { useBlogs } from '@/hooks/manager/useBlogs'
import { useBlogsMutations } from '@/hooks/manager/useBlogsMutations'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { BlogManagerView } from './BlogManagerView'

// ========== FACET FILTERS ==========
const blogFacetFilters: FacetFilter[] = [
  {
    key: 'status',
    label: 'Status',
    options: BLOG_STATUS.FILTER_OPTIONS
  }
]

// ========== DATE FILTERS ==========
const dateFilterOptions = [{ value: 'created_at', label: 'Date Created' }]

// ========== SEARCHABLE FIELDS ==========
const searchableFields = [
  { value: 'all', label: 'All Fields' },
  { value: 'title', label: 'Title' },
  { value: 'author_name', label: 'Author' },
  { value: 'summary', label: 'Description' }
]

export default function BlogListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const [page, setPage] = useState(1)
  const ROWS_PER_PAGE = 10

  const [sort, setSort] = useState<{ field: keyof Blog; direction: 'asc' | 'desc' }>({
    field: 'created_at',
    direction: 'desc'
  })

  const [activeFilterKey, setActiveFilterKey] = useState<string>('status')
  const [activeFilterValues, setActiveFilterValues] = useState<string[]>([])

  const [uiSearchConfig, setUiSearchConfig] = useState({ field: 'all', value: '' })
  const [apiSearchConfig, setApiSearchConfig] = useState({ field: 'all', value: '' })

  const [viewingBlogId, setViewingBlogId] = useState<string | null>(null)

  // =============== COLUMNS FORMAT ===============
  const allBlogColumns = useMemo(
    () => [
      {
        key: 'no',
        label: 'No.',
        sortable: false,
        render: (_blog: Blog, index: number) => (
          <Badge variant='outline' className='border-emerald-600 bg-emerald-400/15 font-mono'>
            {(page - 1) * ROWS_PER_PAGE + index + 1}
          </Badge>
        )
      },
      {
        key: 'id',
        label: 'ID',
        defaultVisible: false,
        render: (blog: Blog) => (
          <Badge variant='outline' className='bg-emerald-400/15 font-mono'>
            {blog.id}
          </Badge>
        )
      },
      {
        key: 'title',
        label: 'Title',
        render: (blog: Blog) => <p className='line-clamp-2 font-semibold'>{blog.title}</p>
      },
      {
        key: 'author_name',
        label: 'Author',
        render: (blog: Blog) => <p className='truncate'>{blog.author_name}</p>
      },
      {
        key: 'summary',
        label: 'Description',
        sortable: false,
        cellclassName: 'max-w-sm',
        render: (blog: Blog) => <p className='truncate text-left'>{blog.summary}</p>
      },
      {
        key: 'created_at',
        label: 'Date Created',
        render: (blog: Blog) => formatDate(blog.created_at)
      },
      {
        key: 'status',
        label: 'Status',
        render: (blog: Blog) => {
          const statusString = BLOG_STATUS.UI_MAP[blog.status] || 'Unknown'
          return (
            <Badge
              className={cn(
                'text-xs font-medium',
                statusString === 'Published' && 'border-blue-500 bg-blue-500/10 text-blue-700',
                statusString === 'Archived' && 'border-red-500/50 bg-red-500/10 text-red-700',
                statusString === 'Draft' && 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700'
              )}
            >
              {statusString}
            </Badge>
          )
        }
      }
    ],
    [page]
  )

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allBlogColumns.filter((col) => col.defaultVisible !== false).map((col) => col.key)
  )

  const visibleColumnCount = allBlogColumns.filter((c) => visibleColumns.includes(c.key)).length

  const [dateConfig, setDateConfig] = useState<{ field: string; from?: Date; to?: Date }>({
    field: 'created_at'
  })

  const { editStatus: editBlogStatusMutation } = useBlogsMutations()

  // ========== SET BREADCRUMB ==========
  useEffect(() => {
    setBreadcrumb({
      title: 'Blogs Management',
      parent: 'Dashboard',
      parentHref: '/manager'
    })
  }, [setBreadcrumb])

  // ========== API FILTERS ==========
  const apiFilters = useMemo(() => {
    if (activeFilterValues.length === 0) return {}
    return { [activeFilterKey]: activeFilterValues }
  }, [activeFilterKey, activeFilterValues])

  useEffect(() => {
    setPage(1)
  }, [apiFilters, apiSearchConfig, sort, dateConfig])

  const handleSearchSubmit = () => {
    setApiSearchConfig(uiSearchConfig)
  }

  // ========== USE BLOGS HOOK ==========
  const { data, isLoading, isError, error, isFetching } = useBlogs({
    page,
    limit: ROWS_PER_PAGE,
    filters: apiFilters,
    search: apiSearchConfig,
    sort,
    dateRange: dateConfig
  })

  const blogs = data?.data ?? []
  const totalBlogs = data?.total ?? 0
  const totalPages = Math.ceil(totalBlogs / ROWS_PER_PAGE)

  // ========== COLUMNS SETUP ==========
  const columns = useMemo(() => {
    return allBlogColumns.map((col) => ({
      key: col.key as keyof Blog,
      label: col.label,
      visible: visibleColumns.includes(col.key as string),
      sortable: col.sortable,
      cellClassName: col.cellclassName,
      render: col.render
    }))
  }, [visibleColumns, allBlogColumns])

  // ========== ACTIONS ==========
  const renderBlogActions = useCallback(
    (blog: Blog) => {
      const isMutatingThisBlog =
        editBlogStatusMutation.isPending && editBlogStatusMutation.variables?.blogId === blog.id

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isMutatingThisBlog}>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              {isMutatingThisBlog ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <MoreHorizontal className='h-4 w-4' />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setViewingBlogId(blog.id)}>
              <Eye className='mr-2 h-4 w-4' />
              View Blog Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {statusActionMap[blog.status]?.map((action) => (
              <DropdownMenuItem
                key={action.targetStatus}
                className={action.className}
                onClick={() => editBlogStatusMutation.mutate({ blogId: blog.id, status: action.targetStatus })}
              >
                <action.icon className='mr-2 h-4 w-4' />
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    [editBlogStatusMutation]
  )

  return (
    <>
      <TableToolbar
        isFetching={isFetching && !isLoading}
        facetFilters={blogFacetFilters}
        activeFilterKey={activeFilterKey}
        onActiveFilterKeyChange={setActiveFilterKey}
        activeFilterValues={activeFilterValues}
        onActiveFilterValuesChange={setActiveFilterValues}
        searchValue={uiSearchConfig.value}
        onSearchChange={(newValue) => setUiSearchConfig((current) => ({ ...current, value: newValue }))}
        searchFieldOptions={searchableFields}
        searchFieldValue={uiSearchConfig.field}
        onSearchFieldChange={(newField) => setUiSearchConfig((current) => ({ ...current, field: newField }))}
        onSearchSubmit={handleSearchSubmit}
        columns={allBlogColumns}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}
        dateFilterOptions={dateFilterOptions}
        activeDateFilterKey={dateConfig.field}
        onActiveDateFilterKeyChange={(newField) => setDateConfig((current) => ({ ...current, field: newField }))}
        fromDate={dateConfig.from}
        toDate={dateConfig.to}
        onDateRangeChange={(from, to) => setDateConfig((current) => ({ ...current, from, to }))}
        onResetFilters={() => {
          setPage(1)
          setSort({ field: 'created_at', direction: 'desc' })
          setActiveFilterKey('status')
          setActiveFilterValues([])
          setUiSearchConfig({ field: 'all', value: '' })
          setApiSearchConfig({ field: 'all', value: '' })
          setDateConfig({ field: 'created_at' })
          setVisibleColumns(allBlogColumns.map((c) => c.key))
        }}
      />

      {isFetching && <div className='absolute inset-0 z-10 bg-white/50'></div>}

      {isLoading ? (
        <DataTableSkeleton columnCount={visibleColumnCount + 1} />
      ) : isError ? (
        <div className='flex min-h-[calc(77vh)] flex-col items-center justify-center rounded-xl border bg-white py-10 text-center shadow-sm'>
          <div className='rounded-full bg-red-100 p-3'>
            <XCircle className='h-8 w-8 text-red-500' />
          </div>
          <h3 className='mt-4 text-lg font-semibold'>Failed to Load Blogs</h3>
          <p className='text-muted-foreground mt-1'>{error?.message}</p>
        </div>
      ) : (
        <DataTable
          data={blogs}
          columns={columns}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          sortField={sort.field}
          sortDirection={sort.direction}
          onSortChange={(field, direction) => setSort({ field: field as keyof Blog, direction })}
          renderActions={renderBlogActions}
        />
      )}

      <Dialog open={!!viewingBlogId} onOpenChange={(isOpen) => !isOpen && setViewingBlogId(null)}>
        <DialogContent className='min-w-6xl'>
          <BlogManagerView blogId={viewingBlogId} />
        </DialogContent>
      </Dialog>
    </>
  )
}
