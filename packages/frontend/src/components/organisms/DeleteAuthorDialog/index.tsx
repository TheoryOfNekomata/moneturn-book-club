import { ActionButton } from '@/components/molecules/ActionButton';
import * as React from 'react';
import { Author } from '@/models';

export interface DeleteAuthorDialogProps {
  handleDeleteAuthorAction?: React.FormEventHandler<HTMLElementTagNameMap['form']>;
  currentAuthorId?: Author['id'];
}

export const DeleteAuthorDialog: React.FC<DeleteAuthorDialogProps> = ({
  handleDeleteAuthorAction,
  currentAuthorId,
}) => {
  return (
    <div className="max-w-screen-sm w-full mx-auto px-8 box-border">
      <div className="text-foreground bg-background my-16 rounded overflow-hidden border">
        <form
          onSubmit={handleDeleteAuthorAction}
        >
          <header className="px-8 h-16 flex justify-between items-center">
            <h2>
              Delete Author
            </h2>
          </header>
          <div className="flex flex-col gap-4 px-8">
            {currentAuthorId && <input type="hidden" name="id" value={currentAuthorId}/>}
            <div className="my-12 text-center text-lg flex flex-col gap-4">
              <p>Are you sure you want to delete this author?</p>
              <p>All the author's books will be deleted as well.</p>
            </div>
          </div>
          <footer className="px-8 h-24 flex gap-6 justify-end items-center">
            <ActionButton variant="primary" name="action" value="cancel" className="w-24">
              No
            </ActionButton>
            {' '}
            <ActionButton variant="default" name="action" value="delete" className="w-24">
              Yes
            </ActionButton>
          </footer>
        </form>
      </div>
    </div>
  );
};
