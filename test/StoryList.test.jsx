/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Spinner from 'react-spinkit';

import StoryList from '../app/components/StoryList';
import Paginator from '../app/components/Paginator';
import StoryListItem from '../app/components/StoryListItem';

describe('<StoryList />', () => {
  const location = {
    query: {
      page: 0
    },
    pathname: '/story'
  };

  it('render items', () => {
    const ids = [1, 2, 3, 4];
    const wrapper = shallow(<StoryList ids={ids} location={location} />);
    expect(wrapper.find(Spinner)).to.have.length(0);
    expect(wrapper.find('ol.storylist')).to.have.length(1);
    expect(wrapper.find(StoryListItem)).to.have.length(ids.length);
    expect(wrapper.find(Paginator)).to.have.length(1);
  });

  it('render a Spinner when no item', () => {
    const ids = [];
    const wrapper = shallow(<StoryList ids={ids} location={location} />);
    expect(wrapper.find(Spinner)).to.have.length(1);
    expect(wrapper.find('ol.storylist')).to.have.length(1);
    expect(wrapper.find(Paginator)).to.have.length(1);
  });
});
