const loadedScripts = new Set()

export async function LoadStyleSheet(src: string) {
  if (loadedScripts.has(src)) return Promise.resolve(true)
  loadedScripts.add(src)
  return new Promise(function (resolve, reject) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = src
    link.type = 'text/css'
    link.onload = () =>
      !(<any>this).readyState || (<any>this).readyState == 'complete' ? resolve(true) : null
    link.onerror = (err) => reject(err)
    document.getElementsByTagName('head')[0].appendChild(link)
  })
}
