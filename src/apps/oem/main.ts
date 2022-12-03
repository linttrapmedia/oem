import OEM from '@oem';
import { ROUTER } from './config';

const location = LOCATION();

OEM(
  COMPONENT(
    () => ROUTER[location.val.urlParams.get('page') ?? 'home'](),
    location,
  ),
);
