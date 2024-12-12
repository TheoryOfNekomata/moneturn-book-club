import * as React from 'react';

export const ActionButtonDerivedElementComponent = 'button' as const;

export type ActionButtonDerivedElement = HTMLElementTagNameMap[typeof ActionButtonDerivedElementComponent];

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

export const ACTION_BUTTON_TYPES = ['button', 'reset', 'submit'] as const;

export type ActionButtonType = typeof ACTION_BUTTON_TYPES[number];
export interface ActionButtonProps extends Omit<React.HTMLProps<ActionButtonDerivedElement>, 'size' | 'type'> {
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  rounded?: boolean;
  type?: ActionButtonType;
}

export const ActionButton = React.forwardRef<ActionButtonDerivedElement, ActionButtonProps>(({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  type = 'button',
  rounded = false,
  ...etcProps
}, forwardedRef) => {
  const effectiveClassName = `relative ${rounded ? 'rounded-full' : 'rounded'} overflow-hidden ${ACTION_BUTTON_SIZE_CLASS_NAMES[size]} ${ACTION_BUTTON_VARIANT_CLASS_NAMES[variant]} ${className}`.trim()
  return (
    <ActionButtonDerivedElementComponent
      {...etcProps}
      className={effectiveClassName}
      ref={forwardedRef}
      type={type}
    >
      <span className="absolute top-0 left-0 rounded-[inherit] w-full h-full border-2" />
      <span className="relative px-4 font-bold flex items-center justify-center">
        {children}
      </span>
    </ActionButtonDerivedElementComponent>
  );
});

ActionButton.displayName = 'ActionButton';
