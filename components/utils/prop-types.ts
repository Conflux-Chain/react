export const tuple = <T extends string[]>(...args: T) => args
//todo better syntax related to tuple?
export const variantsTuple = <T extends ('solid' | 'line' | 'text')[]>(...args: T) => args

const buttonVariants = variantsTuple('solid', 'line', 'text')

const tabVariants = variantsTuple('solid', 'line')

const inputVariants = tuple('solid', 'line')

const buttonColors = tuple('default', 'primary', 'secondary', 'success', 'warning', 'error')

const tagColors = tuple('default', 'primary', 'secondary', 'success', 'warning', 'error')

const messageColors = tuple('default', 'primary', 'success', 'warning', 'error')

const notificationColors = tuple('default', 'primary', 'success', 'warning', 'error')

const notificationPlacement = tuple('right-start', 'left-start')

const selectVariants = tuple('line', 'text')

const normalSizes = tuple('mini', 'small', 'medium', 'large')

const tagSizes = tuple('small', 'medium', 'large')

const normalTypes = tuple('default', 'primary', 'secondary', 'success', 'warning', 'error')

const inputColors = tuple('default', 'primary', 'success', 'warning', 'error')

const themeTypes = tuple('dark', 'light')

const snippetColors = tuple('default', 'secondary', 'success', 'warning', 'error', 'dark', 'lite')

const cardVariants = tuple('solid', 'line')

const cardColors = tuple('default', 'primary', 'success', 'warning', 'error')

const copyTypes = tuple('default', 'slient', 'prevent')

const triggerTypes = tuple('hover', 'click')

const placement = tuple(
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
)

const dividerAlign = tuple('start', 'center', 'end', 'left', 'right')

const paginationVariants = tuple('line', 'solid')

const skeletonVariants = tuple('text', 'circle', 'rect')

const skeletonAnimations = tuple('pulse', 'wave', 'none')

export type ButtonColors = typeof buttonColors[number]

export type TagColors = typeof tagColors[number]

export type ButtonVariants = typeof buttonVariants[number]

export type TabVariant = typeof tabVariants[number]

export type TagVariants = ButtonVariants

export type MessageColors = typeof messageColors[number]

export type NotificationColors = typeof notificationColors[number]

export type NotificationPlacement = typeof notificationPlacement[number]

export type NormalSizes = typeof normalSizes[number]

export type TagSizes = typeof tagSizes[number]

export type SelectVariants = typeof selectVariants[number]

export type NormalTypes = typeof normalTypes[number]

export type InputColors = typeof inputColors[number]

export type InputVariantTypes = typeof inputVariants[number]

export type ThemeTypes = typeof themeTypes[number]

export type SnippetColors = typeof snippetColors[number]

export type CardColors = typeof cardColors[number]

export type CardVariants = typeof cardVariants[number]

export type CopyTypes = typeof copyTypes[number]

export type TriggerTypes = typeof triggerTypes[number]

export type Placement = typeof placement[number]

export type DividerAlign = typeof dividerAlign[number]

export type PaginationVariants = typeof paginationVariants[number]

export type SkeletonVariants = typeof skeletonVariants[number]

export type SkeletonAnimations = typeof skeletonAnimations[number]

export { normalSizes, inputVariants, inputColors, normalTypes, themeTypes }
