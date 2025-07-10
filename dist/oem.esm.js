// src/html/HTML.ts
var selectorMap = new Map;
var matchObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0 && mutation.type === "childList") {
      for (const node of Array.from(mutation.addedNodes)) {
        if (node instanceof Element) {
          for (const [selector, [props, config]] of selectorMap.entries()) {
            const els = Array.from(node.querySelectorAll(selector));
            for (const el of els)
              HtmlTag(el, props, config);
          }
        }
      }
    }
  });
});
matchObserver.observe(document, { attributes: true, childList: true, subtree: true });
function AdoptElBySelector(selector, watch = true, config) {
  return (...props) => {
    if (watch)
      selectorMap.set(selector, [props, config]);
    const els = Array.from(document.querySelectorAll(selector));
    for (const el of els)
      HtmlTag(el, props, config);
  };
}
function AdoptElByInstance(el, config) {
  return (...props) => HtmlTag(el, props, config);
}
function CreateEl(tag, config) {
  return (...props) => {
    const ns = "http://www.w3.org/1999/xhtml";
    const el = document.createElementNS(ns, tag);
    return HtmlTag(el, props, config);
  };
}
function HtmlTag(el, traits = [], config = {}) {
  traits.forEach(([trait, ...args]) => config[trait](el, ...args));
  function fn(...children) {
    children.forEach((child) => el.append(child));
    return el;
  }
  return fn;
}
function HTML(config) {
  return new Proxy({}, {
    get: (_, prop) => {
      if (prop === "el")
        return (el) => AdoptElByInstance(el, config);
      if (prop === "$el")
        return (selector, watch) => AdoptElBySelector(selector, watch, config);
      return CreateEl(prop, config);
    }
  });
}
// src/html/SVG.ts
function SvgTag(el, traits = [], config = {}) {
  traits.forEach(([trait, ...args]) => config[trait](el, ...args));
  function fn(...children) {
    children.forEach((child) => el.append(child));
    return el;
  }
  return fn;
}
function SVG(config) {
  return new Proxy({}, {
    get: (_, prop) => {
      if (prop === "el")
        return (el) => (...props) => SvgTag(el, props, config);
      return (...props) => {
        const ns = "http://www.w3.org/2000/svg";
        const el = document.createElementNS(ns, prop);
        return SvgTag(el, props, config);
      };
    }
  });
}
// src/html/traits/Attribute.ts
function useAttribute(props) {
  const {
    event = null,
    eventElement = window,
    invokeImmediately = true,
    mediaMinWidth = 0,
    mediaMaxWidth = Infinity,
    state = undefined
  } = props ?? {};
  return (...htmlProps) => {
    const [el, prop, val, condition] = htmlProps;
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint)
        return;
      const _val = state && typeof val === "function" ? val(state.get()) : val;
      const _condition = typeof condition === "function" ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        if (_val === undefined) {
          el.removeAttribute(prop);
        } else {
          el.setAttribute(prop, String(_val));
        }
      }
    };
    if (state)
      state.sub(apply);
    if (event)
      (el ?? eventElement).addEventListener(event, apply);
    window.addEventListener("resize", apply);
    if (invokeImmediately)
      apply();
  };
}
// src/html/traits/ClassName.ts
function useClassName(props) {
  const {
    event = null,
    eventElement = window,
    invokeImmediately = true,
    mediaMinWidth = 0,
    mediaMaxWidth = Infinity,
    state = null
  } = props ?? {};
  return (...htmlProps) => {
    const [el, className, condition] = htmlProps;
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint)
        return;
      const _className = typeof className === "function" ? className(state ? state.get() : undefined) : className;
      const _condition = typeof condition === "function" ? condition(state ? state.get() : undefined) : condition ?? true;
      const classList = el.getAttribute("class")?.split(" ") ?? [];
      if (_condition) {
        if (_className === undefined) {
          el.removeAttribute("class");
        } else {
          if (classList.indexOf(_className) === -1)
            classList.push(_className);
          el.setAttribute("class", classList.join(" "));
        }
      }
    };
    if (state)
      state.sub(apply);
    if (event)
      (el ?? eventElement).addEventListener(event, apply);
    window.addEventListener("resize", apply);
    if (invokeImmediately)
      apply();
  };
}
// src/html/traits/Event.ts
function useEvent(props) {
  const { state, event } = props ?? {};
  return (...htmlProps) => {
    const [el, cb, condition] = htmlProps;
    const apply = () => {
      const _cb = (e) => cb(e);
      const _condition = typeof condition === "function" ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        el.addEventListener(event, _cb);
      } else {
        el.removeEventListener(event, _cb);
      }
    };
    if (state)
      state.sub(apply);
    apply();
  };
}
// src/html/traits/InnerHTML.ts
function useInnerHTML(props) {
  const { state } = props ?? {};
  return (...htmlProps) => {
    const [el, children, condition] = htmlProps;
    const apply = () => {
      const _children = state ? children(state.get()) : children();
      const _condition = typeof condition === "function" ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        el.innerHTML = "";
        if (_children !== undefined) {
          if (Array.isArray(_children)) {
            _children.filter((c) => c).forEach((c) => {
              if (c instanceof HTMLElement || c instanceof SVGElement)
                el.appendChild(c);
              else
                el.appendChild(document.createTextNode(String(c)));
            });
          } else if (_children instanceof HTMLElement || _children instanceof SVGElement) {
            el.appendChild(_children);
          } else {
            el.innerHTML = String(_children);
          }
        }
      }
    };
    if (state)
      state.sub(apply);
    apply();
  };
}
// src/html/traits/Style.ts
function useStyle(props) {
  const {
    event = null,
    eventElement = window,
    invokeImmediately = true,
    mediaMinWidth = 0,
    mediaMaxWidth = Infinity,
    state = undefined
  } = props ?? {};
  return (...htmlProps) => {
    const [el, prop, val, condition] = htmlProps;
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint)
        return;
      const _val = typeof val === "function" ? val(state ? state.get() : undefined) : val;
      const _condition = typeof condition === "function" ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        if (_val === undefined) {
          el.style.removeProperty(prop);
        } else {
          prop.startsWith("--") ? el.style.setProperty(prop, _val) : el.style[prop] = _val;
        }
      }
    };
    if (state)
      state.sub(apply);
    window.addEventListener("resize", apply);
    if (event)
      (el ?? eventElement).addEventListener(event, apply);
    if (invokeImmediately && !event)
      apply();
  };
}
// src/html/traits/TextContent.ts
function useTextContent(props) {
  const { event, eventElement, state } = props ?? {};
  return (...htmlProps) => {
    const [el, children, condition] = htmlProps;
    const apply = () => {
      const _children = typeof children === "function" ? children(state ? state.get() : undefined) : children;
      const _condition = typeof condition === "function" ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        el.textContent = String(_children);
      }
    };
    if (state)
      state.sub(apply);
    window.addEventListener("resize", apply);
    if (event)
      (el ?? eventElement).addEventListener(event, apply);
    apply();
  };
}
// src/state/State.ts
function deepSet(obj, pathKeys, value) {
  const path = pathKeys.split(".");
  const update = (obj2, path2, value2) => {
    const [head, ...tail] = path2;
    if (tail.length === 0) {
      return Array.isArray(obj2) ? [...obj2.slice(0, head), value2, ...obj2.slice(head + 1)] : { ...obj2, [head]: value2 };
    }
    if (obj2[head] === undefined) {
      obj2[head] = typeof tail[0] === "number" ? [] : {};
    }
    return {
      ...obj2,
      [head]: update(obj2[head], tail, value2)
    };
  };
  return update(obj, path, value);
}
function State(param, persistence) {
  const originalParam = param;
  if (persistence) {
    const storageParam = persistence.storage.getItem(persistence.key);
    const parsedStorageParam = JSON.parse(storageParam);
    const isStorageParamValid = parsedStorageParam !== null && parsedStorageParam !== undefined;
    if ((persistence.overwrite ?? true) && isStorageParamValid)
      param = parsedStorageParam;
    if (!(persistence.overwrite ?? true) && isStorageParamValid) {
      if (Array.isArray(param) && Array.isArray(parsedStorageParam)) {
        param = [...param, ...parsedStorageParam];
      } else if (typeof param === "object" && typeof parsedStorageParam === "object") {
        param = { ...param, ...parsedStorageParam };
      }
    }
  }
  let _param = param;
  const _subscribers = [];
  const _get = () => _param;
  const _pub = () => _subscribers.forEach((i) => i(_param));
  const _reduce = (cb) => () => _set(cb(_param));
  const _reset = () => _set(originalParam);
  const _set = (param2) => {
    _param = param2;
    _subscribers.forEach((i) => i(_param));
    if (persistence)
      persistence.storage.setItem(persistence.key, JSON.stringify(_param));
  };
  const _deepSet = (path, value) => _set(deepSet(_param, path, value));
  const _sub = (cb) => _subscribers.push(cb);
  const _unsub = (cb) => _subscribers.splice(_subscribers.indexOf(cb), 1);
  return {
    deepSet: _deepSet,
    get: _get,
    pub: _pub,
    reset: _reset,
    reduce: _reduce,
    set: _set,
    sub: _sub,
    unsub: _unsub
  };
}
export {
  useTextContent,
  useStyle,
  useInnerHTML,
  useEvent,
  useClassName,
  useAttribute,
  State,
  SVG,
  HTML
};
