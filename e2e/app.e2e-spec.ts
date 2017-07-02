import { MusicfyPage } from './app.po';

describe('musicfy App', () => {
  let page: MusicfyPage;

  beforeEach(() => {
    page = new MusicfyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
