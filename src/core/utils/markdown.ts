export function markdown(src: string) {
  const regexlt = /</g
  const regexgt = />/g
  const regexspace = /\t|\r|\uf8ff/g
  const regexescape = /\\([\\\|`*_{}\[\]()#+\-~])/g
  const regexhr = /^([*\-=_] *){3,}$/gm
  const regexblockquote = /\n *&gt; *([^]*?)(?=(\n|$){2})/g
  const regexlist = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g
  const regexlistjoin = /<\/(ol|ul)>\n\n<\1>/g
  const regexhighlight =
    /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g
  const regexcode = /\n((```|~~~).*\n?([^]*?)\n?\2|((    .*?\n)+))/g
  const regexlink = /((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g
  const regextable = /\n(( *\|.*?\| *\n)+)/g
  const regexthead = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/
  const regexrow = /.*\n/g
  const regexcell = /\||(.*?[^\\])\|/g
  const regexheading = /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g
  const regexpara = /(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g
  const regexstash = /-\d+\uf8ff/g

  function replace(rex: RegExp, fn: any) {
    src = src.replace(rex, fn)
  }

  function element(tag: string, content: string) {
    return '<' + tag + '>' + content + '</' + tag + '>'
  }

  function blockquote(src: string): string {
    return src.replace(regexblockquote, function (all, content) {
      return element('blockquote', blockquote(highlight(content.replace(/^ *&gt; */gm, ''))))
    })
  }

  function list(src: string) {
    return src.replace(regexlist, function (all, ind, ol, num, low, content) {
      const entry = element(
        'li',
        highlight(
          content
            .split(RegExp('\n ?' + ind + '(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +', 'g'))
            .map(list)
            .join('</li><li>'),
        ),
      )

      return (
        '\n' +
        (ol
          ? '<ol start="' +
            (num
              ? ol + '">'
              : parseInt(ol, 36) -
                9 +
                '" style="list-style-type:' +
                (low ? 'low' : 'upp') +
                'er-alpha">') +
            entry +
            '</ol>'
          : element('ul', entry))
      )
    })
  }

  function highlight(src: string): string {
    return src.replace(
      regexhighlight,
      function (all, _, p1, emp, sub, sup, small, big, p2, content) {
        return (
          _ +
          element(
            emp
              ? p2
                ? 'strong'
                : 'em'
              : sub
              ? p2
                ? 's'
                : 'sub'
              : sup
              ? 'sup'
              : small
              ? 'small'
              : big
              ? 'big'
              : 'code',
            highlight(content),
          )
        )
      },
    )
  }

  function unesc(str: string): string {
    return str.replace(regexescape, '$1')
  }

  const stash: string[] = []
  let si = 0

  src = '\n' + src + '\n'

  replace(regexlt, '&lt;')
  replace(regexgt, '&gt;')
  replace(regexspace, '  ')

  // blockquote
  src = blockquote(src)

  // horizontal rule
  replace(regexhr, '<hr/>')

  // list
  src = list(src)
  replace(regexlistjoin, '')

  // code
  replace(
    regexcode,
    function (all: RegExpMatchArray, p1: string, p2: string, p3: string, p4: string) {
      stash[--si] = element('pre', element('code', p3 || p4.replace(/^    /gm, '')))
      return si + '\uf8ff'
    },
  )

  // link or image
  replace(
    regexlink,
    function (
      all: RegExpMatchArray,
      p1: string,
      p2: string,
      p3: string,
      p4: string,
      p5: string,
      p6: string,
    ) {
      stash[--si] = p4
        ? p2
          ? '<img src="' + p4 + '" alt="' + p3 + '"/>'
          : '<a href="' + p4 + '">' + unesc(highlight(p3)) + '</a>'
        : p6
      return si + '\uf8ff'
    },
  )

  // table
  replace(regextable, function (all: RegExpMatchArray, table: string) {
    const sep = table.match(regexthead)[1]
    return (
      '\n' +
      element(
        'table',
        table.replace(regexrow, function (row, ri) {
          return row == sep
            ? ''
            : element(
                'tr',
                row.replace(regexcell, function (all, cell, ci) {
                  return ci ? element(sep && !ri ? 'th' : 'td', unesc(highlight(cell || ''))) : ''
                }),
              )
        }),
      )
    )
  })

  // heading
  replace(regexheading, function (all: RegExpMatchArray, _: string, p1: string, p2: string) {
    return _ + element('h' + p1.length, unesc(highlight(p2)))
  })

  // paragraph
  replace(regexpara, function (all: RegExpMatchArray, content: string) {
    return element('p', unesc(highlight(content)))
  })

  // stash
  replace(regexstash, function (all: any) {
    return stash[parseInt(all)]
  })

  return src.trim()
}
