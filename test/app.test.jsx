import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../app/components/App';

describe('<App /> ', () => {
  it('render a header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.header')).to.have.length(1);
  });

  it('render a footer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.footer')).to.have.length(1);
  });
});
