import { Template } from '@core/framework/Template';

type MenuItem = {};
type Comment = [];

interface ArticleViewProps {
  header: {
    brand: HTMLElement;
    menu?: MenuItem[];
    links?: MenuItem[];
  };
  article: {
    article: HTMLElement;
  };
  toc?: {
    menu?: MenuItem[];
  };
  ads?: {
    ads: HTMLElement;
    menu?: MenuItem;
  };
  comments?: {
    comments: Comment[];
  };
  related?: {
    menu: MenuItem[];
  };
  footer?: {
    disclaimer: HTMLElement;
    menu: MenuItem[];
    contact: HTMLElement;
  };
  credits?: {
    menu: MenuItem[];
    credit: string;
  };
}

enum Areas {
  ads = 'ads',
  article = 'article',
  comments = 'comments',
  credits = 'credits',
  footerContact = 'footerContact',
  footerDisclaimer = 'footerDisclaimer',
  footerMenu = 'footerMenu',
  headerBrand = 'headerBrand',
  headerLinks = 'headerLinks',
  headerMenu = 'headerMenu',
  toc = 'toc',
}

export function ArticleView(props: ArticleViewProps) {
  const { div } = Template.Html();

  const TemplateAreas = [
    [Areas.headerBrand, Areas.headerMenu, Areas.headerLinks].join(' '),
    [Areas.toc, Areas.article, Areas.ads].join(' '),
    [Areas.comments, Areas.comments, Areas.comments].join(' '),
    [Areas.footerDisclaimer, Areas.footerMenu, Areas.footerContact].join(' '),
    [Areas.credits, Areas.credits, Areas.credits].join(' '),
  ].join('\n');

  const Grid = div(['style', 'display', 'grid'], ['style', 'gridTemplateAreas', TemplateAreas]);
  const HeaderBrand = div(['style', 'gridArea', Areas.headerBrand]);
  const HeaderMenu = div(['style', 'gridArea', Areas.headerMenu]);
  const HeaderLinks = div(['style', 'gridArea', Areas.headerLinks]);
  const TocArea = div(['style', 'gridArea', Areas.toc]);
  const Article = div(['style', 'gridArea', Areas.article]);
  const Ads = div(['style', 'gridArea', Areas.ads]);
  const Comments = div(['style', 'gridArea', Areas.comments]);
  const FooterDisclaimer = div(['style', 'gridArea', Areas.footerDisclaimer]);
  const FooterMenu = div(['style', 'gridArea', Areas.footerMenu]);
  const FooterContact = div(['style', 'gridArea', Areas.footerContact]);
  const Credits = div(['style', 'gridArea', Areas.credits]);

  return Grid(
    HeaderBrand(),
    HeaderMenu(),
    HeaderLinks(),
    TocArea(),
    Article(),
    Ads(),
    Comments(),
    FooterDisclaimer(),
    FooterMenu(),
    FooterContact(),
    Credits(),
  );
}
