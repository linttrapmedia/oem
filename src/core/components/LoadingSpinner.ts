import { Template } from '@core/framework/Template';
import { Theme } from '@core/framework/Theme';
import { Trait } from '@core/framework/Trait';
import { KeyFrames } from '@core/utils/keyframes';

type LoadingSpinnerProps = {
  size?: number;
  thickness?: number;
  color?: string;
  speed?: number;
};

export function LoadingSpinner(): HTMLElement;
export function LoadingSpinner(props?: LoadingSpinnerProps): HTMLElement;
export function LoadingSpinner(props?: LoadingSpinnerProps): HTMLElement {
  const _props = { size: 35, thickness: 5, color: Theme().color('white'), speed: 0.35, ...props };
  const containerSize = _props.size + 'px';
  const spinnerSize = _props.size + 'px';
  const spinnerThickness = _props.thickness + 'px';

  const animation = KeyFrames({
    rotate: [
      [0, 'transform', 'rotate(0deg)'],
      [100, 'transform', 'rotate(360deg)'],
    ],
  });

  const { div } = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
  });

  return div(
    ['style', 'animationName', animation('rotate')],
    ['style', 'animationDuration', `${_props.speed}s`],
    ['style', 'animationIterationCount', 'infinite'],
    ['style', 'animationTimingFunction', 'linear'],
    ['style', 'display', 'block'],
    ['style', 'width', containerSize],
    ['style', 'height', containerSize],
  )(
    div(
      ['style', 'border', `${spinnerThickness} solid ${_props.color}`],
      ['style', 'borderRadius', '50%'],
      ['style', 'borderTop', `${spinnerThickness} solid ${Theme().color('transparent')}`],
      ['style', 'width', spinnerSize],
      ['style', 'height', spinnerSize],
    )(),
  );
}
