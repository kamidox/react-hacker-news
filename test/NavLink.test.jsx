/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import NavLink from '../app/components/NavLink';

describe('<NavLink />', () => {
  it('render a Link with active', () => {
    const wrapper = shallow(<NavLink to="/news">News</NavLink>);
    expect(wrapper.find('[activeClassName="active"]')).to.have.length(1);
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.childAt(0).text()).equal('News');
  });
});
