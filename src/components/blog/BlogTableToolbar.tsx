import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BlogTableToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Select>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Published">Published</SelectItem>
          <SelectItem value="Archived">Archived</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          From Date
        </Button>
        <span className="text-muted-foreground">→</span>
        <Button variant="outline" className="text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          To Date
        </Button>
      </div>

      <Input placeholder="Search" className="w-[200px]" />

      <div className="ml-auto">
        <Button>+ CREATE</Button>
      </div>
    </div>
  )
}
