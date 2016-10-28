/* eslint import/no-extraneous-dependencies: 0 */
import { expect } from 'chai';
import { shallow } from 'enzyme';

import {
  getPage,
  renderCommentText,
  renderCommentMeta,
  renderText,
  renderMeta,
  renderTitle
} from '../app/components/Utils';

describe('Utils', () => {
  it('getPage for one page', () => {
    const page = getPage(10, 0, 8);
    expect(page.startIndex).to.equal(0);
    expect(page.endIndex).to.equal(8);
    expect(page.hasNext).to.equal(false);
  });

  it('getPage for multi page', () => {
    const page = getPage(10, 2, 38);
    expect(page.startIndex).to.equal(10);
    expect(page.endIndex).to.equal(20);
    expect(page.hasNext).to.equal(true);
  });

  it('renderCommentText', () => {
    const text = '<span>item text</span>';
    const item = { text };
    const ct = renderCommentText(item);
    const wrapper = shallow(ct);
    expect(wrapper.find('.comment__text')).to.have.length(1);
    expect(wrapper.html().includes(text)).to.equal(true);
  });

  it('renderCommentMeta', () => {
    const text = '<span>item text</span>';
    const item = {
      text,
      by: 'kamidox',
      time: 1175714200
    };
    const cm = renderCommentMeta(item, false, 0, null);
    const wrapper = shallow(cm);
    expect(wrapper.find('.comment__meta')).to.have.length(1);
    expect(wrapper.find('.comment__collapse')).to.have.length(1);
  });

  it('renderText', () => {
    const text = '<span>item text</span>';
    const item = { text };
    const ct = renderText(item);
    const wrapper = shallow(ct);
    expect(wrapper.find('.item__text')).to.have.length(1);
    expect(wrapper.html().includes(text)).to.equal(true);
  });

  it('renderMeta', () => {
    const text = '<span>item text</span>';
    const item = {
      id: 100,
      type: 'story',
      text,
      score: 10,
      descendants: 9,
      by: 'kamidox',
      time: 1175714200
    };
    const cm = renderMeta(item);
    const wrapper = shallow(cm);
    expect(wrapper.find('.item__meta')).to.have.length(1);
    expect(wrapper.find(`[to="/${item.type}/${item.id}"]`)).to.have.length(1);
  });

  it('renderTitle with title and url', () => {
    const text = '<span>item text</span>';
    const item = {
      id: 100,
      type: 'story',
      text,
      score: 10,
      descendants: 9,
      by: 'kamidox',
      time: 1175714200,
      title: 'blog',
      url: 'http://blog.kamidox.com'
    };
    const cm = renderTitle(item);
    const wrapper = shallow(cm);
    expect(wrapper.find('.item__title')).to.have.length(1);
    expect(wrapper.find(`[href="${item.url}"]`)).to.have.length(1);
    expect(wrapper.find('.item__host')).to.have.length(1);
  });

  it('renderTitle without title', () => {
    const text = '<span>item text</span>';
    const item = {
      id: 100,
      type: 'comment',
      text,
      descendants: 9,
      by: 'kamidox',
      time: 1175714200
    };
    const cm = renderTitle(item);
    const wrapper = shallow(cm);
    expect(wrapper.find('.item__title')).to.have.length(1);
    expect(wrapper.find(`[to="/${item.type}/${item.id}"]`)).to.have.length(1);
    expect(wrapper.find('.item__host')).to.have.length(0);
  });
});
