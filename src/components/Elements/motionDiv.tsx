'use client'
import {
  AnimationControls,
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
  Variants,
} from 'framer-motion'
import React, { ReactNode } from 'react'

type AllowedTagNames = 'a' | 'div' | 'header' | 'section' | 'article'

export type MotionProps = {
  as: AllowedTagNames
  children: ReactNode
  variants?: Variants
  transition: Transition | undefined
  className: string
  animate?: boolean | TargetAndTransition | AnimationControls | VariantLabels
}

export default function MotionElem({ as, children, ...props }: MotionProps) {
  const Comp = motion[as]

  return <Comp {...props}>{children}</Comp>
}
