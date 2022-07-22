import { Grid } from 'src/app/components/Layout/Grids';
import { text } from 'src/app/components/Typography/Text';

export const GridExamples = Grid.Auto({
  columns: [
    [1, 0],
    [2, 720],
    [3, 1000],
  ],
})(text('paragraph')(text('phrase')('...Coming Soon')));
