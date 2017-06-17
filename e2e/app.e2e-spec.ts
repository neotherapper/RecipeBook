import { RecipeBookPage } from './app.po';

describe('recipe-book App', () => {
  let page: RecipeBookPage;

  beforeEach(() => {
    page = new RecipeBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rb works!');
  });
});
