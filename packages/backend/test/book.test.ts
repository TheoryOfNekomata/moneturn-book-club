import { constants } from 'http2';
import { describe, it, expect, beforeAll, afterAll, beforeEach, Mock, vi, afterEach } from 'vitest';
import fastify from 'fastify';
import { createServer } from '../src/server';
import { addRoutes } from '../src/modules/book/routes';
import * as bookService from '../src/modules/book/service';
import { Book } from '../src/models';

vi.mock('../src/modules/book/service');

const mockBookId: Book['id'] = '1';

const mockBook: Book = {
  id: mockBookId,
  title: 'Book Name',
  authorId: 'Foo',
};

describe('Books API', () => {
  let server: fastify.FastifyInstance;

  beforeAll(() => {
    server = addRoutes(createServer());
  });

  afterAll(async () => {
    await server.close();
  });

  describe('Find All Books', () => {
    type MockFindMultipleBooks = Mock<Parameters<typeof bookService.findMultipleBooks>, ReturnType<typeof bookService.findMultipleBooks>>;
    let mockFindMultipleBooks: MockFindMultipleBooks;
    beforeEach(() => {
      mockFindMultipleBooks = bookService.findMultipleBooks as MockFindMultipleBooks;
    });
    afterEach(() => {
      mockFindMultipleBooks.mockReset();
    });

    it('returns an OK response', async () => {
      mockFindMultipleBooks.mockResolvedValueOnce([mockBook]);
      const response = await server.inject().get('/api/books').headers({
        Accept: 'application/json',
      });
      const responseBody = response.json();

      expect(responseBody).toBeInstanceOf(Array);
      expect(responseBody[0]).toEqual(mockBook);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    });

    it('returns an error response when the service fails', async () => {
      mockFindMultipleBooks.mockRejectedValueOnce({});
      const response = await server.inject().get('/api/books').headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });

  describe('Find One Book', () => {
    type MockFindOneBook = Mock<Parameters<typeof bookService.findOneBook>, ReturnType<typeof bookService.findOneBook>>;
    let mockFindOneBook: MockFindOneBook;
    beforeEach(() => {
      mockFindOneBook = bookService.findOneBook as MockFindOneBook;
    });
    afterEach(() => {
      mockFindOneBook.mockReset();
    });

    it('returns an OK response', async () => {
      mockFindOneBook.mockResolvedValueOnce(mockBook);
      const response = await server.inject().get(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      });
      const responseBody = response.json();
      expect(responseBody).toEqual(mockBook);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    });

    it('returns a Not Found response', async () => {
      mockFindOneBook.mockResolvedValueOnce(undefined);
      const response = await server.inject().get(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_NOT_FOUND);
    });

    it('returns an error response when the service fails', async () => {
      mockFindOneBook.mockRejectedValueOnce({});
      const response = await server.inject().get(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });

  describe('Create New Book', () => {
    type MockCreateNewBook = Mock<Parameters<typeof bookService.createNewBook>, ReturnType<typeof bookService.createNewBook>>;
    let mockCreateNewBook: MockCreateNewBook;
    beforeEach(() => {
      mockCreateNewBook = bookService.createNewBook as MockCreateNewBook;
    });
    afterEach(() => {
      mockCreateNewBook.mockReset();
    });

    const mockValidBookData: Book = {
      id: mockBookId,
      title: 'Book Name',
      authorId: 'Foo',
      coverUrl: '',
    };

    it('returns a Created response', async () => {
      mockCreateNewBook.mockResolvedValueOnce(mockValidBookData);
      const response = await server.inject().post('/api/books').headers({
        Accept: 'application/json',
      })
        .body(mockValidBookData);
      const responseBody = response.json();
      expect(responseBody).toEqual(mockValidBookData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED);
    });

    it('returns an error response when the request is malformed', async () => {
      mockCreateNewBook.mockRejectedValueOnce({});
      const response = await server.inject().post('/api/books').headers({
        Accept: 'application/json',
      })
        .body({
          unknownAttribute: 'unknown value',
        });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
    });

    it('returns an error response when the service fails', async () => {
      mockCreateNewBook.mockRejectedValueOnce({});
      const response = await server.inject().post('/api/books').headers({
        Accept: 'application/json',
      })
        .body(mockValidBookData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });

  describe('Update Existing Book', () => {
    type MockUpdateExistingBook = Mock<Parameters<typeof bookService.updateExistingBook>, ReturnType<typeof bookService.updateExistingBook>>;
    let mockUpdateExistingBook: MockUpdateExistingBook;
    beforeEach(() => {
      mockUpdateExistingBook = bookService.updateExistingBook as MockUpdateExistingBook;
    });
    afterEach(() => {
      mockUpdateExistingBook.mockReset();
    });

    const mockValidUpdateBookData: Book = {
      id: mockBookId,
      title: 'Book Name',
      authorId: 'Foo',
      coverUrl: '',
    };

    it('returns an OK response', async () => {
      mockUpdateExistingBook.mockResolvedValueOnce(async () => mockValidUpdateBookData);
      const response = await server.inject().put(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      })
        .body(mockValidUpdateBookData);
      const responseBody = response.json();
      expect(responseBody).toEqual(mockValidUpdateBookData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    });

    it('returns an error response when the item is not found', async () => {
      mockUpdateExistingBook.mockResolvedValueOnce(undefined);
      const response = await server.inject().put(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      })
        .body(mockValidUpdateBookData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_NOT_FOUND);
    });

    it('returns an error response when the request is malformed', async () => {
      mockUpdateExistingBook.mockRejectedValueOnce({});
      const response = await server.inject().put(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      })
        .body({
          unknownAttribute: 'unknown value',
        });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
    });

    it('returns an error response when the service fails', async () => {
      mockUpdateExistingBook.mockRejectedValueOnce({});
      const response = await server.inject().put(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      })
        .body(mockValidUpdateBookData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });

  describe('Delete Existing Book', () => {
    type MockDeleteExistingBook = Mock<Parameters<typeof bookService.deleteExistingBook>, ReturnType<typeof bookService.deleteExistingBook>>;
    let mockDeleteExistingBook: MockDeleteExistingBook;
    beforeEach(() => {
      mockDeleteExistingBook = bookService.deleteExistingBook as MockDeleteExistingBook;
    });
    afterEach(() => {
      mockDeleteExistingBook.mockReset();
    });

    type MockFindOneBook = Mock<Parameters<typeof bookService.findOneBook>, ReturnType<typeof bookService.findOneBook>>;
    let mockFindOneBook: MockFindOneBook;
    beforeEach(() => {
      mockFindOneBook = bookService.findOneBook as MockFindOneBook;
    });
    afterEach(() => {
      mockFindOneBook.mockReset();
    });

    it('returns an OK response', async () => {
      mockFindOneBook.mockResolvedValueOnce(mockBook);
      mockDeleteExistingBook.mockReturnValueOnce(Promise.resolve());
      const response = await server.inject().delete(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_NO_CONTENT);
    });

    it('returns a Not Found response', async () => {
      mockFindOneBook.mockResolvedValueOnce(undefined);
      mockDeleteExistingBook.mockReturnValueOnce(Promise.resolve());
      const response = await server.inject().delete(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_NOT_FOUND);
    });

    it('returns an error response when the delete service method fails', async () => {
      mockFindOneBook.mockResolvedValueOnce(mockBook);
      mockDeleteExistingBook.mockRejectedValueOnce({});
      const response = await server.inject().delete(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });

    it('returns an error response when the retrieve service method fails', async () => {
      mockFindOneBook.mockRejectedValueOnce(mockBook);
      mockDeleteExistingBook.mockReturnValueOnce(Promise.resolve());
      const response = await server.inject().delete(`/api/books/${mockBookId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });
});
