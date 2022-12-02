import { LoadingSpinner } from '@core/components/LoadingSpinner';
import { Theme } from '@core/framework/Theme';
import { div } from '../../lib/templates';

export function LoadingView() {
  return div(
    ['style', 'backgroundColor', Theme().color('black')],
    ['style', 'width', '100%'],
    ['style', 'height', '100%'],
    ['style', 'display', 'flex'],
    ['style', 'alignItems', 'center'],
    ['style', 'justifyContent', 'center'],
  )(LoadingSpinner());
}
