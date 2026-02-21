import {
  Template,
  useEventTrait,
  useStyleTrait,
  useTextContentTrait,
  useInnerHTMLTrait,
  useAttributeTrait,
  useClassNameTrait,
} from '../src/registry';
import { $test } from '../src/registry';

import {
  currentPage,
  isDarkMode,
  sidebarOpen,
  searchQuery,
  searchOpen,
  tocActive,
  expandedSections,
} from './state';

import {
  navItems,
  flatPages,
  renderPage,
  searchPages,
  type NavItem,
} from './content';

import { renderPromptWizard } from './wizard';
import { renderBDDManager } from './bdd';

// ─── Template ────────────────────────────────────────────────────────────────

const [tag, trait] = Template({
  event: useEventTrait,
  style: useStyleTrait,
  text:  useTextContentTrait,
  html:  useInnerHTMLTrait,
  attr:  useAttributeTrait,
  cls:   useClassNameTrait,
});

// ─── Navigation helpers ───────────────────────────────────────────────────────

function navigate(pageId: string) {
  currentPage.set(pageId);
  history.pushState({ pageId }, '', `#${pageId}`);
  // close mobile sidebar
  sidebarOpen.set(false);
  // scroll content to top
  const main = document.querySelector('.oem-main');
  if (main) main.scrollTop = 0;
}

function getSectionId(pageId: string): string {
  return pageId.split('/')[0] ?? '';
}

function getBreadcrumbs(pageId: string): { label: string; id: string }[] {
  const sectionId = getSectionId(pageId);
  const section = navItems.find(s => s.id === sectionId);
  const page = section?.children?.find(p => p.id === pageId);
  if (!section || !page) return [];
  return [
    { label: 'Home', id: 'introduction/what-is-oem' },
    { label: section.title, id: section.children![0].id },
    { label: page.title, id: page.id },
  ];
}

function getPrevNext(pageId: string): {
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
} {
  const idx = flatPages.findIndex(p => p.id === pageId);
  return {
    prev: idx > 0 ? flatPages[idx - 1] ?? null : null,
    next: idx < flatPages.length - 1 ? flatPages[idx + 1] ?? null : null,
  };
}

// ─── TOC extraction ───────────────────────────────────────────────────────────

function extractTOC(el: HTMLElement): { id: string; text: string; level: number }[] {
  const headings = el.querySelectorAll<HTMLElement>('h2[id], h3[id]');
  return Array.from(headings).map(h => ({
    id: h.id,
    text: h.textContent ?? '',
    level: h.tagName === 'H3' ? 3 : 2,
  }));
}

// ─── Header ───────────────────────────────────────────────────────────────────

function buildHeader(): HTMLElement {
  const header = tag.header(
    trait.cls('oem-header'),
  );

  // Mobile menu button
  const menuBtn = tag.button(
    trait.cls('oem-header__menu-btn'),
    trait.event('click', () => sidebarOpen.reduce(v => !v)),
    trait.text('☰'),
  );
  header.appendChild(menuBtn);

  // Logo
  const logo = tag.a(
    trait.cls('oem-header__logo'),
    trait.attr('href', '#introduction/what-is-oem'),
    trait.event('click', (e) => {
      e.preventDefault();
      navigate('introduction/what-is-oem');
    }),
  );
  const img = tag.img(
    trait.attr('src', 'assets/favicon.svg'),
    trait.attr('alt', 'OEM'),
  );
  logo.appendChild(img);
  logo.appendChild(document.createTextNode(' OEM'));
  header.appendChild(logo);

  // Search wrapper
  const searchWrap = tag.div(trait.cls('oem-header__search'));
  const searchIcon = tag.span(trait.cls('oem-header__search-icon'), trait.text('⌕'));
  const searchInput = tag.input(
    trait.attr('type', 'text'),
    trait.attr('placeholder', 'Search docs...'),
    trait.attr('id', 'search-input'),
  ) as HTMLInputElement;

  searchInput.addEventListener('input', () => {
    searchQuery.set(searchInput.value);
    searchOpen.set(searchInput.value.trim().length > 0);
    renderSearchResults();
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      searchOpen.set(true);
      renderSearchResults();
    }
  });

  const kbdHint = tag.span(trait.cls('oem-header__search-kbd'), trait.text('⌘K'));

  const resultsEl = tag.div(trait.cls('oem-search-results'));
  resultsEl.style.display = 'none';

  function renderSearchResults() {
    resultsEl.innerHTML = '';
    const q = searchQuery.val();
    if (!q.trim()) { resultsEl.style.display = 'none'; return; }
    resultsEl.style.display = 'block';

    const results = searchPages(q);
    if (results.length === 0) {
      const empty = tag.div(
        trait.cls('oem-search-results__empty'),
        trait.text(`No results for "${q}"`),
      );
      resultsEl.appendChild(empty);
      return;
    }
    for (const r of results) {
      const item = tag.div(trait.cls('oem-search-result-item'));
      item.innerHTML = `
        <div class="oem-search-result-item__title">${r.title}</div>
        <div class="oem-search-result-item__path">${r.section} › ${r.title}</div>`;
      item.addEventListener('click', () => {
        navigate(r.id);
        searchInput.value = '';
        searchQuery.set('');
        searchOpen.set(false);
        resultsEl.style.display = 'none';
      });
      resultsEl.appendChild(item);
    }
  }

  searchOpen.sub(open => {
    resultsEl.style.display = open ? 'block' : 'none';
  });

  searchWrap.appendChild(searchIcon);
  searchWrap.appendChild(searchInput);
  searchWrap.appendChild(kbdHint);
  searchWrap.appendChild(resultsEl);
  header.appendChild(searchWrap);

  // Actions
  const actions = tag.div(trait.cls('oem-header__actions'));

  // Theme toggle
  const themeBtn = tag.button(
    trait.cls('oem-header__btn'),
    trait.text(() => isDarkMode.val() ? '☀' : '🌙', isDarkMode),
    trait.attr('title', 'Toggle theme'),
    trait.event('click', () => {
      isDarkMode.reduce(v => !v);
      document.body.classList.toggle('dark', isDarkMode.val());
    }),
  );

  // GitHub link
  const ghBtn = tag.a(
    trait.cls('oem-header__btn'),
    trait.attr('href', 'https://github.com/linttrapmedia/oem'),
    trait.attr('target', '_blank'),
    trait.attr('title', 'GitHub'),
    trait.text('⎇'),
  );

  actions.appendChild(themeBtn);
  actions.appendChild(ghBtn);
  header.appendChild(actions);

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchWrap.contains(e.target as Node)) {
      searchOpen.set(false);
    }
  });

  // Cmd+K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    if (e.key === 'Escape') {
      searchOpen.set(false);
      searchInput.blur();
    }
  });

  return header;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function buildSidebar(): HTMLElement {
  const sidebar = tag.nav();
  sidebar.className = 'oem-sidebar';

  sidebarOpen.sub(open => {
    sidebar.classList.toggle('open', open);
  });

  function renderSidebar() {
    sidebar.innerHTML = '';
    const page = currentPage.val();
    const expanded = expandedSections.val();

    for (const section of navItems) {
      const sectionEl = tag.div(trait.cls('oem-sidebar__section'));

      // Section header button
      const sectionBtn = tag.button(trait.cls('oem-sidebar__section-btn'));
      const arrow = tag.span(trait.cls('oem-sidebar__section-arrow'));
      const isOpen = expanded.has(section.id);
      arrow.textContent = '▶';
      if (isOpen) arrow.classList.add('open');
      sectionBtn.appendChild(document.createTextNode(section.title));
      sectionBtn.appendChild(arrow);

      sectionBtn.addEventListener('click', () => {
        expandedSections.reduce(set => {
          const next = new Set(set);
          if (next.has(section.id)) next.delete(section.id);
          else next.add(section.id);
          return next;
        });
      });

      sectionEl.appendChild(sectionBtn);

      // Children
      const childrenEl = tag.div(trait.cls('oem-sidebar__children'));
      childrenEl.style.display = isOpen ? 'block' : 'none';

      if (section.children) {
        for (const child of section.children) {
          const link = tag.div(trait.cls('oem-sidebar__link'));
          link.textContent = child.title;
          if (child.id === page) link.classList.add('active');
          link.addEventListener('click', () => navigate(child.id));
          childrenEl.appendChild(link);
        }
      }

      sectionEl.appendChild(childrenEl);
      sidebar.appendChild(sectionEl);
    }
  }

  currentPage.sub(() => {
    // Auto-expand current section
    const sectionId = getSectionId(currentPage.val());
    expandedSections.reduce(set => {
      const next = new Set(set);
      next.add(sectionId);
      return next;
    });
    renderSidebar();
  });

  expandedSections.sub(renderSidebar);
  renderSidebar();

  return sidebar;
}

// ─── TOC ──────────────────────────────────────────────────────────────────────

function buildTOC(): HTMLElement {
  const toc = tag.div(trait.cls('oem-toc'));

  function renderTOC(headings: { id: string; text: string; level: number }[]) {
    toc.innerHTML = '';
    if (headings.length === 0) return;

    const title = tag.div(trait.cls('oem-toc__title'), trait.text('On this page'));
    toc.appendChild(title);

    for (const h of headings) {
      const link = tag.div();
      link.className = 'oem-toc__link' + (h.level === 3 ? ' oem-toc__link--h3' : '');
      link.textContent = h.text;
      if (h.id === tocActive.val()) link.classList.add('active');
      link.addEventListener('click', () => {
        document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        tocActive.set(h.id);
      });
      toc.appendChild(link);
    }
  }

  currentPage.sub(() => {
    // wait for content to render
    setTimeout(() => {
      const contentEl = document.querySelector<HTMLElement>('.oem-content');
      if (contentEl) renderTOC(extractTOC(contentEl));
    }, 50);
  });

  tocActive.sub(() => {
    toc.querySelectorAll('.oem-toc__link').forEach(el => {
      el.classList.toggle('active', el.textContent === document.getElementById(tocActive.val())?.textContent);
    });
  });

  return toc;
}

// ─── Content area ─────────────────────────────────────────────────────────────

function buildContent(): HTMLElement {
  const contentEl = tag.div(trait.cls('oem-content'));

  function renderContent() {
    contentEl.innerHTML = '';
    const page = currentPage.val();

    // Breadcrumbs
    const crumbs = getBreadcrumbs(page);
    if (crumbs.length > 1) {
      const breadcrumb = tag.nav(trait.cls('oem-breadcrumb'));
      crumbs.forEach((c, i) => {
        if (i > 0) {
          breadcrumb.appendChild(tag.span(trait.cls('oem-breadcrumb__sep'), trait.text('/')));
        }
        if (i === crumbs.length - 1) {
          const last = tag.span();
          last.textContent = c.label;
          last.style.color = '#a3a3a3';
          breadcrumb.appendChild(last);
        } else {
          const item = tag.span(trait.cls('oem-breadcrumb__item'));
          item.textContent = c.label;
          item.addEventListener('click', () => navigate(c.id));
          breadcrumb.appendChild(item);
        }
      });
      contentEl.appendChild(breadcrumb);
    }

    // Render the page content
    let pageContent: HTMLElement;
    if (page === 'prompts/wizard') {
      pageContent = renderPromptWizard();
    } else if (page === 'prompts/bdd') {
      pageContent = buildBDDPage();
    } else {
      pageContent = renderPage(page);
    }
    contentEl.appendChild(pageContent);

    // Prev/Next
    const { prev, next } = getPrevNext(page);
    if (prev || next) {
      const nav = tag.nav(trait.cls('oem-page-nav'));
      if (prev) {
        const prevBtn = tag.button(trait.cls('oem-page-nav__btn'));
        prevBtn.innerHTML = `<span class="oem-page-nav__label">← Previous</span><span class="oem-page-nav__title">${prev.title}</span>`;
        prevBtn.addEventListener('click', () => navigate(prev.id));
        nav.appendChild(prevBtn);
      }
      if (next) {
        const nextBtn = tag.button(trait.cls('oem-page-nav__btn oem-page-nav__btn--next'));
        nextBtn.innerHTML = `<span class="oem-page-nav__label">Next →</span><span class="oem-page-nav__title">${next.title}</span>`;
        nextBtn.addEventListener('click', () => navigate(next.id));
        nav.appendChild(nextBtn);
      }
      contentEl.appendChild(nav);
    }

    // Update TOC (after content is in DOM)
    setTimeout(() => {
      const headings = extractTOC(contentEl);
      const tocEl = document.querySelector('.oem-toc');
      if (tocEl) {
        (tocEl as HTMLElement).innerHTML = '';
        if (headings.length > 0) {
          const title = document.createElement('div');
          title.className = 'oem-toc__title';
          title.textContent = 'On this page';
          tocEl.appendChild(title);
          headings.forEach(h => {
            const link = document.createElement('div');
            link.className = 'oem-toc__link' + (h.level === 3 ? ' oem-toc__link--h3' : '');
            link.textContent = h.text;
            link.addEventListener('click', () => {
              document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              tocActive.set(h.id);
              tocEl.querySelectorAll('.oem-toc__link').forEach(el => el.classList.remove('active'));
              link.classList.add('active');
            });
            tocEl.appendChild(link);
          });
        }
      }
    }, 50);

    // Scroll-spy for TOC
    setupScrollSpy(contentEl);
  }

  currentPage.sub(renderContent);
  renderContent();

  return contentEl;
}

function buildBDDPage(): HTMLElement {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>BDD Manager</h1>
    <p class="page-subtitle">Create, edit, and manage Gherkin-format BDD scenarios for your prompts.</p>
    <h2 id="what-is-bdd">What is BDD?</h2>
    <p>Behaviour-Driven Development (BDD) scenarios use <strong>Gherkin</strong> syntax to describe expected application behavior in plain English. They serve as living documentation and acceptance tests.</p>
    <blockquote>
      <strong>Given</strong> a precondition<br>
      <strong>When</strong> an action occurs<br>
      <strong>Then</strong> an outcome is expected<br>
      <strong>And</strong> additional conditions hold
    </blockquote>
    <h2 id="manager">Manage Scenarios</h2>`;
  c.appendChild(renderBDDManager());
  return c;
}

// ─── Scroll-spy ───────────────────────────────────────────────────────────────

function setupScrollSpy(contentEl: HTMLElement) {
  const main = document.querySelector('.oem-main');
  if (!main) return;

  const handler = () => {
    const headings = contentEl.querySelectorAll<HTMLElement>('h2[id], h3[id]');
    let active = '';
    for (const h of Array.from(headings)) {
      if (h.getBoundingClientRect().top < 120) active = h.id;
    }
    if (active !== tocActive.val()) {
      tocActive.set(active);
      document.querySelectorAll('.oem-toc__link').forEach(el => {
        const id = (el as HTMLElement).dataset['id'];
        el.classList.toggle('active', id === active);
      });
    }
  };

  main.addEventListener('scroll', handler, { passive: true });
}

// ─── Mobile sidebar backdrop ───────────────────────────────────────────────────

function buildBackdrop(): HTMLElement {
  const backdrop = tag.div(trait.cls('oem-backdrop'));
  backdrop.addEventListener('click', () => sidebarOpen.set(false));
  sidebarOpen.sub(open => backdrop.classList.toggle('open', open));
  return backdrop;
}

// ─── App Assembly ─────────────────────────────────────────────────────────────

function buildApp(): void {
  const root = document.getElementById('root');
  if (!root) return;

  // Init dark mode from system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.set(true);
    document.body.classList.add('dark');
  }

  // Init route from URL hash
  const hash = window.location.hash.slice(1);
  if (hash && flatPages.some(p => p.id === hash)) {
    currentPage.set(hash);
    const sectionId = getSectionId(hash);
    expandedSections.reduce(set => { const n = new Set(set); n.add(sectionId); return n; });
  }

  // Browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state?.pageId) currentPage.set(e.state.pageId);
  });

  // Header
  root.appendChild(buildHeader());

  // Body
  const body = tag.div(trait.cls('oem-body'));

  body.appendChild(buildBackdrop());
  body.appendChild(buildSidebar());

  // Main = content + TOC
  const main = tag.div(trait.cls('oem-main'));
  main.appendChild(buildContent());
  main.appendChild(buildTOC());

  body.appendChild(main);
  root.appendChild(body);
}

buildApp();
