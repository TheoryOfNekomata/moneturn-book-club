import * as React from 'react';
import { NextPage } from 'next';
import { SearchForm } from '@/components/organisms/SearchForm';
import { useFeatured, useOmnisearch } from '@/hooks/home';
import { ActionButton } from '@/components/molecules/ActionButton';
import { Icon } from '@/components/molecules/Icon';
import { FeaturedSection } from '@/components/organisms/FeaturedSection';
import { BookQuerySection } from '@/components/organisms/BookQuerySection';
import { AuthorQuerySection } from '@/components/organisms/AuthorQuerySection';
import { useDialog } from '@/hooks/dialog';
import { EditBookDialog } from '@/components/organisms/EditBookDialog';
import { Dialog } from '@/components/molecules/Dialog';
import { useEditor } from '@/hooks/editor';
import { useRouter } from 'next/router';
import { Author } from '@/models';

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { handleSearchFormSubmit, books, authors, isBlankQuery } = useOmnisearch();
  const { handleDialogSelect, currentOpenDialogId } = useDialog();
  const { currentItemId: currentBookId, handleAction: handleEditBookAction } = useEditor({
    itemIdQueryKey: 'book-id',
    saveFn: async (e) => {
      const formData = new FormData(e.currentTarget);
      const { 'author.option': authorId, 'author.raw': authorName, ...data } = Object.fromEntries(formData.entries());

      let effectiveAuthorId = authorId;
      if (!authorId && authorName) {
        const authorResponse = await fetch('/api/authors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: authorName,
          }),
        });

        if (!authorResponse.ok) {
          return;
        }

        const authorData = await authorResponse.json();
        effectiveAuthorId = authorData.id;
      }

      const bookResponse = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          coverUrl: 'http://placehold.it/1', // TODO
          authorId: effectiveAuthorId,
        }),
      });

      if (bookResponse.ok) {
        router.back();
        setTimeout(() => {
          router.reload();
        });
      }
    },
  });

  const authorSearchDebounce = React.useRef<number | null>(null);

  const [autocompleteAuthors, setAutocompleteAuthors] = React.useState<Author[]>();
  const handleAuthorInput = React.useCallback<React.FormEventHandler<HTMLElementTagNameMap['input']>>(async (e) => {
    const value = e.currentTarget.value.trim();

    if ('inputType' in e.nativeEvent) {
      e.currentTarget.dataset.value = `value:${e.currentTarget.value}`;

      if (typeof authorSearchDebounce.current === 'number') {
        clearTimeout(authorSearchDebounce.current);
      }

      authorSearchDebounce.current = setTimeout(async () => {
        const authorsUrl = new URL('/api/authors', `http://${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`);
        const authorsSearch = new URLSearchParams({
          q: value,
        });
        authorsUrl.search = authorsSearch.toString();
        const bookResponse = await fetch(authorsUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        if (bookResponse.ok) {
          const data = await bookResponse.json();
          setAutocompleteAuthors(data);
        }
      }, 1000);
      return;
    }

    const list = e.currentTarget.list;

    const selectedOption = Array.from(list.options).find((o) => o.value === e.currentTarget.value);
    if (selectedOption) {
      e.currentTarget.dataset.value = `id:${e.currentTarget.value}`;
      e.currentTarget.value = selectedOption.text;
    }
  }, []);

  const { featured } = useFeatured();

  return (
    <>
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
        <div className="max-w-screen-sm w-full mx-auto px-8 box-border pb-16">
          {isBlankQuery && featured && (
            <FeaturedSection
              featured={featured}
            />
          )}
          {!isBlankQuery && (
            <div className="flex flex-col gap-12">
              {books && (
                <BookQuerySection books={books} />
              )}
              {authors && (
                <AuthorQuerySection authors={authors} />
              )}
            </div>
          )}
        </div>
      </main>
      <aside className="fixed bottom-0 right-0">
        <div className="p-8">
          <form
            onSubmit={handleDialogSelect}
          >
            <ActionButton
              type="submit"
              name="dialog"
              value="edit-book"
              className="h-16 w-16"
              rounded
            >
              <Icon
                name="plus"
                label="Add Book"
                labelVisible
              />
            </ActionButton>
          </form>
        </div>
      </aside>
      <Dialog
        open={currentOpenDialogId === 'edit-book'}
        key={currentBookId}
      >
        <EditBookDialog
          currentBookId={currentBookId}
          onEditBookAction={handleEditBookAction}
          onAuthorInput={handleAuthorInput}
          authors={autocompleteAuthors}
        />
      </Dialog>
    </>
  );
};

export default IndexPage;
