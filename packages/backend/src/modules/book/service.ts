import { Book } from '../../models';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findMultipleBooks = async (query?: string): Promise<Book[]> => {
  if (typeof query === 'undefined') {
    return prisma.book.findMany();
  }

  const queryNormalized = query.toLowerCase();
  return prisma.book.findMany({
    where: {
      OR: [
        {
          title: {
            contains: queryNormalized,
          },
        },
        {
          author: {
            name: {
              contains: queryNormalized,
            },
          },
        }
      ]
    }
  });
};

export const findOneBook = async (bookId: Book['id']): Promise<Book | undefined> => {
  return prisma.book.findUnique({
    where: {
      id: bookId,
    }
  });
};

export const createNewBook = async (bookDataParams: Partial<Book>): Promise<Book | undefined> => {
  return prisma.book.create({
    data: bookDataParams,
  });
};

export const updateExistingBook = async (bookId: Book['id']) => {
  return async (bookDataParams: Partial<Book>): Promise<Book | undefined> => {
    return prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        bookDataParams,
      },
    });
  };
};

export const deleteExistingBook = async (bookId: Book['id']): Promise<void> => {
  return prisma.book.delete({
    where: {
      id: bookId,
    },
  });
};
