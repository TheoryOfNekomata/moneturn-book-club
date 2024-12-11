import * as React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { SearchForm } from '@/components/organisms/SearchForm';
import { useFeatured, useOmnisearch } from '@/hooks/home';
import { ActionButton } from '@/components/molecules/ActionButton';
import { useRouter } from 'next/router';

const useHomeActions = () => {
  const router = useRouter();
  const dialogId = 'home-fab';

  const handleFloatingActionButtonClick = React.useCallback<React.FormEventHandler<HTMLElementTagNameMap['form']>>(async (e) => {
    e.preventDefault();
    const { dialog, ...etcQuery } = router.query;
    if (dialog === dialogId) {
      await router.push({
        query: etcQuery,
      });
      return;
    }

    await router.push({
      query: {
        ...etcQuery,
        dialog: dialogId,
      },
    });
  }, []);

  const isFabActive = React.useMemo(() => router.query.dialog === dialogId, [router.query.dialog]);

  return React.useMemo(() => ({
    handleFloatingActionButtonClick,
    isFabActive,
  }), [
    handleFloatingActionButtonClick,
    isFabActive,
  ]);
};

const IndexPage: NextPage = () => {
  const { handleSearchFormSubmit, books, authors, isBlankQuery } = useOmnisearch();
  const { isFabActive, handleFloatingActionButtonClick } = useHomeActions();

  const { featured } = useFeatured();

  return (
    <main className="h-full">
      <div className="top-0 w-full h-2/5 flex items-center sticky bg-background z-10">
        <div className="max-w-screen-sm w-full mx-auto px-8 box-border">
          <div className="flex flex-col gap-16 justify-center">
            <h1 className="text-center">Moneturn Book Club</h1>
            <div className="mb-4">
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
      </div>
      <aside className="fixed bottom-0 right-0">
        <div>
          <form
            onSubmit={handleFloatingActionButtonClick}
          >
            {!isFabActive && (
              <ActionButton
                type="submit"
                name="dialog"
                value="home-fab"
              >
                Add New
              </ActionButton>
            )}
            {isFabActive && (
              <>
                <ActionButton
                  type="submit"
                  name="home-fab"
                  value="book"
                >
                  Book
                </ActionButton>
                {' '}
                <ActionButton
                  type="submit"
                  name="home-fab"
                  value="author"
                >
                  Author
                </ActionButton>
              </>
            )}
          </form>
        </div>
      </aside>
      <div className="max-w-screen-sm w-full mx-auto px-8 box-border pb-16">
        {isBlankQuery && featured && (
          <section className="flex flex-col gap-4">
            <h2>
              Featured
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-12">
            {featured.map((r) => (
                <li
                  className="block"
                  key={r.id}
                >
                  <Link href={`/books/${r.id}`}>
                    <div className="pb-[150%] w-full relative mb-2">
                      <img src={r.coverUrl ?? "http://placehold.it/1"}
                           alt={r.author?.name ?? 'Anonymous'}
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
          </section>
        )}
        {!isBlankQuery && (
          <div className="flex flex-col gap-12">
            {books && (
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
            )}
            {authors && (
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
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default IndexPage;
