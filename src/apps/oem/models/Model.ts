import { BREAKPOINT, LOCATION } from '@oem';

const location = LOCATION();
const mobileBreakpoint = BREAKPOINT(0);
const tabletBreakpoint = BREAKPOINT(960);

// winwidth.sub(console.log);

export default {
  mobileBreakpoint,
  tabletBreakpoint,
  location,
};
