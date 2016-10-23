/* global fetch */
import 'isomorphic-fetch';
import Log from 'loglevel';

const END_POINT = 'https://hacker-news.firebaseio.com/v0';
const log = Log.getLogger('net');

function storyRef(path) {
  log.debug(`request story for ${path}`);
  return fetch(`${END_POINT}/${path}.json`);
}

function itemRef(id) {
  log.debug(`request item for ${id}`);
  return fetch(`${END_POINT}/item/${id}.json`);
}

function userRef(id) {
  log.debug(`request user for ${id}`);
  return fetch(`${END_POINT}/user/${id}.json`);
}

export {
  storyRef,
  itemRef,
  userRef
};
