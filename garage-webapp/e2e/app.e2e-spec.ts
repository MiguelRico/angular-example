import { GarageWebappPage } from './app.po';

describe('garage-webapp App', () => {
  let page: GarageWebappPage;

  beforeEach(() => {
    page = new GarageWebappPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
