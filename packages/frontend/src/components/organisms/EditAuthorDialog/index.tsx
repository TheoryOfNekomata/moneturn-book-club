import { Icon } from '@/components/molecules/Icon';
import { TextInput } from '@/components/molecules/TextInput';
import { MultilineTextInput } from '@/components/molecules/MultilineTextInput';
import { ActionButton } from '@/components/molecules/ActionButton';
import * as React from 'react';
import { Author } from '@/models';

export interface EditAuthorDialogProps {
  onEditAuthorAction?: React.FormEventHandler<HTMLElementTagNameMap['form']>;
  onAuthorInput?: React.FormEventHandler<HTMLElementTagNameMap['input']>;
  currentAuthorId?: Author['id'];
  defaultValues?: Partial<Author>;
  authors?: Author[];
}

export const EditAuthorDialog: React.FC<EditAuthorDialogProps> = ({
  onEditAuthorAction,
  currentAuthorId,
  defaultValues,
}) => {
  return (
    <div className="max-w-screen-sm w-full mx-auto px-8 box-border">
      <div className="text-foreground bg-background my-16 rounded overflow-hidden border">
        <form
          onSubmit={onEditAuthorAction}
        >
          <header className="px-8 h-16 flex justify-between items-center">
            <h2>
              {currentAuthorId ? 'Edit Author' : 'Add Author'}
            </h2>
            <div>
              <button
                type="submit"
                name="action"
                value="cancel"
              >
                <Icon name="x" label="Close"/>
              </button>
            </div>
          </header>
          <div className="flex flex-col gap-4 px-8">
            {currentAuthorId && <input type="hidden" name="id" value={currentAuthorId}/>}
            <div>
              <TextInput type="text" name="name" label="Name" defaultValue={defaultValues?.name} />
            </div>
            <div>
              <MultilineTextInput
                name="biography"
                label="Biography"
                rows={8}
              />
            </div>
          </div>
          <footer className="px-8 h-24 flex justify-end items-center">
            <ActionButton type="submit" variant="primary" name="action" value="save">
              Save Author
            </ActionButton>
          </footer>
        </form>
      </div>
    </div>
  );
};
