import { color, tags } from '@apps/oem.js.org/context'
import { Button } from '@core/components/Button'
import { Snippet } from '../common/Snippet'

const { div } = tags

const Header = div(['style', 'fontSize', '20px'])
const Description = div(['style', 'fontSize', '16px'])
const Section = div(['flex', 'column', 20], ['style', 'width', '100%'])

const onClick = () => alert('Clicked!')

export const Buttons = div(['flex', 'row', 40])(
  Section(
    Description(
      "Buttons exist as first class UI/UX design citizens and are used in so many different contexts they can be tricky to get right. If you're app is formulaic and form heavy then a single set of button components is a good idea, if however button design is more fluid you may opt to create subsets in context.",
    ),
    Header('Interface'),
    Snippet(`type ButtonProps = {
  color?: string
  disabled?: boolean
  iconLeft?: string | HTMLElement
  iconRight?: string | HTMLElement
  onClick: () => void
  size?: 'XS' | 'SM' | 'MD' | 'LG'
  text: string
  textColor?: string
  variant?: 'OUTLINE' | 'SOLID' | 'GHOST' | 'LINK'
}
`),
    Header('Style Variations'),
    Snippet(`Button({ text: 'Button', variant: 'OUTLINE' }),
Button({ text: 'Button', variant: 'SOLID' }),
Button({ text: 'Button', variant: 'GHOST' }),
Button({ text: 'Button', variant: 'LINK' }),
`),
    div(['flex', 'row', 20], ['style', 'flexWrap', 'wrap'])(
      Button({ onClick, text: 'Button', variant: 'OUTLINE' }),
      Button({ onClick, text: 'Button', variant: 'SOLID' }),
      Button({ onClick, text: 'Button', variant: 'GHOST' }),
      Button({ onClick, text: 'Button', variant: 'LINK' }),
    ),
    Header('Sizing'),
    Snippet(`Button({ text: 'Button', size: 'LG' })
Button({ text: 'Button', size: 'MD' })
Button({ text: 'Button', size: 'SM' })
Button({ text: 'Button', size: 'XS' })
`),
    div(['flex', 'row', 20], ['style', 'flexWrap', 'wrap'])(
      Button({ onClick, text: 'Button', size: 'LG' }),
      Button({ onClick, text: 'Button', size: 'MD' }),
      Button({ onClick, text: 'Button', size: 'SM' }),
      Button({ onClick, text: 'Button', size: 'XS' }),
    ),
    Header('Color'),
    Snippet(`Button({ text: 'Button', color: color('green') }),
Button({ text: 'Button', color: color('red') }),
Button({ text: 'Button', color: color('blue') }),
Button({ text: 'Button', color: color('orange') }),
// Button({ text: 'Button', color: color('ANY COLOR VALUE') }),
`),
    div(['flex', 'row', 20], ['style', 'flexWrap', 'wrap'])(
      Button({ onClick, text: 'Button', color: color('green') }),
      Button({ onClick, text: 'Button', color: color('red') }),
      Button({ onClick, text: 'Button', color: color('blue') }),
      Button({ onClick, text: 'Button', color: color('orange') }),
    ),
    Header('State'),
    Snippet(`Button({ text: 'Button', disabled: true }),
Button({ text: 'Button', disabled: false }),
Button({ text: 'Button', color: color('red'), disabled: true }),
Button({ text: 'Button', color: color('red'), disabled: false }),
`),
    div(['flex', 'row', 20], ['style', 'flexWrap', 'wrap'])(
      Button({ onClick, text: 'Button', disabled: true }),
      Button({ onClick, text: 'Button', disabled: false }),
      Button({ onClick, text: 'Button', color: color('red'), disabled: true }),
      Button({ onClick, text: 'Button', color: color('red'), disabled: false }),
    ),
  ),
)
