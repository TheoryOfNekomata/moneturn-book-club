import * as React from 'react';

export const DialogDerivedElementComponent = 'dialog' as const;

export type DialogDerivedElement = HTMLElementTagNameMap[typeof DialogDerivedElementComponent];

export type DialogProps = React.HTMLProps<DialogDerivedElement>

export const Dialog = React.forwardRef<DialogDerivedElement, DialogProps>(({
  open = false,
  children,
  ...etcProps
}, forwardedRef) => {
  if (!open) {
    return null;
  }

  return (
    <DialogDerivedElementComponent
      {...etcProps}
      ref={forwardedRef}
      open
      className="fixed top-0 left-0 w-full h-full z-20 bg-black/50 overflow-auto"
    >
      {children}
    </DialogDerivedElementComponent>
  );
});

Dialog.displayName = 'Dialog';
