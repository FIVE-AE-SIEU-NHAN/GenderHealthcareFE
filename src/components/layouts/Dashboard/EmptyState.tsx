import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react"; // Or any other relevant icon

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  title = "No Results Found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 border rounded-xl bg-white shadow-sm min-h-[400px]">
      <div className="bg-gray-100 p-4 rounded-full">
        <SearchX className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1 max-w-sm">{description}</p>
      {onClearFilters && (
        <Button onClick={onClearFilters} className="mt-6">
          Clear All Filters
        </Button>
      )}
    </div>
  );
}