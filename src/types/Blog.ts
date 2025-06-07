export interface Blog {
    id: number;
    userId: string;
    title: string;
    summary?: string | null;
    content: string;
    section1?: string | null;
    section2?: string | null;
    mainImage?: string | null;
    subImage?: string | null;
    createdAt?: string | null;
    authorName?: string | null;
  }
  