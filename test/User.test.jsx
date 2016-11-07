/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Spinner from 'react-spinkit';

import User from '../app/components/User';
import StoryList from '../app/components/StoryList';

describe('<User />', () => {
  const params = {
    id: 1
  };
  const location = {
    query: {
      page: 0
    },
    pathname: '/story'
  };

  it('render starting with a Spinner', () => {
    const wrapper = shallow(<User params={params} />);
    expect(wrapper.find(Spinner)).to.have.length(1);
  });

  it('render User', () => {
    const user = {
      about: 'Founder&#x2F;CEO of Dropbox (http:&#x2F;&#x2F;www.dropbox.com ; yc summer &#x27;07)',
      created: 1175189462,
      delay: 0,
      id: 'dhouston',
      karma: 2488,
      submitted: [
        7677676,
        7336
      ]
    };
    const wrapper = shallow(<User params={params} location={location} />);
    wrapper.setState({ user });
    expect(wrapper.find('.user')).to.have.length(1);
    expect(wrapper.find('.user__id')).to.have.length(1);
    expect(wrapper.find('.user__meta')).to.have.length(2);
    expect(wrapper.find('.user__about')).to.have.length(1);
    expect(wrapper.find('.user__story')).to.have.length(1);
    expect(wrapper.find(StoryList)).to.have.length(1);
    expect(wrapper.find(Spinner)).to.have.length(0);
  });
});
