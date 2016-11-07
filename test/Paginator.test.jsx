/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Paginator from '../app/components/Paginator';

describe('<Paginator />', () => {
  it('render nothing for one page', () => {
    const wrapper = shallow(<Paginator pathname={'/news'} page={1} hasNext={false} />);
    expect(wrapper.html()).equal(null);
  });

  it('render next page', () => {
    const wrapper = shallow(<Paginator pathname={'/news'} page={1} hasNext />);
    expect(wrapper.find('.paginator')).to.have.length(1);
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(Link).childAt(0).text()).equal('More');
  });

  it('render prev page', () => {
    const wrapper = shallow(<Paginator pathname={'/news'} page={2} hasNext={false} />);
    expect(wrapper.find('.paginator')).to.have.length(1);
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(Link).childAt(0).text()).equal('Prev');
  });

  it('render prev and next page', () => {
    const wrapper = shallow(<Paginator pathname={'/news'} page={2} hasNext />);
    expect(wrapper.find('.paginator')).to.have.length(1);
    expect(wrapper.find(Link)).to.have.length(2);
  });
});
