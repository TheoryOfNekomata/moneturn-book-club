import * as v from 'valibot';

export const AuthorSchema = v.object({
  id: v.string(),
  name: v.string(),
});

export const BookSchema = v.object({
  id: v.string(),
  title: v.string(),
  author: v.optional(AuthorSchema),
  authorId: AuthorSchema.entries.id,
});

export type Book = v.InferOutput<typeof BookSchema>;

export type Author = v.InferOutput<typeof AuthorSchema>;
