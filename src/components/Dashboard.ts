import {
  Condition,
  extractConditions,
  extractStates,
  State,
  StateType,
  Template,
  useAttributeTrait,
  useClassNameTrait,
  useEventTrait,
  useInnerHTMLTrait,
  useMediaQueryState,
  useStyleTrait,
} from '@/registry';

// ---------------------------------------------------------------------------
// Custom Trait: SVG Attribute (for chart rendering on SVG elements)
// ---------------------------------------------------------------------------

function useSvgAttrTrait(
  el: HTMLElement | SVGElement,
  prop: string,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(val, ...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies && _val !== undefined) {
      el.setAttribute(prop, String(_val));
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}

// ---------------------------------------------------------------------------
// Custom Trait: Tooltip (shows text on hover via title attribute)
// ---------------------------------------------------------------------------

function useTooltipTrait(
  el: HTMLElement,
  text: string | (() => string),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(text, ...rest);
  const apply = () => {
    const _text = typeof text === 'function' ? text() : text;
    el.setAttribute('title', _text);
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}

// ---------------------------------------------------------------------------
// Template Configuration
// ---------------------------------------------------------------------------

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
  attr: useAttributeTrait,
  class: useClassNameTrait,
  svgAttr: useSvgAttrTrait,
  tooltip: useTooltipTrait,
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DashboardTheme = {
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryLight: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  border: string;
  shadow: string;
  shadowHover: string;
  gradient: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarActive: string;
  headerBg: string;
  radius: string;
  radiusLg: string;
  font: string;
};

type NavItem = {
  icon: string;
  label: string;
  id: string;
  badge?: number;
};

type StatCard = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
};

type Activity = {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  type: 'commit' | 'deploy' | 'alert' | 'comment' | 'merge';
};

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
};

type ChartDataPoint = {
  label: string;
  value: number;
};

type DashboardConfig = {
  theme?: Partial<DashboardTheme>;
  title?: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  navItems?: NavItem[];
  stats?: StatCard[];
  chartData?: ChartDataPoint[];
  revenueData?: ChartDataPoint[];
  activities?: Activity[];
  notifications?: Notification[];
  showSidebar?: boolean;
  showHeader?: boolean;
  showNotifications?: boolean;
};

// ---------------------------------------------------------------------------
// Default Theme
// ---------------------------------------------------------------------------

const DEFAULT_THEME: DashboardTheme = {
  bg: '#0f172a',
  surface: '#1e293b',
  surfaceAlt: '#334155',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  primary: '#6366f1',
  primaryLight: '#818cf8',
  accent: '#22d3ee',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  border: '#334155',
  shadow: '0 1px 3px rgba(0,0,0,0.3)',
  shadowHover: '0 8px 25px rgba(0,0,0,0.4)',
  gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
  sidebarBg: '#0f172a',
  sidebarText: '#94a3b8',
  sidebarActive: '#6366f1',
  headerBg: '#1e293b',
  radius: '8px',
  radiusLg: '12px',
  font: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// ---------------------------------------------------------------------------
// Default Data
// ---------------------------------------------------------------------------

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { icon: '\u{1F4CA}', label: 'Overview', id: 'overview' },
  { icon: '\u{1F4C8}', label: 'Analytics', id: 'analytics', badge: 3 },
  { icon: '\u{1F465}', label: 'Users', id: 'users' },
  { icon: '\u{1F4E6}', label: 'Products', id: 'products' },
  { icon: '\u{1F4B3}', label: 'Transactions', id: 'transactions', badge: 12 },
  { icon: '\u{2699}\u{FE0F}', label: 'Settings', id: 'settings' },
];

const DEFAULT_STATS: StatCard[] = [
  { label: 'Total Revenue', value: '$48,295', change: '+12.5%', trend: 'up', icon: '\u{1F4B0}' },
  { label: 'Active Users', value: '2,847', change: '+8.2%', trend: 'up', icon: '\u{1F465}' },
  { label: 'Conversion Rate', value: '3.24%', change: '-0.4%', trend: 'down', icon: '\u{1F4C9}' },
  {
    label: 'Avg. Session',
    value: '4m 32s',
    change: '+1.1%',
    trend: 'up',
    icon: '\u{23F1}\u{FE0F}',
  },
];

const DEFAULT_CHART_DATA: ChartDataPoint[] = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 78 },
  { label: 'Wed', value: 52 },
  { label: 'Thu', value: 91 },
  { label: 'Fri', value: 83 },
  { label: 'Sat', value: 42 },
  { label: 'Sun', value: 67 },
];

const DEFAULT_REVENUE_DATA: ChartDataPoint[] = [
  { label: 'Jan', value: 4200 },
  { label: 'Feb', value: 3800 },
  { label: 'Mar', value: 5100 },
  { label: 'Apr', value: 4600 },
  { label: 'May', value: 6200 },
  { label: 'Jun', value: 5800 },
  { label: 'Jul', value: 7100 },
  { label: 'Aug', value: 6500 },
  { label: 'Sep', value: 7400 },
  { label: 'Oct', value: 6900 },
  { label: 'Nov', value: 8200 },
  { label: 'Dec', value: 9100 },
];

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: '1',
    user: 'Sarah Chen',
    avatar: 'SC',
    action: 'deployed',
    target: 'v2.4.1 to production',
    time: '2 min ago',
    type: 'deploy',
  },
  {
    id: '2',
    user: 'Marcus Rivera',
    avatar: 'MR',
    action: 'merged',
    target: 'PR #847 into main',
    time: '15 min ago',
    type: 'merge',
  },
  {
    id: '3',
    user: 'Aisha Patel',
    avatar: 'AP',
    action: 'commented on',
    target: 'Issue #312',
    time: '32 min ago',
    type: 'comment',
  },
  {
    id: '4',
    user: 'James Okonkwo',
    avatar: 'JO',
    action: 'pushed',
    target: '3 commits to feature/auth',
    time: '1 hr ago',
    type: 'commit',
  },
  {
    id: '5',
    user: 'Elena Volkov',
    avatar: 'EV',
    action: 'triggered',
    target: 'high CPU alert on node-03',
    time: '2 hr ago',
    type: 'alert',
  },
  {
    id: '6',
    user: 'Dev Kapoor',
    avatar: 'DK',
    action: 'deployed',
    target: 'hotfix-2.4.2 to staging',
    time: '3 hr ago',
    type: 'deploy',
  },
];

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Deployment Complete',
    message: 'v2.4.1 successfully deployed to all regions.',
    time: '2 min ago',
    read: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'CPU Usage Alert',
    message: 'Node-03 CPU usage exceeded 90% threshold.',
    time: '18 min ago',
    read: false,
    type: 'warning',
  },
  {
    id: '3',
    title: 'New Team Member',
    message: 'Elena Volkov has joined the platform team.',
    time: '1 hr ago',
    read: true,
    type: 'info',
  },
  {
    id: '4',
    title: 'Build Failed',
    message: 'CI pipeline failed on branch feature/payments.',
    time: '2 hr ago',
    read: false,
    type: 'error',
  },
  {
    id: '5',
    title: 'Database Backup',
    message: 'Nightly backup completed. 2.4GB archived.',
    time: '6 hr ago',
    read: true,
    type: 'info',
  },
];

// ---------------------------------------------------------------------------
// Dashboard Component
// ---------------------------------------------------------------------------

const activePage = State<string>('overview');

setTimeout(() => {
  activePage.set('hello');
}, 1000);

export function Dashboard(config: DashboardConfig = {}) {
  const theme: DashboardTheme = { ...DEFAULT_THEME, ...config.theme };
  const title = config.title ?? 'Command Center';
  const subtitle = config.subtitle ?? 'Real-time operational dashboard';
  const userName = config.userName ?? 'Alex Morgan';
  const userRole = config.userRole ?? 'Admin';
  const navItems = config.navItems ?? DEFAULT_NAV_ITEMS;
  const initialStats = config.stats ?? DEFAULT_STATS;
  const initialChartData = config.chartData ?? DEFAULT_CHART_DATA;
  const initialRevenueData = config.revenueData ?? DEFAULT_REVENUE_DATA;
  const initialActivities = config.activities ?? DEFAULT_ACTIVITIES;
  const initialNotifications = config.notifications ?? DEFAULT_NOTIFICATIONS;
  const showSidebar = config.showSidebar ?? true;
  const showHeader = config.showHeader ?? true;
  const showNotifications = config.showNotifications ?? true;

  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------

  const sidebarCollapsed = State<boolean>(false);
  const notificationsOpen = State<boolean>(false);
  const searchQuery = State<string>('');
  const stats = State<StatCard[]>(initialStats);
  const chartData = State<ChartDataPoint[]>(initialChartData);
  const revenueData = State<ChartDataPoint[]>(initialRevenueData);
  const activities = State<Activity[]>(initialActivities);
  const notifications = State<Notification[]>(initialNotifications);
  const chartHoveredIndex = State<number>(-1);
  const selectedTimeRange = State<string>('7d');
  const systemHealth = State<number>(98.7);
  const liveConnections = State<number>(1247);
  const commandPaletteOpen = State<boolean>(false);

  // Responsive breakpoints
  const isMobile = useMediaQueryState({ maxWidth: 768 });
  const isTablet = useMediaQueryState({ minWidth: 769, maxWidth: 1024 });

  // -------------------------------------------------------------------------
  // Derived values and actions
  // -------------------------------------------------------------------------

  const unreadCount = () => notifications.val().filter((n) => !n.read).length;

  const toggleSidebar = () => sidebarCollapsed.reduce((v) => !v);
  const toggleNotifications = () => notificationsOpen.reduce((v) => !v);
  const toggleCommandPalette = () => commandPaletteOpen.reduce((v) => !v);

  const markNotificationRead = (id: string) => {
    notifications.reduce((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const dismissNotification = (id: string) => {
    notifications.reduce((list) => list.filter((n) => n.id !== id));
  };

  const markAllRead = () => {
    notifications.reduce((list) => list.map((n) => ({ ...n, read: true })));
  };

  // Simulated live data updates
  const startLiveUpdates = () => {
    setInterval(() => {
      liveConnections.reduce((n) => n + Math.floor(Math.random() * 21) - 10);
      systemHealth.reduce((h) => {
        const delta = (Math.random() - 0.5) * 0.4;
        return Math.min(100, Math.max(95, parseFloat((h + delta).toFixed(1))));
      });
    }, 3000);
  };

  startLiveUpdates();

  // -------------------------------------------------------------------------
  // Shared Styles (reusable style helpers)
  // -------------------------------------------------------------------------

  const cardStyles = (el: HTMLElement | SVGElement) => {
    if (el instanceof HTMLElement) {
      el.style.background = theme.surface;
      el.style.borderRadius = theme.radiusLg;
      el.style.border = `1px solid ${theme.border}`;
      el.style.padding = '24px';
      el.style.transition = 'all 0.2s ease';
    }
  };

  const hoverLift = (el: HTMLElement | SVGElement) => {
    if (el instanceof HTMLElement) {
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = theme.shadowHover;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = theme.shadow;
      });
    }
  };

  const applyCard = (el: HTMLElement | SVGElement) => {
    cardStyles(el);
    hoverLift(el);
    return () => {};
  };

  // -------------------------------------------------------------------------
  // Components: Sidebar
  // -------------------------------------------------------------------------

  function SidebarNavItem(item: NavItem) {
    return tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', '12px'),
      trait.style('padding', '10px 16px'),
      trait.style('borderRadius', theme.radius),
      trait.style('cursor', 'pointer'),
      trait.style('transition', 'all 0.15s ease'),
      trait.style('position', 'relative'),
      trait.style('color', theme.sidebarText, activePage.$test(item.id, false)),
      trait.style('color', '#ffffff', activePage.$test(item.id)),
      trait.style('background', 'transparent', activePage.$test(item.id, false)),
      trait.style('background', theme.sidebarActive, activePage.$test(item.id)),
      trait.event('click', activePage.$set(item.id)),
      trait.event('mouseenter', (e?: Event) => {
        if (activePage.val() !== item.id && e?.target) {
          (e.target as HTMLElement).style.background = theme.surfaceAlt;
          (e.target as HTMLElement).style.color = theme.text;
        }
      }),
      trait.event('mouseleave', (e?: Event) => {
        if (activePage.val() !== item.id && e?.target) {
          (e.target as HTMLElement).style.background = 'transparent';
          (e.target as HTMLElement).style.color = theme.sidebarText;
        }
      }),

      tag.span(
        trait.style('fontSize', '18px'),
        trait.style('width', '24px'),
        trait.style('textAlign', 'center'),
        trait.style('flexShrink', '0'),
        item.icon,
      ),

      tag.span(
        trait.style('fontSize', '14px'),
        trait.style('fontWeight', '500'),
        trait.style('whiteSpace', 'nowrap'),
        trait.style('overflow', 'hidden'),
        trait.style('display', 'block', sidebarCollapsed.$test(false)),
        trait.style('display', 'none', sidebarCollapsed.$test(true)),
        item.label,
      ),

      ...(item.badge
        ? [
            tag.span(
              trait.style('background', theme.danger),
              trait.style('color', 'white'),
              trait.style('fontSize', '11px'),
              trait.style('fontWeight', '600'),
              trait.style('padding', '2px 7px'),
              trait.style('borderRadius', '10px'),
              trait.style('marginLeft', 'auto'),
              trait.style('display', 'block', sidebarCollapsed.$test(false)),
              trait.style('display', 'none', sidebarCollapsed.$test(true)),
              String(item.badge),
            ),
          ]
        : []),
    );
  }

  function Sidebar() {
    return tag.aside(
      trait.style('width', '260px', sidebarCollapsed.$test(false)),
      trait.style('width', '72px', sidebarCollapsed.$test(true)),
      trait.style('background', theme.sidebarBg),
      trait.style('borderRight', `1px solid ${theme.border}`),
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('transition', 'width 0.2s ease'),
      trait.style('overflow', 'hidden'),
      trait.style('flexShrink', '0'),
      trait.style('height', '100vh'),
      trait.style('position', 'sticky'),
      trait.style('top', '0'),

      // Logo area
      tag.div(
        trait.style('padding', '20px 16px'),
        trait.style('borderBottom', `1px solid ${theme.border}`),
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', '12px'),

        tag.div(
          trait.style('width', '36px'),
          trait.style('height', '36px'),
          trait.style('borderRadius', '10px'),
          trait.style('background', theme.gradient),
          trait.style('display', 'flex'),
          trait.style('alignItems', 'center'),
          trait.style('justifyContent', 'center'),
          trait.style('fontWeight', '700'),
          trait.style('fontSize', '16px'),
          trait.style('color', 'white'),
          trait.style('flexShrink', '0'),
          'O',
        ),

        tag.div(
          trait.style('display', 'flex', sidebarCollapsed.$test(false)),
          trait.style('display', 'none', sidebarCollapsed.$test(true)),
          trait.style('flexDirection', 'column'),
          trait.style('overflow', 'hidden'),

          tag.span(
            trait.style('fontSize', '16px'),
            trait.style('fontWeight', '700'),
            trait.style('color', theme.text),
            trait.style('whiteSpace', 'nowrap'),
            'OEM',
          ),
          tag.span(
            trait.style('fontSize', '11px'),
            trait.style('color', theme.textMuted),
            trait.style('whiteSpace', 'nowrap'),
            subtitle,
          ),
        ),
      ),

      // Navigation
      tag.nav(
        trait.style('padding', '12px 8px'),
        trait.style('flex', '1'),
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.style('gap', '4px'),
        trait.style('overflowY', 'auto'),

        ...navItems.map((item) => SidebarNavItem(item)),
      ),

      // User section at bottom
      tag.div(
        trait.style('padding', '16px'),
        trait.style('borderTop', `1px solid ${theme.border}`),
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', '12px'),

        tag.div(
          trait.style('width', '36px'),
          trait.style('height', '36px'),
          trait.style('borderRadius', '50%'),
          trait.style('background', `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`),
          trait.style('display', 'flex'),
          trait.style('alignItems', 'center'),
          trait.style('justifyContent', 'center'),
          trait.style('fontWeight', '600'),
          trait.style('fontSize', '13px'),
          trait.style('color', 'white'),
          trait.style('flexShrink', '0'),
          userName
            .split(' ')
            .map((n) => n[0])
            .join(''),
        ),

        tag.div(
          trait.style('display', 'flex', sidebarCollapsed.$test(false)),
          trait.style('display', 'none', sidebarCollapsed.$test(true)),
          trait.style('flexDirection', 'column'),
          trait.style('overflow', 'hidden'),

          tag.span(
            trait.style('fontSize', '13px'),
            trait.style('fontWeight', '600'),
            trait.style('color', theme.text),
            trait.style('whiteSpace', 'nowrap'),
            userName,
          ),
          tag.span(
            trait.style('fontSize', '11px'),
            trait.style('color', theme.textMuted),
            trait.style('whiteSpace', 'nowrap'),
            userRole,
          ),
        ),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Header
  // -------------------------------------------------------------------------

  function SearchBar() {
    return tag.div(
      trait.style('position', 'relative'),
      trait.style('flex', '1'),
      trait.style('maxWidth', '480px'),

      tag.div(
        trait.style('position', 'absolute'),
        trait.style('left', '14px'),
        trait.style('top', '50%'),
        trait.style('transform', 'translateY(-50%)'),
        trait.style('color', theme.textMuted),
        trait.style('fontSize', '14px'),
        trait.style('pointerEvents', 'none'),
        '\u{1F50D}',
      ),

      tag.input(
        trait.attr('type', 'text'),
        trait.attr('placeholder', 'Search anything... (Ctrl+K)'),
        trait.style('width', '100%'),
        trait.style('padding', '10px 14px 10px 40px'),
        trait.style('background', theme.surfaceAlt),
        trait.style('border', `1px solid ${theme.border}`),
        trait.style('borderRadius', theme.radius),
        trait.style('color', theme.text),
        trait.style('fontSize', '14px'),
        trait.style('outline', 'none'),
        trait.style('transition', 'border-color 0.15s'),
        trait.style('fontFamily', theme.font),
        trait.event('input', (e?: Event) => searchQuery.set((e?.target as HTMLInputElement).value)),
        trait.event('focus', (e?: Event) => {
          if (e?.target) (e.target as HTMLElement).style.borderColor = theme.primary;
        }),
        trait.event('blur', (e?: Event) => {
          if (e?.target) (e.target as HTMLElement).style.borderColor = theme.border;
        }),
      ),

      tag.span(
        trait.style('position', 'absolute'),
        trait.style('right', '14px'),
        trait.style('top', '50%'),
        trait.style('transform', 'translateY(-50%)'),
        trait.style('fontSize', '11px'),
        trait.style('color', theme.textMuted),
        trait.style('background', theme.surface),
        trait.style('padding', '3px 8px'),
        trait.style('borderRadius', '4px'),
        trait.style('border', `1px solid ${theme.border}`),
        trait.style('pointerEvents', 'none'),
        'Ctrl+K',
      ),
    );
  }

  function NotificationBell() {
    return tag.div(
      trait.style('position', 'relative'),

      tag.button(
        trait.style('background', 'transparent'),
        trait.style('border', `1px solid ${theme.border}`),
        trait.style('borderRadius', theme.radius),
        trait.style('color', theme.textMuted),
        trait.style('fontSize', '18px'),
        trait.style('cursor', 'pointer'),
        trait.style('padding', '8px 12px'),
        trait.style('transition', 'all 0.15s'),
        trait.style('position', 'relative'),
        trait.event('click', toggleNotifications),
        trait.event('mouseenter', (e?: Event) => {
          if (e?.target) (e.target as HTMLElement).style.borderColor = theme.primary;
        }),
        trait.event('mouseleave', (e?: Event) => {
          if (e?.target) (e.target as HTMLElement).style.borderColor = theme.border;
        }),
        '\u{1F514}',
      ),

      // Badge
      tag.span(
        trait.style('position', 'absolute'),
        trait.style('top', '-4px'),
        trait.style('right', '-4px'),
        trait.style('background', theme.danger),
        trait.style('color', 'white'),
        trait.style('fontSize', '10px'),
        trait.style('fontWeight', '700'),
        trait.style('padding', '2px 6px'),
        trait.style('borderRadius', '10px'),
        trait.style('minWidth', '18px'),
        trait.style('textAlign', 'center'),
        trait.style('lineHeight', '14px'),
        trait.html(() => String(unreadCount()), notifications),
      ),
    );
  }

  function Header() {
    return tag.header(
      trait.style('background', theme.headerBg),
      trait.style('borderBottom', `1px solid ${theme.border}`),
      trait.style('padding', '12px 24px'),
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', '16px'),
      trait.style('position', 'sticky'),
      trait.style('top', '0'),
      trait.style('zIndex', '100'),

      // Sidebar toggle
      tag.button(
        trait.style('background', 'transparent'),
        trait.style('border', `1px solid ${theme.border}`),
        trait.style('borderRadius', theme.radius),
        trait.style('color', theme.textMuted),
        trait.style('fontSize', '18px'),
        trait.style('cursor', 'pointer'),
        trait.style('padding', '8px 12px'),
        trait.style('transition', 'all 0.15s'),
        trait.event('click', toggleSidebar),
        trait.event('mouseenter', (e?: Event) => {
          if (e?.target) (e.target as HTMLElement).style.borderColor = theme.primary;
        }),
        trait.event('mouseleave', (e?: Event) => {
          if (e?.target) (e.target as HTMLElement).style.borderColor = theme.border;
        }),
        '\u{2630}',
      ),

      // Page title
      tag.div(
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),

        tag.h1(
          trait.style('fontSize', '18px'),
          trait.style('fontWeight', '700'),
          trait.style('color', theme.text),
          trait.style('margin', '0'),
          trait.style('lineHeight', '1.2'),
          trait.html(() => {
            const page = activePage.val();
            const nav = navItems.find((n) => n.id === page);
            return nav ? `${nav.icon} ${nav.label}` : title;
          }, activePage),
        ),
        tag.span(trait.style('fontSize', '12px'), trait.style('color', theme.textMuted), subtitle),
      ),

      SearchBar(),

      // Time range selector
      tag.div(
        trait.style('display', 'flex'),
        trait.style('gap', '4px'),
        trait.style('background', theme.surfaceAlt),
        trait.style('borderRadius', theme.radius),
        trait.style('padding', '4px'),

        ...['24h', '7d', '30d', '90d'].map((range) =>
          tag.button(
            trait.style('padding', '6px 12px'),
            trait.style('border', 'none'),
            trait.style('borderRadius', '6px'),
            trait.style('cursor', 'pointer'),
            trait.style('fontSize', '12px'),
            trait.style('fontWeight', '600'),
            trait.style('transition', 'all 0.15s'),
            trait.style('background', theme.primary, selectedTimeRange.$test(range)),
            trait.style('background', 'transparent', selectedTimeRange.$test(range, false)),
            trait.style('color', 'white', selectedTimeRange.$test(range)),
            trait.style('color', theme.textMuted, selectedTimeRange.$test(range, false)),
            trait.event('click', selectedTimeRange.$set(range)),
            range,
          ),
        ),
      ),

      ...(showNotifications ? [NotificationBell()] : []),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Stat Cards
  // -------------------------------------------------------------------------

  function StatCardComponent(stat: StatCard, index: number) {
    const trendColor =
      stat.trend === 'up' ? theme.success : stat.trend === 'down' ? theme.danger : theme.textMuted;
    const trendArrow = stat.trend === 'up' ? '\u2191' : stat.trend === 'down' ? '\u2193' : '\u2192';

    return tag.div(
      (el: HTMLElement | SVGElement) => applyCard(el),
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('gap', '12px'),
      trait.style('position', 'relative'),
      trait.style('overflow', 'hidden'),

      // Decorative gradient accent
      tag.div(
        trait.style('position', 'absolute'),
        trait.style('top', '0'),
        trait.style('right', '0'),
        trait.style('width', '80px'),
        trait.style('height', '80px'),
        trait.style('background', theme.gradient),
        trait.style('borderRadius', '50%'),
        trait.style('transform', 'translate(30%, -30%)'),
        trait.style('opacity', '0.1'),
      ),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'flex-start'),

        tag.div(
          tag.div(
            trait.style('fontSize', '13px'),
            trait.style('color', theme.textMuted),
            trait.style('fontWeight', '500'),
            trait.style('marginBottom', '4px'),
            stat.label,
          ),
          tag.div(
            trait.style('fontSize', '28px'),
            trait.style('fontWeight', '700'),
            trait.style('color', theme.text),
            trait.style('lineHeight', '1.1'),
            trait.html(() => stats.val()[index]?.value ?? stat.value, stats),
          ),
        ),

        tag.div(trait.style('fontSize', '28px'), trait.style('lineHeight', '1'), stat.icon),
      ),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', '6px'),
        trait.style('fontSize', '13px'),

        tag.span(
          trait.style('color', trendColor),
          trait.style('fontWeight', '600'),
          trait.style('display', 'flex'),
          trait.style('alignItems', 'center'),
          trait.style('gap', '2px'),
          `${trendArrow} ${stat.change}`,
        ),
        tag.span(trait.style('color', theme.textMuted), 'vs last period'),
      ),
    );
  }

  function StatCardsRow() {
    return tag.div(
      trait.style('display', 'grid'),
      trait.style('gridTemplateColumns', 'repeat(4, 1fr)'),
      trait.style('gap', '20px'),
      trait.style('marginBottom', '24px'),

      // Responsive: 2 columns on tablet, 1 on mobile
      trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isMobile.$test(true)),
      trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isTablet.$test(true)),

      ...initialStats.map((stat, i) => StatCardComponent(stat, i)),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Bar Chart
  // -------------------------------------------------------------------------

  function BarChart() {
    const maxVal = Math.max(...initialChartData.map((d) => d.value));

    return tag.div(
      (el: HTMLElement | SVGElement) => applyCard(el),
      trait.style('flex', '1'),
      trait.style('minWidth', '0'),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('marginBottom', '20px'),

        tag.h3(
          trait.style('fontSize', '16px'),
          trait.style('fontWeight', '600'),
          trait.style('color', theme.text),
          trait.style('margin', '0'),
          'Weekly Traffic',
        ),
        tag.span(
          trait.style('fontSize', '12px'),
          trait.style('color', theme.textMuted),
          trait.style('background', theme.surfaceAlt),
          trait.style('padding', '4px 10px'),
          trait.style('borderRadius', '12px'),
          'Sessions (K)',
        ),
      ),

      // Chart area
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'flex-end'),
        trait.style('gap', '8px'),
        trait.style('height', '200px'),
        trait.style('padding', '0'),

        trait.html(
          () =>
            chartData.val().map((point, i) => {
              const heightPct = (point.value / maxVal) * 100;
              const isHovered = chartHoveredIndex.val() === i;

              return tag.div(
                trait.style('flex', '1'),
                trait.style('display', 'flex'),
                trait.style('flexDirection', 'column'),
                trait.style('alignItems', 'center'),
                trait.style('gap', '8px'),
                trait.style('height', '100%'),
                trait.style('justifyContent', 'flex-end'),
                trait.style('cursor', 'pointer'),
                trait.event('mouseenter', chartHoveredIndex.$set(i)),
                trait.event('mouseleave', chartHoveredIndex.$set(-1)),
                trait.tooltip(`${point.label}: ${point.value}K sessions`),

                // Value label on hover
                tag.span(
                  trait.style('fontSize', '11px'),
                  trait.style('fontWeight', '600'),
                  trait.style('color', theme.primary),
                  trait.style('opacity', isHovered ? '1' : '0'),
                  trait.style('transition', 'opacity 0.15s'),
                  `${point.value}K`,
                ),

                // Bar
                tag.div(
                  trait.style('width', '100%'),
                  trait.style('borderRadius', '6px 6px 0 0'),
                  trait.style('transition', 'all 0.3s ease'),
                  trait.style('height', `${heightPct}%`),
                  trait.style('minHeight', '4px'),
                  trait.style('background', isHovered ? theme.primaryLight : theme.primary),
                  trait.style('opacity', isHovered ? '1' : '0.8'),
                ),

                // Label
                tag.span(
                  trait.style('fontSize', '11px'),
                  trait.style('color', theme.textMuted),
                  trait.style('fontWeight', '500'),
                  point.label,
                ),
              );
            }),
          chartData,
          chartHoveredIndex,
        ),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Line/Area Chart (Revenue)
  // -------------------------------------------------------------------------

  function RevenueChart() {
    const data = initialRevenueData;
    const maxVal = Math.max(...data.map((d) => d.value));
    const chartWidth = 520;
    const chartHeight = 200;
    const padding = 4;

    const points = data.map((d, i) => ({
      x: padding + (i / (data.length - 1)) * (chartWidth - padding * 2),
      y: chartHeight - padding - (d.value / maxVal) * (chartHeight - padding * 2),
    }));

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

    return tag.div(
      (el: HTMLElement | SVGElement) => applyCard(el),
      trait.style('flex', '1'),
      trait.style('minWidth', '0'),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('marginBottom', '20px'),

        tag.div(
          tag.h3(
            trait.style('fontSize', '16px'),
            trait.style('fontWeight', '600'),
            trait.style('color', theme.text),
            trait.style('margin', '0 0 4px 0'),
            'Revenue Trend',
          ),
          tag.span(
            trait.style('fontSize', '24px'),
            trait.style('fontWeight', '700'),
            trait.style('color', theme.text),
            trait.html(() => {
              const total = revenueData.val().reduce((s, d) => s + d.value, 0);
              return `$${(total / 1000).toFixed(1)}K`;
            }, revenueData),
          ),
        ),
        tag.span(
          trait.style('fontSize', '13px'),
          trait.style('color', theme.success),
          trait.style('fontWeight', '600'),
          '\u2191 23.5% YoY',
        ),
      ),

      // SVG Chart
      tag.svg(
        trait.svgAttr('viewBox', `0 0 ${chartWidth} ${chartHeight + 24}`),
        trait.style('width', '100%'),
        trait.style('height', '220px'),
        trait.svgAttr('preserveAspectRatio', 'none'),

        // Gradient definition
        tag.defs(
          (() => {
            const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            grad.setAttribute('id', 'revenueGradient');
            grad.setAttribute('x1', '0');
            grad.setAttribute('y1', '0');
            grad.setAttribute('x2', '0');
            grad.setAttribute('y2', '1');
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', theme.primary);
            stop1.setAttribute('stop-opacity', '0.3');
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', theme.primary);
            stop2.setAttribute('stop-opacity', '0.02');
            grad.appendChild(stop1);
            grad.appendChild(stop2);
            return grad;
          })(),
        ),

        // Grid lines
        ...Array.from({ length: 4 }, (_, i) => {
          const y = padding + (i / 3) * (chartHeight - padding * 2);
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', '0');
          line.setAttribute('y1', String(y));
          line.setAttribute('x2', String(chartWidth));
          line.setAttribute('y2', String(y));
          line.setAttribute('stroke', theme.border);
          line.setAttribute('stroke-dasharray', '4 4');
          line.setAttribute('stroke-width', '0.5');
          return line;
        }),

        // Area fill
        tag.path(trait.svgAttr('d', areaPath), trait.svgAttr('fill', 'url(#revenueGradient)')),

        // Line
        tag.path(
          trait.svgAttr('d', linePath),
          trait.svgAttr('fill', 'none'),
          trait.svgAttr('stroke', theme.primary),
          trait.svgAttr('stroke-width', '2.5'),
          trait.svgAttr('stroke-linecap', 'round'),
          trait.svgAttr('stroke-linejoin', 'round'),
        ),

        // Dots
        ...points.map((p) =>
          tag.circle(
            trait.svgAttr('cx', String(p.x)),
            trait.svgAttr('cy', String(p.y)),
            trait.svgAttr('r', '3'),
            trait.svgAttr('fill', theme.primary),
            trait.svgAttr('stroke', theme.surface),
            trait.svgAttr('stroke-width', '2'),
          ),
        ),

        // X-axis labels
        ...data.map((d, i) => {
          const x = padding + (i / (data.length - 1)) * (chartWidth - padding * 2);
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', String(x));
          text.setAttribute('y', String(chartHeight + 16));
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('fill', theme.textMuted);
          text.setAttribute('font-size', '10');
          text.setAttribute('font-family', theme.font);
          text.textContent = d.label;
          return text;
        }),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Donut Chart (used in system health)
  // -------------------------------------------------------------------------

  function DonutChart(value: StateType<number>, label: string, color: string) {
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return tag.div(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('alignItems', 'center'),
      trait.style('gap', '8px'),

      tag.div(
        trait.style('position', 'relative'),
        trait.style('width', `${size}px`),
        trait.style('height', `${size}px`),

        tag.svg(
          trait.svgAttr('viewBox', `0 0 ${size} ${size}`),
          trait.style('width', '100%'),
          trait.style('height', '100%'),
          trait.style('transform', 'rotate(-90deg)'),

          // Background track
          tag.circle(
            trait.svgAttr('cx', String(size / 2)),
            trait.svgAttr('cy', String(size / 2)),
            trait.svgAttr('r', String(radius)),
            trait.svgAttr('fill', 'none'),
            trait.svgAttr('stroke', theme.surfaceAlt),
            trait.svgAttr('stroke-width', String(strokeWidth)),
          ),

          // Value arc
          tag.circle(
            trait.svgAttr('cx', String(size / 2)),
            trait.svgAttr('cy', String(size / 2)),
            trait.svgAttr('r', String(radius)),
            trait.svgAttr('fill', 'none'),
            trait.svgAttr('stroke', color),
            trait.svgAttr('stroke-width', String(strokeWidth)),
            trait.svgAttr('stroke-linecap', 'round'),
            trait.svgAttr(
              'stroke-dasharray',
              () => `${(value.val() / 100) * circumference} ${circumference}`,
              value,
            ),
          ),
        ),

        // Center text
        tag.div(
          trait.style('position', 'absolute'),
          trait.style('top', '50%'),
          trait.style('left', '50%'),
          trait.style('transform', 'translate(-50%, -50%)'),
          trait.style('textAlign', 'center'),

          tag.div(
            trait.style('fontSize', '22px'),
            trait.style('fontWeight', '700'),
            trait.style('color', theme.text),
            trait.style('lineHeight', '1'),
            trait.html(() => `${value.val()}%`, value),
          ),
        ),
      ),

      tag.span(
        trait.style('fontSize', '12px'),
        trait.style('color', theme.textMuted),
        trait.style('fontWeight', '500'),
        label,
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Live Stats Panel
  // -------------------------------------------------------------------------

  function LiveStatsPanel() {
    return tag.div(
      (el: HTMLElement | SVGElement) => applyCard(el),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('marginBottom', '20px'),

        tag.h3(
          trait.style('fontSize', '16px'),
          trait.style('fontWeight', '600'),
          trait.style('color', theme.text),
          trait.style('margin', '0'),
          'System Status',
        ),

        tag.span(
          trait.style('display', 'flex'),
          trait.style('alignItems', 'center'),
          trait.style('gap', '6px'),
          trait.style('fontSize', '12px'),
          trait.style('color', theme.success),
          trait.style('fontWeight', '600'),

          tag.span(
            trait.style('width', '8px'),
            trait.style('height', '8px'),
            trait.style('borderRadius', '50%'),
            trait.style('background', theme.success),
            trait.style('display', 'inline-block'),
            // Animated pulse effect via box-shadow
            trait.style('boxShadow', `0 0 0 2px rgba(16, 185, 129, 0.3)`),
          ),
          'All Systems Operational',
        ),
      ),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-around'),
        trait.style('alignItems', 'center'),
        trait.style('gap', '24px'),

        DonutChart(systemHealth, 'Uptime', theme.success),

        tag.div(
          trait.style('display', 'flex'),
          trait.style('flexDirection', 'column'),
          trait.style('gap', '16px'),
          trait.style('flex', '1'),

          // Live connections
          tag.div(
            trait.style('display', 'flex'),
            trait.style('flexDirection', 'column'),
            trait.style('gap', '4px'),

            tag.span(
              trait.style('fontSize', '12px'),
              trait.style('color', theme.textMuted),
              'Live Connections',
            ),
            tag.span(
              trait.style('fontSize', '24px'),
              trait.style('fontWeight', '700'),
              trait.style('color', theme.text),
              trait.html(() => liveConnections.val().toLocaleString(), liveConnections),
            ),
          ),

          // Response time
          tag.div(
            trait.style('display', 'flex'),
            trait.style('flexDirection', 'column'),
            trait.style('gap', '4px'),

            tag.span(
              trait.style('fontSize', '12px'),
              trait.style('color', theme.textMuted),
              'Avg. Response',
            ),
            tag.span(
              trait.style('fontSize', '24px'),
              trait.style('fontWeight', '700'),
              trait.style('color', theme.accent),
              '24ms',
            ),
          ),

          // Throughput
          tag.div(
            trait.style('display', 'flex'),
            trait.style('flexDirection', 'column'),
            trait.style('gap', '4px'),

            tag.span(
              trait.style('fontSize', '12px'),
              trait.style('color', theme.textMuted),
              'Throughput',
            ),
            tag.span(
              trait.style('fontSize', '24px'),
              trait.style('fontWeight', '700'),
              trait.style('color', theme.warning),
              '1.2K rps',
            ),
          ),
        ),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Activity Feed
  // -------------------------------------------------------------------------

  function ActivityIcon(type: Activity['type']) {
    const map: Record<string, { icon: string; bg: string }> = {
      deploy: { icon: '\u{1F680}', bg: theme.primary },
      merge: { icon: '\u{1F500}', bg: theme.success },
      comment: { icon: '\u{1F4AC}', bg: theme.accent },
      commit: { icon: '\u{2B55}', bg: theme.warning },
      alert: { icon: '\u{26A0}\u{FE0F}', bg: theme.danger },
    };
    const config = map[type] ?? { icon: '\u{2022}', bg: theme.textMuted };

    return tag.div(
      trait.style('width', '36px'),
      trait.style('height', '36px'),
      trait.style('borderRadius', '50%'),
      trait.style('background', `${config.bg}20`),
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('fontSize', '16px'),
      trait.style('flexShrink', '0'),
      config.icon,
    );
  }

  function ActivityItem(activity: Activity) {
    return tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'flex-start'),
      trait.style('gap', '12px'),
      trait.style('padding', '12px 0'),
      trait.style('borderBottom', `1px solid ${theme.border}`),

      ActivityIcon(activity.type),

      tag.div(
        trait.style('flex', '1'),
        trait.style('minWidth', '0'),

        tag.div(
          trait.style('fontSize', '13px'),
          trait.style('color', theme.text),
          trait.style('lineHeight', '1.4'),

          tag.span(trait.style('fontWeight', '600'), activity.user),
          ` ${activity.action} `,
          tag.span(
            trait.style('color', theme.primaryLight),
            trait.style('fontWeight', '500'),
            activity.target,
          ),
        ),

        tag.span(
          trait.style('fontSize', '11px'),
          trait.style('color', theme.textMuted),
          activity.time,
        ),
      ),
    );
  }

  function ActivityFeed() {
    return tag.div(
      (el: HTMLElement | SVGElement) => applyCard(el),
      trait.style('flex', '1'),
      trait.style('minWidth', '0'),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('marginBottom', '16px'),

        tag.h3(
          trait.style('fontSize', '16px'),
          trait.style('fontWeight', '600'),
          trait.style('color', theme.text),
          trait.style('margin', '0'),
          'Activity Feed',
        ),
        tag.button(
          trait.style('background', 'transparent'),
          trait.style('border', 'none'),
          trait.style('color', theme.primaryLight),
          trait.style('fontSize', '13px'),
          trait.style('cursor', 'pointer'),
          trait.style('fontWeight', '500'),
          'View all',
        ),
      ),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.style('maxHeight', '360px'),
        trait.style('overflowY', 'auto'),

        trait.html(() => activities.val().map((a) => ActivityItem(a)), activities),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Notifications Panel (dropdown overlay)
  // -------------------------------------------------------------------------

  function NotificationTypeIcon(type: Notification['type']) {
    const map: Record<string, string> = {
      info: '\u{2139}\u{FE0F}',
      success: '\u{2705}',
      warning: '\u{26A0}\u{FE0F}',
      error: '\u{274C}',
    };
    return map[type] ?? '\u{2139}\u{FE0F}';
  }

  function NotificationItem(notification: Notification) {
    const typeBorderColor: Record<string, string> = {
      info: theme.accent,
      success: theme.success,
      warning: theme.warning,
      error: theme.danger,
    };

    return tag.div(
      trait.style('display', 'flex'),
      trait.style('gap', '12px'),
      trait.style('padding', '14px'),
      trait.style('borderRadius', theme.radius),
      trait.style('background', notification.read ? 'transparent' : `${theme.primary}08`),
      trait.style('borderLeft', `3px solid ${typeBorderColor[notification.type] ?? theme.border}`),
      trait.style('transition', 'all 0.15s'),
      trait.style('cursor', 'pointer'),
      trait.event('click', () => markNotificationRead(notification.id)),
      trait.event('mouseenter', (e?: Event) => {
        if (e?.currentTarget) (e.currentTarget as HTMLElement).style.background = theme.surfaceAlt;
      }),
      trait.event('mouseleave', (e?: Event) => {
        if (e?.currentTarget)
          (e.currentTarget as HTMLElement).style.background = notification.read
            ? 'transparent'
            : `${theme.primary}08`;
      }),

      // Icon
      tag.span(
        trait.style('fontSize', '18px'),
        trait.style('flexShrink', '0'),
        trait.style('lineHeight', '1'),
        NotificationTypeIcon(notification.type),
      ),

      tag.div(
        trait.style('flex', '1'),
        trait.style('minWidth', '0'),

        tag.div(
          trait.style('display', 'flex'),
          trait.style('justifyContent', 'space-between'),
          trait.style('alignItems', 'flex-start'),
          trait.style('gap', '8px'),

          tag.span(
            trait.style('fontSize', '13px'),
            trait.style('fontWeight', notification.read ? '500' : '700'),
            trait.style('color', theme.text),
            notification.title,
          ),

          tag.button(
            trait.style('background', 'transparent'),
            trait.style('border', 'none'),
            trait.style('color', theme.textMuted),
            trait.style('cursor', 'pointer'),
            trait.style('fontSize', '14px'),
            trait.style('padding', '0'),
            trait.style('lineHeight', '1'),
            trait.event('click', (e?: Event) => {
              e?.stopPropagation();
              dismissNotification(notification.id);
            }),
            '\u{2715}',
          ),
        ),
        tag.div(
          trait.style('fontSize', '12px'),
          trait.style('color', theme.textMuted),
          trait.style('marginTop', '4px'),
          trait.style('lineHeight', '1.4'),
          notification.message,
        ),
        tag.div(
          trait.style('fontSize', '11px'),
          trait.style('color', theme.textMuted),
          trait.style('marginTop', '6px'),
          trait.style('opacity', '0.7'),
          notification.time,
        ),
      ),

      // Unread dot
      ...(!notification.read
        ? [
            tag.span(
              trait.style('width', '8px'),
              trait.style('height', '8px'),
              trait.style('borderRadius', '50%'),
              trait.style('background', theme.primary),
              trait.style('flexShrink', '0'),
              trait.style('marginTop', '4px'),
            ),
          ]
        : []),
    );
  }

  function NotificationsPanel() {
    return tag.div(
      trait.style('position', 'fixed'),
      trait.style('top', '0'),
      trait.style('right', '0'),
      trait.style('bottom', '0'),
      trait.style('width', '400px'),
      trait.style('maxWidth', '100vw'),
      trait.style('background', theme.surface),
      trait.style('borderLeft', `1px solid ${theme.border}`),
      trait.style('zIndex', '200'),
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('boxShadow', '-8px 0 30px rgba(0,0,0,0.3)'),
      trait.style('transition', 'transform 0.25s ease'),
      trait.style('transform', 'translateX(100%)', notificationsOpen.$test(false)),
      trait.style('transform', 'translateX(0)', notificationsOpen.$test(true)),

      // Header
      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('padding', '20px 20px 16px'),
        trait.style('borderBottom', `1px solid ${theme.border}`),

        tag.h3(
          trait.style('fontSize', '16px'),
          trait.style('fontWeight', '700'),
          trait.style('color', theme.text),
          trait.style('margin', '0'),
          'Notifications',
        ),

        tag.div(
          trait.style('display', 'flex'),
          trait.style('gap', '8px'),

          tag.button(
            trait.style('background', 'transparent'),
            trait.style('border', `1px solid ${theme.border}`),
            trait.style('color', theme.textMuted),
            trait.style('fontSize', '12px'),
            trait.style('cursor', 'pointer'),
            trait.style('padding', '6px 12px'),
            trait.style('borderRadius', theme.radius),
            trait.style('fontWeight', '500'),
            trait.event('click', markAllRead),
            'Mark all read',
          ),

          tag.button(
            trait.style('background', 'transparent'),
            trait.style('border', `1px solid ${theme.border}`),
            trait.style('borderRadius', theme.radius),
            trait.style('color', theme.textMuted),
            trait.style('fontSize', '16px'),
            trait.style('cursor', 'pointer'),
            trait.style('padding', '6px 10px'),
            trait.style('lineHeight', '1'),
            trait.event('click', toggleNotifications),
            '\u{2715}',
          ),
        ),
      ),

      // Notification list
      tag.div(
        trait.style('flex', '1'),
        trait.style('overflowY', 'auto'),
        trait.style('padding', '8px'),
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.style('gap', '4px'),

        trait.html(() => {
          const items = notifications.val();
          if (items.length === 0) {
            return [
              tag.div(
                trait.style('textAlign', 'center'),
                trait.style('padding', '48px 20px'),
                trait.style('color', theme.textMuted),
                trait.style('fontSize', '14px'),
                'No notifications',
              ),
            ];
          }
          return items.map((n) => NotificationItem(n));
        }, notifications),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Command Palette (modal overlay)
  // -------------------------------------------------------------------------

  function CommandPalette() {
    const commands = [
      { icon: '\u{1F4CA}', label: 'Go to Overview', action: () => activePage.set('overview') },
      { icon: '\u{1F4C8}', label: 'Go to Analytics', action: () => activePage.set('analytics') },
      { icon: '\u{1F465}', label: 'Go to Users', action: () => activePage.set('users') },
      { icon: '\u{1F514}', label: 'Toggle Notifications', action: toggleNotifications },
      { icon: '\u{2630}', label: 'Toggle Sidebar', action: toggleSidebar },
    ];

    return tag.div(
      trait.style('position', 'fixed'),
      trait.style('inset', '0'),
      trait.style('background', 'rgba(0,0,0,0.6)'),
      trait.style('zIndex', '300'),
      trait.style('display', 'none', commandPaletteOpen.$test(false)),
      trait.style('display', 'flex', commandPaletteOpen.$test(true)),
      trait.style('alignItems', 'flex-start'),
      trait.style('justifyContent', 'center'),
      trait.style('paddingTop', '20vh'),
      trait.event('click', (e?: Event) => {
        if (e?.target === e?.currentTarget) commandPaletteOpen.set(false);
      }),

      tag.div(
        trait.style('background', theme.surface),
        trait.style('borderRadius', theme.radiusLg),
        trait.style('border', `1px solid ${theme.border}`),
        trait.style('width', '480px'),
        trait.style('maxWidth', '90vw'),
        trait.style('boxShadow', '0 20px 60px rgba(0,0,0,0.5)'),
        trait.style('overflow', 'hidden'),

        // Search in palette
        tag.div(
          trait.style('padding', '16px'),
          trait.style('borderBottom', `1px solid ${theme.border}`),

          tag.input(
            trait.attr('type', 'text'),
            trait.attr('placeholder', 'Type a command...'),
            trait.style('width', '100%'),
            trait.style('background', 'transparent'),
            trait.style('border', 'none'),
            trait.style('color', theme.text),
            trait.style('fontSize', '16px'),
            trait.style('outline', 'none'),
            trait.style('fontFamily', theme.font),
          ),
        ),

        // Command list
        tag.div(
          trait.style('padding', '8px'),
          trait.style('maxHeight', '300px'),
          trait.style('overflowY', 'auto'),

          ...commands.map((cmd) =>
            tag.div(
              trait.style('display', 'flex'),
              trait.style('alignItems', 'center'),
              trait.style('gap', '12px'),
              trait.style('padding', '10px 12px'),
              trait.style('borderRadius', theme.radius),
              trait.style('cursor', 'pointer'),
              trait.style('transition', 'background 0.1s'),
              trait.event('click', () => {
                cmd.action();
                commandPaletteOpen.set(false);
              }),
              trait.event('mouseenter', (e?: Event) => {
                if (e?.currentTarget)
                  (e.currentTarget as HTMLElement).style.background = theme.surfaceAlt;
              }),
              trait.event('mouseleave', (e?: Event) => {
                if (e?.currentTarget)
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
              }),

              tag.span(trait.style('fontSize', '16px'), cmd.icon),
              tag.span(
                trait.style('fontSize', '14px'),
                trait.style('color', theme.text),
                cmd.label,
              ),
            ),
          ),
        ),

        // Footer hint
        tag.div(
          trait.style('padding', '12px 16px'),
          trait.style('borderTop', `1px solid ${theme.border}`),
          trait.style('fontSize', '11px'),
          trait.style('color', theme.textMuted),
          trait.style('display', 'flex'),
          trait.style('gap', '16px'),

          tag.span('Esc to close'),
          tag.span('Enter to select'),
        ),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Top Channels / Performance Table
  // -------------------------------------------------------------------------

  function PerformanceTable() {
    const rows = [
      {
        channel: 'Organic Search',
        visitors: '12,847',
        conversion: '4.2%',
        revenue: '$18,420',
        trend: 'up' as const,
      },
      {
        channel: 'Direct Traffic',
        visitors: '8,291',
        conversion: '3.8%',
        revenue: '$12,180',
        trend: 'up' as const,
      },
      {
        channel: 'Social Media',
        visitors: '5,643',
        conversion: '2.1%',
        revenue: '$6,890',
        trend: 'down' as const,
      },
      {
        channel: 'Email Campaign',
        visitors: '3,892',
        conversion: '5.6%',
        revenue: '$9,240',
        trend: 'up' as const,
      },
      {
        channel: 'Referral',
        visitors: '2,104',
        conversion: '3.2%',
        revenue: '$4,560',
        trend: 'neutral' as const,
      },
    ];

    const thStyle = (el: HTMLElement | SVGElement) => {
      if (el instanceof HTMLElement) {
        el.style.textAlign = 'left';
        el.style.padding = '12px 16px';
        el.style.fontSize = '12px';
        el.style.fontWeight = '600';
        el.style.color = theme.textMuted;
        el.style.textTransform = 'uppercase';
        el.style.letterSpacing = '0.5px';
        el.style.borderBottom = `1px solid ${theme.border}`;
      }
    };

    const tdStyle = (el: HTMLElement | SVGElement) => {
      if (el instanceof HTMLElement) {
        el.style.padding = '14px 16px';
        el.style.fontSize = '13px';
        el.style.color = theme.text;
        el.style.borderBottom = `1px solid ${theme.border}`;
      }
    };

    return tag.div(
      (el: HTMLElement | SVGElement) => applyCard(el),
      trait.style('overflow', 'hidden'),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('marginBottom', '16px'),

        tag.h3(
          trait.style('fontSize', '16px'),
          trait.style('fontWeight', '600'),
          trait.style('color', theme.text),
          trait.style('margin', '0'),
          'Top Channels',
        ),
        tag.button(
          trait.style('background', 'transparent'),
          trait.style('border', 'none'),
          trait.style('color', theme.primaryLight),
          trait.style('fontSize', '13px'),
          trait.style('cursor', 'pointer'),
          trait.style('fontWeight', '500'),
          'Export',
        ),
      ),

      tag.div(
        trait.style('overflowX', 'auto'),
        trait.style('margin', '0 -24px'),
        trait.style('padding', '0 24px'),

        tag.table(
          trait.style('width', '100%'),
          trait.style('borderCollapse', 'collapse'),

          tag.thead(
            tag.tr(
              tag.th(thStyle, 'Channel'),
              tag.th(thStyle, 'Visitors'),
              tag.th(thStyle, 'Conversion'),
              tag.th(thStyle, 'Revenue'),
              tag.th(thStyle, 'Trend'),
            ),
          ),

          tag.tbody(
            ...rows.map((row) =>
              tag.tr(
                trait.style('transition', 'background 0.1s'),
                trait.event('mouseenter', (e?: Event) => {
                  if (e?.currentTarget)
                    (e.currentTarget as HTMLElement).style.background = `${theme.surfaceAlt}40`;
                }),
                trait.event('mouseleave', (e?: Event) => {
                  if (e?.currentTarget)
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                }),

                tag.td(tdStyle, trait.style('fontWeight', '500'), row.channel),
                tag.td(tdStyle, row.visitors),
                tag.td(tdStyle, row.conversion),
                tag.td(tdStyle, trait.style('fontWeight', '600'), row.revenue),
                tag.td(
                  tdStyle,
                  tag.span(
                    trait.style(
                      'color',
                      row.trend === 'up'
                        ? theme.success
                        : row.trend === 'down'
                          ? theme.danger
                          : theme.textMuted,
                    ),
                    trait.style('fontWeight', '600'),
                    row.trend === 'up'
                      ? '\u2191 Up'
                      : row.trend === 'down'
                        ? '\u2193 Down'
                        : '\u2192 Flat',
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Quick Actions
  // -------------------------------------------------------------------------

  function QuickActions() {
    const actions = [
      { icon: '\u{2795}', label: 'New Project', color: theme.primary },
      { icon: '\u{1F4E4}', label: 'Deploy', color: theme.success },
      { icon: '\u{1F4CA}', label: 'Run Report', color: theme.accent },
      { icon: '\u{1F465}', label: 'Invite User', color: theme.warning },
    ];

    return tag.div(
      (el: HTMLElement | SVGElement) => applyCard(el),

      tag.h3(
        trait.style('fontSize', '16px'),
        trait.style('fontWeight', '600'),
        trait.style('color', theme.text),
        trait.style('margin', '0 0 16px 0'),
        'Quick Actions',
      ),

      tag.div(
        trait.style('display', 'grid'),
        trait.style('gridTemplateColumns', 'repeat(2, 1fr)'),
        trait.style('gap', '10px'),

        ...actions.map((action) =>
          tag.button(
            trait.style('display', 'flex'),
            trait.style('alignItems', 'center'),
            trait.style('gap', '10px'),
            trait.style('padding', '14px'),
            trait.style('background', `${action.color}12`),
            trait.style('border', `1px solid ${action.color}30`),
            trait.style('borderRadius', theme.radius),
            trait.style('cursor', 'pointer'),
            trait.style('transition', 'all 0.15s'),
            trait.style('textAlign', 'left'),
            trait.style('fontFamily', theme.font),
            trait.event('mouseenter', (e?: Event) => {
              if (e?.currentTarget) {
                (e.currentTarget as HTMLElement).style.background = `${action.color}22`;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }
            }),
            trait.event('mouseleave', (e?: Event) => {
              if (e?.currentTarget) {
                (e.currentTarget as HTMLElement).style.background = `${action.color}12`;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }
            }),

            tag.span(trait.style('fontSize', '18px'), action.icon),
            tag.span(
              trait.style('fontSize', '13px'),
              trait.style('fontWeight', '600'),
              trait.style('color', theme.text),
              action.label,
            ),
          ),
        ),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Components: Progress Bars (Projects)
  // -------------------------------------------------------------------------

  function ProjectProgress() {
    const projects = [
      { name: 'API v3 Migration', progress: 78, color: theme.primary },
      { name: 'Mobile App Redesign', progress: 45, color: theme.accent },
      { name: 'Infrastructure Audit', progress: 92, color: theme.success },
      { name: 'Payment Integration', progress: 31, color: theme.warning },
    ];

    return tag.div(
      (el: HTMLElement | SVGElement) => applyCard(el),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('marginBottom', '20px'),

        tag.h3(
          trait.style('fontSize', '16px'),
          trait.style('fontWeight', '600'),
          trait.style('color', theme.text),
          trait.style('margin', '0'),
          'Active Projects',
        ),
        tag.span(
          trait.style('fontSize', '12px'),
          trait.style('color', theme.textMuted),
          `${projects.length} in progress`,
        ),
      ),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.style('gap', '18px'),

        ...projects.map((project) =>
          tag.div(
            tag.div(
              trait.style('display', 'flex'),
              trait.style('justifyContent', 'space-between'),
              trait.style('alignItems', 'center'),
              trait.style('marginBottom', '8px'),

              tag.span(
                trait.style('fontSize', '13px'),
                trait.style('fontWeight', '500'),
                trait.style('color', theme.text),
                project.name,
              ),
              tag.span(
                trait.style('fontSize', '12px'),
                trait.style('fontWeight', '600'),
                trait.style('color', project.color),
                `${project.progress}%`,
              ),
            ),

            // Progress bar track
            tag.div(
              trait.style('height', '6px'),
              trait.style('background', theme.surfaceAlt),
              trait.style('borderRadius', '3px'),
              trait.style('overflow', 'hidden'),

              // Progress bar fill
              tag.div(
                trait.style('height', '100%'),
                trait.style('width', `${project.progress}%`),
                trait.style('background', project.color),
                trait.style('borderRadius', '3px'),
                trait.style('transition', 'width 0.6s ease'),
              ),
            ),
          ),
        ),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Layout Assembly: Main Content
  // -------------------------------------------------------------------------

  function MainContent() {
    return tag.div(
      trait.style('flex', '1'),
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('minWidth', '0'),
      trait.style('height', '100vh'),
      trait.style('overflow', 'hidden'),

      ...(showHeader ? [Header()] : []),

      // Scrollable content area
      tag.main(
        trait.style('flex', '1'),
        trait.style('overflowY', 'auto'),
        trait.style('padding', '24px'),
        trait.style('background', theme.bg),

        // Stat cards row
        StatCardsRow(),

        // Charts row
        tag.div(
          trait.style('display', 'grid'),
          trait.style('gridTemplateColumns', '1fr 1fr'),
          trait.style('gap', '20px'),
          trait.style('marginBottom', '24px'),

          // Responsive: stack on mobile/tablet
          trait.style('gridTemplateColumns', '1fr', isMobile.$test(true)),
          trait.style('gridTemplateColumns', '1fr', isTablet.$test(true)),

          BarChart(),
          RevenueChart(),
        ),

        // System status + Activity row
        tag.div(
          trait.style('display', 'grid'),
          trait.style('gridTemplateColumns', '1fr 1fr'),
          trait.style('gap', '20px'),
          trait.style('marginBottom', '24px'),

          trait.style('gridTemplateColumns', '1fr', isMobile.$test(true)),

          LiveStatsPanel(),
          ActivityFeed(),
        ),

        // Performance table
        tag.div(trait.style('marginBottom', '24px'), PerformanceTable()),

        // Bottom row: Quick Actions + Projects
        tag.div(
          trait.style('display', 'grid'),
          trait.style('gridTemplateColumns', '1fr 1fr'),
          trait.style('gap', '20px'),
          trait.style('marginBottom', '24px'),

          trait.style('gridTemplateColumns', '1fr', isMobile.$test(true)),

          QuickActions(),
          ProjectProgress(),
        ),

        // Footer
        tag.footer(
          trait.style('textAlign', 'center'),
          trait.style('padding', '24px 0'),
          trait.style('fontSize', '12px'),
          trait.style('color', theme.textMuted),
          trait.style('borderTop', `1px solid ${theme.border}`),

          'Built with ',
          tag.span(
            trait.style('fontWeight', '700'),
            trait.style('color', theme.primaryLight),
            'OEM',
          ),
          ' \u2014 reactive UI in ~2KB',
        ),
      ),
    );
  }

  // -------------------------------------------------------------------------
  // Keyboard Shortcuts
  // -------------------------------------------------------------------------

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleCommandPalette();
    }
    if (e.key === 'Escape') {
      if (commandPaletteOpen.val()) commandPaletteOpen.set(false);
      if (notificationsOpen.val()) notificationsOpen.set(false);
    }
  });

  // -------------------------------------------------------------------------
  // Root Layout
  // -------------------------------------------------------------------------

  const root = tag.div(
    trait.style('display', 'flex'),
    trait.style('fontFamily', theme.font),
    trait.style('color', theme.text),
    trait.style('background', theme.bg),
    trait.style('minHeight', '100vh'),
    trait.style('margin', '0'),

    // Reset some base styles on body via this container
    trait.style('lineHeight', '1.5'),
    trait.style('-webkit-font-smoothing' as any, 'antialiased'),

    ...(showSidebar ? [Sidebar()] : []),
    MainContent(),
    ...(showNotifications ? [NotificationsPanel()] : []),
    CommandPalette(),
  );

  return root;
}
