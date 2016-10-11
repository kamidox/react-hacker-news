/* global fetch */
import 'isomorphic-fetch';

const END_POINT = 'https://hacker-news.firebaseio.com/v0';

function storyRef(path) {
  return fetch(`${END_POINT}/${path}.json`);
}

function itemRef(id) {
  return fetch(`${END_POINT}/item/${id}.json`);
}

export {
  storyRef,
  itemRef
};
