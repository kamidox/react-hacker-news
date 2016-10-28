/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../app/components/App';
import NavLink from '../app/components/NavLink';

describe('<App /> ', () => {
  it('render header', () => {
    const app = shallow(<App />);
    expect(app.find('.header')).to.have.length(1);
  });

  it('render content container', () => {
    const app = shallow(<App />);
    expect(app.find('.content')).to.have.length(1);
  });

  it('render 6 NavLinks', () => {
    const app = shallow(<App />);
    expect(app.find(NavLink)).to.have.length(6);
  });

  it('render footer', () => {
    const app = shallow(<App />);
    expect(app.find('.footer')).to.have.length(1);
  });
});
