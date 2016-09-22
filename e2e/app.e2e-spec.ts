import { TestBeta15CliPage } from './app.po';

describe('test-beta15-cli App', function() {
  let page: TestBeta15CliPage;

  beforeEach(() => {
    page = new TestBeta15CliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
