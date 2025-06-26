// Question List Dashboard for Consultant

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import {
  Eye,
  Loader2,
  MoreHorizontal,
  XCircle,
} from "lucide-react";

import type { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
import TableToolbar, { FacetFilter } from "@/components/layouts/Dashboard/TableToolbar";
import { DataTable } from "@/components/layouts/Dashboard/DataTable";
import type { Question } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { useQuestions } from "@/hooks/consultant/useQuestions";

import { DataTableSkeleton } from "@/components/layouts/Dashboard/DataTableSkeleton";
import { formatDate } from "@/utils/formatDate";
import { QUESTION_STATUS } from "@/Application/constants/manager/manager.questionConstants";
import { TOPIC_OPTIONS } from "@/Application/constants/topics";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AnswerQuestionDialog } from "./AnswerQuestion";
import { useQuestionMutations } from "@/hooks/consultant/useQuestionMutations";


// =============== COLUMNS FORMAT FOR QUESTIONS ===============
const allQuestionColumns = [
  {
    key: "id",
    label: "ID",
    toggleable: false,
    cellclassName: "2xl:max-w-[220px]",
    render: (question: Question) => (
      <Badge variant="outline" className="font-black font-mono bg-blue-600/15">
        {question.id}
      </Badge>
    )
  },
  {
    key: "question",
    label: "Question",
    sortable: false,
    render: (question: Question) => (
      <p className="line-clamp-2 font-medium">{question.question}</p>
    ),
  },
  {
    key: 'topic',
    label: 'Topic',
    render: (question: Question) => {
      const topic = TOPIC_OPTIONS.find(opt => opt.value === question.topic);
      return (
        <Badge
          className={cn('font-medium text-xs', topic?.style ?? 'border-muted bg-muted/10 text-muted-foreground')}
        >
          {topic?.label ?? question.topic}
        </Badge>
      );
    },
  },
  {
    key: "status",
    label: "Status",
    render: (question: Question) => {
      const statusString = QUESTION_STATUS.UI_MAP[question.status] || 'Unknown';
      return (
        <Badge className={cn(
          "font-medium text-xs",
          statusString === "Answered" && "border-green-500/50 bg-green-500/10 text-green-700",
          statusString === "Pending" && "border-orange-500/50 bg-orange-500/10 text-orange-700",
        )}>
          {statusString}
        </Badge>
      );
    }
  },
  {
    key: "created_at",
    label: "Date Asked",
    render: (question: Question) => formatDate(question.created_at),
  },
];


// ========== FACET FILTERS FOR QUESTIONS ==========
const questionFacetFilters: FacetFilter[] = [
  {
    key: "status",
    label: "Status",
    options: QUESTION_STATUS.FILTER_OPTIONS,
  },
  {
    key: "topic",
    label: "Topic",
    options: TOPIC_OPTIONS,
  },
];

// ========== DATE FILTERS FOR QUESTIONS ==========
const dateFilterOptions = [
  { value: 'created_at', label: 'Date Asked' },
];

// ========== SEARCHABLE FIELDS FOR QUESTIONS ==========
const searchableFields = [
  { value: 'question', label: 'Question' },
];


export default function QuestionListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();

  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  const [sort, setSort] = useState<{
    field: keyof Question;
    direction: 'asc' | 'desc'
  }>({ field: 'created_at', direction: 'desc' });

  const [activeFilterKey, setActiveFilterKey] = useState<string>('status');
  const [activeFilterValues, setActiveFilterValues] = useState<string[]>([]);

  const [uiSearchConfig, setUiSearchConfig] = useState({ field: 'question', value: '' });
  const [apiSearchConfig, setApiSearchConfig] = useState({ field: 'question', value: '' });

  const [visibleColumns, setVisibleColumns] = useState<string[]>(allQuestionColumns.map((col) => col.key));
  const visibleColumnCount = allQuestionColumns.filter(c => visibleColumns.includes(c.key)).length;

  const [dateConfig, setDateConfig] = useState<{
    field: string;
    from?: Date;
    to?: Date;
  }>({ field: 'created_at' });

  const [isAnswerDialogOpen, setIsAnswerDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const { answerQuestion, editAnswer } = useQuestionMutations();


  // ========== SET BREADCRUMB ==========
  useEffect(() => {
    setBreadcrumb({
      title: "Question Management",
      parent: "Dashboard",
      parentHref: "/consultant",
    });
  }, [setBreadcrumb]);

  // API filter logic is generic and reusable
  const apiFilters = useMemo(() => {
    if (activeFilterValues.length === 0) return {};
    return { [activeFilterKey]: activeFilterValues };
  }, [activeFilterKey, activeFilterValues]);

  useEffect(() => {
    setPage(1);
  }, [apiFilters, apiSearchConfig, sort, dateConfig]);

  const handleSearchSubmit = () => {
    setApiSearchConfig(uiSearchConfig);
  };

  // ========== USE QUESTIONS HOOK ==========
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuestions({
    page,
    limit: ROWS_PER_PAGE,
    filters: apiFilters,
    search: apiSearchConfig,
    sort,
    dateRange: dateConfig,
  });

  const questions = data?.data ?? [];
  const totalQuestions = data?.total ?? 0;
  const totalPages = Math.ceil(totalQuestions / ROWS_PER_PAGE);

  // ========== COLUMNS SETUP (Generic) ==========
  const columns = useMemo(() => {
    return allQuestionColumns.map((col) => ({
      key: col.key as keyof Question,
      label: col.label,
      visible: visibleColumns.includes(col.key),
      sortable: col.sortable,
      cellClassName: col.cellclassName,
      render: col.render,
    }));
  }, [visibleColumns]);

  // ========== QUESTION ACTIONS ==========
  const handleViewDetailsClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsAnswerDialogOpen(true);
  };
  const renderQuestionActions = useCallback((question: Question) => {
    // Disable button if a mutation is running for this specific question
    const isMutatingThisQuestion =
      (answerQuestion.isPending && answerQuestion.variables?.questionId === question.id) ||
      (editAnswer.isPending && editAnswer.variables?.questionId === question.id);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isMutatingThisQuestion}>
            <span className="sr-only">Open menu</span>
            {isMutatingThisQuestion ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleViewDetailsClick(question)}>
            <Eye className="mr-2 h-4 w-4" />
            {question.answer ? 'View & Edit Answer' : 'View & Answer'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }, [answerQuestion.isPending, answerQuestion.variables, editAnswer.isPending, editAnswer.variables]);


  return (
    <>
      <TableToolbar
        isFetching={isFetching && !isLoading}

        facetFilters={questionFacetFilters}
        activeFilterKey={activeFilterKey}
        onActiveFilterKeyChange={setActiveFilterKey}
        activeFilterValues={activeFilterValues}
        onActiveFilterValuesChange={setActiveFilterValues}

        searchValue={uiSearchConfig.value}
        onSearchChange={(newValue) =>
          setUiSearchConfig(current => ({ ...current, value: newValue }))
        }
        searchFieldOptions={searchableFields}
        searchFieldValue={uiSearchConfig.field}
        onSearchFieldChange={(newField) =>
          setUiSearchConfig(current => ({ ...current, field: newField }))
        }
        onSearchSubmit={handleSearchSubmit}

        columns={allQuestionColumns}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}

        dateFilterOptions={dateFilterOptions}
        activeDateFilterKey={dateConfig.field}
        onActiveDateFilterKeyChange={(newField) =>
          setDateConfig(current => ({ ...current, field: newField }))
        }
        fromDate={dateConfig.from}
        toDate={dateConfig.to}
        onDateRangeChange={(from, to) =>
          setDateConfig(current => ({ ...current, from, to }))
        }

        onResetFilters={() => {
          setPage(1);
          setSort({ field: 'created_at', direction: 'desc' });
          setActiveFilterKey('status');
          setActiveFilterValues([]);
          setUiSearchConfig({ field: 'question', value: '' });
          setApiSearchConfig({ field: 'question', value: '' });
          setDateConfig({ field: 'created_at' });
          setVisibleColumns(allQuestionColumns.map((c) => c.key));
        }}
      />

      {isFetching && (
        <div className="absolute inset-0 bg-white/50 z-10"></div>
      )}

      {isLoading ? (
        <DataTableSkeleton columnCount={visibleColumnCount + 1} />
      ) : isError ? (
        <div className="min-h-[calc(77vh)] flex flex-col items-center justify-center text-center py-10 border rounded-xl bg-white shadow-sm">
          <div className="bg-red-100 p-3 rounded-full">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Failed to Load Questions</h3>
          <p className="text-muted-foreground mt-1">{error.message}</p>
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

      <AnswerQuestionDialog
        open={isAnswerDialogOpen}
        onOpenChange={setIsAnswerDialogOpen}
        question={selectedQuestion}
        onSuccess={() => {
          setIsAnswerDialogOpen(false);
        }}
      />
    </>
  );
}