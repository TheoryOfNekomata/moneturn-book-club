import Link from 'next/link';
import * as React from 'react';
import { Author } from '@/models';

export interface AuthorQuerySectionProps {
  authors: Author[];
}

export const AuthorQuerySection: React.FC<AuthorQuerySectionProps> = ({
  authors,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h2>
        Authors
      </h2>
      {authors.length < 1 && (
        <div>
          No authors found.
        </div>
      )}
      {authors.length > 0 && (
        <>
          <div>
            {authors.length} {authors.length !== 1 ? 'authors' : 'author'} found
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8">
            {authors.map((r) => (
              <li
                className="block"
                key={r.id}
              >
                <Link href={`/authors/${r.id}`}>
                  <div className="flex gap-4 items-center">
                    <img src="http://placehold.it/1" alt={r.name} className="w-16 h-16 rounded-full"/>
                    <div className="leading-tight font-bold text-sm">
                      {r.name}
                    </div>
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
