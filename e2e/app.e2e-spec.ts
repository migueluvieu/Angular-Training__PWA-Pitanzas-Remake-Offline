import { ResponsiveMenuAngular2Page } from './app.po';

describe('responsive-menu-angular2 App', () => {
  let page: ResponsiveMenuAngular2Page;

  beforeEach(() => {
    page = new ResponsiveMenuAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
