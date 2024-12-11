import { Book } from '../../models';

const DUMMY_DATA: Book[] = [
  {
    id: '1',
    title: 'Book name',
    author: {
      id: '1',
      name: 'Author name',
    },
    authorId: '1',
    coverUrl: 'http://placehold.it/1',
  },
  {
    id: '2',
    title: 'Very long book name',
    author: {
      id: '1',
      name: 'Author name',
    },
    authorId: '1',
    coverUrl: 'http://placehold.it/1',
  },
  {
    id: '3',
    title: 'Book name',
    author: {
      id: '1',
      name: 'Author name',
    },
    authorId: '1',
    coverUrl: 'http://placehold.it/1',
  },
  {
    id: '4',
    title: 'Very long book name',
    author: {
      id: '1',
      name: 'Author name',
    },
    authorId: '1',
    coverUrl: 'http://placehold.it/1',
  },
  {
    id: '5',
    title: 'Book name',
    author: {
      id: '1',
      name: 'Author name',
    },
    authorId: '1',
    coverUrl: 'http://placehold.it/1',
  },
  {
    id: '6',
    title: 'Very long book name',
    author: {
      id: '1',
      name: 'Author name',
    },
    authorId: '1',
    coverUrl: 'http://placehold.it/1',
  },
  {
    id: '7',
    title: 'Book name',
    author: {
      id: '1',
      name: 'Author name',
    },
    authorId: '1',
    coverUrl: 'http://placehold.it/1',
  },
  {
    id: '8',
    title: 'Very long book name',
    author: {
      id: '1',
      name: 'Author name',
    },
    authorId: '1',
    coverUrl: 'http://placehold.it/1',
  },
];

export const findMultipleBooks = async (query?: string): Promise<Book[]> => {
  if (typeof query === 'undefined') {
    return DUMMY_DATA;
  }

  const queryNormalized = query.toLowerCase();
  return DUMMY_DATA.filter((d) => {
    const title = d.title.toLowerCase();
    if (typeof d.author !== 'undefined') {
      const authorName = d.author.name?.toLowerCase();

      if (typeof authorName !== 'undefined') {
        return title.includes(queryNormalized) || authorName.includes(queryNormalized);
      }
    }

    return title.includes(queryNormalized);
  });
};

export const findOneBook = async (bookId: Book['id']): Promise<Book | undefined> => {
  return DUMMY_DATA.find((d) => d.id === bookId);
};

export const createNewBook = async (bookDataParams: Partial<Book>): Promise<Book | undefined> => {
  const newBook = bookDataParams as Book;
  DUMMY_DATA.push(newBook);
  return newBook;
};

export const updateExistingBook = async (bookId: Book['id']) => {
  const existingBookIndex = DUMMY_DATA.findIndex((d) => d.id === bookId);
  return async (bookDataParams: Partial<Book>): Promise<Book | undefined> => {
    if (existingBookIndex > -1) {
      const newData = { ...bookDataParams, id: bookId } as Book;
      DUMMY_DATA.splice(existingBookIndex, 1, newData);
      return newData;
    }
    return undefined;
  };
};

export const deleteExistingBook = async (bookId: Book['id']): Promise<void> => {
  const existingBookIndex = DUMMY_DATA.findIndex((d) => d.id === bookId);
  if (existingBookIndex > -1) {
    DUMMY_DATA.splice(existingBookIndex, 1);
  }
};
