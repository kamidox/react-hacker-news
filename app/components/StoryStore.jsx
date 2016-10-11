import EventEmmiter from 'events';
import log from 'loglevel';
import { storyRef, itemRef } from './HackerNewsRest';

/*
 * Cached story ids list. category by type (one of "job", "story", "comment", "poll", or "pollopt")
 * Show stories return by: https://hacker-news.firebaseio.com/v0/showstories.json
**/
let itemIds = {};

/**
 * Cached stores.
 * Store <id, item> pair data. Will store to localStorage when component unmounted.
 */
let cachedStories = {};

/**
 * Story list. category by type.
 * Each story fetched by its id from: https://hacker-news.firebaseio.com/v0/item/8863.json
 */
const storyList = {};

/**
 * Load cached stores from CachedStories to storyList and itemIds.
 */
function populateStoryList(type) {
  const ids = itemIds[type];
  const stories = storyList[type];
  for (let i = 0; i < ids.length; i += 1) {
    stories[i] = cachedStories[ids[i]] || null;
  }

  let num = 0;
  stories.forEach((item) => {
    if (item) {
      num += 1;
    }
  });
  log.info(`populate story list. totally ${num} items cached for ${type}`);
}

function parseJson(json, defaultValue) {
  return json ? JSON.parse(json) : defaultValue;
}

class StoryStore extends EventEmmiter {
  constructor(type) {
    super();
    this.type = type;
    if (!(type in itemIds)) {
      itemIds[type] = [];
      storyList[type] = [];
      populateStoryList(type);
    }
  }

  getState() {
    return {
      ids: itemIds[this.type],
      stories: storyList[this.type]
    };
  }

  // start to load latest story ids from network
  fetchStory() {
    log.info(`fetch story ${this.type}`);
    storyRef(this.type)
      .then(res => res.json())
      .then(ids => this.onStoryUpdated(ids));
  }

  // stop to load
  stop() {
    log.info(`${this.type}: stop`);
  }

  onStoryUpdated(ids) {
    log.info(`story updated. totaly ${ids.length} items.`);
    itemIds[this.type] = ids;
    populateStoryList(this.type);
    this.emit('update', this.getState());
  }

  // fetch story from network by its id
  fetchItem(id) {
    log.info(`fetch item ${id}`);
    itemRef(id)
      .then(res => res.json())
      .then(item => this.onItemUpdated(item));
  }

  onItemUpdated(item) {
    log.info(`item updated. id=${item.id}, title=${item.title}`);
    cachedStories[item.id] = item;
    populateStoryList(this.type);
    this.emit(item.id, item);
  }

  static getCacheItem(id) {
    log.info(`get cache item ${id}`);
    return cachedStories[id] || null;
  }

  static load() {
    log.info('load cache from localStorage');
    if (typeof window === 'undefined') {
      return;
    }
    itemIds = parseJson(window.localStorage.itemIds, {});
    cachedStories = parseJson(window.localStorage.cachedStories, {});
  }

  static save() {
    log.info('save cache to localStorage');
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem('itemIds', JSON.stringify(itemIds));
    window.localStorage.setItem('cacheStories', JSON.stringify(cachedStories));
  }
}

export default StoryStore;
