import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MoreHorizontal,
  FilePlus2,
  XCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import type { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
import TableToolbar, { FacetFilter } from "@/components/layouts/Dashboard/TableToolbar";
import { DataTable } from "@/components/layouts/Dashboard/DataTable";
import type { Blog } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { useBlogs } from '@/hooks/manager/useBlogs'; 
import { DataTableSkeleton } from "@/components/layouts/Dashboard/DataTableSkeleton";
// import { useBlogMutations } from "@/hooks/admin/useBlogMutations"; // <-- Sẽ cần cho việc edit/delete
import { formatDate } from "@/utils/formatDate";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateBlogForm } from "./CreateBlogForm";
import { BLOG_STATUS } from "@/Application/constants/manager/manager.blogConstants";


// =============== COLUMNS FORMAT ===============
const allBlogColumns = [
  {
    key: "id",
    label: "ID",
    defaultVisible: true,    
    render: (blog: Blog) => (
      <Badge variant="outline" className="font-mono bg-emerald-400/15">
        {blog.id}
      </Badge>
    )
  },
  {
    key: "title",
    label: "Title",
    render: (blog: Blog) => <p className="line-clamp-2 font-semibold">{blog.title}</p>,
  },
  { 
    key: "author_name", 
    label: "Author",
    render: (blog: Blog) => <p className="truncate">{blog.author_name}</p>,
   },
  {
    key: "summary",
    label: "Description",
    sortable: false,
    cellclassName: "max-w-sm",
    render: (blog: Blog) => <p className="truncate text-left">{blog.summary}</p>,
  },
  {
    key: "created_at",
    label: "Date Created",
    render: (blog: Blog) => formatDate(blog.created_at),
  },
  {
    key: "status",
    label: "Status",
    render: (blog: Blog) => {
      const statusString = BLOG_STATUS.UI_MAP[blog.status] || 'Unknown';
      return (
        <Badge className={cn(
          "font-medium text-xs",
          statusString === "Published" && "border-blue-500 bg-blue-500/10 text-blue-700",
          statusString === "Archived" && "border-red-500/50 bg-red-500/10 text-red-700",
          statusString === "Draft" && "border-yellow-500/50 bg-yellow-500/10 text-yellow-700",
        )}>
          {statusString}
        </Badge>
      );
    },
  },
];


// ========== FACET FILTERS ==========
const blogFacetFilters: FacetFilter[] = [
  {
    key: "status",
    label: "Status",
    options: BLOG_STATUS.FILTER_OPTIONS,
  },
];

// ========== DATE FILTERS ==========
const dateFilterOptions = [
  { value: 'created_at', label: 'Date Created' },
];

// ========== SEARCHABLE FIELDS ==========
const searchableFields = [
  { value: 'all', label: 'All Fields' },
  { value: 'title', label: 'Title' },
  { value: 'author_name', label: 'Author' },
  { value: 'summary', label: 'Description' },
];

export default function BlogListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();

  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  const [sort, setSort] = useState<{ field: keyof Blog; direction: 'asc' | 'desc' }>({
    field: 'created_at',
    direction: 'desc'
  });

  const [activeFilterKey, setActiveFilterKey] = useState<string>('status');
  const [activeFilterValues, setActiveFilterValues] = useState<string[]>([]);

  const [uiSearchConfig, setUiSearchConfig] = useState({ field: 'all', value: '' });
  const [apiSearchConfig, setApiSearchConfig] = useState({ field: 'all', value: '' });

  const [visibleColumns, setVisibleColumns] = useState<string[]>(allBlogColumns.map((col) => col.key));
  const visibleColumnCount = allBlogColumns.filter(c => visibleColumns.includes(c.key)).length;

  const [dateConfig, setDateConfig] = useState<{ field: string; from?: Date; to?: Date; }>({
    field: 'created_at'
  });
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  // const { deleteBlogMutation } = useBlogMutations(); // <-- Ví dụ

  // ========== SET BREADCRUMB ==========
  useEffect(() => {
    setBreadcrumb({
      title: "Blogs Management",
      parent: "Dashboard",
      parentHref: "/manager",
    });
  }, [setBreadcrumb]);

  // ========== API FILTERS ==========
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

  // ========== USE BLOGS HOOK ==========
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useBlogs({
    page,
    limit: ROWS_PER_PAGE,
    filters: apiFilters,
    search: apiSearchConfig,
    sort,
    dateRange: dateConfig,
  });

  const blogs = data?.data ?? [];
  const totalBlogs = data?.total ?? 0;
  const totalPages = Math.ceil(totalBlogs / ROWS_PER_PAGE);

  // ========== COLUMNS SETUP ==========
  const columns = useMemo(() => {
    return allBlogColumns.map((col) => ({
      key: col.key as keyof Blog,
      label: col.label,
      visible: visibleColumns.includes(col.key),
      sortable: col.sortable,
      cellClassName: col.cellclassName,
      render: col.render,
    }));
  }, [visibleColumns]);

  // ========== ACTIONS ==========
  const renderBlogActions = useCallback((blog: Blog) => {
    // const isMutatingThisBlog = deleteBlogMutation.isPending && deleteBlogMutation.variables === blog.id;
    const isMutatingThisBlog = false; // Placeholder

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isMutatingThisBlog}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {isMutatingThisBlog ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => alert(`Editing blog: ${blog.title}`)}>
             <Pencil className="mr-2 h-4 w-4" />
            Edit Blog
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:bg-red-50 focus:text-red-700"
            onClick={() => confirm(`Are you sure you want to delete "${blog.title}"?`)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Blog
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }, [/* deleteBlogMutation */]);

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
        onSearchChange={(newValue) => setUiSearchConfig(current => ({ ...current, value: newValue }))}
        searchFieldOptions={searchableFields}
        searchFieldValue={uiSearchConfig.field}
        onSearchFieldChange={(newField) => setUiSearchConfig(current => ({ ...current, field: newField }))}
        onSearchSubmit={handleSearchSubmit}

        columns={allBlogColumns}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}

        dateFilterOptions={dateFilterOptions}
        activeDateFilterKey={dateConfig.field}
        onActiveDateFilterKeyChange={(newField) => setDateConfig(current => ({ ...current, field: newField }))}
        fromDate={dateConfig.from}
        toDate={dateConfig.to}
        onDateRangeChange={(from, to) => setDateConfig(current => ({ ...current, from, to }))}

        onResetFilters={() => {
          setPage(1);
          setSort({ field: 'created_at', direction: 'desc' });
          setActiveFilterKey('status');
          setActiveFilterValues([]);
          setUiSearchConfig({ field: 'all', value: '' });
          setApiSearchConfig({ field: 'all', value: '' });
          setDateConfig({ field: 'created_at' });
          setVisibleColumns(allBlogColumns.map((c) => c.key));
        }}
        onCreate={() => setIsCreateDialogOpen(true)}
        createButtonLabel="+ CREATE BLOG"
      />

      {isFetching && <div className="absolute inset-0 bg-white/50 z-10"></div>}

      {isLoading ? (
        <DataTableSkeleton columnCount={visibleColumnCount + 1} />
      ) : isError ? (
        <div className="min-h-[calc(77vh)] flex flex-col items-center justify-center text-center py-10 border rounded-xl bg-white shadow-sm">
          <div className="bg-red-100 p-3 rounded-full"><XCircle className="h-8 w-8 text-red-500" /></div>
          <h3 className="mt-4 text-lg font-semibold">Failed to Load Blogs</h3>
          <p className="text-muted-foreground mt-1">{error?.message}</p>
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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent
          className="sm:max-w-none w-[95vw] h-[90vh] md:w-[80vw] lg:w-[70vw] flex flex-col p-0 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
        >
          <DialogHeader className="rounded-t-md border-b-slate-300 border-b-1 p-6 pb-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shrink-0">
                <FilePlus2 className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <DialogTitle className="text-3xl font-bold tracking-tight text-foreground">
                  Create a New Masterpiece
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground mt-1">
                  Fill out the details below to publish a new article for our community.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <CreateBlogForm onSuccess={() => setIsCreateDialogOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}