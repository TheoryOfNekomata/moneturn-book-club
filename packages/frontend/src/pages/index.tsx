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

const IndexPage: NextPage = () => {
  const { handleSearchFormSubmit, books, authors, isBlankQuery } = useOmnisearch();
  const { handleDialogSelect, currentOpenDialogId } = useDialog();
  const { currentItemId: currentBookId, handleAction: handleEditBookAction } = useEditor({
    itemIdQueryKey: 'book-id',
    saveFn: async (e) => {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          coverUrl: '', // TODO
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
    },
  });

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
          handleEditBookAction={handleEditBookAction}
        />
      </Dialog>
    </>
  );
};

export default IndexPage;
