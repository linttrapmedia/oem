import { Template } from '@core/framework/template'
import { Theme } from '@core/framework/theme'
import { Trait } from '@core/framework/trait'
import { Types } from '@core/framework/types'

type TextInputProps = {
  color?: string
  backgroundColor?: string
  value: Types.Atom<string>
  placeholder?: string
  styles?: Types.CssDeclaration[]
}

export const TextInput = ({
  color,
  backgroundColor,
  value,
  placeholder,
  styles,
}: TextInputProps) => {
  const theme = Theme()

  const { input } = Template.Html(
    {
      style: Trait.Style,
      attr: Trait.Attr,
      styles: Trait.Styles,
      'text@input': Trait.OnTextInput,
    },
    ['input'],
  )

  return input(
    ['attr', 'placeholder', placeholder],
    ['attr', 'type', 'text'],
    ['attr', 'value', value.get()],
    ['style', 'backgroundColor', backgroundColor ?? 'transparent'],
    ['style', 'border', 'none'],
    ['style', 'border', `1px solid ${color ?? theme.color('white', 0.1)}`],
    ['style', 'color', color ?? theme.color('white')],
    ['style', 'fontFamily', 'sans-serif'],
    ['style', 'fontSize', '16px'],
    ['style', 'height', '100%'],
    ['style', 'padding', '10px'],
    ['style', 'width', '100%'],
    ['styles', styles],
    ['text@input', value.set],
  )()
}
