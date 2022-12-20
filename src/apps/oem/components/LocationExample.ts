import { COMPONENT, DIV, LI, LOCATION, UL } from '@oem';

export const LocationExample = COMPONENT(() => {
  const location = LOCATION();

  setTimeout(() => {
    location.set('?test=1#hash=one');
  }, 1000);

  return DIV.column(10).append(
    COMPONENT(
      () =>
        UL.append(
          LI.innerText(`Hash: ${location.val.hash}`),
          LI.innerText(`Host: ${location.val.host}`),
          LI.innerText(`Hostname: ${location.val.hostname}`),
          LI.innerText(`Href: ${location.val.href}`),
          LI.innerText(`Origin: ${location.val.origin}`),
          LI.innerText(`Pathname: ${location.val.pathname}`),
          LI.innerText(`Port: ${location.val.port}`),
          LI.innerText(`Protocol: ${location.val.protocol}`),
        ),
      location,
    ),
  );
});
