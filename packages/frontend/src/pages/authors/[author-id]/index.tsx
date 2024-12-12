import { Dialog } from '@/components/molecules/Dialog';
import * as React from 'react';
import { useEditor } from '@/hooks/editor';
import { useDialog } from '@/hooks/dialog';
import { ActionButton } from '@/components/molecules/ActionButton';
import { Icon } from '@/components/molecules/Icon';
import { useBackNavigation } from '@/hooks/navigation';
import { useRouter } from 'next/router';
import { useData } from '@/hooks/data';
import { EditAuthorDialog } from '@/components/organisms/EditAuthorDialog';
import { DeleteAuthorDialog } from '@/components/organisms/DeleteAuthorDialog';
import { BookQuerySection } from '@/components/organisms/BookQuerySection';
import { Author, Book } from '@/models';

const AuthorDetailsPage = () => {
  const router = useRouter();
  const { handleBack } = useBackNavigation();
  const { handleDialogSelect, currentOpenDialogId } = useDialog();
  const { currentItemId: currentAuthorId, handleAction: handleEditAuthorAction } = useEditor({
    itemIdQueryKey: 'author-id',
    saveFn: async (e) => {
      const formData = new FormData(e.currentTarget);
      const id = formData.get('id');
      const data = Object.fromEntries(formData.entries());
      const response = await fetch(`/api/authors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          id,
          name: data.name,
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
      const response = await fetch(`/api/authors/${id}`, {
        method: 'DELETE',
      });
    },
  });
  const { data: authorData } = useData<Author>({
    basePath: '/api/authors',
    id: currentAuthorId,
  });

  const { data: authorBooks } = useData<Book[]>({
    basePath: '/api/authors',
    attribute: 'books',
    id: currentAuthorId,
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
        <header className="my-12">
          <div className="max-w-screen-sm w-full mx-auto px-8 box-border">
            <div className="flex flex-col gap-8 justify-center items-center">
              <img src="http://placehold.it/1" alt=""
                   className="h-24 w-24 rounded-full overflow-hidden object-center object-cover"/>
              <h1>
                {authorData?.name}
              </h1>
            </div>
          </div>
        </header>
        <div className="my-12">
          <div className="max-w-screen-sm w-full mx-auto px-8 box-border pb-16">
            {new Array(100).fill('Author biography. ').map((s) => s)}
          </div>
        </div>
        {authorBooks && (
          <div className="max-w-screen-sm w-full mx-auto px-8 box-border pb-16">
            <BookQuerySection books={authorBooks} />
          </div>
        )}
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
                value="edit-author"
                className="h-16 w-16"
                rounded
              >
                <Icon
                  name="edit"
                  label="Edit Author"
                  labelVisible
                />
              </ActionButton>
              {' '}
              <ActionButton
                type="submit"
                name="dialog"
                value="delete-author"
                className="h-16 w-16"
                rounded
              >
                <Icon
                  name="delete"
                  label="Delete Author"
                  labelVisible
                />
              </ActionButton>
              {' '}
            </div>
          </form>
        </div>
      </aside>
      <Dialog
        open={currentOpenDialogId === 'edit-author'}
        key={`edit:${currentAuthorId}`}
      >
        <EditAuthorDialog
          currentAuthorId={currentAuthorId}
          onEditAuthorAction={handleEditAuthorAction}
          defaultValues={authorData as Partial<Author> | undefined}
        />
      </Dialog>
      <Dialog
        open={currentOpenDialogId === 'delete-author'}
        key={`delete:${currentAuthorId}`}
      >
        <DeleteAuthorDialog
          currentAuthorId={currentAuthorId}
          handleDeleteAuthorAction={handleEditAuthorAction}
        />
      </Dialog>
    </>
  );
};

export default AuthorDetailsPage;
