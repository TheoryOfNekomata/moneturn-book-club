import { Icon } from '@/components/molecules/Icon';
import { TextInput } from '@/components/molecules/TextInput';
import { MultilineTextInput } from '@/components/molecules/MultilineTextInput';
import { ActionButton } from '@/components/molecules/ActionButton';
import * as React from 'react';
import { Author, Book } from '@/models';
import { ComboBox } from '@/components/molecules/ComboBox';

export interface EditBookDialogProps {
  onEditBookAction?: React.FormEventHandler<HTMLElementTagNameMap['form']>;
  onAuthorInput?: React.FormEventHandler<HTMLElementTagNameMap['input']>;
  currentBookId?: Book['id'];
  defaultValues?: Partial<Book>;
  authors?: Author[];
}

export const EditBookDialog: React.FC<EditBookDialogProps> = ({
  onEditBookAction,
  onAuthorInput,
  currentBookId,
  defaultValues,
  authors,
}) => {
  return (
    <div className="max-w-screen-sm w-full mx-auto px-8 box-border">
      <div className="text-foreground bg-background my-16 rounded overflow-hidden border">
        <form
          onSubmit={onEditBookAction}
        >
          <header className="px-8 h-16 flex justify-between items-center">
            <h2>
              {currentBookId ? 'Edit Book' : 'Add Book'}
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
            {currentBookId && <input type="hidden" name="id" value={currentBookId}/>}
            <div>
              <TextInput type="text" name="title" label="Title" defaultValue={defaultValues?.title} />
            </div>
            <div>
              <ComboBox type="text" name="author" label="Author" onInput={onAuthorInput}>
                {authors?.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </ComboBox>
            </div>
            <div>
              <MultilineTextInput
                name="description"
                label="Description"
                rows={8}
              />
            </div>
          </div>
          <footer className="px-8 h-24 flex justify-end items-center">
            <ActionButton type="submit" variant="primary" name="action" value="save">
              Save Book
            </ActionButton>
          </footer>
        </form>
      </div>
    </div>
  );
};
