import { RoomAppPage } from './app.po';

describe('room-app App', function() {
  let page: RoomAppPage;

  beforeEach(() => {
    page = new RoomAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
