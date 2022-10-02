import { State } from '@core/framework/state'
import { Template } from '@core/framework/template'
import { Trait } from '@core/framework/trait'
import { Types } from '@core/framework/types'
import { debounce } from '@core/utils/debounce'

type ResponsiveViewProps<T> = {
  state: Types.Atom<T>
  transitionView: () => HTMLElement
  transitionDelay: number
  views: [breakpoint: number, state: T, view: () => HTMLElement][]
}

export const ResponsiveView = <T extends string>({
  state,
  transitionView,
  transitionDelay,
  views,
}: ResponsiveViewProps<T>) => {
  const viewState = State.Atom<HTMLElement>(null)
  const width = State.Atom(0)

  const { div } = Template.Html({
    'html@state': Trait.Atom(state, Trait.InnerHtml),
    'html@viewState': Trait.Atom(viewState, Trait.InnerHtml),
    on_resize: Trait.OnWinResize,
    style: Trait.Style,
  })

  const getView = () =>
    views
      .filter(view => view[1] === state.get())
      .filter(view => view[0] <= width.get())
      .pop()[2]()

  const setView = debounce(
    (w: number = el.offsetWidth) => (width.set(w), viewState.set(getView())),
    {
      delay: transitionDelay ?? 500,
      onStart: () => (transitionView ? viewState.set(transitionView()) : null),
    },
  )

  const el: HTMLElement = div(
    ['html@viewState', viewState.get],
    ['html@state', getView],
    ['on_resize', ({ width }: { width: number }) => setView(width)],
    ['style', 'display', 'flex'],
    ['style', 'height', '100vh'],
    ['style', 'width', '100vw'],
  )()

  return el
}
