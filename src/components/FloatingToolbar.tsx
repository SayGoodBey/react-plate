import React, { ReactNode } from 'react';
import { PortalBody } from '@udecode/plate-common';
import { useFloatingToolbar, UseVirtualFloatingOptions } from '@udecode/plate-floating';

export interface FloatingToolbarProps {
  children: ReactNode;

  portalElement?: Element;

  floatingOptions?: UseVirtualFloatingOptions;

  ignoreReadOnly?: boolean;

  hideToolbar?: boolean;
}

export function FloatingToolbar({
  portalElement,
  floatingOptions,
  ignoreReadOnly,
  hideToolbar,
  children,
  ...props
}: FloatingToolbarProps) {
  const { refs, style, open } = useFloatingToolbar({
    floatingOptions,
    ignoreReadOnly,
    hideToolbar,
  });

  if (!open) return null;

  return (
    <PortalBody element={portalElement}>
      <div
        className="absolute z-50 whitespace-nowrap border bg-popover px-1 opacity-100 shadow-md"
        ref={refs.setFloating}
        style={style}
        {...props}
      >
        {children}
      </div>
    </PortalBody>
  );
}
