import { Author } from '../../models';

export const findAllAuthors = async (): Promise<Author[]> => {
  return [];
};

export const findOneAuthor = async (authorId: Author['id']): Promise<Author | undefined> => {
  return undefined;
};

export const createNewAuthor = async (authorDataParams: Partial<Author>): Promise<Author | undefined> => {

};

export const updateExistingAuthor = async (authorId: Author['id']) => {
  return async (authorDataParams: Partial<Author>): Promise<Author | undefined> => {

  };
};

export const deleteExistingAuthor = async (authorId: Author['id']): Promise<void> => {

};
