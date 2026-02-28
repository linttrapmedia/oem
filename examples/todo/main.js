(() => {
  // examples/todo/constants.ts
  var ANIM_DURATION_FAST = 150;
  var ANIM_DURATION_MEDIUM = 300;
  var ANIM_DURATION_SLOW = 500;
  var FILTERS = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Done" }
  ];
  var FONT_PRIMARY = "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  var PLACEHOLDER_TEXT = "What needs to be done?";
  var EMPTY_MESSAGES = {
    all: "No todos yet. Add one above!",
    active: "No active todos. Nice work!",
    completed: "No completed todos yet."
  };

  // src/core/util.ts
  var extractStates = (...rest) => {
    return rest.filter((i) => i && Object.hasOwn(i, "sub"));
  };
  var extractConditions = (...rest) => {
    return rest.filter((i) => i && i.type === "$test");
  };
  // src/core/state.ts
  function State(param, customMethods) {
    let _internalVal = param;
    const _subs = new Set;
    const _set = (atom) => {
      _internalVal = atom;
      _subs.forEach((i) => i(atom));
    };
    const $set = (atom) => () => _set(atom);
    const _reduce = (cb) => _set(cb(_internalVal));
    const $reduce = (cb) => () => _set(cb(_val()));
    const _sub = (cb) => {
      _subs.add(cb);
      return () => _subs.delete(cb);
    };
    const test = (predicate, truthCheck = true) => {
      if (predicate instanceof RegExp) {
        const result = predicate.test(_internalVal);
        return truthCheck ? result : !result;
      } else if (typeof predicate === "function" && predicate instanceof Function) {
        const result = predicate(_internalVal);
        return truthCheck ? result : !result;
      } else {
        const string_comparison = predicate;
        const result = _internalVal === string_comparison;
        return truthCheck ? result : !result;
      }
    };
    const $test = (predicate, truthCheck = true) => {
      const closure = () => test(predicate, truthCheck);
      closure.sub = _sub;
      closure.type = "$test";
      return closure;
    };
    const _val = () => _internalVal;
    const $val = () => _internalVal;
    $val.sub = _sub;
    $val.type = "$val";
    const methods = {
      $reduce,
      $set,
      $test,
      $val,
      reduce: _reduce,
      set: _set,
      sub: _sub,
      test,
      val: _val,
      _subs
    };
    if (customMethods) {
      for (const key in customMethods) {
        methods[key] = (...args) => customMethods[key](methods, ...args);
        methods[`$${key}`] = (...args) => () => customMethods[key](methods, ...args);
      }
    }
    return methods;
  }
  // src/core/template.ts
  var cleanups = new WeakMap;
  new MutationObserver((mutations) => {
    for (const { type, removedNodes } of mutations) {
      if (type !== "childList")
        continue;
      removedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement || node instanceof SVGElement))
          return;
        cleanups.get(node)?.forEach((fn) => fn());
        cleanups.delete(node);
      });
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
  var SVG_TAGS = new Set("svg,g,rect,circle,ellipse,line,polyline,polygon,path,text,defs,use,mask,clipPath".split(","));
  function Template(config) {
    const tags = new Proxy({}, {
      get: (_, tag) => {
        if (tag === "$") {
          return (el) => (...children) => {
            children.forEach((c) => {
              if (c instanceof HTMLElement || c instanceof SVGElement)
                el.appendChild(c);
              else
                c(el);
            });
            return el;
          };
        }
        return (...children) => {
          const el = SVG_TAGS.has(tag) ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag);
          children.forEach((c) => {
            if (c instanceof HTMLElement || c instanceof SVGElement)
              el.appendChild(c);
            else
              c(el);
          });
          return el;
        };
      }
    });
    const traits = new Proxy({}, {
      get: (_, name) => (...args) => (el) => {
        const unsub = config[name](el, ...args);
        if (unsub) {
          const list = cleanups.get(el) || [];
          list.push(unsub);
          cleanups.set(el, list);
        }
      }
    });
    return [tags, traits];
  }
  // src/states/ThemeState.ts
  var useThemeState = (theme) => {
    const state = State(theme);
    return state;
  };
  // src/states/TokenState.ts
  var useTokenState = (lightVal, darkVal, themeState) => {
    const getVal = () => themeState.val() === "light" ? lightVal : darkVal;
    const state = State(getVal());
    themeState.sub((t) => state.set(getVal()));
    return state;
  };
  // src/traits/Animation.ts
  function useAnimationTrait(el, keyframes, options, ...rest) {
    const states = extractStates(...rest);
    const conditions = extractConditions(...rest);
    let current = null;
    const apply = () => {
      const _keyframes = typeof keyframes === "function" ? keyframes() : keyframes;
      const _options = typeof options === "function" ? options() : options;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies) {
        if (current)
          current.cancel();
        current = el.animate(_keyframes, _options);
      }
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => {
      if (current)
        current.cancel();
      unsubs.forEach((unsub) => unsub());
    };
  }
  // src/traits/Aria.ts
  var useAriaTrait = (el, prop, val, ...rest) => {
    const states = extractStates(val, ...rest);
    const conditions = extractConditions(...rest);
    const apply = () => {
      const _val = typeof val === "function" ? val() : val;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies) {
        if (_val === undefined) {
          el.removeAttribute(prop);
        } else {
          el.setAttribute(prop, String(_val));
        }
      } else {
        el.removeAttribute(prop);
      }
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  };
  // src/traits/Attribute.ts
  var useAttributeTrait = (el, prop, val, ...rest) => {
    const states = extractStates(val, ...rest);
    const conditions = extractConditions(...rest);
    const apply = () => {
      const _val = typeof val === "function" ? val() : val;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies) {
        if (_val === undefined) {
          el.removeAttribute(prop);
        } else {
          el.setAttribute(prop, String(_val));
        }
      } else {
        el.removeAttribute(prop);
      }
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  };
  // src/traits/ClassName.ts
  function useClassNameTrait(el, className, ...rest) {
    const states = extractStates(className, ...rest);
    const conditions = extractConditions(...rest);
    const apply = () => {
      const _className = typeof className === "function" ? className() : className;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies)
        el.setAttribute("class", String(_className));
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  }
  // src/traits/DataAttribute.ts
  var useDataAttributeTrait = (el, name, val, ...rest) => {
    const states = extractStates(val, ...rest);
    const conditions = extractConditions(...rest);
    const attr = name.startsWith("data-") ? name : `data-${name}`;
    const key = attr.replace(/^data-/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const apply = () => {
      const _val = typeof val === "function" ? val() : val;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies) {
        if (_val === undefined) {
          delete el.dataset[key];
        } else {
          el.dataset[key] = String(_val);
        }
      } else {
        delete el.dataset[key];
      }
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  };
  // src/traits/Event.ts
  function useEventTrait(el, evt, cb, ...rest) {
    const states = extractStates(...rest);
    const conditions = extractConditions(...rest);
    let listenerAttached = false;
    const apply = () => {
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies && !listenerAttached) {
        el.addEventListener(evt, cb);
        listenerAttached = true;
      } else {
        el.removeEventListener(evt, cb);
        listenerAttached = false;
      }
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => {
      el.removeEventListener(evt, cb);
      unsubs.forEach((unsub) => unsub());
    };
  }
  // src/traits/Focus.ts
  var useFocusTrait = (el, conditions = [], states = []) => {
    const apply = () => {
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies)
        el.focus();
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  };
  // src/traits/InnerHTML.ts
  function useInnerHTMLTrait(el, children, ...rest) {
    const states = extractStates(children, ...rest);
    const conditions = extractConditions(...rest);
    const apply = () => {
      const _children = typeof children === "function" ? children() : children;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies) {
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
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  }
  // src/traits/InputEvent.ts
  function useInputEventTrait(el, evt, setter, ...rest) {
    const states = extractStates(...rest);
    const conditions = extractConditions(...rest);
    const handler = (e) => setter(e.target.value);
    let listenerAttached = false;
    const apply = () => {
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies && !listenerAttached) {
        el.addEventListener(evt, handler);
        listenerAttached = true;
      } else {
        el.removeEventListener(evt, handler);
        listenerAttached = false;
      }
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => {
      el.removeEventListener(evt, handler);
      unsubs.forEach((unsub) => unsub());
    };
  }
  // src/traits/InputValue.ts
  function useInputValueTrait(el, value, ...rest) {
    const states = extractStates(value, ...rest);
    const conditions = extractConditions(...rest);
    const apply = () => {
      const _val = typeof value === "function" ? value() : value;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies)
        el.value = _val;
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  }
  // src/traits/Style.ts
  function useStyleTrait(el, prop, val, ...rest) {
    const states = extractStates(val, ...rest);
    const conditions = extractConditions(...rest);
    const apply = () => {
      const _val = typeof val === "function" ? val() : val;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies) {
        prop.startsWith("--") ? el.style.setProperty(prop, _val) : el.style[prop] = _val;
      }
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  }
  // src/traits/StyleOnEvent.ts
  function useStyleOnEventTrait(el, evt, prop, val, ...rest) {
    const conditions = extractConditions(...rest);
    const apply = () => {
      const _val = typeof val === "function" ? val() : val;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies) {
        prop.startsWith("--") ? el.style.setProperty(prop, _val) : el.style[prop] = _val;
      }
    };
    el.addEventListener(evt, apply);
    return () => el.removeEventListener(evt, apply);
  }
  // src/traits/TextContent.ts
  function useTextContentTrait(el, text, ...rest) {
    const states = extractStates(text, ...rest);
    const conditions = extractConditions(...rest);
    const apply = () => {
      const _text = typeof text === "function" ? text() : text;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies) {
        el.textContent = "";
        if (_text !== undefined) {
          if (Array.isArray(_text)) {
            _text.filter((t) => t !== undefined).forEach((t) => {
              el.appendChild(document.createTextNode(String(t)));
            });
          } else {
            el.textContent = String(_text);
          }
        }
      }
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  }
  // examples/todo/templates.ts
  var [tag, trait] = Template({
    animate: useAnimationTrait,
    aria: useAriaTrait,
    attr: useAttributeTrait,
    className: useClassNameTrait,
    data: useDataAttributeTrait,
    event: useEventTrait,
    focus: useFocusTrait,
    innerHTML: useInnerHTMLTrait,
    inputEvent: useInputEventTrait,
    inputValue: useInputValueTrait,
    style: useStyleTrait,
    styleOnEvent: useStyleOnEventTrait,
    text: useTextContentTrait
  });

  // examples/todo/theme.ts
  var theme = useThemeState("dark");
  var surface_bg_primary = useTokenState("#f0f2f5", "#0d1117", theme);
  var surface_bg_card = useTokenState("rgba(255, 255, 255, 0.7)", "rgba(22, 27, 34, 0.8)", theme);
  var surface_bg_input = useTokenState("rgba(255, 255, 255, 0.9)", "rgba(30, 37, 46, 0.9)", theme);
  var surface_bg_item = useTokenState("rgba(255, 255, 255, 0.6)", "rgba(22, 27, 34, 0.6)", theme);
  var surface_bg_item_hover = useTokenState("rgba(255, 255, 255, 0.9)", "rgba(30, 37, 46, 0.9)", theme);
  var surface_bg_completed = useTokenState("rgba(0, 0, 0, 0.02)", "rgba(0, 0, 0, 0.15)", theme);
  var accent_primary = useTokenState("#6366f1", "#818cf8", theme);
  var accent_primary_hover = useTokenState("#4f46e5", "#6366f1", theme);
  var accent_success = useTokenState("#22c55e", "#34d399", theme);
  var accent_success_glow = useTokenState("rgba(34, 197, 94, 0.3)", "rgba(52, 211, 153, 0.3)", theme);
  var accent_danger = useTokenState("#ef4444", "#f87171", theme);
  var accent_danger_hover = useTokenState("#dc2626", "#ef4444", theme);
  var accent_gradient_start = useTokenState("#6366f1", "#6366f1", theme);
  var accent_gradient_end = useTokenState("#a855f7", "#a855f7", theme);
  var text_fg_primary = useTokenState("#1e293b", "#e2e8f0", theme);
  var text_fg_secondary = useTokenState("#64748b", "#94a3b8", theme);
  var text_fg_muted = useTokenState("#94a3b8", "#475569", theme);
  var text_fg_on_accent = useTokenState("#ffffff", "#ffffff", theme);
  var text_fg_completed = useTokenState("#94a3b8", "#475569", theme);
  var border_color_primary = useTokenState("rgba(0, 0, 0, 0.08)", "rgba(255, 255, 255, 0.06)", theme);
  var border_color_input = useTokenState("rgba(0, 0, 0, 0.12)", "rgba(255, 255, 255, 0.1)", theme);
  var border_color_focus = useTokenState("rgba(99, 102, 241, 0.5)", "rgba(129, 140, 248, 0.5)", theme);
  var space_padding_xs = useTokenState("4px", "4px", theme);
  var space_padding_sm = useTokenState("8px", "8px", theme);
  var space_padding_md = useTokenState("16px", "16px", theme);
  var space_padding_lg = useTokenState("24px", "24px", theme);
  var space_padding_xl = useTokenState("32px", "32px", theme);
  var space_padding_2xl = useTokenState("48px", "48px", theme);
  var space_gap_sm = useTokenState("8px", "8px", theme);
  var space_gap_md = useTokenState("12px", "12px", theme);
  var space_gap_lg = useTokenState("16px", "16px", theme);
  var radius_sm = useTokenState("6px", "6px", theme);
  var radius_md = useTokenState("12px", "12px", theme);
  var radius_lg = useTokenState("20px", "20px", theme);
  var radius_full = useTokenState("9999px", "9999px", theme);
  var shadow_card = useTokenState("0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)", "0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)", theme);
  var shadow_item_hover = useTokenState("0 4px 12px rgba(0, 0, 0, 0.06)", "0 4px 12px rgba(0, 0, 0, 0.2)", theme);
  var shadow_accent_glow = useTokenState("0 0 20px rgba(99, 102, 241, 0.15)", "0 0 20px rgba(129, 140, 248, 0.15)", theme);
  var shadow_button = useTokenState("0 2px 8px rgba(99, 102, 241, 0.25)", "0 2px 8px rgba(129, 140, 248, 0.25)", theme);
  var type_size_heading = useTokenState("28px", "28px", theme);
  var type_size_body = useTokenState("15px", "15px", theme);
  var type_size_small = useTokenState("13px", "13px", theme);
  var type_size_tiny = useTokenState("11px", "11px", theme);
  var type_weight_normal = useTokenState("400", "400", theme);
  var type_weight_medium = useTokenState("500", "500", theme);
  var type_weight_semibold = useTokenState("600", "600", theme);
  var type_weight_bold = useTokenState("700", "700", theme);
  var transition_fast = useTokenState("all 0.15s ease", "all 0.15s ease", theme);
  var transition_medium = useTokenState("all 0.3s ease", "all 0.3s ease", theme);
  var transition_theme = useTokenState("background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease", "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease", theme);
  var backdrop_blur = useTokenState("blur(20px)", "blur(20px)", theme);

  // examples/todo/actions.ts
  var addTodo = (text) => ({
    type: "ADD_TODO",
    payload: { text }
  });
  var toggleTodo = (id) => ({
    type: "TOGGLE_TODO",
    payload: { id }
  });
  var deleteTodo = (id) => ({
    type: "DELETE_TODO",
    payload: { id }
  });
  var setFilter = (filter) => ({
    type: "SET_FILTER",
    payload: { filter }
  });
  var clearCompleted = () => ({
    type: "CLEAR_COMPLETED"
  });
  var setInput = (text) => ({
    type: "SET_INPUT",
    payload: { text }
  });
  var startEdit = (id) => ({
    type: "START_EDIT",
    payload: { id }
  });
  var saveEdit = (id, text) => ({
    type: "SAVE_EDIT",
    payload: { id, text }
  });
  var cancelEdit = () => ({
    type: "CANCEL_EDIT"
  });
  var toggleTheme = () => ({
    type: "TOGGLE_THEME"
  });

  // examples/todo/icons.ts
  var [svg, s] = Template({
    attr: useAttributeTrait,
    style: useStyleTrait
  });
  function PlusIcon({ size = "20", color = "currentColor" } = {}) {
    return svg.svg(s.attr("viewBox", "0 0 24 24"), s.attr("fill", "none"), s.attr("stroke", color), s.attr("stroke-width", "2.5"), s.attr("stroke-linecap", "round"), s.style("width", size + "px"), s.style("height", size + "px"), svg.path(s.attr("d", "M12 5v14M5 12h14")));
  }
  function CheckIcon({ size = "16", color = "currentColor" } = {}) {
    return svg.svg(s.attr("viewBox", "0 0 24 24"), s.attr("fill", "none"), s.attr("stroke", color), s.attr("stroke-width", "3"), s.attr("stroke-linecap", "round"), s.attr("stroke-linejoin", "round"), s.style("width", size + "px"), s.style("height", size + "px"), svg.path(s.attr("d", "M20 6L9 17l-5-5")));
  }
  function TrashIcon({ size = "16", color = "currentColor" } = {}) {
    return svg.svg(s.attr("viewBox", "0 0 24 24"), s.attr("fill", "none"), s.attr("stroke", color), s.attr("stroke-width", "2"), s.attr("stroke-linecap", "round"), s.attr("stroke-linejoin", "round"), s.style("width", size + "px"), s.style("height", size + "px"), svg.path(s.attr("d", "M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2")), svg.path(s.attr("d", "M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6")), svg.path(s.attr("d", "M10 11v6M14 11v6")));
  }
  function EditIcon({ size = "14", color = "currentColor" } = {}) {
    return svg.svg(s.attr("viewBox", "0 0 24 24"), s.attr("fill", "none"), s.attr("stroke", color), s.attr("stroke-width", "2"), s.attr("stroke-linecap", "round"), s.attr("stroke-linejoin", "round"), s.style("width", size + "px"), s.style("height", size + "px"), svg.path(s.attr("d", "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7")), svg.path(s.attr("d", "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z")));
  }
  function SunIcon({ size = "18", color = "currentColor" } = {}) {
    return svg.svg(s.attr("viewBox", "0 0 24 24"), s.attr("fill", "none"), s.attr("stroke", color), s.attr("stroke-width", "2"), s.attr("stroke-linecap", "round"), s.style("width", size + "px"), s.style("height", size + "px"), svg.circle(s.attr("cx", "12"), s.attr("cy", "12"), s.attr("r", "5")), svg.path(s.attr("d", "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42")));
  }
  function MoonIcon({ size = "18", color = "currentColor" } = {}) {
    return svg.svg(s.attr("viewBox", "0 0 24 24"), s.attr("fill", "none"), s.attr("stroke", color), s.attr("stroke-width", "2"), s.attr("stroke-linecap", "round"), s.attr("stroke-linejoin", "round"), s.style("width", size + "px"), s.style("height", size + "px"), svg.path(s.attr("d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z")));
  }
  function SparkleIcon({ size = "48", color = "currentColor" } = {}) {
    return svg.svg(s.attr("viewBox", "0 0 24 24"), s.attr("fill", "none"), s.attr("stroke", color), s.attr("stroke-width", "1.5"), s.attr("stroke-linecap", "round"), s.attr("stroke-linejoin", "round"), s.style("width", size + "px"), s.style("height", size + "px"), svg.path(s.attr("d", "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z")));
  }

  // examples/todo/states.ts
  var todos = State([]);
  var filter = State("all");
  var inputText = State("");
  var editingId = State(null);
  var editText = State("");
  var addCounter = State(0);
  var deletingId = State(null);

  // examples/todo/machines.ts
  function dispatch(action) {
    switch (action.type) {
      case "ADD_TODO": {
        const text = action.payload.text.trim();
        if (!text)
          return;
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        todos.reduce((prev) => [{ id, text, completed: false, createdAt: Date.now() }, ...prev]);
        inputText.set("");
        addCounter.reduce((n) => n + 1);
        break;
      }
      case "TOGGLE_TODO": {
        todos.reduce((prev) => prev.map((t) => t.id === action.payload.id ? { ...t, completed: !t.completed } : t));
        break;
      }
      case "DELETE_TODO": {
        deletingId.set(action.payload.id);
        setTimeout(() => {
          todos.reduce((prev) => prev.filter((t) => t.id !== action.payload.id));
          deletingId.set(null);
        }, 300);
        break;
      }
      case "SET_FILTER": {
        filter.set(action.payload.filter);
        break;
      }
      case "CLEAR_COMPLETED": {
        todos.reduce((prev) => prev.filter((t) => !t.completed));
        break;
      }
      case "SET_INPUT": {
        inputText.set(action.payload.text);
        break;
      }
      case "START_EDIT": {
        const todo = todos.val().find((t) => t.id === action.payload.id);
        if (todo) {
          editingId.set(action.payload.id);
          editText.set(todo.text);
        }
        break;
      }
      case "SAVE_EDIT": {
        const newText = action.payload.text.trim();
        if (newText) {
          todos.reduce((prev) => prev.map((t) => t.id === action.payload.id ? { ...t, text: newText } : t));
        }
        editingId.set(null);
        editText.set("");
        break;
      }
      case "CANCEL_EDIT": {
        editingId.set(null);
        editText.set("");
        break;
      }
      case "TOGGLE_THEME": {
        theme.reduce((t) => t === "dark" ? "light" : "dark");
        break;
      }
    }
  }
  var $dispatch = (action) => () => dispatch(action);

  // examples/todo/ui.ts
  function header() {
    return tag.header(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "space-between"), trait.style("padding", `${space_padding_lg.val()} ${space_padding_xl.val()}`), trait.style("marginBottom", space_padding_lg.$val), trait.animate([
      { opacity: "0", transform: "translateY(-20px)" },
      { opacity: "1", transform: "translateY(0)" }
    ], { duration: ANIM_DURATION_SLOW, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", "12px"), tag.h1(trait.text("todos"), trait.style("margin", "0"), trait.style("fontSize", type_size_heading.$val), trait.style("fontWeight", type_weight_bold.$val), trait.style("letterSpacing", "-0.02em"), trait.style("background", () => `linear-gradient(135deg, ${accent_gradient_start.val()}, ${accent_gradient_end.val()})`, accent_gradient_start, accent_gradient_end), trait.style("webkitBackgroundClip", "text"), trait.style("webkitTextFillColor", "transparent"), trait.style("backgroundClip", "text"), trait.animate([
      { filter: "brightness(1)" },
      { filter: "brightness(1.2)" },
      { filter: "brightness(1)" }
    ], { duration: 3000, iterations: Infinity, easing: "ease-in-out" }))), tag.button(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "center"), trait.style("width", "40px"), trait.style("height", "40px"), trait.style("borderRadius", radius_full.$val), trait.style("border", "1px solid"), trait.style("borderColor", border_color_primary.$val), trait.style("backgroundColor", surface_bg_item.$val), trait.style("cursor", "pointer"), trait.style("color", text_fg_secondary.$val), trait.style("transition", transition_medium.$val), trait.style("backdropFilter", backdrop_blur.$val), trait.styleOnEvent("mouseenter", "transform", "rotate(30deg) scale(1.1)"), trait.styleOnEvent("mouseleave", "transform", "rotate(0deg) scale(1)"), trait.styleOnEvent("mouseenter", "borderColor", accent_primary.$val), trait.styleOnEvent("mouseleave", "borderColor", border_color_primary.$val), trait.event("click", $dispatch(toggleTheme())), trait.aria("aria-label", "Toggle theme"), trait.innerHTML(() => theme.val() === "dark" ? SunIcon() : MoonIcon(), theme)));
  }
  function inputArea() {
    return tag.form(trait.style("display", "flex"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_lg.$val), trait.style("padding", `0 ${space_padding_xl.val()}`), trait.event("submit", (e) => {
      e.preventDefault();
      dispatch(addTodo(inputText.val()));
    }), trait.animate([
      { opacity: "0", transform: "translateX(-30px)" },
      { opacity: "1", transform: "translateX(0)" }
    ], {
      duration: ANIM_DURATION_SLOW,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards",
      delay: 100
    }), tag.input(trait.attr("type", "text"), trait.attr("placeholder", PLACEHOLDER_TEXT), trait.style("flex", "1"), trait.style("padding", "14px 20px"), trait.style("borderRadius", radius_md.$val), trait.style("border", "2px solid"), trait.style("borderColor", border_color_input.$val), trait.style("backgroundColor", surface_bg_input.$val), trait.style("color", text_fg_primary.$val), trait.style("fontSize", type_size_body.$val), trait.style("fontFamily", FONT_PRIMARY), trait.style("outline", "none"), trait.style("transition", transition_medium.$val), trait.style("backdropFilter", backdrop_blur.$val), trait.styleOnEvent("focus", "borderColor", accent_primary.$val), trait.styleOnEvent("blur", "borderColor", border_color_input.$val), trait.styleOnEvent("focus", "boxShadow", () => `0 0 0 4px ${border_color_focus.val()}`), trait.styleOnEvent("blur", "boxShadow", "none"), trait.inputValue(inputText.$val), trait.inputEvent("input", (val) => dispatch(setInput(val)))), tag.button(trait.attr("type", "submit"), trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "center"), trait.style("width", "50px"), trait.style("height", "50px"), trait.style("borderRadius", radius_md.$val), trait.style("border", "none"), trait.style("background", () => `linear-gradient(135deg, ${accent_gradient_start.val()}, ${accent_gradient_end.val()})`, accent_gradient_start, accent_gradient_end), trait.style("color", text_fg_on_accent.$val), trait.style("cursor", "pointer"), trait.style("transition", transition_medium.$val), trait.style("boxShadow", shadow_button.$val), trait.style("flexShrink", "0"), trait.styleOnEvent("mouseenter", "transform", "scale(1.08)"), trait.styleOnEvent("mouseleave", "transform", "scale(1)"), trait.styleOnEvent("mousedown", "transform", "scale(0.95)"), trait.styleOnEvent("mouseup", "transform", "scale(1.08)"), trait.aria("aria-label", "Add todo"), PlusIcon({ color: "white" })));
  }
  function filterBar() {
    return tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "space-between"), trait.style("padding", `0 ${space_padding_xl.val()}`), trait.style("marginBottom", space_gap_lg.$val), trait.animate([
      { opacity: "0", transform: "translateX(30px)" },
      { opacity: "1", transform: "translateX(0)" }
    ], {
      duration: ANIM_DURATION_SLOW,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards",
      delay: 200
    }), tag.div(trait.style("display", "flex"), trait.style("gap", "6px"), trait.style("padding", "4px"), trait.style("borderRadius", radius_full.$val), trait.style("backgroundColor", surface_bg_item.$val), trait.style("backdropFilter", backdrop_blur.$val), ...FILTERS.map((f) => tag.button(trait.text(f.label), trait.style("padding", "6px 16px"), trait.style("borderRadius", radius_full.$val), trait.style("border", "none"), trait.style("fontSize", type_size_small.$val), trait.style("fontWeight", type_weight_medium.$val), trait.style("fontFamily", FONT_PRIMARY), trait.style("cursor", "pointer"), trait.style("transition", transition_medium.$val), trait.style("background", () => `linear-gradient(135deg, ${accent_gradient_start.val()}, ${accent_gradient_end.val()})`, filter.$test(f.id), filter, accent_gradient_start, accent_gradient_end), trait.style("color", text_fg_on_accent.$val, filter.$test(f.id), filter), trait.style("boxShadow", shadow_button.$val, filter.$test(f.id), filter), trait.style("background", "transparent", filter.$test(f.id, false), filter), trait.style("color", text_fg_secondary.$val, filter.$test(f.id, false), filter), trait.style("boxShadow", "none", filter.$test(f.id, false), filter), trait.styleOnEvent("mouseenter", "backgroundColor", () => filter.val() !== f.id ? surface_bg_item_hover.val() : ""), trait.styleOnEvent("mouseleave", "backgroundColor", () => filter.val() !== f.id ? "transparent" : ""), trait.event("click", () => dispatch(setFilter(f.id))), trait.styleOnEvent("mousedown", "transform", "scale(0.95)"), trait.styleOnEvent("mouseup", "transform", "scale(1)")))), tag.span(trait.text(() => {
      const active = todos.val().filter((t) => !t.completed).length;
      return `${active} left`;
    }, todos), trait.style("fontSize", type_size_small.$val), trait.style("color", text_fg_muted.$val), trait.style("fontWeight", type_weight_medium.$val), trait.style("transition", transition_medium.$val)));
  }
  function checkbox(item) {
    return tag.button(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "center"), trait.style("width", "26px"), trait.style("height", "26px"), trait.style("borderRadius", radius_sm.$val), trait.style("border", "2px solid"), trait.style("cursor", "pointer"), trait.style("flexShrink", "0"), trait.style("transition", transition_medium.$val), trait.style("padding", "0"), trait.style("background", () => `linear-gradient(135deg, ${accent_success.val()}, ${accent_gradient_end.val()})`, todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)), todos, accent_success, accent_gradient_end), trait.style("borderColor", "transparent", todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)), todos), trait.style("boxShadow", () => `0 0 12px ${accent_success_glow.val()}`, todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)), todos, accent_success_glow), trait.style("background", "transparent", todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)), todos), trait.style("borderColor", border_color_input.$val, todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)), todos), trait.style("boxShadow", "none", todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)), todos), trait.styleOnEvent("mouseenter", "transform", "scale(1.15)"), trait.styleOnEvent("mouseleave", "transform", "scale(1)"), trait.event("click", () => dispatch(toggleTodo(item.id))), trait.aria("aria-label", "Toggle todo"), trait.innerHTML(() => {
      const isCompleted = todos.val().some((t) => t.id === item.id && t.completed);
      return isCompleted ? CheckIcon({ color: "white", size: "14" }) : "";
    }, todos));
  }
  function todoItem(item, index) {
    return tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_md.$val), trait.style("padding", `${space_padding_md.val()} ${space_padding_lg.val()}`), trait.style("borderRadius", radius_md.$val), trait.style("backgroundColor", surface_bg_item.$val), trait.style("transition", transition_theme.$val), trait.style("position", "relative"), trait.style("backdropFilter", backdrop_blur.$val), trait.style("border", "1px solid"), trait.style("borderColor", border_color_primary.$val), trait.animate([
      { opacity: "0", transform: "translateY(16px) scale(0.96)" },
      { opacity: "1", transform: "translateY(0) scale(1)" }
    ], {
      duration: ANIM_DURATION_MEDIUM,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards",
      delay: index * 50
    }), trait.animate([
      { opacity: "1", transform: "translateX(0) scale(1)" },
      { opacity: "0", transform: "translateX(80px) scale(0.8)" }
    ], {
      duration: ANIM_DURATION_MEDIUM,
      easing: "cubic-bezier(0.55, 0, 1, 0.45)",
      fill: "forwards"
    }, deletingId.$test(item.id), deletingId), trait.style("backgroundColor", surface_bg_completed.$val, todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)), todos), trait.styleOnEvent("mouseenter", "borderColor", () => accent_primary.val() + "30"), trait.styleOnEvent("mouseleave", "borderColor", border_color_primary.$val), trait.styleOnEvent("mouseenter", "boxShadow", shadow_item_hover.$val), trait.styleOnEvent("mouseleave", "boxShadow", "none"), trait.styleOnEvent("mouseenter", "transform", "translateY(-1px)"), trait.styleOnEvent("mouseleave", "transform", "translateY(0)"), checkbox(item), tag.div(trait.style("flex", "1"), trait.style("minWidth", "0"), trait.innerHTML(() => {
      const isEditing = editingId.val() === item.id;
      if (isEditing) {
        return editInput(item);
      }
      return todoText(item);
    }, editingId, todos)), tag.div(trait.style("display", "flex"), trait.style("gap", "4px"), trait.style("opacity", "0"), trait.style("transition", transition_fast.$val), trait.className("todo-actions"), tag.button(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "center"), trait.style("width", "32px"), trait.style("height", "32px"), trait.style("borderRadius", radius_sm.$val), trait.style("border", "none"), trait.style("backgroundColor", "transparent"), trait.style("color", text_fg_muted.$val), trait.style("cursor", "pointer"), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "backgroundColor", surface_bg_item_hover.$val), trait.styleOnEvent("mouseleave", "backgroundColor", "transparent"), trait.styleOnEvent("mouseenter", "color", accent_primary.$val), trait.styleOnEvent("mouseleave", "color", text_fg_muted.$val), trait.styleOnEvent("mousedown", "transform", "scale(0.85)"), trait.styleOnEvent("mouseup", "transform", "scale(1)"), trait.event("click", () => dispatch(startEdit(item.id))), trait.aria("aria-label", "Edit todo"), EditIcon()), tag.button(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "center"), trait.style("width", "32px"), trait.style("height", "32px"), trait.style("borderRadius", radius_sm.$val), trait.style("border", "none"), trait.style("backgroundColor", "transparent"), trait.style("color", text_fg_muted.$val), trait.style("cursor", "pointer"), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "backgroundColor", () => accent_danger.val() + "15"), trait.styleOnEvent("mouseleave", "backgroundColor", "transparent"), trait.styleOnEvent("mouseenter", "color", accent_danger.$val), trait.styleOnEvent("mouseleave", "color", text_fg_muted.$val), trait.styleOnEvent("mousedown", "transform", "scale(0.85)"), trait.styleOnEvent("mouseup", "transform", "scale(1)"), trait.event("click", () => dispatch(deleteTodo(item.id))), trait.aria("aria-label", "Delete todo"), TrashIcon())));
  }
  function todoText(item) {
    return tag.span(trait.text(item.text), trait.style("fontSize", type_size_body.$val), trait.style("transition", transition_medium.$val), trait.style("display", "block"), trait.style("overflow", "hidden"), trait.style("textOverflow", "ellipsis"), trait.style("whiteSpace", "nowrap"), trait.style("cursor", "pointer"), trait.style("textDecoration", "line-through", todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)), todos), trait.style("color", text_fg_completed.$val, todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)), todos), trait.style("textDecoration", "none", todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)), todos), trait.style("color", text_fg_primary.$val, todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)), todos), trait.event("dblclick", () => dispatch(startEdit(item.id))));
  }
  function editInput(item) {
    return tag.input(trait.attr("type", "text"), trait.style("width", "100%"), trait.style("padding", "4px 8px"), trait.style("border", "2px solid"), trait.style("borderColor", accent_primary.$val), trait.style("borderRadius", radius_sm.$val), trait.style("backgroundColor", surface_bg_input.$val), trait.style("color", text_fg_primary.$val), trait.style("fontSize", type_size_body.$val), trait.style("fontFamily", FONT_PRIMARY), trait.style("outline", "none"), trait.style("boxSizing", "border-box"), trait.style("boxShadow", () => `0 0 0 4px ${border_color_focus.val()}`), trait.inputValue(editText.$val), trait.inputEvent("input", editText.set), trait.event("keydown", (e) => {
      if (e.key === "Enter")
        dispatch(saveEdit(item.id, editText.val()));
      if (e.key === "Escape")
        dispatch(cancelEdit());
    }), trait.event("blur", () => dispatch(saveEdit(item.id, editText.val()))), trait.focus([], [editingId]), trait.animate([
      { transform: "scaleX(0.8)", opacity: "0" },
      { transform: "scaleX(1)", opacity: "1" }
    ], { duration: ANIM_DURATION_FAST, easing: "ease-out", fill: "forwards" }));
  }
  function todoList() {
    return tag.div(trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("gap", space_gap_sm.$val), trait.style("padding", `0 ${space_padding_xl.val()}`), trait.style("flex", "1"), trait.style("overflowY", "auto"), trait.style("minHeight", "0"), trait.innerHTML(() => {
      const currentFilter = filter.val();
      const allTodos = todos.val();
      const filtered = currentFilter === "all" ? allTodos : currentFilter === "active" ? allTodos.filter((t) => !t.completed) : allTodos.filter((t) => t.completed);
      if (filtered.length === 0) {
        return emptyState();
      }
      return filtered.map((item, i) => todoItem(item, i));
    }, todos, filter, addCounter, deletingId));
  }
  function emptyState() {
    return tag.div(trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("alignItems", "center"), trait.style("justifyContent", "center"), trait.style("padding", "60px 20px"), trait.style("gap", space_gap_lg.$val), trait.animate([
      { opacity: "0", transform: "scale(0.9)" },
      { opacity: "1", transform: "scale(1)" }
    ], { duration: ANIM_DURATION_SLOW, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }), tag.div(trait.style("color", text_fg_muted.$val), trait.style("opacity", "0.5"), trait.animate([
      { transform: "translateY(0) rotate(0deg)" },
      { transform: "translateY(-8px) rotate(5deg)" },
      { transform: "translateY(0) rotate(0deg)" }
    ], { duration: 3000, iterations: Infinity, easing: "ease-in-out" }), SparkleIcon()), tag.p(trait.text(() => EMPTY_MESSAGES[filter.val()], filter), trait.style("margin", "0"), trait.style("fontSize", type_size_body.$val), trait.style("color", text_fg_muted.$val), trait.style("textAlign", "center")));
  }
  function footer() {
    return tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "space-between"), trait.style("padding", `${space_padding_md.val()} ${space_padding_xl.val()}`), trait.style("borderTop", "1px solid"), trait.style("borderColor", border_color_primary.$val), trait.style("marginTop", "auto"), trait.style("transition", transition_theme.$val), trait.animate([
      { opacity: "0", transform: "translateY(10px)" },
      { opacity: "1", transform: "translateY(0)" }
    ], {
      duration: ANIM_DURATION_MEDIUM,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards",
      delay: 300
    }), tag.span(trait.text(() => {
      const completed = todos.val().filter((t) => t.completed).length;
      const total = todos.val().length;
      return `${completed}/${total} completed`;
    }, todos), trait.style("fontSize", type_size_small.$val), trait.style("color", text_fg_muted.$val)), tag.button(trait.text("Clear completed"), trait.style("padding", "6px 14px"), trait.style("borderRadius", radius_full.$val), trait.style("border", "1px solid"), trait.style("borderColor", border_color_primary.$val), trait.style("backgroundColor", "transparent"), trait.style("color", text_fg_secondary.$val), trait.style("fontSize", type_size_small.$val), trait.style("fontWeight", type_weight_medium.$val), trait.style("fontFamily", FONT_PRIMARY), trait.style("cursor", "pointer"), trait.style("transition", transition_medium.$val), trait.styleOnEvent("mouseenter", "borderColor", accent_danger.$val), trait.styleOnEvent("mouseleave", "borderColor", border_color_primary.$val), trait.styleOnEvent("mouseenter", "color", accent_danger.$val), trait.styleOnEvent("mouseleave", "color", text_fg_secondary.$val), trait.styleOnEvent("mousedown", "transform", "scale(0.95)"), trait.styleOnEvent("mouseup", "transform", "scale(1)"), trait.event("click", $dispatch(clearCompleted()))));
  }
  var app = tag.div(trait.style("maxWidth", "560px"), trait.style("margin", "0 auto"), trait.style("minHeight", "100vh"), trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("paddingTop", space_padding_xl.$val), trait.style("paddingBottom", space_padding_xl.$val), tag.div(trait.style("position", "fixed"), trait.style("top", "0"), trait.style("left", "0"), trait.style("width", "100%"), trait.style("height", "100%"), trait.style("pointerEvents", "none"), trait.style("zIndex", "-1"), trait.style("overflow", "hidden"), tag.div(trait.style("position", "absolute"), trait.style("top", "-20%"), trait.style("right", "-10%"), trait.style("width", "500px"), trait.style("height", "500px"), trait.style("borderRadius", "50%"), trait.style("background", () => `radial-gradient(circle, ${accent_gradient_start.val()}15, transparent 70%)`, accent_gradient_start), trait.animate([
    { transform: "translate(0, 0) scale(1)" },
    { transform: "translate(-30px, 20px) scale(1.05)" },
    { transform: "translate(0, 0) scale(1)" }
  ], { duration: 8000, iterations: Infinity, easing: "ease-in-out" })), tag.div(trait.style("position", "absolute"), trait.style("bottom", "-20%"), trait.style("left", "-10%"), trait.style("width", "400px"), trait.style("height", "400px"), trait.style("borderRadius", "50%"), trait.style("background", () => `radial-gradient(circle, ${accent_gradient_end.val()}12, transparent 70%)`, accent_gradient_end), trait.animate([
    { transform: "translate(0, 0) scale(1)" },
    { transform: "translate(20px, -30px) scale(1.08)" },
    { transform: "translate(0, 0) scale(1)" }
  ], { duration: 1e4, iterations: Infinity, easing: "ease-in-out" }))), tag.div(trait.style("backgroundColor", surface_bg_card.$val), trait.style("borderRadius", radius_lg.$val), trait.style("boxShadow", shadow_card.$val), trait.style("border", "1px solid"), trait.style("borderColor", border_color_primary.$val), trait.style("backdropFilter", backdrop_blur.$val), trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("minHeight", "500px"), trait.style("overflow", "hidden"), trait.style("transition", transition_theme.$val), trait.animate([
    { opacity: "0", transform: "translateY(30px) scale(0.95)" },
    { opacity: "1", transform: "translateY(0) scale(1)" }
  ], {
    duration: 700,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    fill: "forwards"
  }), header(), inputArea(), filterBar(), todoList(), footer()), tag.p(trait.text("Built with OEM"), trait.style("textAlign", "center"), trait.style("fontSize", type_size_tiny.$val), trait.style("color", text_fg_muted.$val), trait.style("marginTop", space_padding_lg.$val), trait.style("opacity", "0.6"), trait.animate([{ opacity: "0" }, { opacity: "0.6" }], { duration: 1000, fill: "forwards", delay: 800 })));

  // examples/todo/main.ts
  var styleEl = document.createElement("style");
  styleEl.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::placeholder { opacity: 0.5; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.3); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(128,128,128,0.5); }
  div:hover > .todo-actions { opacity: 1 !important; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
`;
  document.head.appendChild(styleEl);
  tag.$(document.body)(trait.style("margin", "0"), trait.style("padding", "0"), trait.style("fontFamily", FONT_PRIMARY), trait.style("backgroundColor", surface_bg_primary.$val), trait.style("color", text_fg_primary.$val), trait.style("minHeight", "100vh"), trait.style("transition", transition_theme.$val), trait.style("overflowX", "hidden"), app);
})();

//# debugId=98EB24A1A6F5740F64756E2164756E21
//# sourceMappingURL=main.js.map
