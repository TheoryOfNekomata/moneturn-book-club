import * as React from 'react';

export const TextInputDerivedElementComponent = 'input' as const;

export type TextInputDerivedElement = HTMLElementTagNameMap[typeof TextInputDerivedElementComponent];

export interface TextInputProps extends Omit<React.HTMLProps<TextInputDerivedElement>, 'label'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
}

export const TextInput = React.forwardRef<TextInputDerivedElement, TextInputProps>(({
  label,
  id: idProp,
  className = '',
  hint,
  ...etcProps
}, forwardedRef) => {
  const defaultId = React.useId();
  const effectiveId = idProp ?? defaultId;
  const effectiveClassName = `block w-full min-h-12 h-0 bg-background rounded-[inherit] px-4 relative ${className}`.trim();

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
        <TextInputDerivedElementComponent
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

TextInput.displayName = 'TextInput';
