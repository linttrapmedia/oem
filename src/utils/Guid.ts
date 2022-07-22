export function guid(str: string = 'xxxxxxxx') {
  function getRandomSymbol(symbol: string) {
    let array;
    if (symbol === 'y') {
      array = ['8', '9', 'a', 'b'];
      return array[Math.floor(Math.random() * array.length)];
    }
    array = new Uint8Array(1);
    window.crypto.getRandomValues(array);
    return (array[0] % 16).toString(16);
  }
  return str.replace(/[xy]/g, getRandomSymbol);
}
