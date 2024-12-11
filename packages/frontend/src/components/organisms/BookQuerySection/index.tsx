import Link from 'next/link';
import * as React from 'react';
import { Book } from '@/models';

export interface BookQuerySectionProps {
  books: Book[];
}

export const BookQuerySection: React.FC<BookQuerySectionProps> = ({
  books,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h2>
        Books
      </h2>
      {books.length < 1 && (
        <div>
          No books found.
        </div>
      )}
      {books.length > 0 && (
        <>
          <div>
            {books.length} {books.length !== 1 ? 'books' : 'book'} found
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-12">
            {books.map((r) => (
              <li
                className="block"
                key={r.id}
              >
                <Link href={`/books/${r.id}`}>
                  <div className="pb-[150%] w-full relative mb-2">
                    <img src={r.coverUrl ?? "http://placehold.it/1"}
                         alt={r.title}
                         className="w-full h-full block top-0 left-0 absolute object-cover object-center"/>
                  </div>
                  <div className="leading-tight font-bold text-sm">
                    {r.title}
                  </div>
                  <div className="leading-tight text-xs">
                    {r.author?.name ?? 'Anonymous'}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
