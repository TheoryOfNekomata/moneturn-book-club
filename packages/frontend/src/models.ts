export interface Author {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author?: Partial<Author>;
  coverUrl?: string;
}
