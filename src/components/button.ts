import { tag, trait } from '@/elements/_base';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const button = (props: ButtonProps) => {
  const { label, onClick } = props;
  return tag.button(
    trait.style('color', 'white'),
    trait.event('click', onClick),
    trait.text(label),
  );
};
