import * as React from 'react';

const ICON_CONTENTS = {
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  x: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  book: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </>
  ),
  author: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  back: (
    <>
      <polyline points="9 14 4 9 9 4" />
      <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
    </>
  ),
  edit: (
    <>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </>
  ),
  delete: (
    <>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </>
  ),
} as const;

export type IconName = keyof typeof ICON_CONTENTS;

export const IconDerivedElementComponent = 'svg' as const;

export type IconDerivedElement = SVGElementTagNameMap[typeof IconDerivedElementComponent];

export interface IconProps extends React.SVGProps<IconDerivedElement> {
  name: IconName;
  label?: React.ReactNode;
  labelVisible?: boolean;
}

export const Icon = React.forwardRef<IconDerivedElement, IconProps>(({
  name,
  label,
  labelVisible = false,
  ...etcProps
}, forwardedRef) => {
  const labelId = React.useId();
  return (
    <span className="inline-flex flex-col justify-center items-center">
      <IconDerivedElementComponent
        {...etcProps}
        viewBox="0 0 24 24"
        ref={forwardedRef}
        strokeWidth="2"
        className="stroke-current w-6 h-6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-labelledby={labelId}
      >
        {ICON_CONTENTS[name]}
      </IconDerivedElementComponent>
      {' '}
      <span id={labelId} className={`text-xs leading-none ${labelVisible ? '' : 'sr-only'}`}>
        {label}
      </span>
    </span>
  );
});

Icon.displayName = 'Icon';
