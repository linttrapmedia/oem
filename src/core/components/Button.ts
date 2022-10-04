import { Template } from '@core/framework/Template';
import { Theme } from '@core/framework/Theme';
import { Trait } from '@core/framework/Trait';

type ButtonProps = {
  color?: string;
  disabled?: boolean;
  iconLeft?: string | HTMLElement;
  iconRight?: string | HTMLElement;
  onClick: () => void;
  size?: 'XS' | 'SM' | 'MD' | 'LG';
  text: string;
  textColor?: string;
  variant?: 'OUTLINE' | 'SOLID' | 'GHOST' | 'LINK';
};

export const Button = ({
  color = Theme().color('blue'),
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  size = 'MD',
  text = 'Button',
  textColor = Theme().color('white'),
  variant = 'OUTLINE',
}: ButtonProps) => {
  const { button, span } = Template.Html({
    on_click: Trait.OnClick,
    style_on_hover: Trait.StyleOnHover,
    style: Trait.Style,
    styles: Trait.Styles,
  });

  const opacify = (hsla: string, opacity: string) => {
    const hslaArray = hsla.split(',');
    hslaArray.splice(3, 1, opacity);
    return hslaArray.join(',');
  };

  const fontSize: Record<ButtonProps['size'], `${number}px`> = {
    XS: '12px',
    SM: '14px',
    MD: '16px',
    LG: '20px',
  };

  const padding: Record<ButtonProps['size'], CSSStyleDeclaration['padding']> = {
    XS: '8px 15px',
    SM: '10px 20px ',
    MD: '14px 20px',
    LG: '16px 24px',
  };

  const gap: Record<ButtonProps['size'], `${number}px`> = {
    XS: '10px',
    SM: '12px',
    MD: '12px',
    LG: '16px',
  };

  const variantStyle: Record<
    ButtonProps['variant'],
    {
      backgroundColor: string;
      backgroundColorOnHover?: string;
      borderColor: string;
      borderColorOnHover?: string;
      textColor: string;
      textColorOnHover?: string;
    }
  > = {
    OUTLINE: {
      backgroundColor: 'transparent',
      borderColor: opacify(color, '0.6'),
      borderColorOnHover: opacify(color, '1'),
      textColor: opacify(color, '0.6'),
      textColorOnHover: opacify(color, '1'),
    },
    SOLID: {
      backgroundColor: opacify(color, '0.6'),
      backgroundColorOnHover: opacify(color, '1'),
      borderColor: opacify(color, '0'),
      textColor: opacify(textColor, '1'),
    },
    GHOST: {
      backgroundColor: 'transparent',
      backgroundColorOnHover: opacify(color, '0.25'),
      borderColor: 'transparent',
      textColor: color,
    },
    LINK: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: opacify(color, '0.75'),
      textColorOnHover: color,
    },
  };

  return button(
    ['on_click', onClick, !disabled],
    [
      'style_on_hover',
      'backgroundColor',
      variantStyle[variant].backgroundColorOnHover,
      variantStyle[variant].backgroundColor,
      !disabled,
    ],
    [
      'style_on_hover',
      'borderColor',
      variantStyle[variant].borderColorOnHover,
      variantStyle[variant].borderColor,
      !disabled,
    ],
    ['style_on_hover', 'color', variantStyle[variant].textColorOnHover, variantStyle[variant].textColor, !disabled],
    ['style', 'alignItems', 'center'],
    ['style', 'backgroundColor', variantStyle[variant].backgroundColor],
    ['style', 'borderColor', variantStyle[variant].borderColor],
    ['style', 'borderRadius', '5px'],
    ['style', 'borderStyle', 'solid'],
    ['style', 'borderWidth', '2px'],
    ['style', 'color', variantStyle[variant].textColor],
    ['style', 'cursor', 'pointer'],
    ['style', 'display', 'flex'],
    ['style', 'filter', 'grayscale(100%)', disabled],
    ['style', 'fontFamily', 'Arial'],
    ['style', 'fontSize', fontSize[size]],
    ['style', 'gap', gap[size]],
    ['style', 'justifyContent', 'center'],
    ['style', 'opacity', 0.55, disabled],
    ['style', 'padding', padding[size]],
    ['style', 'textTransform', 'uppercase'],
    ['style', 'transition', 'all 0.5s'],
    ['style', 'wordBreak', 'keep-all'],
  )(
    iconLeft && span(['style', 'marginLeft', `calc(${gap[size]} * -0.25)`])(iconLeft),
    span()(text),
    iconRight && span(['style', 'marginRight', `calc(${gap[size]} * -0.25)`])(iconRight),
  );
};
