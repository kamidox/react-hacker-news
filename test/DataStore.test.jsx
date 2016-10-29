/* eslint import/no-extraneous-dependencies: 0 */
import { expect } from 'chai';
import sinon from 'sinon';
import {
  StoryStore,
  ItemStore,
  UserStore
} from '../app/components/DataStore';

describe('DataStore', () => {
  it('StoryStore', (done) => {
    const ids = [8863, 8864];
    let store = new StoryStore('beststories');
    const state = store.getState();
    expect(state.ids).instanceOf(Array);
    expect(state.stories).instanceOf(Array);
    expect(state.ids.length).equal(0);

    // use stub to avoid real network request
    const stub = sinon.stub(store, 'fetchStory', () => store.onStoryUpdated(ids));

    function handleUpdate(s) {
      expect(s.ids).instanceOf(Array);
      expect(s.ids.length).equal(ids.length);
      expect(s.stories).instanceOf(Array);
      expect(s.stories.length).equal(ids.length);
      store.removeListener('update', handleUpdate);
      stub.restore();
      store = null;
      done();
    }
    store.addListener('update', handleUpdate);
    store.fetchStory();
  });

  it('ItemStore', (done) => {
    const itemData = {
      id: 8863,
      title: 'title',
      url: 'http://example.com',
      score: 110
    };
    let store = new ItemStore();

    const stub = sinon.stub(store, 'fetchItem', () => store.onItemUpdated(itemData));

    function handleItemUpdate(item) {
      expect(item.id).equal(itemData.id);

      const cache = ItemStore.getCacheItem(itemData.id);
      expect(cache.id).equal(itemData.id);
      expect(ItemStore.isCollapsed(itemData.id)).equal(false);
      store.removeListener(itemData.id, handleItemUpdate);
      stub.restore();
      store = null;
      done();
    }
    store.addListener(itemData.id, handleItemUpdate);
    store.fetchItem(itemData.id);
  });

  it('UserStore', (done) => {
    const userData = {
      id: 'dhouston',
      about: 'about'
    };
    let store = new UserStore();

    const stub = sinon.stub(store, 'fetchUser', () => store.onUserUpdated(userData));

    function handleUserUpdate(user) {
      expect(user.id).equal(userData.id);
      store.removeListener(userData.id, handleUserUpdate);
      stub.restore();
      store = null;
      done();
    }
    store.addListener(userData.id, handleUserUpdate);
    store.fetchUser(userData.id);
  });
});
