'use strict';
(() => {
  var Y = Object.defineProperty;
  var C = Object.getOwnPropertySymbols;
  var q = Object.prototype.hasOwnProperty,
    J = Object.prototype.propertyIsEnumerable;
  var k = (e, t, o) => (t in e ? Y(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (e[t] = o)),
    S = (e, t) => {
      for (var o in t || (t = {})) q.call(t, o) && k(e, o, t[o]);
      if (C) for (var o of C(t)) J.call(t, o) && k(e, o, t[o]);
      return e;
    };
  var A = new Map(),
    $ = new MutationObserver((e) => {
      e.forEach((t) => {
        if (t.addedNodes.length > 0 && t.type === 'childList') {
          for (let o of t.addedNodes)
            if (o instanceof Element)
              for (let [n, [s, r]] of A.entries()) {
                let l = o.querySelectorAll(n);
                for (let i of l) h(i, s, r);
              }
        }
      });
    });
  $.observe(document, { attributes: !0, childList: !0, subtree: !0 });
  function K(e, t = !0, o) {
    return (...n) => {
      t && A.set(e, [n, o]);
      let s = document.querySelectorAll(e);
      for (let r of s) h(r, n, o);
    };
  }
  function Q(e, t) {
    return (...o) => h(e, o, t);
  }
  function X(e, t) {
    return (...o) => {
      let n = 'http://www.w3.org/1999/xhtml',
        s = document.createElementNS(n, e);
      return h(s, o, t);
    };
  }
  function h(e, t = [], o = {}) {
    t.forEach(([s, ...r]) => o[s](e, ...r));
    function n(...s) {
      return s.forEach((r) => e.append(r)), e;
    }
    return n;
  }
  function O(e) {
    return new Proxy(
      {},
      { get: (t, o) => (o === 'el' ? (n) => Q(n, e) : o === '$el' ? (n, s) => K(n, s, e) : X(o, e)) },
    );
  }
  function w(e) {
    let {
      event: t = null,
      eventElement: o = window,
      hideOnFalse: n = !0,
      invokeImmediately: s = !0,
      mediaMinWidth: r = 0,
      mediaMaxWidth: l = 1 / 0,
      state: i = void 0,
    } = e != null ? e : {};
    return (...a) => {
      let [d, b, c, p] = a,
        m = () => {
          if (!(window.innerWidth >= r && window.innerWidth <= l)) return;
          let f = i && typeof c == 'function' ? c(i.get()) : c,
            I = String(f) === 'true' || String(f) === 'false',
            D = typeof p == 'function' ? p(i ? i.get() : void 0) : p != null ? p : !0;
          if ((I && n && String(f) === 'false') || (I && D === !1)) return d.removeAttribute(b);
          D !== !1 && d.setAttribute(b, String(f));
        };
      i && i.sub(m), t && (d != null ? d : o).addEventListener(t, m), window.addEventListener('resize', m), s && m();
    };
  }
  var M = (e) => (t, o, n) => {
    (typeof n == 'function' ? n() : n != null ? n : !0) && t.addEventListener(e, o);
  };
  function H(e) {
    let { state: t } = e != null ? e : {};
    return (...o) => {
      let [n, s, r] = o,
        l = () => {
          n.innerHTML = '';
          let i = t ? s(t.get()) : s();
          (typeof r == 'function' ? r(t ? t.get() : void 0) : r != null ? r : !0) &&
            ((n.innerHTML = ''),
            Array.isArray(i)
              ? i.forEach((d) => {
                  d instanceof HTMLElement ? n.appendChild(d) : n.appendChild(document.createTextNode(String(d)));
                })
              : i instanceof HTMLElement
              ? n.appendChild(i)
              : (n.innerHTML = String(i)));
        };
      t && t.sub(l), l();
    };
  }
  function x(e) {
    let {
      event: t = null,
      eventElement: o = window,
      invokeImmediately: n = !0,
      mediaMinWidth: s = 0,
      mediaMaxWidth: r = 1 / 0,
      state: l = void 0,
    } = e != null ? e : {};
    return (...i) => {
      let [a, d, b, c] = i,
        p = () => {
          if (!(window.innerWidth >= s && window.innerWidth <= r)) return;
          let y = String(typeof b == 'function' ? b(l ? l.get() : void 0) : b);
          (typeof c == 'function' ? c(l ? l.get() : void 0) : c != null ? c : !0) && (a.style[d] = y);
        };
      l && l.sub(p),
        window.addEventListener('resize', p),
        t && (a != null ? a : o).addEventListener(t, p),
        n && !t && p();
    };
  }
  function E(e) {
    let { event: t, eventElement: o, state: n } = e != null ? e : {};
    return (...s) => {
      let [r, l, i] = s,
        a = () => {
          let d = typeof l == 'function' ? l(n ? n.get() : void 0) : l;
          (typeof i == 'function' ? i(n ? n.get() : void 0) : i != null ? i : !0) && (r.textContent = String(d));
        };
      n && n.sub(a), window.addEventListener('resize', a), t && (r != null ? r : o).addEventListener(t, a), a();
    };
  }
  function v(e, t) {
    var c, p;
    let o = e;
    if (t) {
      let m = t.storage.getItem(t.key),
        y = JSON.parse(m),
        f = y != null;
      ((c = t.overwrite) != null ? c : !0) && f && (e = y),
        !((p = t.overwrite) == null || p) &&
          f &&
          (Array.isArray(e) && Array.isArray(y)
            ? (e = [...e, ...y])
            : typeof e == 'object' && typeof y == 'object' && (e = S(S({}, e), y)));
    }
    let n = e,
      s = [],
      r = () => n,
      l = (m) => () => a(m(n)),
      i = () => a(o),
      a = (m) => {
        (n = m), s.forEach((y) => y(n)), t && t.storage.setItem(t.key, JSON.stringify(n));
      };
    return { get: r, reset: i, reduce: l, set: a, sub: (m) => s.push(m), unsub: (m) => s.splice(s.indexOf(m), 1) };
  }
  var g = v(void 0),
    T = v(
      [
        { title: 'Learn React', completed: !0 },
        { title: 'Learn TypeScript', completed: !1 },
        { title: 'Learn Node.js', completed: !1 },
      ],
      { key: 'todoList', storage: sessionStorage },
    ),
    _ = v('');
  var N = () => {
      if (_.get() === '') return;
      let e = T.get();
      e.push({ title: _.get(), completed: !1 }), T.set(e), _.set('');
    },
    P = (e) => {
      let t = T.get(),
        o = t.findIndex((n) => n.title === e.title);
      t.splice(o, 1), T.set(t);
    },
    W = (e) => {
      _.set(e);
    },
    U = (e) => {
      let t = T.get(),
        o = t.findIndex((n) => n.title === e.title);
      (t[o].completed = !t[o].completed), T.set(t);
    };
  var ee = 'READY';
  function L(...e) {
    let [t, o] = e;
    switch (ee) {
      case 'READY':
        switch (t) {
          case 'TODO:INPUT':
            W(o);
            break;
          case 'TODO:ADD':
            N();
            break;
          case 'TODO:DELETE':
            P(o);
            break;
          case 'TODO:TOGGLE':
            U(o);
            break;
        }
        break;
      case 'ERROR':
        break;
    }
  }
  var G = (e, t) => {
      e.addEventListener('click', (o) => {
        o.stopPropagation(), L('TODO:DELETE', t);
      });
    },
    R = (e, t) => {
      e.addEventListener('click', () => {
        L('TODO:TOGGLE', t);
      });
    },
    B = (e) => {
      e.addEventListener('submit', (t) => {
        t.preventDefault(), t.target.reset(), L('TODO:ADD');
      });
    },
    z = (e) => {
      e.addEventListener('input', (t) => {
        let n = t.target.value;
        L('TODO:INPUT', n);
      });
    };
  var u = O({
    'style:mobile': x({ state: T, mediaMinWidth: 0 }),
    'style:mouseout': x({ event: 'mouseout' }),
    'style:mouseover': x({ event: 'mouseover' }),
    'style:tablet': x({ state: T, mediaMinWidth: 768 }),
    'text:mouseout': E({ event: 'mouseout' }),
    'text:mouseover': E({ event: 'mouseover' }),
    'todo__form__input:oninput': z,
    'todo__form:onsubmit': B,
    'todo__item:ondelete': G,
    'todo__item:onmouseout': M('mouseout'),
    'todo__item:onmouseover': M('mouseover'),
    'todo__item:ontoggle': R,
    'todo__item:text': E({ state: g }),
    'todo__list:html': H({ state: T }),
    attr: w(),
    text: E(),
  });
  var F = u.form(
    ['style:mobile', 'backgroundColor', '#f2f2f2'],
    ['style:mobile', 'border', '1px solid lightgray'],
    ['style:mobile', 'borderRadius', '5px'],
    ['style:mobile', 'padding', '20px'],
    ['style:mobile', 'display', 'flex'],
    ['style:mobile', 'gap', '10px'],
    ['style:mobile', 'maxWidth', '400px'],
    ['style:mobile', 'width', '100%'],
    ['style:mobile', 'marginBlockEnd', '0'],
    ['style:mobile', 'boxSizing', 'border-box'],
    ['todo__form:onsubmit'],
  )(
    u.input(
      ['attr', 'placeholder', 'New Todo'],
      ['style:mobile', 'border', '1px solid lightgray'],
      ['style:mobile', 'padding', '10px'],
      ['style:mobile', 'borderRadius', '3px'],
      ['style:mobile', 'flex', '1'],
      ['todo__form__input:oninput'],
    )(),
    u.button(
      ['attr', 'type', 'submit'],
      ['style:mobile', 'border', '1px solid lightgray'],
      ['style:mobile', 'borderRadius', '3px'],
      ['style:mobile', 'padding', '10px'],
      ['style:mobile', 'backgroundColor', 'lightgray'],
      ['style:mobile', 'fontWeight', 'bold'],
      ['style:mobile', 'cursor', 'pointer'],
    )('Submit'),
  );
  var te = (e) => {
      let t = () => {
          var i;
          return ((i = g.get()) == null ? void 0 : i.title) === e.title || e.completed;
        },
        o = () => {
          var i;
          return ((i = g.get()) == null ? void 0 : i.title) !== e.title && !e.completed;
        },
        n = () => g.set(e),
        s = () => g.set(void 0),
        r = () => e.completed,
        l = () => !e.completed;
      return u.html.div(
        ['style:mobile', 'cursor', 'pointer'],
        ['style:mobile', 'display', 'flex'],
        ['style:mobile', 'alignItems', 'center'],
        ['style:mobile', 'gap', '10px'],
        ['style:mobile', 'justifyContent', 'space-between'],
        ['todo__item:ontoggle', e],
        ['todo__item:onmouseover', n],
        ['todo__item:onmouseout', s],
      )(
        u.html.div(
          ['style:mobile', 'display', 'flex'],
          ['style:mobile', 'alignItems', 'center'],
          ['style:mobile', 'gap', '10px'],
          ['style:mobile', 'flexDirection', 'row'],
          ['style:mobile', 'justifyContent', 'space-between'],
          ['style:mobile', 'flex', '1'],
        )(
          u.html.div(
            ['style:mobile', 'display', 'flex'],
            ['style:mobile', 'alignItems', 'center'],
            ['style:mobile', 'gap', '10px'],
          )(
            u.html.div(
              ['style:mobile', 'width', '15px'],
              ['style:mobile', 'height', '15px'],
              ['style:mobile', 'backgroundColor', 'black'],
              ['style:mobile', 'color', 'white', r],
              ['style:mobile', 'color', 'gray', l],
              ['style:mobile', 'padding', '5px'],
              ['todo__item:text', '\u2714', t],
              ['todo__item:text', '', o],
            )(),
            u.span(
              ['style:mobile', 'color', 'green', r],
              ['style:mobile', 'color', 'gray', l],
              ['style:mobile', 'textDecoration', 'line-through', r],
              ['style:mobile', 'textDecoration', 'none', l],
            )(e.title),
          ),
          u.button(
            ['style:mobile', 'backgroundColor', 'black'],
            ['style:mobile', 'border', 'none'],
            ['style:mobile', 'color', 'white'],
            ['style:mobile', 'cursor', 'pointer'],
            ['style:mobile', 'fontSize', '14px'],
            ['style:mobile', 'marginBlockEnd', 'end'],
            ['style:mobile', 'padding', '5px 10px'],
            ['style:mouseout', 'backgroundColor', 'black'],
            ['style:mouseover', 'backgroundColor', '#999999'],
            ['todo__item:ondelete', e],
          )('delete'),
        ),
      );
    },
    V = u.html.div(
      ['style:mobile', 'border', '1px solid lightgray'],
      ['style:mobile', 'borderRadius', '5px'],
      ['style:mobile', 'boxSizing', 'border-box'],
      ['style:mobile', 'padding', '20px'],
      ['style:mobile', 'maxWidth', '400px'],
      ['style:mobile', 'width', '100%'],
      ['style:mobile', 'display', 'flex'],
      ['style:mobile', 'flexDirection', 'column'],
      ['style:mobile', 'gap', '10px'],
      [
        'todo__list:html',
        (e) =>
          e
            .sort((t, o) => t.title.localeCompare(o.title))
            .sort((t, o) => Number(t.completed) - Number(o.completed))
            .map(te),
      ],
    )();
  var j = u.html.div(
    ['style:mobile', 'alignItems', 'center'],
    ['style:mobile', 'display', 'flex'],
    ['style:mobile', 'flexDirection', 'column'],
    ['style:mobile', 'fontSize', '16px'],
    ['style:mobile', 'height', '100vh'],
    ['style:mobile', 'justifyContent', 'flex-start'],
    ['style:mobile', 'fontFamily', 'Arial, sans-serif'],
    ['style:mobile', 'color', 'gray'],
    ['style:mobile', 'gap', '20px'],
    ['style:mobile', 'boxSizing', 'border-box'],
    ['style:mobile', 'padding', '20px'],
  )(F, V);
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('root').appendChild(j);
  });
})();
//# sourceMappingURL=index.js.map
