// Question List Dashboard for Manager
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
import { Loader2, MoreHorizontal, XCircle, Lock, Unlock, AlertTriangle, ShieldOff } from 'lucide-react'

import type { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import TableToolbar, { FacetFilter } from '@/components/layouts/Dashboard/TableToolbar'
import { DataTable } from '@/components/layouts/Dashboard/DataTable'
import type { Question } from '@/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import { useQuestions } from '@/hooks/manager/useQuestions'
import { useQuestionMutations } from '@/hooks/manager/useQuestionMutations'

import { DataTableSkeleton } from '@/components/layouts/Dashboard/DataTableSkeleton'
import { formatDate } from '@/utils/formatDate'
import { QUESTION_STATUS } from '@/Application/constants/manager/manager.questionConstants'
import { TOPIC_OPTIONS } from '@/Application/constants/appointment'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

// ========== FACET FILTERS FOR QUESTIONS ==========
const questionFacetFilters: FacetFilter[] = [
  {
    key: 'status',
    label: 'Status',
    options: QUESTION_STATUS.FILTER_OPTIONS
  },
  {
    key: 'is_public',
    label: 'Visibility',
    options: [
      { label: 'Public', value: 'true' },
      { label: 'Private', value: 'false' }
    ]
  },
  {
    key: 'topic',
    label: 'Topic',
    options: TOPIC_OPTIONS
  }
]

// ========== DATE FILTERS FOR QUESTIONS ==========
const dateFilterOptions = [{ value: 'created_at', label: 'Date Asked' }]

// ========== SEARCHABLE FIELDS FOR QUESTIONS ==========
const searchableFields = [{ value: 'question', label: 'Question' }]

export default function QuestionListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const [page, setPage] = useState(1)
  const ROWS_PER_PAGE = 10

  const [sort, setSort] = useState<{
    field: keyof Question
    direction: 'asc' | 'desc'
  }>({ field: 'created_at', direction: 'desc' })

  const [activeFilterKey, setActiveFilterKey] = useState<string>('status')
  const [activeFilterValues, setActiveFilterValues] = useState<string[]>([])

  const [uiSearchConfig, setUiSearchConfig] = useState({ field: 'question', value: '' })
  const [apiSearchConfig, setApiSearchConfig] = useState({ field: 'question', value: '' })

  const [dateConfig, setDateConfig] = useState<{
    field: string
    from?: Date
    to?: Date
  }>({ field: 'created_at' })

  const REPORTED_STATUS_ID = QUESTION_STATUS.API_MAP['Reported']
  const PENDING_STATUS_ID = QUESTION_STATUS.API_MAP['Pending']

  // =============== MODIFIED: COLUMNS FORMAT FOR QUESTIONS ===============
  const allQuestionColumns = useMemo(
    () => [
      {
        key: 'no',
        label: 'No.',
        sortable: false, // This column cannot be sorted
        render: (_question: Question, index: number) => (
          <Badge variant='outline' className='border-emerald-600 bg-emerald-400/15 font-mono'>
            {(page - 1) * ROWS_PER_PAGE + index + 1}
          </Badge>
        )
      },
      {
        key: 'id',
        label: 'ID',
        defaultVisible: false, // Hidden by default
        render: (question: Question) => (
          <Badge variant='outline' className='bg-blue-600/15 font-mono'>
            {question.id}
          </Badge>
        )
      },
      {
        key: 'question',
        label: 'Question',
        sortable: false,
        cellClassName: 'max-w-xs',
        render: (question: Question) => <p className='line-clamp-1 font-medium'>{question.question}</p>
      },
      {
        key: 'topic',
        label: 'Topic',
        render: (question: Question) => {
          const topic = TOPIC_OPTIONS.find((opt) => opt.value === question.topic)
          return (
            <Badge
              className={cn('text-xs font-medium', topic?.style ?? 'border-muted bg-muted/10 text-muted-foreground')}
            >
              {topic?.label ?? question.topic}
            </Badge>
          )
        }
      },
      {
        key: 'status',
        label: 'Status',
        render: (question: Question) => {
          const statusString = QUESTION_STATUS.UI_MAP[question.status] || 'Unknown'
          return (
            <Badge
              className={cn(
                'text-xs font-medium',
                statusString === 'Answered' && 'border-green-500/50 bg-green-500/10 text-green-700',
                statusString === 'Pending' && 'border-orange-500/50 bg-orange-500/10 text-orange-700',
                statusString === 'Reported' && 'border-purple-500/50 bg-purple-500/10 text-purple-700'
              )}
            >
              {statusString}
            </Badge>
          )
        }
      },
      {
        key: 'is_public',
        label: 'Visibility',
        render: (question: Question) => (
          <Badge
            variant='outline'
            className={cn(
              question.is_public
                ? 'border-blue-500/50 bg-blue-500/10 text-blue-700'
                : 'border-red-500/50 bg-red-500/10 text-red-700'
            )}
          >
            {question.is_public ? 'Public' : 'Private'}
          </Badge>
        )
      },
      {
        key: 'created_at',
        label: 'Date Asked',
        render: (question: Question) => formatDate(question.created_at)
      }
    ],
    [page]
  )

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allQuestionColumns.filter((col) => col.defaultVisible !== false).map((col) => col.key)
  )
  const visibleColumnCount = allQuestionColumns.filter((c) => visibleColumns.includes(c.key)).length

  const [questionToReject, setQuestionToReject] = useState<Question | null>(null)

  const { editStatus: editQuestionStatusMutation, rejectReport } = useQuestionMutations()

  useEffect(() => {
    setBreadcrumb({
      title: 'Question Management',
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

  const handleSearchSubmit = () => {
    setApiSearchConfig(uiSearchConfig)
  }

  const { data, isLoading, isError, error, isFetching } = useQuestions({
    page,
    limit: ROWS_PER_PAGE,
    filters: apiFilters,
    search: apiSearchConfig,
    sort,
    dateRange: dateConfig
  })

  const questions = data?.data ?? []
  const totalQuestions = data?.total ?? 0
  const totalPages = Math.ceil(totalQuestions / ROWS_PER_PAGE)

  const columns = useMemo(() => {
    return allQuestionColumns.map((col) => ({
      key: col.key as keyof Question,
      label: col.label,
      visible: visibleColumns.includes(col.key as string),
      sortable: col.sortable,
      cellClassName: col.cellClassName,
      render: col.render
    }))
  }, [visibleColumns, allQuestionColumns])

  const renderQuestionActions = useCallback(
    (question: Question) => {
      const isMutatingThisQuestion =
        (editQuestionStatusMutation.isPending && editQuestionStatusMutation.variables?.questionId === question.id) ||
        (rejectReport.isPending && rejectReport.variables?.questionId === question.id)

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isMutatingThisQuestion}>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              {isMutatingThisQuestion ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <MoreHorizontal className='h-4 w-4' />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {question.status === REPORTED_STATUS_ID && (
              <>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className='text-orange-600 focus:bg-orange-50 focus:text-orange-700'
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => setQuestionToReject(question)}
                  >
                    <ShieldOff className='mr-2 h-4 w-4' />
                    Reject this Report
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <DropdownMenuSeparator />
              </>
            )}

            {question.is_public ? (
              <DropdownMenuItem
                className='text-red-600 focus:bg-red-50 focus:text-red-700'
                onClick={() => editQuestionStatusMutation.mutate({ questionId: question.id, is_public: false })}
              >
                <Lock className='mr-2 h-4 w-4' />
                Make Private
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className='text-blue-600 focus:bg-blue-50 focus:text-blue-700'
                onClick={() => editQuestionStatusMutation.mutate({ questionId: question.id, is_public: true })}
              >
                <Unlock className='mr-2 h-4 w-4' />
                Make Public
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    [editQuestionStatusMutation, rejectReport, REPORTED_STATUS_ID]
  )

  return (
    <>
      <AlertDialog>
        <TableToolbar
          isFetching={isFetching && !isLoading}
          facetFilters={questionFacetFilters}
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
          columns={allQuestionColumns}
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
            setUiSearchConfig({ field: 'question', value: '' })
            setApiSearchConfig({ field: 'question', value: '' })
            setDateConfig({ field: 'created_at' })
            setVisibleColumns(allQuestionColumns.map((c) => c.key))
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
            <h3 className='mt-4 text-lg font-semibold'>Failed to Load Questions</h3>
            <p className='text-muted-foreground mt-1'>{error.message}</p>
          </div>
        ) : (
          <DataTable
            data={questions}
            columns={columns}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            sortField={sort.field}
            sortDirection={sort.direction}
            onSortChange={(field, direction) => setSort({ field: field as keyof Question, direction })}
            renderActions={renderQuestionActions}
          />
        )}
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className='flex items-center gap-3'>
              <div className='rounded-full bg-red-100 p-2'>
                <AlertTriangle className='h-6 w-6 text-red-600' />
              </div>
              <AlertDialogTitle className='text-xl'>Are you sure you want to reject this report?</AlertDialogTitle>
            </div>
            <AlertDialogDescription className='pt-2 pl-12'>
              This will change the question's status back to "Pending". The consultant who reported it will be notified.
              This action can not be reversed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='cursor-pointer bg-red-700 hover:bg-red-800'
              onClick={() => {
                if (questionToReject) {
                  rejectReport.mutate({ questionId: questionToReject.id, status: PENDING_STATUS_ID })
                }
              }}
            >
              Yes, reject report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
