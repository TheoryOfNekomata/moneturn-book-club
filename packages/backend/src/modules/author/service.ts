import { Author } from '../../models';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findMultipleAuthors = async (query?: string): Promise<Author[]> => {
  const allAuthors = await prisma.author.findMany();
  if (typeof query === 'undefined') {
    return allAuthors;
  }

  const queryNormalized = query.toLowerCase();
  return allAuthors.filter((b) => {
    return b.name.toLowerCase().includes(queryNormalized);
  });
};

export const findOneAuthor = async (authorId: Author['id']): Promise<Author | undefined> => {
  return await prisma.author.findUnique({
    where: {
      id: authorId,
    }
  });
};

export const createNewAuthor = async (authorDataParams: Partial<Author>): Promise<Author | undefined> => {
  return await prisma.author.create({
    data: authorDataParams,
  });
};

export const updateExistingAuthor = async (authorId: Author['id']) => {
  return async (authorDataParams: Partial<Author>): Promise<Author | undefined> => {
    return await prisma.author.update({
      where: {
        id: authorId,
      },
      data: authorDataParams,
    });
  };
};

export const deleteExistingAuthor = async (authorId: Author['id']): Promise<void> => {
  return await prisma.author.delete({
    where: {
      id: authorId,
    },
  });
};
