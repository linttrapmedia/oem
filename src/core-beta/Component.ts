export const OEM_COMPONENT: OEM.COMPONENT = (
  cb: () => HTMLElement,
  ...buses: any[]
): HTMLElement => {
  const el = cb();
  buses.forEach((bus) => bus.sub(() => (el.innerHTML = cb().innerHTML)));
  return el;
};
