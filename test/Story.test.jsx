/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Story from '../app/components/Story';
import StoryList from '../app/components/StoryList';

describe('<Story />', () => {
  const location = {
    query: {
      page: 0
    },
    pathname: '/story'
  };

  it('default props and state', () => {
    const wrapper = shallow(<Story location={location} />);
    expect(wrapper.instance().props.type).equal('newstories');
    expect(wrapper.state('ids')).to.have.length(0);
    expect(wrapper.state('stories')).to.have.length(0);
  });

  it('renders a StoryList', () => {
    const wrapper = shallow(<Story location={location} />);
    expect(wrapper.find(StoryList)).to.have.length(1);
  });
});
