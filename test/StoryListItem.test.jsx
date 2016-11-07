/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Spinner from 'react-spinkit';
import sinon from 'sinon';

import StoryListItem from '../app/components/StoryListItem';
import { ItemStore } from '../app/components/DataStore';


describe('<StoryListItem />', () => {
  let stub = null;
  let item = null;

  beforeEach(() => {
    stub = sinon.stub(ItemStore, 'getCacheItem', () => item);
  });

  afterEach(() => {
    stub.restore();
  });

  it('render empty item with a Spinner', () => {
    item = null;
    const wrapper = shallow(<StoryListItem itemId={8952} />);
    expect(wrapper.find('li')).to.have.length(1);
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
    const wrapper = shallow(<StoryListItem itemId={item.id} />);
    expect(wrapper.find('li')).to.have.length(1);
    expect(wrapper.find('.item')).to.have.length(1);
    expect(wrapper.find(Spinner)).to.have.length(0);
  });
});
