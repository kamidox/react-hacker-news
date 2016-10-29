/* eslint import/no-extraneous-dependencies: 0 */
import { expect, assert } from 'chai';

import {
  storyRef,
  itemRef,
  userRef
} from '../app/components/HackerNewsRest';

describe('HackerNewsRest', () => {
  xit('fetch story', (done) => {
    storyRef('newstories')
      .then(res => res.json())
      .then((ids) => {
        assert.isArray(ids);
        expect(ids.length).gt(0);
        done();
      });
  });

  xit('fetch item of story', (done) => {
    itemRef('8863')
      .then(res => res.json())
      .then((item) => {
        assert.isNumber(item.id);
        assert.isString(item.title);
        assert.match(item.url, /http:\/\/.*/);
        assert.isArray(item.kids);
        expect(item.kids.length).gt(0);
        expect(item.score).gt(0);
        expect(item.type).equal('story');
        done();
      });
  });

  xit('fetch item of comment', (done) => {
    itemRef('8952')
      .then(res => res.json())
      .then((item) => {
        assert.isNumber(item.id);
        assert.isUndefined(item.title);
        assert.isUndefined(item.url);
        assert.isArray(item.kids);
        assert.isNumber(item.parent);
        assert.isArray(item.kids);
        expect(item.kids.length).gt(0);
        expect(item.type).equal('comment');
        expect(item.parent).equal(8863);
        done();
      });
  });

  xit('fetch user', () => {
    userRef('dhouston')
      .then((res) => {
        const user = res.json();
        expect(user.id).equal('dhouston');
        assert.isArray(user.submitted);
      });
  });
});
