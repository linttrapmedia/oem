import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

type TabProps = {
  title: string;
  selected?: boolean;
  content: () => HTMLElement;
};

export const Tabs = (...tabs: TabProps[]) => {
  // state
  const tabsState = State.Atom<TabProps[]>(tabs);

  // template
  const html = Template.Html({
    style: Trait.Style,
    style_on_hover: Trait.StyleOnHover,
    on_click: Trait.OnClick,
    on_tabs_state_change: Trait.Atom(tabsState, Trait.InnerHtml),
  });

  // handlers
  const onClick = (tab: TabProps) =>
    tabsState.set(tabsState.get().map((t) => ({ ...t, selected: tab.title === t.title })));

  // renderers

  const renderTabs = () => {
    return tabsState
      .get()
      .map((t) =>
        html(
          'div',
          ['on_click', onClick.bind(null, t)],
          ['style_on_hover', 'color', Theme.Color('white')],
          ['style', 'borderBottom', '0', () => !t.selected],
          ['style', 'borderBottom', `3px solid ${Theme.Color('white')}`, () => t.selected],
          ['style', 'color', Theme.Color('white', 0, 0.5), () => !t.selected],
          ['style', 'color', Theme.Color('white', 0), () => t.selected],
          ['style', 'cursor', 'pointer'],
          ['style', 'fontWeight', 'bold', () => t.selected],
          ['style', 'fontWeight', 'normal', () => !t.selected],
          ['style', 'padding', '10px'],
        )(t.title),
      );
  };

  const renderContent = () =>
    html('div', ['style', 'paddingTop', '20px'])(
      tabsState
        .get()
        .filter((t) => t.selected)[0]
        .content() ?? null,
    );

  return html('div')(
    // Tabs
    html(
      'div',
      ['on_tabs_state_change', renderTabs],
      ['style', 'borderBottom', `1px solid ${Theme.Color('white', 0, 0.2)}`],
      ['style', 'display', 'flex'],
    )(...renderTabs()),

    // Content
    html('div', ['on_tabs_state_change', renderContent])(renderContent()),
  );
};
