import * as React from 'react';

export const AutocompleteTextInputDerivedElementComponent = 'input' as const;

export type AutocompleteTextInputDerivedElement = HTMLElementTagNameMap[typeof AutocompleteTextInputDerivedElementComponent];

export interface AutocompleteTextInputProps extends Omit<React.HTMLProps<AutocompleteTextInputDerivedElement>, 'label' | 'list'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
}

export const AutocompleteTextInput = React.forwardRef<AutocompleteTextInputDerivedElement, AutocompleteTextInputProps>(({
  label,
  id: idProp,
  className = '',
  hint,
  children,
  ...etcProps
}, forwardedRef) => {
  const datalistId = React.useId();
  const defaultId = React.useId();
  const effectiveId = idProp ?? defaultId;
  const effectiveClassName = `block w-full min-h-12 h-0 bg-background rounded-[inherit] px-4 relative ${className}`.trim();

  return (
    <>
      <datalist
        id={datalistId}
      >
        {children}
      </datalist>
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
          <AutocompleteTextInputDerivedElementComponent
            {...etcProps}
            id={effectiveId}
            ref={forwardedRef}
            className={effectiveClassName}
            list={datalistId}
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
    </>
  );
});

AutocompleteTextInput.displayName = 'AutocompleteTextInput';
