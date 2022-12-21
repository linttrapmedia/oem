import { DIV } from '@oem';
import { THEME } from '../../config';
import { Banner } from './Banner';

export const HomePage = () => {
  return DIV
    .style('display', 'flex')
    .style('flexDirection', 'column')
    .style('gap', '20px')
    .style('backgroundColor', THEME.primary.get)
    .style('minHeight', '100vh')
    .style('fontFamily', 'sans-serif')
    .append(
      Banner(),
      // Menu(), 
      // Hero(), 
      // CleanCode(), 
      // GoEasy(), 
      // Footer()
    );
};
