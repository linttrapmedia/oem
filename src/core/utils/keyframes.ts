export const KeyFrames = <T>(
  declarations: Record<keyof T, Types.KeyframeStyleDeclaration>,
): ((...list: (keyof T)[]) => string) => {
  const id = globalThis.crypto.randomUUID()
  const style = document.createElement('style')
  document.getElementsByTagName('head')[0].appendChild(style)

  const render = () => {
    style.innerHTML = ''
    const styles: string[] = []
    const declarationList = Object.entries(declarations).sort((a, b) => (a[0] < b[0] ? -1 : 1))
    declarationList.forEach(([selector, declaration]: [string, Types.KeyframeStyleDeclaration]) => {
      styles.push(`@keyframes ${selector}_${id} {\n`)
      declaration.forEach(([percent, prop, val]) =>
        styles.push(
          `${percent}% { ${(<string>prop).replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val}; }\n`,
        ),
      )
      styles.push(`}\n`)
    })
    style.innerHTML = styles.join('')
  }

  render()

  const getter = (...list: (keyof T)[]) => list.map((item) => `${String(item)}_${id}`).join(', ')

  return getter
}
