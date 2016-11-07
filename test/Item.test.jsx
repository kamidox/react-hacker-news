/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Spinner from 'react-spinkit';

import Item from '../app/components/Item';
import Comment from '../app/components/Comment';
import { ItemStore } from '../app/components/DataStore';


describe('<Item />', () => {
  let stub = null;
  let item = null;
  const params = {
    id: 8863
  };
  beforeEach(() => {
    stub = sinon.stub(ItemStore, 'getCacheItem', () => item);
  });

  afterEach(() => {
    stub.restore();
  });

  it('render empty item with a Spinner', () => {
    item = null;
    const wrapper = shallow(<Item params={params} />);
    expect(wrapper.find(Spinner)).to.have.length(1);
  });

  it('render Item', () => {
    item = {
      by: 'dhouston',
      descendants: 71,
      id: 8863,
      score: 111,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html'
    };
    const wrapper = shallow(<Item params={params} />);
    expect(wrapper.find('.item')).to.have.length(1);
    expect(wrapper.find('.item__content')).to.have.length(1);
    expect(wrapper.find('.item__kids')).to.have.length(1);
    expect(wrapper.find(Spinner)).to.have.length(0);
    expect(wrapper.find(Comment)).to.have.length(0);
  });

  it('render Item with kids', () => {
    item = {
      by: 'dhouston',
      descendants: 71,
      id: 8863,
      kids: [
        8952,
        9224,
      ],
      score: 111,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html'
    };
    const wrapper = shallow(<Item params={params} />);
    expect(wrapper.find('.item')).to.have.length(1);
    expect(wrapper.find('.item__content')).to.have.length(1);
    expect(wrapper.find('.item__kids')).to.have.length(1);
    expect(wrapper.find(Spinner)).to.have.length(0);
    expect(wrapper.find(Comment)).to.have.length(item.kids.length);
  });
});
