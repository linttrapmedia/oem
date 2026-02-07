import { Template, useStyleTrait } from '@/registry';

export const Dashboard = () => {
  const [tag, trait] = Template({
    style: useStyleTrait,
  });

  return tag.div(trait.style('display', 'grid'), 'Dashboard');
};
