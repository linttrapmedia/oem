export const OEM_APP: OEM.APP = (
  app: HTMLElement,
  options: { container: string } = {
    container: 'body',
  },
) => {
  const { container } = options;
  const init = () => document.querySelector(container).appendChild(app);
  document.addEventListener('DOMContentLoaded', init);
};
