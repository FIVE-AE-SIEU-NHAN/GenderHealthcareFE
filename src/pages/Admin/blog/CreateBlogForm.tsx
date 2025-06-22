import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  FileText,
  Type,
  Image as ImageIcon,
  SendHorizonal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  author: z.string().min(2, { message: "Author name is required." }),
  summary: z.string().min(10, { message: "Summary must be at least 10 characters." }).max(200, { message: "Summary must be under 200 characters." }),
  mainContent: z.string().min(50, { message: "Main content needs to be substantial." }),
  section1: z.string().optional(),
  section2: z.string().optional(),
  mainImageUrl: z.string().url({ message: "Please enter a valid URL." }),
  subImageUrl: z.string().url({ message: "Please enter a valid URL." }).optional(),
});

type CreateBlogFormProps = {
  onSuccess: () => void;
};

export function CreateBlogForm({ onSuccess }: CreateBlogFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      summary: "",
      mainContent: "",
      section1: "",
      section2: "",
      mainImageUrl: "",
      subImageUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted!", values);
    toast.success("Blog Post Created!", {
      description: `"${values.title}" has been successfully created.`,
    });
    onSuccess();
  }

  const inputStyles = "shadow-inner shadow-black/5 transition-[box-shadow,border-color] duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:shadow-primary/10";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* === SECTION 1: CORE DETAILS === */}
        <Card
          className="animate-fade-in-up [animation-delay:100ms] [animation-fill-mode:backwards] pt-7 pb-7"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-semi-dark-blue text-lg text-shadow-md">
              <FileText className="h-6 w-6 text-semi-dark-blue" />
              Core Details
            </CardTitle>
            <CardDescription>
              The essential information for your blog post. Title and Author are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Blog Title</FormLabel>
                <FormControl><Input className={inputStyles} placeholder="e.g., The Future of Gender-Affirming Care" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="author" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Author</FormLabel>
                <FormControl><Input className={inputStyles} placeholder="e.g., Dr. Jane Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        {/* === SECTION 2: CONTENT === */}
        <Card
          className="animate-fade-in-up [animation-delay:300ms] [animation-fill-mode:backwards] pt-7 pb-7"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-semi-dark-blue text-lg text-shadow-md">
              <Type className="h-6 w-6 text-semi-dark-blue" />
              Article Content
            </CardTitle>
            <CardDescription>
              Write the main body of your article. Use the optional sections for more structured content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField control={form.control} name="summary" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Summary</FormLabel>
                <FormControl><Textarea className={inputStyles} rows={3} placeholder="A short, catchy summary..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainContent" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Main Content</FormLabel>
                <FormControl><Textarea className={inputStyles} rows={8} placeholder="Write the heart of your article here..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="section1" render={({ field }) => ( <FormItem><FormLabel>Section 1 (Optional)</FormLabel><FormControl><Textarea className={inputStyles} rows={4} {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="section2" render={({ field }) => ( <FormItem><FormLabel>Section 2 (Optional)</FormLabel><FormControl><Textarea className={inputStyles} rows={4} {...field} /></FormControl><FormMessage /></FormItem> )} />
            </div>
          </CardContent>
        </Card>
        
        {/* === SECTION 3: MEDIA === */}
        <Card
          className="animate-fade-in-up [animation-delay:500ms] [animation-fill-mode:backwards] pt-7 pb-2"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-semi-dark-blue text-lg text-shadow-md">
              <ImageIcon className="h-6 w-6 text-semi-dark-blue" />
              Media
            </CardTitle>
            <CardDescription>
              Add links to the images for this post. A main image is required.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            
            {/* --- Main Image URL Field --- */}
            <FormField
              control={form.control}
              name="mainImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Main Image URL</FormLabel>
                  <FormControl>
                    <Input className={inputStyles} placeholder="https://..." {...field} />
                  </FormControl>
                  <div className="min-h-[1.25rem]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* --- Sub Image URL Field --- */}
            <FormField
              control={form.control}
              name="subImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input className={inputStyles} placeholder="https://..." {...field} />
                  </FormControl>
                  <div className="min-h-[1.25rem]"> 
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        {/* === SUBMIT BUTTON === */}
        <div
          className="flex justify-end animate-fade-in-up [animation-delay:600ms] [animation-fill-mode:backwards]"
        >
          <Button type="submit" size="lg" className="font-bold text-lg bg-gradient-to-br from-primary to-blue-700 text-white shadow-md hover:shadow-md/20 hover:scale-101 transition-all duration-200">
            <SendHorizonal className="mr-2 h-5 w-5" />
            Create Blog
          </Button>
        </div>
      </form>
    </Form>
  );
}