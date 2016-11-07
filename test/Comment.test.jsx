/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Spinner from 'react-spinkit';

import Comment from '../app/components/Comment';
import { ItemStore } from '../app/components/DataStore';

describe('<Comment />', () => {
  let store = null;
  let stub = null;
  let stub2 = null;
  let item = null;

  beforeEach(() => {
    store = new ItemStore();
    stub = sinon.stub(store, 'fetchItem', () => store.onItemUpdated(item ? item.id : 8952, item));
    stub2 = sinon.stub(ItemStore, 'getCacheItem', () => item);
  });

  afterEach(() => {
    stub.restore();
    stub2.restore();
    store = null;
  });

  it('render empty item with a Spinner', () => {
    item = null;
    const wrapper = shallow(<Comment id={8952} level={0} store={store} />);
    expect(wrapper.find(Spinner)).to.have.length(1);
  });

  it('render Comment', () => {
    item = {
      by: 'nickb',
      id: 8952,
      parent: 8863,
      text: 'comment text',
      time: 1175727286,
      type: 'comment'
    };
    const wrapper = shallow(<Comment id={item.id} level={0} store={store} />);
    expect(wrapper.find('.comment .comment--level0')).to.have.length(1);
    expect(wrapper.find('.comment__content')).to.have.length(1);
    expect(wrapper.find('.comment__kids')).to.have.length(0);
    expect(wrapper.find(Spinner)).to.have.length(0);
    expect(wrapper.find(Comment)).to.have.length(0);
  });

  it('render Comment with kids', () => {
    item = {
      by: 'nickb',
      id: 8953,
      parent: 8863,
      kids: [
        9153,
        9178
      ],
      text: 'comment text',
      time: 1175727286,
      type: 'comment'
    };
    const wrapper = shallow(<Comment id={item.id} level={0} store={store} />);
    expect(wrapper.find('.comment .comment--level0')).to.have.length(1);
    expect(wrapper.find('.comment__content')).to.have.length(1);
    expect(wrapper.find('.comment__kids')).to.have.length(1);
    expect(wrapper.find(Spinner)).to.have.length(0);
    expect(wrapper.find(Comment)).to.have.length(item.kids.length);
  });
});
