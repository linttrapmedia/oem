import { COMPONENT } from '@oem';
import { ROUTER } from '../config';
import model from '../models/Model';

export const Controller = COMPONENT(() => {
  const page = model.location.val.urlParams.get('page') ?? 'home';
  const Page = ROUTER[page];
  return Page();
}, model.location);
