import * as React from 'react';
import { SearchTextInput } from '@/components/molecules/SearchTextInput';

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
      <div>
        <SearchTextInput
          label="Query"
          hint="(Enter names of books, authors&hellip;)"
          name="q"
        />
      </div>
    </fieldset>
  );
};
