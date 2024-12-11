import * as React from 'react';

export type ActionButtonDerivedElement = HTMLElementTagNameMap['button'];

export const ACTION_BUTTON_VARIANT_CLASS_NAMES = {
  'default': 'bg-background',
  'primary': 'bg-foreground text-background',
} as const;

export type ActionButtonVariant = keyof typeof ACTION_BUTTON_VARIANT_CLASS_NAMES;

export const ACTION_BUTTON_SIZE_CLASS_NAMES = {
  'md': 'h-12',
  'sm': 'h-10',
  'xs': 'h-8',
} as const;

export type ActionButtonSize = keyof typeof ACTION_BUTTON_SIZE_CLASS_NAMES;

export interface ActionButtonProps extends Omit<React.HTMLProps<ActionButtonDerivedElement>, 'size'> {
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
}

export const ActionButton = React.forwardRef<ActionButtonDerivedElement, ActionButtonProps>(({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...etcProps
}, forwardedRef) => {
  const effectiveClassName = `h-12 relative rounded overflow-hidden ${ACTION_BUTTON_SIZE_CLASS_NAMES[size]} ${ACTION_BUTTON_VARIANT_CLASS_NAMES[variant]} ${className}`.trim()
  return (
    <button
      {...etcProps}
      className={effectiveClassName}
      ref={forwardedRef}
    >
      <span className="absolute top-0 left-0 rounded-[inherit] w-full h-full border-2" />
      <span className="relative px-4 font-bold">
        {children}
      </span>
    </button>
  );
});

ActionButton.displayName = 'ActionButton';
