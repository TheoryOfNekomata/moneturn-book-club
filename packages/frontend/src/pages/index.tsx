import * as React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { SearchForm } from '@/components/organisms/SearchForm';
import { Author, Book } from '@/models';

const useFeatured = () => {
  const [featured, setFeatured] = React.useState<Book[]>();

  return React.useMemo(() => ({
    featured,
  }), [featured]);
};

const useOmnisearch = () => {
  const [books, setBooks] = React.useState<Book[]>();
  const [authors, setAuthors] = React.useState<Author[]>();

  const handleSearchFormSubmit = React.useCallback<React.FormEventHandler<HTMLElementTagNameMap['form']>>(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const queryRaw = formData.get('q');
    const query = typeof queryRaw === 'string' ? queryRaw : '';
    const search = new URLSearchParams({
      q: query,
    });

    const booksUrl = new URL('/api/books', 'http://localhost:3000');
    booksUrl.search = search.toString();
    const booksResponse = await fetch(booksUrl, {
      method: 'GET',
    });
    const booksData = await booksResponse.json();
    setBooks(booksData);

    const authorsUrl = new URL('/api/authors', 'http://localhost:3000');
    authorsUrl.search = search.toString();
    const authorsResponse = await fetch(authorsUrl, {
      method: 'GET',
    });
    const authorsData = await authorsResponse.json();
    setAuthors(authorsData);
  }, []);

  return React.useMemo(() => ({
    handleSearchFormSubmit,
    books,
    authors,
  }), [books, authors]);
};

const IndexPage: NextPage = () => {
  const { handleSearchFormSubmit, books, authors } = useOmnisearch();

  return (
    <main className="h-full">
      <div className="top-0 w-full h-2/5 flex items-center sticky bg-background z-10">
        <div className="max-w-screen-sm w-full mx-auto px-8 box-border">
          <div className="flex flex-col gap-16 justify-center">
            <h1 className="text-center">Moneturn Book Club</h1>
            <form
              onSubmit={handleSearchFormSubmit}
            >
              <SearchForm
                label="Search Form"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-screen-sm w-full mx-auto px-8 box-border pb-16">
        {books && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-12">
            {books.map((r) => (
              <li
                className="block"
                key={r.id}
              >
                <Link href={`/books/${r.id}`}>
                  <div className="pb-[150%] w-full relative mb-2">
                    <img src={r.coverUrl ?? "http://placehold.it/1"}
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
        )}
      </div>
    </main>
  );
};

export default IndexPage;
