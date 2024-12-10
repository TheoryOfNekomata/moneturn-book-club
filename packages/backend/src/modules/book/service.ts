import { Book } from '../../models';

export const findAllBooks = async (): Promise<Book[]> => {
  return [
    {}
  ];
};

export const findOneBook = async (bookId: Book['id']): Promise<Book | undefined> => {
  return undefined;
};

export const createNewBook = async (bookDataParams: Partial<Book>): Promise<Book | undefined> => {

};

export const updateExistingBook = async (bookId: Book['id']) => {
  return async (bookDataParams: Partial<Book>): Promise<Book | undefined> => {
    return {};
  };
};

export const deleteExistingBook = async (bookId: Book['id']): Promise<void> => {

};
