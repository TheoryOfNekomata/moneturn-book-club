import * as React from 'react';
import { TextInput } from '../../molecules/TextInput';
import { ActionButton } from '@/components/molecules/ActionButton';

export interface SearchFormProps {
  label: React.ReactNode;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  label,
}) => {
  return (
    <fieldset className="contents">
      <legend className="sr-only">
        {label}
      </legend>
      <div className="flex gap-4">
        <div className="flex-auto">
          <TextInput
            label="Query"
            hint="(Enter names of books, authors&hellip;)"
            name="q"
            type="search"
          />
        </div>
        <div>
          <ActionButton variant="primary">Search</ActionButton>
        </div>
      </div>
    </fieldset>
  );
};
