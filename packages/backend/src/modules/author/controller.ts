import { constants } from 'http2';
import fastify from 'fastify';
import * as v from 'valibot';
import * as authorService from './service';
import { Author, AuthorSchema } from '../../models';

export const getFindAllAuthors: fastify.RouteHandlerMethod = async (request, reply) => {
  let existingAuthors: Author[];
  try {
    existingAuthors = await authorService.findAllAuthors();
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.send(existingAuthors);
};

export const getFindOneAuthor: fastify.RouteHandlerMethod = async (request, reply) => {
  let existingAuthor: Author | undefined;
  try {
    existingAuthor = await authorService.findOneAuthor(request.params.authorId);
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

export const postCreateNewAuthor: fastify.RouteHandlerMethod = async (request, reply) => {
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

export const putUpdateExistingAuthor: fastify.RouteHandlerMethod = async (request, reply) => {
  let newAuthorData: Author;
  try {
    newAuthorData = await v.parseAsync(AuthorSchema, request.body);
  } catch {
    reply.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    return;
  }

  let updateFn: ((id: Author) => Promise<Author>) | undefined;
  try {
    updateFn = await authorService.updateExistingAuthor(request.params.authorId);
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

export const deleteExistingAuthor: fastify.RouteHandlerMethod = async (request, reply) => {
  let existingAuthor: Author | undefined;
  try {
    existingAuthor = await authorService.findOneAuthor(request.params.authorId);
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
