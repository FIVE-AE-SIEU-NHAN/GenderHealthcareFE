import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Image as ImageIcon, X, Settings, FileText, TagsIcon } from "lucide-react";

// Import components from shadcn/ui
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Blog data interface
interface NewBlog {
  title: string;
  summary: string;
  content: string;
  cover_image: string;
  status: 'draft' | 'published';
  tags: string[];
}

const CreateBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form state
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");

  // Mutation to create a new blog
  const { mutate, isPending } = useMutation({
    mutationFn: async (newBlog: NewBlog) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.post("/api/blogs", newBlog);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Article has been saved successfully!");
      navigate("/blog");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && currentTag.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.warning("Title and Content are required.");
      return;
    }
    mutate({ title, summary, content, cover_image: coverImage, status, tags });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main column: Content */}
          <div className="lg:col-span-8">
            <Card className="h-full">
              <CardContent className="p-6 space-y-6">
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Article Title..."
                  className="border-none text-4xl font-extrabold tracking-tight focus-visible:ring-0 px-0 h-auto shadow-none"
                />
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Start writing your masterpiece here..."
                  className="h-[60vh] border-none text-lg focus-visible:ring-0 px-0 shadow-none resize-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Settings */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader className="border-b p-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-5 w-5" />
                  <span>Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: 'draft' | 'published') => setStatus(value)}>
                  <SelectTrigger id="status" className="mt-2">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-4 border-t">
                 <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isPending}>Cancel</Button>
                 <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {status === 'draft' ? 'Save Draft' : 'Publish'}
                 </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="border-b p-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ImageIcon className="h-5 w-5" />
                  <span>Cover Image</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {coverImage ? (
                  <div className="relative group">
                    <img src={coverImage} alt="Cover" className="rounded-md w-full aspect-video object-cover" />
                    <Button variant="destructive" size="icon"
                      className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setCoverImage('')}>
                      <X className="h-4 w-4"/>
                    </Button>
                  </div>
                ) : (
                  <div className="w-full aspect-video border-2 border-dashed rounded-md flex items-center justify-center bg-muted/40">
                    <p className="text-sm text-muted-foreground">Image Preview</p>
                  </div>
                )}
                 <Input
                    type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Paste image URL here..." className="mt-4"
                  />
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="border-b p-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    <span>Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <Textarea
                        value={summary} onChange={(e) => setSummary(e.target.value)}
                        placeholder="A short summary for the article." className="h-32"
                    />
                </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b p-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TagsIcon className="h-5 w-5" />
                  <span>Tags</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Input
                  value={currentTag} onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagInputKeyDown} placeholder="Add a tag (press Enter)..."
                />
                <div className="flex flex-wrap gap-2 mt-4 min-h-[2.5rem]">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                      <X className="ml-1.5 h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogPage;