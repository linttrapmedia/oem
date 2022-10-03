import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Theme } from '@core/framework/theme';
import { Trait } from '@core/framework/Trait';

type ResizablePanesProps = {
  leftPaneWidth?: number;
  leftPane?: { bg?: string; color?: string };
  rightPane?: { bg?: string; color?: string };
  handle?: {
    bg?: string;
    color?: string;
    icon?: HTMLElement | string;
    width?: number;
    touchWidth?: number;
  };
};

type ResizablePanesReturn = (leftPaneContent: HTMLElement, rightPaneContent: HTMLElement) => HTMLElement;

function ResizablePanes(): ResizablePanesReturn;
function ResizablePanes(props: ResizablePanesProps): ResizablePanesReturn;
function ResizablePanes(props?: ResizablePanesProps): ResizablePanesReturn {
  return function (leftPaneContent: HTMLElement, rightPaneContent: HTMLElement) {
    const { leftPane, rightPane, leftPaneWidth = 50, handle } = props || {};
    const _leftPaneWidth = State.Atom<string>(null);
    const _rightPaneWidth = State.Atom<string>(null);
    const _handleTouchLeft = State.Atom<string>(null);
    const _handleLeft = State.Atom<string>(null);
    const _container = State.Atom<HTMLElement>(null);
    const _handleTouchWidth = handle?.touchWidth ?? 50;
    const _handleWidth = handle?.width ?? 20;

    function drag(el: HTMLElement) {
      /** handle mouse down */
      function onMouseDown(e: MouseEvent) {
        document.onmousemove = onMouseMove;
        document.onmouseup = () => (document.onmousemove = document.onmouseup = null);
      }

      /** handle mouse move */
      function onMouseMove(e: MouseEvent) {
        const currentX = e.clientX;
        const handleTouchWidthCenter = _handleTouchWidth / 2;
        const handleWidthCenter = _handleWidth / 2;
        const offscreenLeft = currentX < handleTouchWidthCenter;
        const offscreenRight = currentX > _container.get().offsetWidth - handleTouchWidthCenter;
        if (offscreenLeft || offscreenRight) return;
        const calcTouchLeft = (currentX - handleTouchWidthCenter) / _container.get().offsetWidth;
        _handleTouchLeft.set(calcTouchLeft * 100 + '%');
        const calcHandleLeft = (currentX - handleWidthCenter) / _container.get().offsetWidth;
        _handleLeft.set(calcHandleLeft * 100 + '%');
        const rightPaneWidth = _container.get().offsetWidth - currentX;
        _rightPaneWidth.set((rightPaneWidth / _container.get().offsetWidth) * 100 + '%');
        const leftPaneWidth = _container.get().offsetWidth - rightPaneWidth;
        _leftPaneWidth.set((leftPaneWidth / _container.get().offsetWidth) * 100 + '%');
      }

      el.onmousedown = onMouseDown;
    }

    const html = Template.Html({
      on_load: Trait.OnLoad,
      style: Trait.Style,
      style_on_handle_touch_left_change: Trait.Atom(_handleTouchLeft, Trait.Style),
      style_on_handle_left_change: Trait.Atom(_handleLeft, Trait.Style),
      style_on_right_pane_width_change: Trait.Atom(_rightPaneWidth, Trait.Style),
      style_on_left_pane_width_change: Trait.Atom(_leftPaneWidth, Trait.Style),
    });

    return html(
      'div',
      ['style', 'display', 'flex'],
      ['style', 'height', '100%'],
      ['style', 'width', '100%'],
      ['style', 'position', 'relative'],
      ['style', 'overflow', 'hidden'],
      ['on_load', _container.set],
    )(
      html(
        'div',
        ['style', 'width', `${leftPaneWidth}%`],
        ['style', 'backgroundColor', leftPane?.bg ?? Theme().color('white', 0, 0.1)],
        ['style', 'overflow', 'auto'],
        ['style', 'position', 'absolute'],
        ['style', 'left', '0px'],
        ['style', 'height', '100%'],
        ['style_on_left_pane_width_change', 'width', _leftPaneWidth.get],
      )(leftPaneContent),
      html(
        'div',
        ['style', 'display', 'flex'],
        ['style', 'width', `${_handleTouchWidth}px`],
        ['style', 'backgroundColor', Theme().color('transparent')],
        ['style', 'cursor', 'ew-resize'],
        ['style', 'justifyContent', 'center'],
        ['style', 'alignItems', 'center'],
        ['style', 'position', 'absolute'],
        ['style', 'left', `calc(${leftPaneWidth}% - ${_handleTouchWidth / 2}px)`],
        ['style', 'height', '100%'],
        ['style', 'zIndex', '1'],
        ['on_load', drag],
        ['style_on_handle_touch_left_change', 'left', _handleTouchLeft.get],
      )(),
      html(
        'div',
        ['style', 'display', 'flex'],
        ['style', 'width', `${_handleWidth}px`],
        ['style', 'backgroundColor', handle?.bg ?? Theme().color('black', 0, 0.3)],
        ['style', 'mixBlendMode', 'overlay'],
        ['style', 'color', handle?.color ?? Theme().color('white')],
        ['style', 'cursor', 'ew-resize'],
        ['style', 'justifyContent', 'center'],
        ['style', 'alignItems', 'center'],
        ['style', 'position', 'absolute'],
        ['style', 'left', `calc(${leftPaneWidth}% - ${_handleWidth / 2}px)`],
        ['style', 'height', '100%'],
        ['style', 'zIndex', '1'],
        ['style', 'pointerEvents', 'none'],
        ['style_on_handle_left_change', 'left', _handleLeft.get],
      )(handle?.icon ?? '||'),
      html(
        'div',
        ['style', 'width', `${100 - leftPaneWidth}%`],
        ['style', 'backgroundColor', rightPane?.bg ?? Theme().color('white', 0, 0.1)],
        ['style', 'overflow', 'auto'],
        ['style', 'position', 'absolute'],
        ['style', 'right', '0px'],
        ['style', 'height', '100%'],
        ['style_on_right_pane_width_change', 'width', _rightPaneWidth.get],
      )(rightPaneContent),
    );
  };
}

export const Panes = {
  ResizablePanes,
};
