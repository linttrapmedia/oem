const loadedScripts = new Set()

export async function LoadJavascript(src: string) {
  if (loadedScripts.has(src)) return Promise.resolve(true)
  loadedScripts.add(src)
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    script.async = false
    script.onload = () =>
      !(<any>this).readyState || (<any>this).readyState == 'complete' ? resolve(true) : null
    script.onerror = (err) => reject(err)
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
