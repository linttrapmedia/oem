(() => {
  // www/constants.ts
  var NAV_ITEMS = [
    { id: "hero", label: "Home" },
    { id: "philosophy", label: "Philosophy" },
    { id: "setup", label: "Setup" },
    { id: "primitives", label: "Primitives" },
    { id: "examples", label: "Examples" },
    { id: "traits", label: "Traits" },
    { id: "states", label: "States" },
    { id: "theming", label: "Theming" },
    { id: "architecture", label: "Architecture" }
  ];
  var SECTION_IDS = NAV_ITEMS.map((n) => n.id);
  var ANIM_DURATION_MEDIUM = 400;
  var FONT_MONO = "'Fira Code', 'JetBrains Mono', 'SF Mono', 'Cascadia Code', Consolas, monospace";
  var FONT_DISPLAY = "'Fira Code', 'JetBrains Mono', 'SF Mono', 'Cascadia Code', Consolas, 'Courier New', monospace";
  var FONT_LOGO = "Splash";

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
  // src/states/MediaQueryState.ts
  var useMediaQueryState = (props) => {
    const { type = "all", minWidth = 0, maxWidth = Infinity } = props;
    const state = State(false);
    const apply = () => {
      const width = window.innerWidth;
      const mediaMatches = width >= minWidth && width <= maxWidth;
      const typeMatches = type === "all" || window.matchMedia(type).matches;
      state.set(mediaMatches && typeMatches);
    };
    apply();
    window.addEventListener("resize", apply);
    return state;
  };
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
  // src/traits/ScrollIntoView.ts
  var useScrollIntoViewTrait = (el, options, ...rest) => {
    const states = extractStates(...rest);
    const conditions = extractConditions(...rest);
    const apply = () => {
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies)
        el.scrollIntoView(options);
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  };
  // src/traits/Style.ts
  function useStyleTrait(el, prop, val, ...rest) {
    const states = extractStates(val, ...rest);
    const conditions = extractConditions(...rest);
    const isCustomProp = prop.startsWith("--");
    const hasConditions = conditions.length > 0;
    let _savedValue;
    const _get = () => isCustomProp ? el.style.getPropertyValue(prop) : el.style[prop] ?? "";
    const _set = (v) => {
      isCustomProp ? el.style.setProperty(prop, v) : el.style[prop] = v;
    };
    const apply = () => {
      const _val = typeof val === "function" ? val() : val;
      const applies = conditions.every((i) => typeof i === "function" ? i() : i);
      if (applies) {
        if (hasConditions && _savedValue === undefined) {
          _savedValue = _get();
        }
        _set(_val);
      } else if (hasConditions && _savedValue !== undefined) {
        _set(_savedValue);
        _savedValue = undefined;
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
  // www/templates.ts
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
    scrollIntoView: useScrollIntoViewTrait,
    style: useStyleTrait,
    styleOnEvent: useStyleOnEventTrait,
    text: useTextContentTrait
  });

  // www/theme.ts
  var theme = useThemeState("light");
  var surface_bg_primary = useTokenState("#c7c7c7", "#222222", theme);
  var surface_bg_secondary = useTokenState("#b8b8b8", "#2a2a2a", theme);
  var surface_bg_tertiary = useTokenState("#ababab", "#333333", theme);
  var surface_bg_code = useTokenState("#383838", "#282828", theme);
  var surface_bg_nav = useTokenState("rgba(199,199,199,0.92)", "rgba(34,34,34,0.92)", theme);
  var surface_bg_card = useTokenState("rgba(160,160,160,0.08)", "rgba(60,60,60,0.08)", theme);
  var accent_neon_pink = useTokenState("#555555", "#999999", theme);
  var accent_neon_cyan = useTokenState("#444444", "#aaaaaa", theme);
  var accent_neon_purple = useTokenState("#666666", "#888888", theme);
  var accent_electric_blue = useTokenState("#505050", "#999999", theme);
  var accent_warm_orange = useTokenState("#606060", "#909090", theme);
  var text_fg_primary = useTokenState("#222222", "#c7c7c7", theme);
  var text_fg_secondary = useTokenState("#444444", "#999999", theme);
  var text_fg_muted = useTokenState("#888888", "#555555", theme);
  var text_fg_code = useTokenState("#c7c7c7", "#aaaaaa", theme);
  var text_gradient_hero = useTokenState("#222222", "#c7c7c7", theme);
  var text_gradient_heading = useTokenState("#222222", "#c7c7c7", theme);
  var border_color_primary = useTokenState("rgba(80,80,80,0.15)", "rgba(150,150,150,0.15)", theme);
  var border_color_accent = useTokenState("rgba(60,60,60,0.25)", "rgba(170,170,170,0.20)", theme);
  var border_color_cyan = useTokenState("rgba(60,60,60,0.20)", "rgba(150,150,150,0.15)", theme);
  var nav_fg_active = useTokenState("#222222", "#c7c7c7", theme);
  var nav_fg_default = useTokenState("#555555", "#888888", theme);
  var nav_fg_hover = useTokenState("#333333", "#aaaaaa", theme);
  var space_padding_xs = useTokenState("4px", "4px", theme);
  var space_padding_sm = useTokenState("8px", "8px", theme);
  var space_padding_md = useTokenState("16px", "16px", theme);
  var space_padding_lg = useTokenState("24px", "24px", theme);
  var space_padding_xl = useTokenState("32px", "32px", theme);
  var space_padding_2xl = useTokenState("48px", "48px", theme);
  var space_padding_3xl = useTokenState("64px", "64px", theme);
  var space_padding_4xl = useTokenState("96px", "96px", theme);
  var space_gap_sm = useTokenState("8px", "8px", theme);
  var space_gap_md = useTokenState("16px", "16px", theme);
  var space_gap_lg = useTokenState("24px", "24px", theme);
  var space_gap_xl = useTokenState("32px", "32px", theme);
  var space_gap_2xl = useTokenState("48px", "48px", theme);
  var radius_size_sm = useTokenState("6px", "6px", theme);
  var radius_size_md = useTokenState("12px", "12px", theme);
  var radius_size_lg = useTokenState("16px", "16px", theme);
  var radius_size_xl = useTokenState("24px", "24px", theme);
  var radius_size_full = useTokenState("9999px", "9999px", theme);
  var shadow_box_sm = useTokenState("0 2px 8px rgba(0,0,0,0.06)", "0 2px 8px rgba(0,0,0,0.3)", theme);
  var shadow_box_md = useTokenState("0 4px 16px rgba(0,0,0,0.08)", "0 4px 16px rgba(0,0,0,0.4)", theme);
  var shadow_glow_pink = useTokenState("0 0 20px rgba(80,80,80,0.06)", "0 0 30px rgba(100,100,100,0.10)", theme);
  var shadow_glow_cyan = useTokenState("0 0 20px rgba(80,80,80,0.05)", "0 0 30px rgba(100,100,100,0.08)", theme);
  var shadow_glow_purple = useTokenState("0 0 20px rgba(80,80,80,0.05)", "0 0 30px rgba(100,100,100,0.08)", theme);
  var shadow_glow_lg = useTokenState("0 8px 32px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.05)", "0 8px 32px rgba(0,0,0,0.12), 0 0 60px rgba(100,100,100,0.03)", theme);
  var type_size_xs = useTokenState("12px", "12px", theme);
  var type_size_sm = useTokenState("12px", "12px", theme);
  var type_size_base = useTokenState("13px", "13px", theme);
  var type_size_md = useTokenState("14px", "14px", theme);
  var type_size_lg = useTokenState("16px", "16px", theme);
  var type_size_xl = useTokenState("20px", "20px", theme);
  var type_size_2xl = useTokenState("24px", "24px", theme);
  var type_size_3xl = useTokenState("30px", "30px", theme);
  var type_weight_bold = useTokenState("700", "700", theme);
  var type_weight_semibold = useTokenState("600", "600", theme);
  var type_weight_medium = useTokenState("500", "500", theme);
  var type_weight_regular = useTokenState("400", "400", theme);
  var type_weight_light = useTokenState("300", "300", theme);
  var type_weight_thin = useTokenState("200", "200", theme);
  var transition_fast = useTokenState("all 0.15s ease", "all 0.15s ease", theme);
  var transition_medium = useTokenState("all 0.3s ease", "all 0.3s ease", theme);
  var transition_slow = useTokenState("all 0.5s ease", "all 0.5s ease", theme);
  var transition_color = useTokenState("color 0.3s ease", "color 0.3s ease", theme);
  var gradient_hero = useTokenState("radial-gradient(ellipse at 50% 0%, rgba(100,100,100,0.04) 0%, transparent 70%)", "radial-gradient(ellipse at 50% 0%, rgba(100,100,100,0.08) 0%, transparent 70%)", theme);
  var gradient_horizon = useTokenState("linear-gradient(0deg, rgba(100,100,100,0.04) 0%, transparent 40%)", "linear-gradient(0deg, rgba(100,100,100,0.06) 0%, transparent 40%)", theme);
  var gradient_card = useTokenState("linear-gradient(135deg, rgba(100,100,100,0.02) 0%, rgba(120,120,120,0.02) 100%)", "linear-gradient(135deg, rgba(100,100,100,0.03) 0%, rgba(120,120,120,0.02) 100%)", theme);
  // package.json
  var package_default = {
    name: "@linttrap/oem",
    version: "3.0.0",
    author: "@linttrapmedia",
    repository: {
      type: "git",
      url: "git+https://github.com/linttrapmedia/oem.git"
    },
    main: "./src/registry.ts",
    module: "./src/registry.ts",
    devDependencies: {
      "@types/bun": "latest",
      prettier: "2.7.1"
    },
    peerDependencies: {
      typescript: "^5"
    },
    exports: {
      ".": "./src/registry.ts"
    },
    bugs: {
      url: "https://github.com/linttrapmedia/oem/issues"
    },
    description: "A novel UI library for writing reactive html with vanilla javascript",
    homepage: "https://oem.js.org",
    license: "MIT",
    private: false,
    title: "oem",
    type: "module",
    dependencies: {
      "@linttrap/oem": "^1.0.2"
    }
  };

  // www/actions.ts
  var navigate = (section) => ({
    type: "NAVIGATE",
    payload: { section }
  });
  var toggleTheme = () => ({ type: "TOGGLE_THEME" });
  var toggleNav = () => ({ type: "TOGGLE_NAV" });
  var setPrimitiveTab = (tab) => ({
    type: "SET_PRIMITIVE_TAB",
    payload: { tab }
  });
  var toggleExample = (index) => ({
    type: "TOGGLE_EXAMPLE",
    payload: { index }
  });
  var showToast = (message) => ({
    type: "SHOW_TOAST",
    payload: { message }
  });
  var openDialog = () => ({ type: "OPEN_DIALOG" });
  var closeDialog = () => ({ type: "CLOSE_DIALOG" });

  // www/data.ts
  var FEATURES = [
    {
      title: "Zero Dependencies",
      description: "OEM ships nothing but itself. No virtual DOM, no compiler, no build step required. Pure TypeScript that runs in any browser.",
      icon: "cube"
    },
    {
      title: "Three Primitives",
      description: "Element, Trait, and State — that's it. Three concepts compose into any UI. No components, no hooks, no lifecycle soup.",
      icon: "triangle"
    },
    {
      title: "Surgical Reactivity",
      description: "Push-based subscriptions update only what changed. No diffing, no reconciliation, no tree walks. O(1) updates.",
      icon: "bolt"
    },
    {
      title: "Agent-First Design",
      description: "Flat, predictable patterns that LLMs can read, write, and reason about. Built for the age of AI-assisted development.",
      icon: "brain"
    },
    {
      title: "Token-Driven Theming",
      description: "Every visual value is a reactive token. Light/dark themes switch instantly. No CSS variables, no class toggling.",
      icon: "palette"
    },
    {
      title: "Automatic Cleanup",
      description: "WeakMap + MutationObserver handles all teardown. Remove an element, subscriptions vanish. Zero memory leaks.",
      icon: "sparkle"
    }
  ];
  var PHILOSOPHY_POINTS = [
    {
      title: "Composition Over Abstraction",
      body: "OEM has no component model. Instead, plain functions return real DOM nodes. Traits attach behaviors. State objects broadcast changes. You compose these three primitives into any UI — no classes, no JSX, no framework ceremony."
    },
    {
      title: "Declarative DNA",
      body: "A single nested expression declares structure, style, content, and reactivity in one place. What you write is what the browser builds — there is no intermediate representation, no compilation step, no hidden transforms."
    },
    {
      title: "Explicitness Over Magic",
      body: 'Every subscription is visible. Every style is inline on its element. Every event handler is wired where you can see it. OEM trades "convenience" features for total transparency.'
    },
    {
      title: "Built for Machines",
      body: "Flat file architecture, predictable patterns, and a tiny API surface make OEM uniquely well-suited for LLM-driven development. Agents can read, write, and reason about OEM code without special training."
    }
  ];
  var SETUP_CODE = `# Install with your preferred package manager
bun add @linttrap/oem
npm install @linttrap/oem
yarn add @linttrap/oem`;
  var AGENT_SETUP_CODE = `# Copy the agent instructions into your project
cp -r node_modules/@linttrap/oem/.github/ <your-agent-folder>`;
  var AGENT_SETUP_NOTE = "OEM ships with agent instructions that teach AI assistants how to build OEM apps. " + "Copy the .github/ folder from the package into your project to enable AI-powered development. " + "Your agent will understand OEM's architecture, idioms, and design-token system out of the box.";
  var HELLO_WORLD_CODE = `import { Template, useStyleTrait, useTextContentTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  style: useStyleTrait,
  text: useTextContentTrait,
});

const app = tag.div(
  trait.style('padding', '32px'),
  trait.style('fontFamily', 'system-ui, sans-serif'),
  tag.h1(
    trait.text('Hello, OEM'),
    trait.style('fontSize', '48px'),
    trait.style('background', 'linear-gradient(135deg, #555555, #444444)'),
    trait.style('WebkitBackgroundClip', 'text'),
    trait.style('WebkitTextFillColor', 'transparent'),
  ),
);

tag.$(document.body)(app);`;
  var PRIMITIVE_ELEMENT_CODE = `// Element — the tag proxy creates real DOM nodes
const [tag, trait] = Template({ style: useStyleTrait });

// Any HTML or SVG tag, called like a function
tag.div(
  tag.h1(trait.style('color', '#555555')),
  tag.p(trait.style('opacity', '0.8')),
  tag.svg(tag.circle()),
);

// Adopt existing elements
tag.$(document.body)(
  trait.style('margin', '0'),
  myApp,
);`;
  var PRIMITIVE_TRAIT_CODE = `// Trait — behaviors applied to elements
const [tag, trait] = Template({
  style: useStyleTrait,
  text: useTextContentTrait,
  event: useEventTrait,
  attr: useAttributeTrait,
});

tag.button(
  trait.text('Click me'),
  trait.style('padding', '12px 24px'),
  trait.style('backgroundColor', '#555555'),
  trait.style('color', '#c7c7c7'),
  trait.style('border', 'none'),
  trait.style('borderRadius', '8px'),
  trait.style('cursor', 'pointer'),
  trait.event('click', () => alert('Clicked!')),
  trait.attr('data-action', 'primary'),
);`;
  var PRIMITIVE_STATE_CODE = `import { State } from '@linttrap/oem';

// Create reactive state
const count = State(0);

// $val — getter function AND subscribable
trait.text(count.$val);

// $reduce — deferred mutation for event wiring
trait.event('click', count.$reduce(prev => prev + 1));

// $test — reactive condition
trait.style('color', '#444444', count.$test(v => v > 0));
trait.style('color', '#888888', count.$test(0));

// Custom methods auto-generate $ twins
const todos = State([], {
  add: (state, text: string) =>
    state.reduce(prev => [...prev, { text, done: false }]),
});

trait.event('click', todos.$add('New todo'));`;
  var EXAMPLES = [
    {
      title: "Reactive Counter",
      description: "State, traits, and events in 15 lines.",
      language: "typescript",
      code: `const count = State(0);

const counter = tag.div(
  trait.style('display', 'flex'),
  trait.style('alignItems', 'center'),
  trait.style('gap', '16px'),
  tag.button(
    trait.text('−'),
    trait.event('click', count.$reduce(n => n - 1)),
    trait.style('fontSize', '24px'),
  ),
  tag.span(
    trait.text(count.$val),
    trait.style('fontSize', '48px'),
    trait.style('fontWeight', '700'),
    trait.style('color', '#555555'),
  ),
  tag.button(
    trait.text('+'),
    trait.event('click', count.$reduce(n => n + 1)),
    trait.style('fontSize', '24px'),
  ),
);`
    },
    {
      title: "Dynamic List",
      description: "innerHTML trait for reactive collections.",
      language: "typescript",
      code: `const items = State<string[]>([]);
const input = State('');

const list = tag.div(
  tag.div(
    trait.style('display', 'flex'),
    trait.style('gap', '8px'),
    tag.input(
      trait.inputValue(input.$val),
      trait.inputEvent('input', input.$set),
      trait.style('flex', '1'),
    ),
    tag.button(
      trait.text('Add'),
      trait.event('click', () => {
        items.reduce(prev => [...prev, input.val()]);
        input.set('');
      }),
    ),
  ),
  tag.ul(
    trait.innerHTML(
      () => items.val().map(item =>
        tag.li(trait.text(item))
      ),
      items,
    ),
  ),
);`
    },
    {
      title: "Theme Toggle",
      description: "Token-driven light/dark switching.",
      language: "typescript",
      code: `import { useThemeState, useTokenState } from '@linttrap/oem';

const theme = useThemeState('light');
const bg = useTokenState('#c7c7c7', '#222222', theme);
const fg = useTokenState('#222222', '#c7c7c7', theme);
const accent = useTokenState('#555555', '#999999', theme);

const app = tag.div(
  trait.style('backgroundColor', bg.$val),
  trait.style('color', fg.$val),
  trait.style('transition', 'all 0.3s ease'),
  tag.button(
    trait.text('☀️ Light', theme.$test('dark')),
    trait.text('\uD83C\uDF19 Dark', theme.$test('light')),
    trait.event('click', () =>
      theme.reduce(t => t === 'dark' ? 'light' : 'dark'),
    ),
    trait.style('color', accent.$val),
  ),
);`
    },
    {
      title: "Conditional Styles",
      description: "Conditions replace ternaries for clean branching.",
      language: "typescript",
      code: `const isActive = State(false);

tag.div(
  // Base styles — always applied
  trait.style('padding', '16px'),
  trait.style('borderRadius', '8px'),
  trait.style('cursor', 'pointer'),
  trait.style('transition', 'all 0.2s ease'),

  // Conditional branches — never ternaries
  trait.style('backgroundColor', '#555555', isActive.$test(true)),
  trait.style('backgroundColor', '#c7c7c7', isActive.$test(false)),
  trait.style('color', '#c7c7c7', isActive.$test(true)),
  trait.style('color', '#888888', isActive.$test(false)),
  trait.style('boxShadow', '0 0 20px rgba(80,80,80,0.3)', isActive.$test(true)),
  trait.style('boxShadow', 'none', isActive.$test(false)), isActive.$test(false)),
  trait.text('Active', isActive.$test(true)),
  trait.text('Inactive', isActive.$test(false)),
  trait.event('click', isActive.$reduce(v => !v)),
);`
    }
  ];
  var TRAIT_DOCS = [
    {
      name: "useAnimationTrait",
      signature: "(el, keyframes, options, ...rest)",
      description: "Plays Web Animations API keyframe animations reactively. Supports conditional gating and state-driven re-triggering."
    },
    {
      name: "useAriaTrait",
      signature: "(el, prop, val, ...rest)",
      description: "Sets ARIA attributes and role reactively. Removes attributes when value is undefined or conditions are falsy."
    },
    {
      name: "useAttributeTrait",
      signature: "(el, prop, val, ...rest)",
      description: "Sets or removes HTML attributes. Undefined value removes the attribute."
    },
    {
      name: "useClassNameTrait",
      signature: "(el, className, ...rest)",
      description: "Sets the entire class attribute. Reserved for third-party library integration."
    },
    {
      name: "useDataAttributeTrait",
      signature: "(el, name, val, ...rest)",
      description: "Sets or removes data-* attributes via the dataset API. Accepts bare or prefixed names."
    },
    {
      name: "useEventTrait",
      signature: "(el, evt, cb, ...rest)",
      description: "Attaches DOM event listeners. Auto-cleaned on element removal. Gated by conditions."
    },
    {
      name: "useFocusTrait",
      signature: "(el, ...rest)",
      description: "Programmatically focuses an element when reactive conditions are met."
    },
    {
      name: "useInnerHTMLTrait",
      signature: "(el, children, ...rest)",
      description: "Clears and re-appends children on state change. Used for dynamic lists."
    },
    {
      name: "useInputEventTrait",
      signature: "(el, evt, setter, ...rest)",
      description: "Attaches input events that extract e.target.value and pipe to a setter."
    },
    {
      name: "useInputValueTrait",
      signature: "(el, value, ...rest)",
      description: "Binds a value to input/textarea elements reactively."
    },
    {
      name: "useScrollIntoViewTrait",
      signature: "(el, options?, ...rest)",
      description: "Scrolls an element into view when conditions are met. Accepts ScrollIntoViewOptions."
    },
    {
      name: "useStyleTrait",
      signature: "(el, prop, val, ...rest)",
      description: "Sets a single CSS style property. Supports camelCase and custom properties. Reactive via $val."
    },
    {
      name: "useStyleOnEventTrait",
      signature: "(el, evt, prop, val, ...rest)",
      description: "Applies a CSS style when a specific DOM event fires. Perfect for hover/focus patterns."
    },
    {
      name: "useTextContentTrait",
      signature: "(el, text, ...rest)",
      description: "Sets text content reactively. Accepts strings, arrays, or getter functions."
    }
  ];
  var STATE_DOCS = [
    {
      name: "State",
      signature: "State<T, M>(initial, methods?)",
      description: "Core reactive container. Holds a value, notifies subscribers on change. Custom methods auto-generate $-prefixed deferred twins."
    },
    {
      name: "useFormState",
      signature: "useFormState(initialValues, validators?)",
      description: "Reactive form state with validation, dirty tracking, touched fields, and field-level control."
    },
    {
      name: "useIntersectionObserverState",
      signature: "useIntersectionObserverState(el, options?)",
      description: "Tracks element visibility within the viewport using the Intersection Observer API."
    },
    {
      name: "useMediaQueryState",
      signature: "useMediaQueryState({ minWidth?, maxWidth? })",
      description: "Reactive state tracking viewport size. Returns State<boolean>. Use $test for responsive conditions."
    },
    {
      name: "useOnlineState",
      signature: "useOnlineState()",
      description: "Tracks browser online/offline connectivity. Returns State<boolean>."
    },
    {
      name: "useThemeState",
      signature: "useThemeState('light' | 'dark')",
      description: "Single source of truth for current theme. Returns a State<Theme> object."
    },
    {
      name: "useTimerState",
      signature: "useTimerState(intervalMs, options?)",
      description: "Interval-driven counter with start, stop, and reset controls. Auto-start optional."
    },
    {
      name: "useTokenState",
      signature: "useTokenState(lightVal, darkVal, themeState)",
      description: "Derived state that selects between light/dark values based on themeState. Updates automatically on theme change."
    },
    {
      name: "useUrlState",
      signature: "useUrlState(routes)",
      description: "Tracks the current URL, matching against defined routes and extracting params, query, and hash."
    },
    {
      name: "useWindowSizeState",
      signature: "useWindowSizeState()",
      description: "Tracks viewport width and height in real-time. Returns State<{ width, height }>."
    }
  ];
  var ARCH_FILES = [
    { name: "types.ts", purpose: "TypeScript type definitions. No runtime code." },
    { name: "constants.ts", purpose: "UPPER_SNAKE_CASE values. Immutable, no reactivity." },
    { name: "data.ts", purpose: "Static data known at build time. Arrays, objects, content." },
    { name: "states.ts", purpose: "All State() instances. Module-level singletons." },
    { name: "actions.ts", purpose: "Pure functions returning { type, payload } objects." },
    { name: "machines.ts", purpose: "Switch statements dispatching actions to state mutations." },
    { name: "traits.ts", purpose: "Custom trait functions. Most apps need zero." },
    { name: "templates.ts", purpose: "Template() calls creating [tag, trait] pairs." },
    { name: "theme.ts", purpose: "useThemeState + all useTokenState tokens." },
    { name: "icons.ts", purpose: "SVG icon functions with private Template." },
    { name: "ui.ts", purpose: "All DOM construction. Imports everything, defines nothing." },
    { name: "main.ts", purpose: "Entry point. Import UI, mount to body. Side effects OK here." }
  ];

  // www/icons.ts
  var [svg, svgTrait] = Template({
    attr: useAttributeTrait,
    style: useStyleTrait
  });
  function CubeIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M21 16.5v-9l-9-5.25L3 7.5v9l9 5.25 9-5.25zM3 7.5l9 5.25M12 22.5V12.75M21 7.5l-9 5.25")));
  }
  function TriangleIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M12 3L2 21h20L12 3z")));
  }
  function BoltIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M13 2L3 14h9l-1 8 10-12h-9l1-8z")));
  }
  function BrainIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M12 2a7 7 0 00-5.2 2.3A5 5 0 003 9c0 1.7.8 3.2 2 4.2V20a1 1 0 001 1h4v-3h4v3h4a1 1 0 001-1v-6.8A5 5 0 0021 9a5 5 0 00-3.8-4.7A7 7 0 0012 2z")), svg.path(svgTrait.attr("d", "M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 005 0")));
  }
  function PaletteIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9.6-10-9.6z")), svg.circle(svgTrait.attr("cx", "6.5"), svgTrait.attr("cy", "11.5"), svgTrait.attr("r", "1.5"), svgTrait.attr("fill", color)), svg.circle(svgTrait.attr("cx", "10"), svgTrait.attr("cy", "7.5"), svgTrait.attr("r", "1.5"), svgTrait.attr("fill", color)), svg.circle(svgTrait.attr("cx", "14"), svgTrait.attr("cy", "7.5"), svgTrait.attr("r", "1.5"), svgTrait.attr("fill", color)), svg.circle(svgTrait.attr("cx", "17.5"), svgTrait.attr("cy", "11.5"), svgTrait.attr("r", "1.5"), svgTrait.attr("fill", color)));
  }
  function SparkleIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z")));
  }
  function MenuIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "2"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M3 6h18M3 12h18M3 18h18")));
  }
  function CloseIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "2"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M18 6L6 18M6 6l12 12")));
  }
  function SunIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.circle(svgTrait.attr("cx", "12"), svgTrait.attr("cy", "12"), svgTrait.attr("r", "5")), svg.path(svgTrait.attr("d", "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42")));
  }
  function MoonIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z")));
  }
  function ArrowRightIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "2"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M5 12h14M12 5l7 7-7 7")));
  }
  function ChevronDownIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "2"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svgTrait.style("transition", "transform 0.2s ease"), svg.path(svgTrait.attr("d", "M6 9l6 6 6-6")));
  }
  function CommandIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z")));
  }
  function CheckIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "2"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M20 6L9 17l-5-5")));
  }
  function CopyIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", "none"), svgTrait.attr("stroke", color), svgTrait.attr("stroke-width", "1.5"), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.rect(svgTrait.attr("x", "9"), svgTrait.attr("y", "9"), svgTrait.attr("width", "13"), svgTrait.attr("height", "13"), svgTrait.attr("rx", "2")), svg.path(svgTrait.attr("d", "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1")));
  }
  function GitHubIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", color), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z")));
  }
  function NpmIcon({ size = "24", color = "currentColor" } = {}) {
    return svg.svg(svgTrait.attr("viewBox", "0 0 24 24"), svgTrait.attr("fill", color), svgTrait.style("width", size + "px"), svgTrait.style("height", size + "px"), svg.path(svgTrait.attr("d", "M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z")));
  }
  var ICON_MAP = {
    cube: CubeIcon,
    triangle: TriangleIcon,
    bolt: BoltIcon,
    brain: BrainIcon,
    palette: PaletteIcon,
    sparkle: SparkleIcon,
    chevron: ChevronDownIcon,
    command: CommandIcon,
    check: CheckIcon
  };

  // www/states.ts
  var activeSection = State("hero");
  var navOpen = State(false);
  var isTablet = useMediaQueryState({ minWidth: 768, maxWidth: 1023 });
  var isDesktop = useMediaQueryState({ minWidth: 1024 });
  var scrolled = State(false);
  var primitiveTab = State("element");
  var expandedExamples = State(new Set);
  var toastVisible = State(false);
  var toastMessage = State("");
  var dialogOpen = State(false);

  // www/machines.ts
  var toastTimer = null;
  function dispatch(action) {
    switch (action.type) {
      case "NAVIGATE": {
        activeSection.set(action.payload.section);
        navOpen.set(false);
        const el = document.getElementById(action.payload.section);
        if (el)
          el.scrollIntoView({ behavior: "smooth" });
        break;
      }
      case "TOGGLE_THEME": {
        theme.reduce((t) => t === "dark" ? "light" : "dark");
        break;
      }
      case "TOGGLE_NAV": {
        navOpen.reduce((v) => !v);
        break;
      }
      case "CLOSE_NAV": {
        navOpen.set(false);
        break;
      }
      case "SET_PRIMITIVE_TAB": {
        primitiveTab.set(action.payload.tab);
        break;
      }
      case "TOGGLE_EXAMPLE": {
        expandedExamples.reduce((v) => {
          const next = new Set(v);
          next.has(action.payload.index) ? next.delete(action.payload.index) : next.add(action.payload.index);
          return next;
        });
        break;
      }
      case "SHOW_TOAST": {
        if (toastTimer)
          clearTimeout(toastTimer);
        toastMessage.set(action.payload.message);
        toastVisible.set(true);
        toastTimer = setTimeout(() => {
          toastVisible.set(false);
          toastTimer = null;
        }, 2000);
        break;
      }
      case "HIDE_TOAST": {
        if (toastTimer)
          clearTimeout(toastTimer);
        toastVisible.set(false);
        break;
      }
      case "OPEN_DIALOG": {
        dialogOpen.set(true);
        break;
      }
      case "CLOSE_DIALOG": {
        dialogOpen.set(false);
        break;
      }
    }
  }
  var $dispatch = (action) => () => dispatch(action);

  // www/ui.ts
  function fadeInUp(el, delay = 0) {
    el.style.opacity = "0";
    el.animate([
      { opacity: 0, transform: "translateY(16px)" },
      { opacity: 1, transform: "translateY(0)" }
    ], {
      duration: ANIM_DURATION_MEDIUM,
      delay,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards"
    });
  }
  function fadeIn(el, delay = 0) {
    el.style.opacity = "0";
    el.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: ANIM_DURATION_MEDIUM,
      delay,
      easing: "ease-out",
      fill: "forwards"
    });
  }
  function onMount(fn) {
    return (el) => {
      requestAnimationFrame(() => fn(el));
    };
  }
  function webkitBackdrop(val) {
    return (el) => {
      el.style.setProperty("-webkit-backdrop-filter", val);
    };
  }
  var sheet = new CSSStyleSheet;
  sheet.replaceSync(`
  @font-face {
    font-family: 'Splash';
    src: url('assets/Splash.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  function highlightCode(el) {
    if (typeof window.Prism !== "undefined") {
      window.Prism.highlightAllUnder(el);
    }
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialogOpen.val()) {
      dispatch(closeDialog());
    }
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      dialogOpen.val() ? dispatch(closeDialog()) : dispatch(openDialog());
    }
  });
  function copyCode(code) {
    navigator.clipboard.writeText(code);
    dispatch(showToast("Copied to clipboard"));
  }
  function SectionContainer(id, ...children) {
    return tag.section(trait.attr("id", id), trait.style("position", "relative"), trait.style("padding", `${space_padding_2xl.val()} ${space_padding_md.val()}`), trait.style("padding", `${space_padding_3xl.val()} ${space_padding_xl.val()}`, isDesktop.$test(true)), trait.style("maxWidth", "1100px"), trait.style("margin", "0 auto"), ...children);
  }
  function SectionTitle(text) {
    return tag.h2(trait.text(text), trait.style("margin", "0"), trait.style("fontSize", type_size_xl.$val), trait.style("fontSize", type_size_2xl.$val, isDesktop.$test(true)), trait.style("fontWeight", type_weight_bold.$val), trait.style("letterSpacing", "-0.02em"), trait.style("marginBottom", space_padding_md.$val), trait.style("color", text_fg_primary.$val), onMount((el) => fadeInUp(el)));
  }
  function SectionSubtitle(text) {
    return tag.p(trait.text(text), trait.style("fontSize", type_size_base.$val), trait.style("color", text_fg_secondary.$val), trait.style("lineHeight", "1.6"), trait.style("maxWidth", "640px"), trait.style("marginBottom", space_padding_lg.$val), trait.style("marginTop", "0"), onMount((el) => fadeInUp(el, 80)));
  }
  function CodeBlock(code, language = "typescript") {
    return tag.div(trait.style("position", "relative"), trait.style("borderRadius", radius_size_md.$val), trait.style("overflow", "hidden"), trait.style("border", () => `1px solid ${border_color_cyan.val()}`, border_color_cyan), trait.style("boxShadow", shadow_glow_cyan.$val), tag.button(trait.style("position", "absolute"), trait.style("top", "6px"), trait.style("right", "6px"), trait.style("background", "rgba(255,255,255,0.05)"), trait.style("border", "1px solid rgba(255,255,255,0.1)"), trait.style("borderRadius", radius_size_sm.$val), trait.style("padding", "4px"), trait.style("cursor", "pointer"), trait.style("color", text_fg_muted.$val), trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "center"), trait.style("zIndex", "2"), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "color", () => accent_neon_cyan.val()), trait.styleOnEvent("mouseleave", "color", () => text_fg_muted.val()), trait.event("click", () => copyCode(code)), CopyIcon({ size: "12" })), tag.pre(trait.style("margin", "0"), trait.style("padding", space_padding_md.$val), trait.style("backgroundColor", surface_bg_code.$val), trait.style("color", "#c7c7c7"), trait.style("overflow", "auto"), trait.style("fontSize", type_size_xs.$val), trait.style("lineHeight", "1.6"), trait.style("fontFamily", FONT_MONO), tag.code(trait.className(`language-${language}`), trait.text(code))), onMount((el) => highlightCode(el)));
  }
  function Pill(text, color) {
    return tag.span(trait.text(text), trait.style("display", "inline-block"), trait.style("padding", "3px 10px"), trait.style("borderRadius", radius_size_full.$val), trait.style("fontSize", type_size_xs.$val), trait.style("fontWeight", type_weight_medium.$val), trait.style("letterSpacing", "0.05em"), trait.style("textTransform", "uppercase"), trait.style("color", color), trait.style("border", `1px solid ${color}33`), trait.style("backgroundColor", `${color}11`));
  }
  var Toast = tag.div(trait.style("position", "fixed"), trait.style("bottom", "24px"), trait.style("left", "50%"), trait.style("zIndex", "1000"), trait.style("padding", "10px 20px"), trait.style("borderRadius", radius_size_full.$val), trait.style("backgroundColor", surface_bg_code.$val), trait.style("color", "#c7c7c7"), trait.style("fontSize", type_size_sm.$val), trait.style("fontFamily", FONT_MONO), trait.style("boxShadow", "0 4px 24px rgba(0,0,0,0.3)"), trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("pointerEvents", "none"), trait.style("transition", "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"), trait.style("opacity", "0"), trait.style("transform", "translateX(-50%) translateY(8px)"), trait.style("opacity", "1", toastVisible.$test(true)), trait.style("transform", "translateX(-50%) translateY(0)", toastVisible.$test(true)), CheckIcon({ size: "14", color: "#888888" }), tag.span(trait.text(toastMessage.$val)));
  var Dialog = tag.div(trait.style("position", "fixed"), trait.style("inset", "0"), trait.style("zIndex", "200"), trait.style("display", "flex"), trait.style("alignItems", "flex-start"), trait.style("justifyContent", "center"), trait.style("paddingTop", "10vh"), trait.style("transition", "opacity 0.2s ease"), trait.style("opacity", "0"), trait.style("pointerEvents", "none"), trait.style("opacity", "1", dialogOpen.$test(true)), trait.style("pointerEvents", "auto", dialogOpen.$test(true)), tag.div(trait.style("position", "absolute"), trait.style("inset", "0"), trait.style("backgroundColor", "rgba(0,0,0,0.5)"), trait.style("backdropFilter", "blur(8px)"), webkitBackdrop("blur(8px)"), trait.event("click", $dispatch(closeDialog()))), tag.div(trait.style("position", "relative"), trait.style("width", "90%"), trait.style("maxWidth", "680px"), trait.style("maxHeight", "70vh"), trait.style("overflow", "auto"), trait.style("backgroundColor", surface_bg_secondary.$val), trait.style("borderRadius", radius_size_lg.$val), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("padding", space_padding_lg.$val), trait.style("boxShadow", "0 24px 80px rgba(0,0,0,0.4)"), tag.div(trait.style("display", "flex"), trait.style("justifyContent", "space-between"), trait.style("alignItems", "center"), trait.style("marginBottom", space_padding_md.$val), tag.h3(trait.text("API Quick Reference"), trait.style("margin", "0"), trait.style("fontSize", type_size_lg.$val), trait.style("fontWeight", type_weight_bold.$val), trait.style("color", text_fg_primary.$val)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), tag.span(trait.text("ESC"), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_muted.$val), trait.style("padding", "2px 6px"), trait.style("borderRadius", "4px"), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary)), tag.button(trait.style("background", "none"), trait.style("border", "none"), trait.style("cursor", "pointer"), trait.style("color", text_fg_muted.$val), trait.style("display", "flex"), trait.style("padding", "2px"), trait.event("click", $dispatch(closeDialog())), CloseIcon({ size: "18" })))), tag.div(trait.style("marginBottom", space_padding_md.$val), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_sm.$val), tag.span(trait.text("Traits"), trait.style("fontSize", type_size_sm.$val), trait.style("fontWeight", type_weight_bold.$val), trait.style("color", accent_neon_cyan.$val), trait.style("textTransform", "uppercase"), trait.style("letterSpacing", "0.08em")), tag.span(trait.text(`${TRAIT_DOCS.length}`), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_muted.$val), trait.style("padding", "1px 6px"), trait.style("borderRadius", radius_size_full.$val), trait.style("backgroundColor", surface_bg_tertiary.$val))), ...TRAIT_DOCS.map((t) => tag.div(trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("gap", "4px"), trait.style("padding", `${space_padding_sm.val()} 0`), trait.style("borderBottom", () => `1px solid ${border_color_primary.val()}08`, border_color_primary), tag.span(trait.text(t.name), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_primary.$val), trait.style("fontWeight", type_weight_medium.$val)), tag.span(trait.text(t.signature), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", "10px"), trait.style("color", text_fg_muted.$val)), tag.span(trait.text(t.description), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_secondary.$val))))), tag.div(tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_sm.$val), tag.span(trait.text("States"), trait.style("fontSize", type_size_sm.$val), trait.style("fontWeight", type_weight_bold.$val), trait.style("color", accent_neon_purple.$val), trait.style("textTransform", "uppercase"), trait.style("letterSpacing", "0.08em")), tag.span(trait.text(`${STATE_DOCS.length}`), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_muted.$val), trait.style("padding", "1px 6px"), trait.style("borderRadius", radius_size_full.$val), trait.style("backgroundColor", surface_bg_tertiary.$val))), ...STATE_DOCS.map((s) => tag.div(trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("gap", "4px"), trait.style("padding", `${space_padding_sm.val()} 0`), trait.style("borderBottom", () => `1px solid ${border_color_primary.val()}08`, border_color_primary), tag.span(trait.text(s.name), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_primary.$val), trait.style("fontWeight", type_weight_medium.$val)), tag.span(trait.text(s.signature), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", "10px"), trait.style("color", text_fg_muted.$val)), tag.span(trait.text(s.description), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_secondary.$val)))))));
  var NavBar = tag.header(trait.style("position", "fixed"), trait.style("top", "0"), trait.style("left", "0"), trait.style("right", "0"), trait.style("zIndex", "100"), trait.style("padding", `${space_padding_sm.val()} ${space_padding_md.val()}`), trait.style("padding", `${space_padding_sm.val()} ${space_padding_xl.val()}`, isDesktop.$test(true)), trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "space-between"), trait.style("backgroundColor", surface_bg_nav.$val), trait.style("backdropFilter", "blur(16px)"), webkitBackdrop("blur(16px)"), trait.style("borderBottom", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("transition", transition_medium.$val), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("cursor", "pointer"), trait.event("click", $dispatch(navigate("hero"))), tag.span(trait.text("oem"), trait.style("fontSize", type_size_2xl.$val), trait.style("fontWeight", type_weight_bold.$val), trait.style("fontFamily", FONT_LOGO)), tag.span(trait.text(`v${package_default.version}`), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_muted.$val), trait.style("fontFamily", FONT_MONO))), tag.nav(trait.style("display", "none"), trait.style("display", "flex", isDesktop.$test(true)), trait.style("alignItems", "center"), trait.style("gap", space_gap_md.$val), ...NAV_ITEMS.filter((n) => n.id !== "hero").map((item) => tag.a(trait.text(item.label), trait.style("fontSize", type_size_xs.$val), trait.style("fontWeight", type_weight_medium.$val), trait.style("textDecoration", "none"), trait.style("cursor", "pointer"), trait.style("transition", transition_color.$val), trait.style("color", nav_fg_default.$val, activeSection.$test((v) => v !== item.id)), trait.style("color", nav_fg_active.$val, activeSection.$test(item.id)), trait.styleOnEvent("mouseenter", "color", () => nav_fg_hover.val()), trait.styleOnEvent("mouseleave", "color", () => activeSection.val() === item.id ? nav_fg_active.val() : nav_fg_default.val()), trait.event("click", $dispatch(navigate(item.id)))))), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), tag.button(trait.style("display", "none"), trait.style("display", "flex", isDesktop.$test(true)), trait.style("alignItems", "center"), trait.style("gap", "4px"), trait.style("padding", "4px 10px"), trait.style("background", "none"), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("borderRadius", radius_size_sm.$val), trait.style("cursor", "pointer"), trait.style("color", text_fg_muted.$val), trait.style("fontSize", type_size_xs.$val), trait.style("fontFamily", FONT_MONO), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "borderColor", () => border_color_accent.val()), trait.styleOnEvent("mouseleave", "borderColor", () => border_color_primary.val()), trait.event("click", $dispatch(openDialog())), CommandIcon({ size: "12" }), tag.span(trait.text("K"))), tag.a(trait.attr("href", "https://github.com/linttrapmedia/oem"), trait.attr("target", "_blank"), trait.attr("rel", "noopener"), trait.style("color", text_fg_secondary.$val), trait.style("transition", transition_fast.$val), trait.style("display", "flex"), trait.styleOnEvent("mouseenter", "color", () => accent_neon_pink.val()), trait.styleOnEvent("mouseleave", "color", () => text_fg_secondary.val()), GitHubIcon({ size: "18" })), tag.button(trait.style("background", "none"), trait.style("border", "none"), trait.style("cursor", "pointer"), trait.style("color", text_fg_secondary.$val), trait.style("display", "flex"), trait.style("padding", space_padding_xs.$val), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "color", () => accent_neon_cyan.val()), trait.styleOnEvent("mouseleave", "color", () => text_fg_secondary.val()), trait.event("click", $dispatch(toggleTheme())), trait.innerHTML(() => [theme.val() === "dark" ? SunIcon({ size: "18" }) : MoonIcon({ size: "18" })], theme)), tag.button(trait.style("background", "none"), trait.style("border", "none"), trait.style("cursor", "pointer"), trait.style("color", text_fg_primary.$val), trait.style("padding", space_padding_xs.$val), trait.style("display", "flex"), trait.style("display", "none", isDesktop.$test(true)), trait.event("click", $dispatch(toggleNav())), trait.innerHTML(() => [navOpen.val() ? CloseIcon({ size: "22" }) : MenuIcon({ size: "22" })], navOpen))));
  var MobileNav = tag.div(trait.style("position", "fixed"), trait.style("top", "0"), trait.style("right", "0"), trait.style("bottom", "0"), trait.style("width", "280px"), trait.style("backgroundColor", surface_bg_secondary.$val), trait.style("backdropFilter", "blur(20px)"), webkitBackdrop("blur(20px)"), trait.style("zIndex", "99"), trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("padding", `${space_padding_4xl.val()} ${space_padding_lg.val()} ${space_padding_lg.val()}`), trait.style("gap", space_gap_md.$val), trait.style("transition", "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"), trait.style("borderLeft", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("boxShadow", "-8px 0 32px rgba(0,0,0,0.2)"), trait.style("transform", "translateX(100%)"), trait.style("transform", "translateX(0)", navOpen.$test(true)), ...NAV_ITEMS.map((item) => tag.a(trait.text(item.label), trait.style("fontSize", type_size_lg.$val), trait.style("fontWeight", type_weight_light.$val), trait.style("textDecoration", "none"), trait.style("cursor", "pointer"), trait.style("transition", transition_color.$val), trait.style("color", nav_fg_default.$val, activeSection.$test((v) => v !== item.id)), trait.style("color", nav_fg_active.$val, activeSection.$test(item.id)), trait.event("click", $dispatch(navigate(item.id))))), tag.button(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("padding", "10px 0"), trait.style("background", "none"), trait.style("border", "none"), trait.style("cursor", "pointer"), trait.style("color", accent_neon_cyan.$val), trait.style("fontSize", type_size_base.$val), trait.style("fontFamily", FONT_MONO), trait.event("click", () => {
    navOpen.set(false);
    dispatch(openDialog());
  }), CommandIcon({ size: "14" }), tag.span(trait.text("API Reference"))));
  var MobileNavBackdrop = tag.div(trait.style("position", "fixed"), trait.style("inset", "0"), trait.style("zIndex", "98"), trait.style("backgroundColor", "rgba(0,0,0,0.3)"), trait.style("transition", "opacity 0.3s ease"), trait.style("opacity", "0"), trait.style("pointerEvents", "none"), trait.style("opacity", "1", navOpen.$test(true)), trait.style("pointerEvents", "auto", navOpen.$test(true)), trait.event("click", $dispatch(toggleNav())));
  var HeroSection = SectionContainer("hero", tag.div(trait.style("position", "absolute"), trait.style("inset", "0"), trait.style("backgroundImage", gradient_horizon.$val), trait.style("pointerEvents", "none")), tag.div(trait.style("position", "relative"), trait.style("textAlign", "center"), trait.style("paddingTop", space_padding_3xl.$val), trait.style("paddingBottom", space_padding_lg.$val), tag.div(trait.style("marginBottom", space_padding_md.$val), onMount((el) => fadeIn(el, 100)), Pill("Agentic UI", "#555555")), tag.h1(trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("margin", "0"), trait.style("gap", "4px"), trait.style("fontSize", type_size_2xl.$val), trait.style("fontSize", type_size_3xl.$val, isDesktop.$test(true)), trait.style("fontWeight", type_weight_thin.$val), trait.style("lineHeight", "1.1"), trait.style("letterSpacing", "-0.03em"), trait.style("marginBottom", space_padding_md.$val), trait.style("fontFamily", FONT_DISPLAY), onMount((el) => fadeInUp(el, 150)), tag.span(trait.text("/oem <prompt>"), trait.style("color", text_gradient_hero.$val), trait.style("fontSize", type_size_3xl.$val))), tag.p(trait.text("The human-AI collaboration toolkit for building front-end web applications with natural language."), trait.style("fontSize", type_size_base.$val), trait.style("color", text_fg_secondary.$val), trait.style("maxWidth", "540px"), trait.style("margin", "0 auto"), trait.style("lineHeight", "1.6"), trait.style("marginBottom", space_padding_lg.$val), onMount((el) => fadeInUp(el, 250))), tag.div(trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("flexDirection", "row", isDesktop.$test(true)), trait.style("gap", space_gap_sm.$val), trait.style("justifyContent", "center"), trait.style("alignItems", "center"), onMount((el) => fadeInUp(el, 350)), tag.button(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("padding", "10px 24px"), trait.style("background", () => `linear-gradient(135deg, ${accent_neon_pink.val()}, ${accent_neon_purple.val()})`, accent_neon_pink, accent_neon_purple), trait.style("color", "#c7c7c7"), trait.style("border", "none"), trait.style("borderRadius", radius_size_full.$val), trait.style("fontSize", type_size_sm.$val), trait.style("fontWeight", type_weight_semibold.$val), trait.style("cursor", "pointer"), trait.style("transition", transition_medium.$val), trait.style("fontFamily", FONT_DISPLAY), trait.styleOnEvent("mouseenter", "transform", () => "translateY(-2px)"), trait.styleOnEvent("mouseleave", "transform", () => "translateY(0)"), trait.event("click", $dispatch(navigate("setup"))), trait.text("Get Started"), ArrowRightIcon({ size: "14", color: "#c7c7c7" })), tag.button(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("padding", "10px 24px"), trait.style("background", "transparent"), trait.style("color", accent_neon_cyan.$val), trait.style("border", () => `1px solid ${border_color_cyan.val()}`, border_color_cyan), trait.style("borderRadius", radius_size_full.$val), trait.style("fontSize", type_size_sm.$val), trait.style("fontWeight", type_weight_medium.$val), trait.style("cursor", "pointer"), trait.style("transition", transition_medium.$val), trait.style("fontFamily", FONT_DISPLAY), trait.styleOnEvent("mouseenter", "transform", () => "translateY(-2px)"), trait.styleOnEvent("mouseleave", "transform", () => "translateY(0)"), trait.event("click", $dispatch(navigate("examples"))), trait.text("View Examples"))), tag.div(trait.style("marginTop", space_padding_lg.$val), trait.style("display", "flex"), trait.style("justifyContent", "center"), onMount((el) => fadeInUp(el, 450)), tag.div(trait.style("display", "inline-flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("padding", "8px 16px"), trait.style("backgroundColor", surface_bg_code.$val), trait.style("borderRadius", radius_size_full.$val), trait.style("border", () => `1px solid ${border_color_cyan.val()}`, border_color_cyan), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", type_size_xs.$val), tag.span(trait.text("$"), trait.style("color", "#888888")), tag.span(trait.text("bun add @linttrap/oem"), trait.style("color", "#c7c7c7")), tag.button(trait.style("background", "none"), trait.style("border", "none"), trait.style("cursor", "pointer"), trait.style("color", text_fg_muted.$val), trait.style("display", "flex"), trait.style("padding", "2px"), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "color", () => accent_neon_cyan.val()), trait.styleOnEvent("mouseleave", "color", () => text_fg_muted.val()), trait.event("click", () => copyCode("bun add @linttrap/oem")), CopyIcon({ size: "12" }))))));
  var FeaturesGrid = tag.div(trait.style("maxWidth", "1100px"), trait.style("margin", "0 auto"), trait.style("paddingLeft", space_padding_md.$val), trait.style("paddingRight", space_padding_md.$val), trait.style("display", "grid"), trait.style("gridTemplateColumns", "1fr"), trait.style("gridTemplateColumns", "repeat(2, 1fr)", isDesktop.$test(true)), trait.style("gap", space_gap_sm.$val), ...FEATURES.map((feature, i) => tag.div(trait.style("display", "flex"), trait.style("gap", space_gap_sm.$val), trait.style("padding", space_padding_md.$val), trait.style("borderRadius", radius_size_sm.$val), trait.style("backgroundColor", surface_bg_card.$val), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "borderColor", () => border_color_accent.val()), trait.styleOnEvent("mouseleave", "borderColor", () => border_color_primary.val()), onMount((el) => fadeInUp(el, 80 + i * 60)), tag.div(trait.style("flexShrink", "0"), trait.style("width", "32px"), trait.style("height", "32px"), trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "center"), trait.style("borderRadius", radius_size_sm.$val), trait.style("background", () => `linear-gradient(135deg, ${accent_neon_purple.val()}22, ${accent_neon_pink.val()}22)`, accent_neon_purple, accent_neon_pink), ICON_MAP[feature.icon]?.({ size: "18", color: "#666666" }) || tag.span(trait.text("•"))), tag.div(tag.h4(trait.text(feature.title), trait.style("margin", "0"), trait.style("fontSize", type_size_sm.$val), trait.style("fontWeight", type_weight_semibold.$val), trait.style("color", text_fg_primary.$val), trait.style("marginBottom", "2px")), tag.p(trait.text(feature.description), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_secondary.$val), trait.style("lineHeight", "1.5"), trait.style("margin", "0"))))));
  var PhilosophySection = SectionContainer("philosophy", SectionTitle("Philosophy"), SectionSubtitle("Three composable primitives. Total transparency. Built for the age of AI."), tag.div(trait.style("display", "grid"), trait.style("gridTemplateColumns", "1fr"), trait.style("gridTemplateColumns", "repeat(2, 1fr)", isDesktop.$test(true)), trait.style("gap", space_gap_sm.$val), ...PHILOSOPHY_POINTS.map((point, i) => tag.div(trait.style("padding", space_padding_md.$val), trait.style("borderRadius", radius_size_md.$val), trait.style("backgroundColor", surface_bg_secondary.$val), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("backgroundImage", gradient_card.$val), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "transform", () => "translateY(-2px)"), trait.styleOnEvent("mouseleave", "transform", () => "translateY(0)"), onMount((el) => fadeInUp(el, i * 80)), tag.h3(trait.text(point.title), trait.style("margin", "0"), trait.style("fontSize", type_size_base.$val), trait.style("fontWeight", type_weight_semibold.$val), trait.style("color", text_fg_primary.$val), trait.style("marginBottom", space_padding_xs.$val)), tag.p(trait.text(point.body), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_secondary.$val), trait.style("lineHeight", "1.55"), trait.style("margin", "0"))))));
  var SetupSection = SectionContainer("setup", SectionTitle("Getting Started"), SectionSubtitle("Install and start building reactive UIs in seconds."), tag.div(trait.style("display", "grid"), trait.style("gridTemplateColumns", "1fr"), trait.style("gridTemplateColumns", "repeat(2, 1fr)", isDesktop.$test(true)), trait.style("gap", space_gap_lg.$val), trait.style("alignItems", "start"), tag.div(onMount((el) => fadeInUp(el, 100)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_sm.$val), tag.span(trait.text("01"), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", type_size_xs.$val), trait.style("color", accent_neon_pink.$val), trait.style("fontWeight", type_weight_bold.$val)), tag.span(trait.text("Install"), trait.style("fontSize", type_size_base.$val), trait.style("fontWeight", type_weight_semibold.$val), trait.style("color", text_fg_primary.$val))), CodeBlock(SETUP_CODE, "bash")), tag.div(onMount((el) => fadeInUp(el, 200)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_sm.$val), tag.span(trait.text("02"), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", type_size_xs.$val), trait.style("color", accent_neon_pink.$val), trait.style("fontWeight", type_weight_bold.$val)), tag.span(trait.text("Hello World"), trait.style("fontSize", type_size_base.$val), trait.style("fontWeight", type_weight_semibold.$val), trait.style("color", text_fg_primary.$val))), CodeBlock(HELLO_WORLD_CODE))), tag.div(trait.style("marginTop", space_padding_lg.$val), trait.style("padding", space_padding_md.$val), trait.style("borderRadius", radius_size_md.$val), trait.style("backgroundColor", surface_bg_secondary.$val), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("backgroundImage", gradient_card.$val), onMount((el) => fadeInUp(el, 300)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_sm.$val), tag.span(trait.text("03"), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", type_size_xs.$val), trait.style("color", accent_neon_cyan.$val), trait.style("fontWeight", type_weight_bold.$val)), tag.span(trait.text("Set Up the Agent"), trait.style("fontSize", type_size_base.$val), trait.style("fontWeight", type_weight_semibold.$val), trait.style("color", text_fg_primary.$val))), CodeBlock(AGENT_SETUP_CODE, "bash"), tag.p(trait.text(AGENT_SETUP_NOTE), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_secondary.$val), trait.style("lineHeight", "1.6"), trait.style("marginTop", space_padding_sm.$val), trait.style("marginBottom", "0"))));
  var PRIMITIVE_TABS = [
    { id: "element", label: "Element", desc: "The tag proxy creates real DOM nodes" },
    { id: "trait", label: "Trait", desc: "Behaviors applied to elements" },
    { id: "state", label: "State", desc: "Reactive containers with push-based updates" }
  ];
  function getPrimitiveCode(tab) {
    if (tab === "element")
      return PRIMITIVE_ELEMENT_CODE;
    if (tab === "trait")
      return PRIMITIVE_TRAIT_CODE;
    return PRIMITIVE_STATE_CODE;
  }
  var PrimitivesSection = SectionContainer("primitives", SectionTitle("The Three Primitives"), SectionSubtitle("Everything in OEM is built from Elements, Traits, and State. No components, no hooks, no lifecycle."), tag.div(trait.style("display", "inline-flex"), trait.style("gap", "4px"), trait.style("marginBottom", space_padding_md.$val), trait.style("padding", "3px"), trait.style("backgroundColor", surface_bg_tertiary.$val), trait.style("borderRadius", radius_size_md.$val), onMount((el) => fadeInUp(el, 100)), ...PRIMITIVE_TABS.map((tab) => tag.button(trait.text(tab.label), trait.style("padding", "6px 16px"), trait.style("border", "none"), trait.style("borderRadius", radius_size_sm.$val), trait.style("fontSize", type_size_xs.$val), trait.style("fontWeight", type_weight_medium.$val), trait.style("cursor", "pointer"), trait.style("transition", transition_fast.$val), trait.style("fontFamily", FONT_MONO), trait.style("backgroundColor", surface_bg_secondary.$val, primitiveTab.$test(tab.id)), trait.style("color", text_fg_primary.$val, primitiveTab.$test(tab.id)), trait.style("boxShadow", "0 1px 3px rgba(0,0,0,0.1)", primitiveTab.$test(tab.id)), trait.style("backgroundColor", "transparent", primitiveTab.$test((v) => v !== tab.id)), trait.style("color", text_fg_muted.$val, primitiveTab.$test((v) => v !== tab.id)), trait.style("boxShadow", "none", primitiveTab.$test((v) => v !== tab.id)), trait.event("click", $dispatch(setPrimitiveTab(tab.id))), trait.aria("role", "tab"), trait.aria("aria-selected", () => primitiveTab.val() === tab.id ? "true" : "false", primitiveTab)))), tag.p(trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_muted.$val), trait.style("margin", "0"), trait.style("marginBottom", space_padding_sm.$val), trait.style("fontStyle", "italic"), trait.innerHTML(() => {
    const tab = PRIMITIVE_TABS.find((t) => t.id === primitiveTab.val());
    return [tag.span(trait.text(tab?.desc || ""))];
  }, primitiveTab)), tag.div(trait.innerHTML(() => [CodeBlock(getPrimitiveCode(primitiveTab.val()))], primitiveTab)));
  var ExamplesSection = SectionContainer("examples", SectionTitle("Examples"), SectionSubtitle("Real patterns. Click to expand the code."), tag.div(trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("gap", space_gap_sm.$val), ...EXAMPLES.map((ex, i) => tag.div(trait.style("borderRadius", radius_size_md.$val), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("backgroundColor", surface_bg_secondary.$val), trait.style("overflow", "hidden"), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "borderColor", () => border_color_accent.val()), trait.styleOnEvent("mouseleave", "borderColor", () => border_color_primary.val()), onMount((el) => fadeInUp(el, i * 80)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("justifyContent", "space-between"), trait.style("padding", `${space_padding_sm.val()} ${space_padding_md.val()}`), trait.style("cursor", "pointer"), trait.style("userSelect", "none"), trait.event("click", $dispatch(toggleExample(i))), trait.aria("role", "button"), trait.aria("aria-expanded", () => expandedExamples.val().has(i) ? "true" : "false", expandedExamples), tag.div(trait.style("display", "flex"), trait.style("alignItems", "baseline"), trait.style("gap", space_gap_sm.$val), tag.span(trait.text(ex.title), trait.style("fontWeight", type_weight_semibold.$val), trait.style("color", text_fg_primary.$val), trait.style("fontSize", type_size_sm.$val)), tag.span(trait.text(ex.description), trait.style("color", text_fg_muted.$val), trait.style("fontSize", type_size_xs.$val))), tag.div(trait.style("transition", "transform 0.2s ease"), trait.style("transform", "rotate(0deg)"), trait.style("transform", "rotate(180deg)", expandedExamples.$test((v) => v.has(i))), trait.style("color", text_fg_muted.$val), trait.style("display", "flex"), ChevronDownIcon({ size: "16" }))), tag.div(trait.style("overflow", "hidden"), trait.style("transition", "max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)"), trait.style("maxHeight", "0px"), trait.style("maxHeight", "800px", expandedExamples.$test((v) => v.has(i))), tag.div(trait.style("padding", `0 ${space_padding_sm.val()} ${space_padding_sm.val()}`), CodeBlock(ex.code, ex.language)))))));
  var TraitsSection = SectionContainer("traits", SectionTitle("Built-in Traits"), SectionSubtitle(`${TRAIT_DOCS.length} reusable behaviors that give elements their abilities.`), tag.div(trait.style("display", "grid"), trait.style("gridTemplateColumns", "1fr"), trait.style("gridTemplateColumns", "repeat(2, 1fr)", isDesktop.$test(true)), trait.style("gap", space_gap_sm.$val), ...TRAIT_DOCS.map((t, i) => tag.div(trait.style("padding", space_padding_sm.$val), trait.style("paddingLeft", space_padding_md.$val), trait.style("borderRadius", radius_size_sm.$val), trait.style("backgroundColor", surface_bg_secondary.$val), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("transition", transition_fast.$val), trait.style("borderLeft", () => `3px solid ${accent_neon_cyan.val()}`, accent_neon_cyan), trait.styleOnEvent("mouseenter", "borderColor", () => border_color_cyan.val()), trait.styleOnEvent("mouseleave", "borderColor", () => border_color_primary.val()), onMount((el) => fadeInUp(el, i * 40)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "baseline"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", "2px"), tag.span(trait.text(t.name), trait.style("fontSize", type_size_xs.$val), trait.style("fontWeight", type_weight_semibold.$val), trait.style("color", accent_neon_cyan.$val), trait.style("fontFamily", FONT_MONO)), tag.span(trait.text(t.signature), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", "10px"), trait.style("color", text_fg_muted.$val))), tag.p(trait.text(t.description), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_secondary.$val), trait.style("lineHeight", "1.4"), trait.style("margin", "0"))))));
  var StatesSection = SectionContainer("states", SectionTitle("State Management"), SectionSubtitle(`${STATE_DOCS.length} reactive primitives. No prop drilling, no context, no stores.`), tag.div(trait.style("display", "grid"), trait.style("gridTemplateColumns", "1fr"), trait.style("gridTemplateColumns", "repeat(2, 1fr)", isDesktop.$test(true)), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_lg.$val), ...STATE_DOCS.map((s, i) => tag.div(trait.style("padding", space_padding_sm.$val), trait.style("paddingLeft", space_padding_md.$val), trait.style("borderRadius", radius_size_sm.$val), trait.style("backgroundColor", surface_bg_secondary.$val), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("transition", transition_fast.$val), trait.style("borderLeft", () => `3px solid ${accent_neon_purple.val()}`, accent_neon_purple), trait.styleOnEvent("mouseenter", "borderColor", () => border_color_accent.val()), trait.styleOnEvent("mouseleave", "borderColor", () => border_color_primary.val()), onMount((el) => fadeInUp(el, i * 40)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "baseline"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", "2px"), tag.span(trait.text(s.name), trait.style("fontSize", type_size_xs.$val), trait.style("fontWeight", type_weight_semibold.$val), trait.style("color", accent_neon_purple.$val), trait.style("fontFamily", FONT_MONO)), tag.span(trait.text(s.signature), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", "10px"), trait.style("color", text_fg_muted.$val))), tag.p(trait.text(s.description), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_secondary.$val), trait.style("lineHeight", "1.4"), trait.style("margin", "0"))))), tag.div(trait.style("padding", space_padding_md.$val), trait.style("borderRadius", radius_size_md.$val), trait.style("backgroundColor", surface_bg_secondary.$val), trait.style("border", () => `1px solid ${border_color_cyan.val()}`, border_color_cyan), trait.style("backgroundImage", gradient_card.$val), onMount((el) => fadeInUp(el, 400)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_sm.$val), tag.h4(trait.text("The $ Convention"), trait.style("margin", "0"), trait.style("fontSize", type_size_base.$val), trait.style("fontWeight", type_weight_semibold.$val), trait.style("color", text_fg_primary.$val))), tag.p(trait.text("Every State method has a $-prefixed twin that returns a closure instead of executing immediately. $val is both a getter and subscribable. $set/$reduce are thunks for event wiring. $test creates reactive conditions."), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_secondary.$val), trait.style("lineHeight", "1.5"), trait.style("margin", "0"), trait.style("marginBottom", space_padding_sm.$val)), CodeBlock(`const count = State(0);

// Direct vs deferred execution
count.set(5);                              // executes immediately
count.$set(5);                             // returns () => count.set(5)

// Wire to events — no wrapping lambdas needed
trait.event('click', count.$reduce(prev => prev + 1));

// $val — getter AND subscribable
trait.text(count.$val);                    // reactive text binding

// $test — reactive condition
trait.style('color', '#555555', count.$test(v => v > 0));`)));
  var ThemingSection = SectionContainer("theming", SectionTitle("Token-Driven Theming"), SectionSubtitle("Every visual value is a reactive token. Theme changes propagate instantly."), tag.div(trait.style("marginBottom", space_padding_md.$val), onMount((el) => fadeInUp(el, 100)), CodeBlock(`// Architecture
// useThemeState('light')   ← single source of truth
//       │
//       ├─▸ useTokenState('#c7c7c7', '#222', theme)  ← light/dark pair
//       └─▸ ...hundreds of tokens
//
// Tokens are State objects — traits subscribe via $val

const theme = useThemeState('light');
const bg = useTokenState('#c7c7c7', '#222222', theme);
trait.style('backgroundColor', bg.$val);  // reactive, zero flicker`)), tag.div(trait.style("padding", space_padding_md.$val), trait.style("borderRadius", radius_size_md.$val), trait.style("backgroundColor", surface_bg_secondary.$val), trait.style("border", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("backgroundImage", gradient_card.$val), onMount((el) => fadeInUp(el, 200)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_sm.$val), tag.span(trait.text("Naming: "), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_muted.$val)), tag.span(trait.text("<category>_<property>_<variant>"), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", type_size_xs.$val), trait.style("color", accent_neon_cyan.$val))), tag.div(trait.style("display", "grid"), trait.style("gridTemplateColumns", "repeat(2, 1fr)"), trait.style("gridTemplateColumns", "repeat(3, 1fr)", isDesktop.$test(true)), trait.style("gap", space_gap_sm.$val), ...[
    { token: "surface_bg_primary", desc: "Page background" },
    { token: "text_fg_secondary", desc: "Labels & descriptions" },
    { token: "border_color_accent", desc: "Focus ring" },
    { token: "space_padding_lg", desc: "24px padding" },
    { token: "type_weight_bold", desc: "700 weight" },
    { token: "transition_fast", desc: "150ms ease" }
  ].map((item) => tag.div(trait.style("padding", space_padding_xs.$val), trait.style("borderRadius", radius_size_sm.$val), trait.style("backgroundColor", surface_bg_code.$val), tag.div(trait.text(item.token), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", "10px"), trait.style("color", "#c7c7c7"), trait.style("marginBottom", "1px")), tag.div(trait.text(item.desc), trait.style("fontSize", "10px"), trait.style("color", "#888888")))))), tag.p(trait.text("Toggle the theme in the nav bar — every color on this page is a reactive token."), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_muted.$val), trait.style("fontStyle", "italic"), trait.style("marginTop", space_padding_md.$val), trait.style("marginBottom", "0")));
  function DependencyFlowSVG() {
    const boxW = 100;
    const boxH = 28;
    const gapX = 20;
    const gapY = 52;
    const fontSize = "9";
    const fontFamily = FONT_MONO;
    const nodeStroke = () => border_color_cyan.val();
    const nodeFill = () => surface_bg_code.val();
    const textFill = () => text_fg_muted.val();
    const arrowColor = () => text_fg_muted.val();
    const row0 = 30;
    const row1 = row0 + gapY;
    const row2 = row1 + gapY;
    const row3 = row2 + gapY;
    const row4 = row3 + gapY;
    const row5 = row4 + gapY;
    const row6 = row5 + gapY;
    const svgW = 560;
    const colCenter = svgW / 2;
    const colLeft = colCenter - boxW / 2 - gapX / 2 - boxW / 2;
    const colRight = colCenter + boxW / 2 + gapX / 2 + boxW / 2;
    const r3Span = 3 * (boxW + gapX);
    const r3Start = (svgW - r3Span) / 2;
    const r3c0 = r3Start;
    const r3c1 = r3Start + boxW + gapX;
    const r3c2 = r3Start + 2 * (boxW + gapX);
    const r3c3 = r3Start + 3 * (boxW + gapX);
    const svgH = row6 + boxH / 2 + 16;
    function nodeBox(cx, cy, label, color) {
      return [
        tag.rect(trait.attr("x", String(cx - boxW / 2)), trait.attr("y", String(cy - boxH / 2)), trait.attr("width", String(boxW)), trait.attr("height", String(boxH)), trait.attr("rx", "2"), trait.style("fill", nodeFill, surface_bg_code), trait.style("stroke", () => color, border_color_cyan), trait.attr("stroke-width", "1")),
        tag.text(trait.attr("x", String(cx)), trait.attr("y", String(cy)), trait.attr("text-anchor", "middle"), trait.attr("dominant-baseline", "central"), trait.style("fill", textFill, text_fg_primary), trait.style("fontSize", fontSize), trait.style("fontFamily", fontFamily), trait.text(label))
      ];
    }
    function arrow(x1, y1, x2, y2) {
      return tag.line(trait.attr("x1", String(x1)), trait.attr("y1", String(y1 + boxH / 2)), trait.attr("x2", String(x2)), trait.attr("y2", String(y2 - boxH / 2)), trait.style("stroke", arrowColor, text_fg_muted), trait.attr("stroke-width", "1"), trait.attr("marker-end", "url(#arrowhead)"));
    }
    function arrowHorizontal(x1, y1, x2, y2) {
      const fromX = x1 > x2 ? x1 - boxW / 2 : x1 + boxW / 2;
      const toX = x1 > x2 ? x2 + boxW / 2 : x2 - boxW / 2;
      return tag.line(trait.attr("x1", String(fromX)), trait.attr("y1", String(y1)), trait.attr("x2", String(toX)), trait.attr("y2", String(y2)), trait.style("stroke", arrowColor, text_fg_muted), trait.attr("stroke-width", "1"), trait.attr("marker-end", "url(#arrowhead)"));
    }
    const strokeVal = text_fg_muted.val();
    return tag.div(trait.style("padding", space_padding_md.$val), trait.style("borderRadius", radius_size_md.$val), trait.style("backgroundColor", surface_bg_code.$val), trait.style("border", () => `1px solid ${border_color_cyan.val()}`, border_color_cyan), trait.style("boxShadow", shadow_glow_cyan.$val), trait.style("overflow", "auto"), tag.svg(trait.attr("viewBox", `0 0 ${svgW} ${svgH}`), trait.style("width", "100%"), trait.style("height", "auto"), trait.style("display", "block"), tag.defs(tag.marker(trait.attr("id", "arrowhead"), trait.attr("markerWidth", "10"), trait.attr("markerHeight", "8"), trait.attr("refX", "10"), trait.attr("refY", "4"), trait.attr("orient", "auto"), tag.polygon(trait.attr("points", "0 0, 10 4, 0 8"), trait.style("fill", arrowColor, text_fg_muted)))), ...nodeBox(colCenter, row0, "types.ts", strokeVal), ...nodeBox(colLeft, row1, "constants.ts", strokeVal), ...nodeBox(colRight, row1, "config.ts", strokeVal), ...nodeBox(colLeft, row2, "data.ts", strokeVal), ...nodeBox(colRight, row2, "states.ts", strokeVal), ...nodeBox(colLeft, row3, "actions.ts", strokeVal), ...nodeBox(colRight, row3, "machines.ts", strokeVal), ...nodeBox(r3c0, row4, "theme.ts", strokeVal), ...nodeBox(r3c1, row4, "templates.ts", strokeVal), ...nodeBox(r3c2, row4, "traits.ts", strokeVal), ...nodeBox(r3c3, row4, "icons.ts", strokeVal), ...nodeBox(colCenter, row5, "ui.ts", strokeVal), ...nodeBox(colCenter, row6, "main.ts", strokeVal), arrow(colCenter, row0, colLeft, row1), arrow(colCenter, row0, colRight, row1), arrow(colLeft, row1, colLeft, row2), arrow(colRight, row1, colRight, row2), arrow(colLeft, row2, colLeft, row3), arrow(colRight, row2, colRight, row3), arrowHorizontal(colRight, row3, colLeft, row3), arrow(colLeft, row3, r3c0, row4), arrow(colRight, row3, r3c1, row4), arrow(colRight, row3, r3c2, row4), arrow(r3c0, row4, colCenter, row5), arrow(r3c1, row4, colCenter, row5), arrow(r3c2, row4, colCenter, row5), arrow(r3c3, row4, colCenter, row5), arrow(colCenter, row5, colCenter, row6)));
  }
  var ARCH_LAYERS = [
    {
      label: "Foundation",
      color: "#888888",
      files: ARCH_FILES.filter((f) => ["types.ts", "constants.ts", "data.ts"].includes(f.name))
    },
    {
      label: "State & Logic",
      color: accent_neon_purple.val(),
      files: ARCH_FILES.filter((f) => ["states.ts", "actions.ts", "machines.ts"].includes(f.name))
    },
    {
      label: "Presentation",
      color: accent_neon_cyan.val(),
      files: ARCH_FILES.filter((f) => ["theme.ts", "templates.ts", "traits.ts", "icons.ts"].includes(f.name))
    },
    {
      label: "Assembly",
      color: accent_neon_pink.val(),
      files: ARCH_FILES.filter((f) => ["ui.ts", "main.ts"].includes(f.name))
    }
  ];
  var ArchitectureSection = SectionContainer("architecture", SectionTitle("File Architecture"), SectionSubtitle("One file per concern. Strict separation. LLM-friendly."), tag.div(trait.style("display", "flex"), trait.style("flexDirection", "column"), trait.style("gap", space_gap_md.$val), trait.style("marginBottom", space_padding_lg.$val), ...ARCH_LAYERS.map((layer, li) => tag.div(onMount((el) => fadeInUp(el, li * 100)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_xs.$val), tag.div(trait.style("width", "8px"), trait.style("height", "8px"), trait.style("borderRadius", radius_size_full.$val), trait.style("backgroundColor", layer.color), trait.style("flexShrink", "0")), tag.span(trait.text(layer.label), trait.style("fontSize", type_size_xs.$val), trait.style("fontWeight", type_weight_bold.$val), trait.style("color", text_fg_muted.$val), trait.style("textTransform", "uppercase"), trait.style("letterSpacing", "0.08em"))), tag.div(trait.style("display", "grid"), trait.style("gridTemplateColumns", "1fr"), trait.style("gridTemplateColumns", "repeat(auto-fill, minmax(280px, 1fr))", isDesktop.$test(true)), trait.style("gap", "6px"), trait.style("paddingLeft", "18px"), trait.style("borderLeft", `2px solid ${layer.color}22`), ...layer.files.map((file) => tag.div(trait.style("display", "flex"), trait.style("alignItems", "baseline"), trait.style("gap", space_gap_sm.$val), trait.style("padding", `${space_padding_xs.val()} ${space_padding_sm.val()}`), trait.style("borderRadius", radius_size_sm.$val), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "backgroundColor", () => surface_bg_tertiary.val()), trait.styleOnEvent("mouseleave", "backgroundColor", () => "transparent"), tag.span(trait.text(file.name), trait.style("fontFamily", FONT_MONO), trait.style("fontSize", type_size_xs.$val), trait.style("color", layer.color), trait.style("fontWeight", type_weight_bold.$val), trait.style("flexShrink", "0")), tag.span(trait.text(file.purpose), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_secondary.$val), trait.style("lineHeight", "1.4"))))), ...li < ARCH_LAYERS.length - 1 ? [
    tag.div(trait.style("display", "flex"), trait.style("justifyContent", "center"), trait.style("padding", `${space_padding_xs.val()} 0`), trait.style("color", text_fg_muted.$val), trait.style("fontSize", type_size_sm.$val), trait.style("opacity", "0.4"), trait.text("↓"))
  ] : []))), tag.div(onMount((el) => fadeInUp(el, 500)), tag.div(trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", space_gap_sm.$val), trait.style("marginBottom", space_padding_sm.$val), tag.span(trait.text("Dependency Flow"), trait.style("fontSize", type_size_xs.$val), trait.style("fontWeight", type_weight_bold.$val), trait.style("color", text_fg_muted.$val), trait.style("textTransform", "uppercase"), trait.style("letterSpacing", "0.08em")), tag.span(trait.text("— drawn with OEM!"), trait.style("fontSize", "10px"), trait.style("color", accent_neon_cyan.$val), trait.style("fontStyle", "italic"))), DependencyFlowSVG()));
  var Footer = tag.footer(trait.style("borderTop", () => `1px solid ${border_color_primary.val()}`, border_color_primary), trait.style("padding", space_padding_lg.$val), trait.style("textAlign", "center"), tag.div(trait.style("maxWidth", "1100px"), trait.style("margin", "0 auto"), trait.style("display", "flex"), trait.style("justifyContent", "center"), trait.style("alignItems", "center"), trait.style("gap", space_gap_lg.$val), tag.a(trait.attr("href", "https://github.com/linttrapmedia/oem"), trait.attr("target", "_blank"), trait.attr("rel", "noopener"), trait.style("color", text_fg_secondary.$val), trait.style("textDecoration", "none"), trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", "4px"), trait.style("fontSize", type_size_xs.$val), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "color", () => accent_neon_pink.val()), trait.styleOnEvent("mouseleave", "color", () => text_fg_secondary.val()), GitHubIcon({ size: "14" }), tag.span(trait.text("GitHub"))), tag.a(trait.attr("href", "https://www.npmjs.com/package/@linttrap/oem"), trait.attr("target", "_blank"), trait.attr("rel", "noopener"), trait.style("color", text_fg_secondary.$val), trait.style("textDecoration", "none"), trait.style("display", "flex"), trait.style("alignItems", "center"), trait.style("gap", "4px"), trait.style("fontSize", type_size_xs.$val), trait.style("transition", transition_fast.$val), trait.styleOnEvent("mouseenter", "color", () => accent_neon_pink.val()), trait.styleOnEvent("mouseleave", "color", () => text_fg_secondary.val()), NpmIcon({ size: "14" }), tag.span(trait.text("npm"))), tag.span(trait.text("Built with OEM"), trait.style("fontSize", type_size_xs.$val), trait.style("color", text_fg_muted.$val))));
  var app = tag.div(trait.style("position", "relative"), trait.style("minHeight", "100vh"), tag.div(trait.style("position", "fixed"), trait.style("inset", "0"), trait.style("backgroundImage", gradient_hero.$val), trait.style("pointerEvents", "none"), trait.style("zIndex", "0")), tag.div(trait.style("position", "relative"), trait.style("zIndex", "1"), NavBar, MobileNavBackdrop, MobileNav, tag.div(trait.style("height", "48px")), HeroSection, FeaturesGrid, PhilosophySection, SetupSection, PrimitivesSection, ExamplesSection, TraitsSection, StatesSection, ThemingSection, ArchitectureSection, Footer), Toast, Dialog);

  // www/main.ts
  tag.$(document.body)(trait.style("margin", "0"), trait.style("padding", "0"), trait.style("fontFamily", FONT_DISPLAY), trait.style("backgroundColor", surface_bg_primary.$val), trait.style("color", text_fg_primary.$val), trait.style("minHeight", "100vh"), trait.style("height", "auto"), trait.style("overflow", "visible"), trait.style("overflowX", "hidden"), trait.style("display", "block"), trait.style("transition", transition_medium.$val), app);
})();

//# debugId=A3F79300B8DC4F3064756E2164756E21
//# sourceMappingURL=main.js.map
