import { constants } from 'http2';
import { describe, it, expect, beforeAll, afterAll, beforeEach, Mock, vi, afterEach } from 'vitest';
import fastify from 'fastify';
import { createServer } from '../src/server';
import { addRoutes } from '../src/modules/author/routes';
import * as authorService from '../src/modules/author/service';
import { Author } from '../src/models';

vi.mock('../src/modules/author/service');

const mockAuthorId: Author['id'] = '1';

const mockAuthor: Author = {
  id: mockAuthorId,
  name: 'Author Name',
};

describe('Authors API', () => {
  let server: fastify.FastifyInstance;

  beforeAll(() => {
    server = addRoutes(createServer());
  });

  afterAll(async () => {
    await server.close();
  });

  describe('Find All Authors', () => {
    type MockFindMultipleAuthors = Mock<Parameters<typeof authorService.findMultipleAuthors>, ReturnType<typeof authorService.findMultipleAuthors>>;
    let mockFindMultipleAuthors: MockFindMultipleAuthors;
    beforeEach(() => {
      mockFindMultipleAuthors = authorService.findMultipleAuthors as MockFindMultipleAuthors;
    });
    afterEach(() => {
      mockFindMultipleAuthors.mockReset();
    });

    it('returns an OK response', async () => {
      mockFindMultipleAuthors.mockResolvedValueOnce([mockAuthor]);
      const response = await server.inject().get('/api/authors').headers({
        Accept: 'application/json',
      });
      const responseBody = response.json();

      expect(responseBody).toBeInstanceOf(Array);
      expect(responseBody[0]).toEqual(mockAuthor);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    });

    it('returns an error response when the service fails', async () => {
      mockFindMultipleAuthors.mockRejectedValueOnce({});
      const response = await server.inject().get('/api/authors').headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });

  describe('Find One Author', () => {
    type MockFindOneAuthor = Mock<Parameters<typeof authorService.findOneAuthor>, ReturnType<typeof authorService.findOneAuthor>>;
    let mockFindOneAuthor: MockFindOneAuthor;
    beforeEach(() => {
      mockFindOneAuthor = authorService.findOneAuthor as MockFindOneAuthor;
    });
    afterEach(() => {
      mockFindOneAuthor.mockReset();
    });

    it('returns an OK response', async () => {
      mockFindOneAuthor.mockResolvedValueOnce(mockAuthor);
      const response = await server.inject().get(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      });
      const responseBody = response.json();
      expect(responseBody).toEqual(mockAuthor);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    });

    it('returns a Not Found response', async () => {
      mockFindOneAuthor.mockResolvedValueOnce(undefined);
      const response = await server.inject().get(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_NOT_FOUND);
    });

    it('returns an error response when the service fails', async () => {
      mockFindOneAuthor.mockRejectedValueOnce({});
      const response = await server.inject().get(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });

  describe('Create New Author', () => {
    type MockCreateNewAuthor = Mock<Parameters<typeof authorService.createNewAuthor>, ReturnType<typeof authorService.createNewAuthor>>;
    let mockCreateNewAuthor: MockCreateNewAuthor;
    beforeEach(() => {
      mockCreateNewAuthor = authorService.createNewAuthor as MockCreateNewAuthor;
    });
    afterEach(() => {
      mockCreateNewAuthor.mockReset();
    });

    const mockValidAuthorData: Author = {
      id: mockAuthorId,
      name: 'Author Name',
    };

    it('returns a Created response', async () => {
      mockCreateNewAuthor.mockResolvedValueOnce(mockValidAuthorData);
      const response = await server.inject().post('/api/authors').headers({
        Accept: 'application/json',
      })
        .body(mockValidAuthorData);
      const responseBody = response.json();
      expect(responseBody).toEqual(mockValidAuthorData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED);
    });

    it('returns an error response when the request is malformed', async () => {
      mockCreateNewAuthor.mockRejectedValueOnce({});
      const response = await server.inject().post('/api/authors').headers({
        Accept: 'application/json',
      })
        .body({
          unknownAttribute: 'unknown value',
        });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
    });

    it('returns an error response when the service fails', async () => {
      mockCreateNewAuthor.mockRejectedValueOnce({});
      const response = await server.inject().post('/api/authors').headers({
        Accept: 'application/json',
      })
        .body(mockValidAuthorData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });

  describe('Update Existing Author', () => {
    type MockUpdateExistingAuthor = Mock<Parameters<typeof authorService.updateExistingAuthor>, ReturnType<typeof authorService.updateExistingAuthor>>;
    let mockUpdateExistingAuthor: MockUpdateExistingAuthor;
    beforeEach(() => {
      mockUpdateExistingAuthor = authorService.updateExistingAuthor as MockUpdateExistingAuthor;
    });
    afterEach(() => {
      mockUpdateExistingAuthor.mockReset();
    });

    const mockValidUpdateAuthorData: Author = {
      id: mockAuthorId,
      name: 'Author Name',
    };

    it('returns an OK response', async () => {
      mockUpdateExistingAuthor.mockResolvedValueOnce(async () => mockValidUpdateAuthorData);
      const response = await server.inject().put(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      })
        .body(mockValidUpdateAuthorData);
      const responseBody = response.json();
      expect(responseBody).toEqual(mockValidUpdateAuthorData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    });

    it('returns an error response when the item is not found', async () => {
      mockUpdateExistingAuthor.mockResolvedValueOnce(undefined);
      const response = await server.inject().put(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      })
        .body(mockValidUpdateAuthorData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_NOT_FOUND);
    });

    it('returns an error response when the request is malformed', async () => {
      mockUpdateExistingAuthor.mockRejectedValueOnce({});
      const response = await server.inject().put(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      })
        .body({
          unknownAttribute: 'unknown value',
        });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
    });

    it('returns an error response when the service fails', async () => {
      mockUpdateExistingAuthor.mockRejectedValueOnce({});
      const response = await server.inject().put(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      })
        .body(mockValidUpdateAuthorData);
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });

  describe('Delete Existing Author', () => {
    type MockDeleteExistingAuthor = Mock<Parameters<typeof authorService.deleteExistingAuthor>, ReturnType<typeof authorService.deleteExistingAuthor>>;
    let mockDeleteExistingAuthor: MockDeleteExistingAuthor;
    beforeEach(() => {
      mockDeleteExistingAuthor = authorService.deleteExistingAuthor as MockDeleteExistingAuthor;
    });
    afterEach(() => {
      mockDeleteExistingAuthor.mockReset();
    });

    type MockFindOneAuthor = Mock<Parameters<typeof authorService.findOneAuthor>, ReturnType<typeof authorService.findOneAuthor>>;
    let mockFindOneAuthor: MockFindOneAuthor;
    beforeEach(() => {
      mockFindOneAuthor = authorService.findOneAuthor as MockFindOneAuthor;
    });
    afterEach(() => {
      mockFindOneAuthor.mockReset();
    });

    it('returns an OK response', async () => {
      mockFindOneAuthor.mockResolvedValueOnce(mockAuthor);
      mockDeleteExistingAuthor.mockReturnValueOnce(Promise.resolve());
      const response = await server.inject().delete(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_NO_CONTENT);
    });

    it('returns a Not Found response', async () => {
      mockFindOneAuthor.mockResolvedValueOnce(undefined);
      mockDeleteExistingAuthor.mockReturnValueOnce(Promise.resolve());
      const response = await server.inject().delete(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_NOT_FOUND);
    });

    it('returns an error response when the delete service method fails', async () => {
      mockFindOneAuthor.mockResolvedValueOnce(mockAuthor);
      mockDeleteExistingAuthor.mockRejectedValueOnce({});
      const response = await server.inject().delete(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });

    it('returns an error response when the retrieve service method fails', async () => {
      mockFindOneAuthor.mockRejectedValueOnce(mockAuthor);
      mockDeleteExistingAuthor.mockReturnValueOnce(Promise.resolve());
      const response = await server.inject().delete(`/api/authors/${mockAuthorId}`).headers({
        Accept: 'application/json',
      });
      expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    });
  });
});
