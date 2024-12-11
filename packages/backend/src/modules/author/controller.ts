import { constants } from 'http2';
import { RouteHandlerMethod } from 'fastify';
import * as v from 'valibot';
import * as authorService from './service';
import { Author, AuthorSchema } from '../../models';

export const getFindAllAuthors: RouteHandlerMethod = async (request, reply) => {
  let existingAuthors: Author[];
  try {
    const query = request.query as { q?: string };
    existingAuthors = await authorService.findMultipleAuthors(query.q ?? '');
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.send(existingAuthors);
};

export const getFindOneAuthor: RouteHandlerMethod = async (request, reply) => {
  let existingAuthor: Author | undefined;
  try {
    const params = request.params as { authorId: string };
    existingAuthor = await authorService.findOneAuthor(params.authorId);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  if (typeof existingAuthor === 'undefined') {
    reply.status(constants.HTTP_STATUS_NOT_FOUND).send();
    return;
  }

  reply.send(existingAuthor);
};

export const postCreateNewAuthor: RouteHandlerMethod = async (request, reply) => {
  let newAuthorData: Author;
  try {
    newAuthorData = await v.parseAsync(AuthorSchema, request.body);
  } catch {
    reply.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    return;
  }

  let newAuthor: Author | undefined;
  try {
    newAuthor = await authorService.createNewAuthor(newAuthorData);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.status(constants.HTTP_STATUS_CREATED).send(newAuthor);
};

export const putUpdateExistingAuthor: RouteHandlerMethod = async (request, reply) => {
  let newAuthorData: Author;
  try {
    newAuthorData = await v.parseAsync(AuthorSchema, request.body);
  } catch {
    reply.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    return;
  }

  let updateFn: ((authorData: Partial<Author>) => Promise<Author | undefined>) | undefined;
  try {
    const params = request.params as { authorId: string };
    updateFn = await authorService.updateExistingAuthor(params.authorId);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  if (typeof updateFn === 'undefined') {
    reply.status(constants.HTTP_STATUS_NOT_FOUND).send();
    return;
  }

  let updatedAuthor: Author | undefined;
  try {
    updatedAuthor = await updateFn(newAuthorData);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.send(updatedAuthor);
};

export const deleteExistingAuthor: RouteHandlerMethod = async (request, reply) => {
  let existingAuthor: Author | undefined;
  try {
    const params = request.params as { authorId: string };
    existingAuthor = await authorService.findOneAuthor(params.authorId);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  if (typeof existingAuthor === 'undefined') {
    reply.status(constants.HTTP_STATUS_NOT_FOUND).send({
      message: 'Not Found',
    });
    return;
  }

  try {
    await authorService.deleteExistingAuthor(existingAuthor.id);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.status(constants.HTTP_STATUS_NO_CONTENT).send();
};
