import { ActionButton } from '@/components/molecules/ActionButton';
import * as React from 'react';
import { Book } from '@/models';

export interface DeleteBookDialogProps {
  handleDeleteBookAction?: React.FormEventHandler<HTMLElementTagNameMap['form']>;
  currentBookId?: Book['id'];
}

export const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({
  handleDeleteBookAction,
  currentBookId,
}) => {
  return (
    <div className="max-w-screen-sm w-full mx-auto px-8 box-border">
      <div className="text-foreground bg-background my-16 rounded overflow-hidden border">
        <form
          onSubmit={handleDeleteBookAction}
        >
          <header className="px-8 h-16 flex justify-between items-center">
            <h2>
              Delete Book
            </h2>
          </header>
          <div className="flex flex-col gap-4 px-8">
            {currentBookId && <input type="hidden" name="id" value={currentBookId}/>}
            <div className="my-12 text-center text-lg">
              Are you sure you want to delete this book?
            </div>
          </div>
          <footer className="px-8 h-24 flex gap-6 justify-end items-center">
            <ActionButton type="submit" variant="primary" name="action" value="cancel" className="w-24">
              No
            </ActionButton>
            {' '}
            <ActionButton type="submit" variant="default" name="action" value="delete" className="w-24">
              Yes
            </ActionButton>
          </footer>
        </form>
      </div>
    </div>
  );
};
