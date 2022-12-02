export async function LoadFont(name: string, url: string) {
  const style = document.createElement('style')
  document.getElementsByTagName('head')[0].appendChild(style)
  style.innerHTML = `@font-face { font-family: '${name}'; src: local('${name}'), url('${url}') format('woff'); }`
}
