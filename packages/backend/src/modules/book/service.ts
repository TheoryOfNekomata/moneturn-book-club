import { Book } from '../../models';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findMultipleBooks = async (query?: string): Promise<Book[]> => {
  const allBooks = await prisma.book.findMany({
    include: {
      author: true,
    },
  });
  if (typeof query === 'undefined') {
    return allBooks;
  }

  const queryNormalized = query.toLowerCase();
  return allBooks.filter((b) => {
    if (b.author) {
      return b.title.toLowerCase().includes(queryNormalized) || b.author.name.toLowerCase().includes(queryNormalized);
    }

    return b.title.toLowerCase().includes(queryNormalized);
  });
};

export const findAuthorBooks = async (authorId: Book['authorId']): Promise<Book[]> => {
  return await prisma.book.findMany({
    where: {
      authorId,
    },
    include: {
      author: true,
    },
  });
};

export const findOneBook = async (bookId: Book['id']): Promise<Book | undefined> => {
  return await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      author: true,
    },
  });
};

export const createNewBook = async (bookDataParams: Partial<Book>): Promise<Book | undefined> => {
  return await prisma.book.create({
    data: bookDataParams,
  });
};

export const updateExistingBook = async (bookId: Book['id']) => {
  return async (bookDataParams: Partial<Book>): Promise<Book | undefined> => {
    return await prisma.book.update({
      where: {
        id: bookId,
      },
      data: bookDataParams,
    });
  };
};

export const deleteExistingBook = async (bookId: Book['id']): Promise<void> => {
  return await prisma.book.delete({
    where: {
      id: bookId,
    },
  });
};
