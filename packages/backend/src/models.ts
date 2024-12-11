import * as v from 'valibot';

export const AuthorSchema = v.object({
  id: v.string(),
  name: v.string(),
});

export const BookSchema = v.object({
  id: v.string(),
  title: v.string(),
  author: v.optional(AuthorSchema),
  authorId: v.optional(AuthorSchema.entries.id),
  // additional
  coverUrl: v.string(),
});

export type Book = v.InferOutput<typeof BookSchema>;

export type Author = v.InferOutput<typeof AuthorSchema>;
