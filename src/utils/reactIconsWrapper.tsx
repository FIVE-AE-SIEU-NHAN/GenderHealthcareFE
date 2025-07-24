import React, { forwardRef } from 'react'
import type { ComponentType, SVGProps } from 'react'
import type { LucideIcon } from 'lucide-react'

export function wrapReactIcon(Icon: ComponentType<SVGProps<SVGSVGElement>>): LucideIcon {
  const WrappedIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(({ className = '', ...rest }, ref) => (
    <Icon ref={ref} className={`h-5 w-5 ${className}`} width={20} height={20} {...rest} />
  ))

  WrappedIcon.displayName = `Wrapped(${Icon.displayName || Icon.name})`
  return WrappedIcon as LucideIcon
}
