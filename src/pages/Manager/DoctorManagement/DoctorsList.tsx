import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Loader2, MoreHorizontal, ShieldBan, ShieldCheck, UserCog, XCircle } from 'lucide-react'

import type { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import TableToolbar, { FacetFilter } from '@/components/layouts/Dashboard/TableToolbar'
import { DataTable } from '@/components/layouts/Dashboard/DataTable'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import { useDoctors } from '@/hooks/manager/useDoctors'
import { DataTableSkeleton } from '@/components/layouts/Dashboard/DataTableSkeleton'
import { formatDate } from '@/utils/formatDate'
import { DOCTOR_STATUS } from '@/Application/constants/manager/manager.doctorConstants'
import { TOPIC_OPTIONS } from '@/Application/constants/appointment'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DoctorProfile } from '@/types/manager/doctorTypes'
import { useDoctorMutations } from '@/hooks/manager/useDoctorMutations'
import { EditDoctorForm } from './EditDoctorProfile'

// ========== FACET FILTERS ==========
const doctorFacetFilters: FacetFilter[] = [
  {
    key: 'status',
    label: 'Status',
    options: DOCTOR_STATUS.FILTER_OPTIONS
  },
  {
    key: 'specialization',
    label: 'Specialization',
    options: TOPIC_OPTIONS
  },
  {
    key: 'gender',
    label: 'Gender',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' }
    ]
  }
]

// ========== DATE FILTERS ==========
const dateFilterOptions = [
  { value: 'created_at', label: 'Joined Since' },
  { value: 'date_of_birth', label: 'Date of Birth' }
]

// ========== SEARCHABLE FIELDS ==========
const searchableFields = [
  { value: 'all', label: 'All Fields' },
  { value: 'name', label: 'Full Name' },
  { value: 'specialization', label: 'Specialization' }
]

export default function DoctorListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const [page, setPage] = useState(1)
  const ROWS_PER_PAGE = 10

  const [sort, setSort] = useState<{
    field: keyof DoctorProfile
    direction: 'asc' | 'desc'
  }>({ field: 'created_at', direction: 'desc' })

  // =============== COLUMNS FORMAT ===============
  const allDoctorColumns = useMemo(
    () => [
      {
        key: 'no',
        label: 'No.',
        sortable: false,
        render: (_doctor: DoctorProfile, index: number) => (
          <Badge variant='outline' className='border-sky-600 bg-sky-400/15 font-mono'>
            {(page - 1) * ROWS_PER_PAGE + index + 1}
          </Badge>
        )
      },
      {
        key: 'id',
        label: 'ID',
        sortable: true,
        defaultVisible: false, // ID is now hidden by default
        render: (doctor: DoctorProfile) => (
          <Badge variant='outline' className='bg-blue-600/15 font-mono font-black'>
            {doctor.id}
          </Badge>
        )
      },
      {
        key: 'name',
        label: 'Full Name',
        sortable: true,
        cellClassName: 'min-w-48',
        render: (doctor: DoctorProfile) => <p className='line-clamp-1 font-semibold'>{doctor.name}</p>
      },
      {
        key: 'gender',
        label: 'Gender',
        sortable: true,
        render: (doctor: DoctorProfile) => {
          const gender = doctor.gender
          return (
            <Badge
              className={cn(
                'text-xs font-medium capitalize',
                gender === 'male' && 'border-blue-500/50 bg-blue-500/10 text-blue-700',
                gender === 'female' && 'border-pink-500/50 bg-pink-500/10 text-pink-700',
                gender === 'other' && 'border-gray-500/50 bg-gray-500/10 text-gray-700'
              )}
            >
              {gender ?? 'Unknown'}
            </Badge>
          )
        }
      },
      {
        key: 'date_of_birth',
        label: 'Date of Birth',
        sortable: true,
        render: (doctor: DoctorProfile) => formatDate(doctor.date_of_birth)
      },
      {
        key: 'specialization',
        label: 'Specialization',
        sortable: true,
        render: (doctor: DoctorProfile) => {
          const specialization = TOPIC_OPTIONS.find((opt) => opt.value === doctor.specialization)
          return (
            <Badge className={cn('text-xs font-medium', specialization?.style)}>
              {specialization?.label ?? doctor.specialization}
            </Badge>
          )
        }
      },
      {
        key: 'created_at',
        label: 'Joined Since',
        sortable: true,
        defaultVisible: true,
        render: (doctor: DoctorProfile) => formatDate(doctor.created_at)
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (doctor: DoctorProfile) => {
          const statusString = DOCTOR_STATUS.UI_MAP[doctor.status] || 'Unknown'
          return (
            <Badge
              className={cn(
                'text-xs font-medium',
                statusString === 'Active' && 'border-green-500/50 bg-green-500/10 text-green-700',
                statusString === 'Inactive' && 'border-red-500/50 bg-red-500/10 text-red-700'
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

  const [activeFilterKey, setActiveFilterKey] = useState<string>('status')
  const [activeFilterValues, setActiveFilterValues] = useState<string[]>([])
  const [uiSearchConfig, setUiSearchConfig] = useState({ field: 'all', value: '' })
  const [apiSearchConfig, setApiSearchConfig] = useState({ field: 'all', value: '' })

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allDoctorColumns.filter((col) => col.defaultVisible !== false).map((col) => col.key)
  )
  const visibleColumnCount = allDoctorColumns.filter((c) => visibleColumns.includes(c.key)).length

  const [dateConfig, setDateConfig] = useState<{
    field: string
    from?: Date
    to?: Date
  }>({ field: 'created_at' })

  const [editingDoctor, setEditingDoctor] = useState<DoctorProfile | null>(null)
  const { editStatus: editDoctorStatusMutation } = useDoctorMutations()

  useEffect(() => {
    setBreadcrumb({
      title: 'Doctors Management',
      parent: 'Dashboard',
      parentHref: '/manager'
    })
  }, [setBreadcrumb])

  const apiFilters = useMemo(() => {
    if (activeFilterValues.length === 0) return {}
    return { [activeFilterKey]: activeFilterValues }
  }, [activeFilterKey, activeFilterValues])

  useEffect(() => {
    setPage(1)
  }, [apiFilters, apiSearchConfig, sort, dateConfig])

  const handleSearchSubmit = () => setApiSearchConfig(uiSearchConfig)

  const { data, isLoading, isError, error, isFetching } = useDoctors({
    page,
    limit: ROWS_PER_PAGE,
    filters: apiFilters,
    search: apiSearchConfig,
    sort,
    dateRange: dateConfig
  })

  const doctors = data?.data ?? []
  const totalDoctors = data?.total ?? 0
  const totalPages = Math.ceil(totalDoctors / ROWS_PER_PAGE)

  const columns = useMemo(() => {
    return allDoctorColumns.map((col) => ({
      key: col.key as keyof (DoctorProfile & { no: number }),
      label: col.label,
      visible: visibleColumns.includes(col.key as string),
      cellClassName: col.cellClassName,
      sortable: col.sortable,
      render: col.render
    }))
  }, [visibleColumns, allDoctorColumns]) // Now depends on allDoctorColumns directly

  const renderDoctorActions = useCallback(
    (doctor: DoctorProfile) => {
      const statusString = DOCTOR_STATUS.UI_MAP[doctor.status] || 'Unknown'
      const isMutatingThisDoctor =
        editDoctorStatusMutation.isPending && editDoctorStatusMutation.variables?.doctorId === doctor.id

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isMutatingThisDoctor}>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              {isMutatingThisDoctor ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <MoreHorizontal className='h-4 w-4' />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setEditingDoctor(doctor)}>Edit Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            {statusString === 'Inactive' && (
              <DropdownMenuItem
                className='text-green-600 focus:bg-green-50 focus:text-green-700'
                onClick={() => editDoctorStatusMutation.mutate({ doctorId: doctor.id, status: 1 })}
              >
                <ShieldCheck className='mr-2 h-4 w-4' />
                Make Online
              </DropdownMenuItem>
            )}
            {statusString === 'Active' && (
              <DropdownMenuItem
                className='text-red-600 focus:bg-red-50 focus:text-red-700'
                onClick={() => editDoctorStatusMutation.mutate({ doctorId: doctor.id, status: 0 })}
              >
                <ShieldBan className='mr-2 h-4 w-4' />
                Make Offline
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    [editDoctorStatusMutation]
  )

  return (
    <>
      <TableToolbar
        isFetching={isFetching && !isLoading}
        facetFilters={doctorFacetFilters}
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
        columns={allDoctorColumns}
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
          setVisibleColumns(allDoctorColumns.filter((c) => c.defaultVisible !== false).map((c) => c.key))
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
          <h3 className='mt-4 text-lg font-semibold'>Failed to Load Doctors</h3>
          <p className='text-muted-foreground mt-1'>{error.message}</p>
        </div>
      ) : (
        <DataTable
          data={doctors}
          columns={columns}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          sortField={sort.field}
          sortDirection={sort.direction}
          onSortChange={(field, direction) => setSort({ field: field as keyof DoctorProfile, direction })}
          renderActions={renderDoctorActions}
        />
      )}

      <Dialog open={!!editingDoctor} onOpenChange={(isOpen) => !isOpen && setEditingDoctor(null)}>
        <DialogContent className='flex w-[95vw] flex-col p-0 sm:max-w-none md:w-[60vw] lg:w-[50vw] xl:w-[40vw]'>
          <DialogHeader className='rounded-t-lg border-b bg-gradient-to-br from-slate-50 to-slate-100 p-6 pb-4'>
            <div className='flex items-center gap-4'>
              <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600'>
                <UserCog className='h-8 w-8 text-white' />
              </div>
              <div className='flex flex-col'>
                <DialogTitle className='text-foreground text-3xl font-bold tracking-tight'>
                  Edit Doctor Profile
                </DialogTitle>
                <DialogDescription className='text-muted-foreground mt-1 text-base'>
                  Update the details for {editingDoctor?.name}.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className='flex-1 overflow-y-auto px-6 py-4'>
            {editingDoctor && <EditDoctorForm doctor={editingDoctor} onSuccess={() => setEditingDoctor(null)} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
