import * as React from 'react';
import { AutocompleteTextInput } from '@/components/molecules/AutocompleteTextInput';

export const ComboBoxDerivedElementComponent = 'input' as const;

export type ComboBoxDerivedElement = HTMLElementTagNameMap[typeof ComboBoxDerivedElementComponent];

export type ComboBoxProps = Omit<React.HTMLProps<ComboBoxDerivedElement>, 'list'>;

export const ComboBox = React.forwardRef<ComboBoxDerivedElement, ComboBoxProps>((
  {
    name,
    defaultValue,
    onInput,
    ...etcProps
  },
  forwardedRef
) => {
  const defaultRef = React.useRef<ComboBoxDerivedElement | null>(null);
  const effectiveRef = forwardedRef ?? defaultRef;
  const handleAuthorInput = React.useCallback<React.FormEventHandler<HTMLElementTagNameMap['input']>>(async (e) => {
    if ('inputType' in e.nativeEvent) {
      if (typeof effectiveRef === 'function') {
        // TODO
      } else if (effectiveRef.current !== null) {
        (effectiveRef.current as ComboBoxDerivedElement).value = '';
      }

      onInput?.(e);
      return;
    }

    const list = e.currentTarget.list;
    const selectedOption = list ? Array.from(list.options).find((o) => o.value === e.currentTarget.value) : null;
    if (selectedOption) {
      if (typeof effectiveRef === 'function') {
        // TODO
      } else if (effectiveRef.current !== null) {
        (effectiveRef.current as ComboBoxDerivedElement).value = e.currentTarget.value;
      }
      e.currentTarget.value = selectedOption.text;

      onInput?.(e);
      return;
    }

    onInput?.(e);
  }, [onInput, effectiveRef]);

  return (
    <>
      <input
        ref={effectiveRef}
        type="hidden"
        name={`${name}.option`}
        defaultValue={defaultValue}
      />
      <AutocompleteTextInput
        {...etcProps}
        onInput={handleAuthorInput}
        name={`${name}.raw`}
      />
    </>
  );
});

ComboBox.displayName = 'ComboBox';
