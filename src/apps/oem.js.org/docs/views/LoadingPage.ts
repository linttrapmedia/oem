import { LoadingSpinner } from '@core/components/LoadingSpinner';
import { color, tags } from '../../config';

export function LoadingPage() {
  const { div } = tags;
  return div(
    ['style', 'backgroundColor', color('black')],
    ['style', 'width', '100%'],
    ['style', 'display', 'flex'],
    ['style', 'alignItems', 'center'],
    ['style', 'justifyContent', 'center'],
  )(LoadingSpinner());
}
