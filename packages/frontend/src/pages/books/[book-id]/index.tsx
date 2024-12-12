import { EditBookDialog } from '@/components/organisms/EditBookDialog';
import { Dialog } from '@/components/molecules/Dialog';
import * as React from 'react';
import { useEditor } from '@/hooks/editor';
import { useDialog } from '@/hooks/dialog';
import { ActionButton } from '@/components/molecules/ActionButton';
import { Icon } from '@/components/molecules/Icon';
import { useBackNavigation } from '@/hooks/navigation';
import { DeleteBookDialog } from '@/components/organisms/DeleteBookDialog';
import { useRouter } from 'next/router';
import { useData } from '@/hooks/data';
import Link from 'next/link';
import { Book } from '@/models';

const BookDetailsPage = () => {
  const router = useRouter();
  const { handleBack } = useBackNavigation();
  const { handleDialogSelect, currentOpenDialogId } = useDialog();
  const { currentItemId: currentBookId, handleAction: handleEditBookAction } = useEditor({
    itemIdQueryKey: 'book-id',
    saveFn: async (e) => {
      const formData = new FormData(e.currentTarget);
      const id = formData.get('id');
      const data = Object.fromEntries(formData.entries());
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: data.title,
          coverUrl: 'http://placehold.it/1', // TODO
        }),
      });
      if (response.ok) {
        router.back();
        setTimeout(() => {
          router.reload();
        });
      }
    },
    deleteFn: async (e) => {
      const formData = new FormData(e.currentTarget);
      const id = formData.get('id');
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
    },
  });
  const { data } = useData<Book>({
    basePath: '/api/books',
    id: currentBookId,
  });

  const goBack: React.FormEventHandler<HTMLElementTagNameMap['form']> = (e) => {
    const { submitter } = e.nativeEvent as unknown as { submitter: HTMLElementTagNameMap['button'] };
    if (submitter.name === 'action' && submitter.value === 'back') {
      handleBack(e);
      return;
    }

    if (submitter.name === 'dialog') {
      handleDialogSelect(e);
    }
  };

  return (
    <>
      <main className="h-full">
        <img src="http://placehold.it/1" alt=""
             className="fixed top-0 right-0 h-full w-2/5 object-cover object-right z-20"/>
        <div className="top-0 w-full h-2/5 flex items-center bg-background z-10">
          <div className="max-w-screen-sm w-full mx-auto px-8 box-border">
            <div className="w-3/5 pr-8">
              <div className="flex flex-col gap-16 justify-center">
                <h1>
                  {data?.title}
                </h1>
                <h2>
                  <Link href={`/authors/${data?.authorId}`}>
                    {data?.author?.name ?? 'Anonymous'}
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-sm w-full mx-auto px-8 box-border pb-16">
          <div className="w-3/5 pr-8">
            {new Array(100).fill('Book description. ').map((s) => s)}
          </div>
        </div>
      </main>
      <aside className="fixed bottom-0 right-0 z-20">
        <div className="p-8">
          <form
            onSubmit={goBack}
          >
            <div className="flex flex-col gap-8">
              <ActionButton
                type="submit"
                className="h-16 w-16"
                name="action"
                value="back"
                rounded
              >
                <Icon
                  name="back"
                  label="Back"
                  labelVisible
                />
              </ActionButton>
              {' '}
              <ActionButton
                type="submit"
                name="dialog"
                value="edit-book"
                className="h-16 w-16"
                rounded
              >
                <Icon
                  name="edit"
                  label="Edit Book"
                  labelVisible
                />
              </ActionButton>
              {' '}
              <ActionButton
                type="submit"
                name="dialog"
                value="delete-book"
                className="h-16 w-16"
                rounded
              >
                <Icon
                  name="delete"
                  label="Delete Book"
                  labelVisible
                />
              </ActionButton>
              {' '}
            </div>
          </form>
        </div>
      </aside>
      <Dialog
        open={currentOpenDialogId === 'edit-book'}
        key={`edit:${currentBookId}`}
      >
        <EditBookDialog
          currentBookId={currentBookId}
          onEditBookAction={handleEditBookAction}
          defaultValues={data as Partial<Book> | undefined}
        />
      </Dialog>
      <Dialog
        open={currentOpenDialogId === 'delete-book'}
        key={`delete:${currentBookId}`}
      >
        <DeleteBookDialog
          currentBookId={currentBookId}
          handleDeleteBookAction={handleEditBookAction}
        />
      </Dialog>
    </>
  );
};

export default BookDetailsPage;
