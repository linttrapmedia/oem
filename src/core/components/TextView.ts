import { Types } from '@core/framework/types'

export function TextView(view: () => string, ...atoms: Types.Atom<any>[]) {
  let el = document.createElement('span')
  el.innerText = view()
  atoms.forEach(atom =>
    atom.sub(() => {
      const newEl = document.createElement('span')
      newEl.innerText = view()
      el.parentNode.replaceChild(newEl, el)
      el = newEl
    }),
  )
  return el
}
