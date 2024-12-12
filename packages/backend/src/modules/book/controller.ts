import { constants } from 'http2';
import { RouteHandlerMethod } from 'fastify';
import * as v from 'valibot';
import * as bookService from './service';
import { Book, BookSchema } from '../../models';

export const getFindAllBooks: RouteHandlerMethod = async (request, reply) => {
  let existingBooks: Book[];
  try {
    const query = request.query as { q?: string };
    existingBooks = await bookService.findMultipleBooks(query.q ?? '');
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.send(existingBooks);
};

export const getFindOneBook: RouteHandlerMethod = async (request, reply) => {
  let existingBook: Book | undefined;
  try {
    const params = request.params as { bookId: string };
    existingBook = await bookService.findOneBook(params.bookId);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  if (typeof existingBook === 'undefined') {
    reply.status(constants.HTTP_STATUS_NOT_FOUND).send();
    return;
  }

  reply.send(existingBook);
};

export const postCreateNewBook: RouteHandlerMethod = async (request, reply) => {
  let newBookData: Book;
  try {
    newBookData = await v.parseAsync(v.omit(BookSchema, ['id']), request.body);
  } catch (e) {
    reply.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    return;
  }

  let newBook: Book | undefined;
  try {
    newBook = await bookService.createNewBook(newBookData);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.status(constants.HTTP_STATUS_CREATED).send(newBook);
};

export const putUpdateExistingBook: RouteHandlerMethod = async (request, reply) => {
  let newBookData: Book;
  try {
    newBookData = await v.parseAsync(BookSchema, request.body);
  } catch {
    reply.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    return;
  }

  let updateFn: ((bookData: Partial<Book>) => Promise<Book | undefined>) | undefined;
  try {
    const params = request.params as { bookId: string };
    updateFn = await bookService.updateExistingBook(params.bookId);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  if (typeof updateFn === 'undefined') {
    reply.status(constants.HTTP_STATUS_NOT_FOUND).send();
    return;
  }

  let updatedBook: Book | undefined;
  try {
    updatedBook = await updateFn(newBookData);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.send(updatedBook);
};

export const deleteExistingBook: RouteHandlerMethod = async (request, reply) => {
  let existingBook: Book | undefined;
  try {
    const params = request.params as { bookId: string };
    existingBook = await bookService.findOneBook(params.bookId);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  if (typeof existingBook === 'undefined') {
    reply.status(constants.HTTP_STATUS_NOT_FOUND).send({
      message: 'Not Found',
    });
    return;
  }

  try {
    await bookService.deleteExistingBook(existingBook.id);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.status(constants.HTTP_STATUS_NO_CONTENT).send();
};
