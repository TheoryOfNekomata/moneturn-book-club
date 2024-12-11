import * as React from 'react';

export type SearchTextInputDerivedElement = HTMLElementTagNameMap['input'];

export interface SearchTextInputProps extends Omit<React.HTMLProps<SearchTextInputDerivedElement>, 'label'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
}

export const SearchTextInput = React.forwardRef<SearchTextInputDerivedElement, SearchTextInputProps>(({
  label,
  id: idProp,
  className = '',
  hint,
  ...etcProps
}, forwardedRef) => {
  const defaultId = React.useId();
  const effectiveId = idProp ?? defaultId;
  const effectiveClassName = `block w-full h-12 bg-background rounded-[inherit] px-4 relative ${className}`.trim();

  return (
    <div>
      <div className="text-left rounded overflow-hidden relative">
        <span
          className="rounded-[inherit] border-2 top-0 left-0 w-full h-full absolute block z-10 pointer-events-none"
        />
        {label && (
          <>
            <label
              htmlFor={effectiveId}
              className="absolute top-0.5 left-1 text-xs leading-none z-10 font-bold pointer-events-none"
            >
              {label}
            </label>
            {' '}
          </>
        )}
        <input
          {...etcProps}
          id={effectiveId}
          ref={forwardedRef}
          className={effectiveClassName}
        />
      </div>
      {hint && (
        <>
          {' '}
          <span className="block text-sm">
            {hint}
          </span>
        </>
      )}
    </div>
  );
});

SearchTextInput.displayName = 'SearchTextInput';
