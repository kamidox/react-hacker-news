import EventEmmiter from 'events';
import Log from 'loglevel';
import { storyRef, itemRef, userRef } from './HackerNewsRest';

const logCtrl = Log.getLogger('controller');

/*
 * Cached story ids list. category by type (one of "job", "story", "comment", "poll", or "pollopt")
 * Show stories return by: https://hacker-news.firebaseio.com/v0/showstories.json
**/
let storyIds = {};

/**
 * Story list. category by type.
 * Each story fetched by its id from: https://hacker-news.firebaseio.com/v0/item/8863.json
 */
const storyList = {};

/**
 * Cached stores.
 * Store <id, item> pair data. Will store to localStorage when component unmounted.
 */
let cachedItems = {};

/**
 * Load cached stores from CachedStories to storyList and storyIds.
 */
function populateStoryList(type) {
  const ids = storyIds[type];
  const stories = storyList[type];
  for (let i = 0; i < ids.length; i += 1) {
    stories[i] = cachedItems[ids[i]] || null;
  }

  let num = 0;
  stories.forEach((item) => {
    if (item) {
      num += 1;
    }
  });
  logCtrl.debug(`populate story list. totally ${num} items cached for ${type}`);
}

function parseJson(json, defaultValue) {
  return json ? JSON.parse(json) : defaultValue;
}

class StoryStore extends EventEmmiter {
  constructor(type) {
    super();
    this.type = type;
    if (!(type in storyIds)) {
      storyIds[type] = [];
    }
    if (!(type in storyList)) {
      storyList[type] = [];
      populateStoryList(type);
    }
  }

  getState() {
    return {
      ids: storyIds[this.type],
      stories: storyList[this.type]
    };
  }

  // start to load latest story ids from network
  fetchStory() {
    logCtrl.debug(`fetch story ${this.type}`);
    storyRef(this.type)
      .then(res => res.json())
      .then(ids => this.onStoryUpdated(ids));
  }

  // stop to load
  stop() {
    logCtrl.debug(`${this.type}: stop`);
  }

  onStoryUpdated(ids) {
    logCtrl.debug(`story updated. totaly ${ids.length} items.`);
    storyIds[this.type] = ids;
    populateStoryList(this.type);
    this.emit('update', this.getState());
  }

  onItemUpdated(item) {
    if (storyIds[this.type].includes(item.id)) {
      populateStoryList(this.type);
    }
  }

  static load() {
    if (typeof window === 'undefined') {
      return;
    }
    if (typeof window.localStorage === 'undefined') {
      return;
    }
    storyIds = parseJson(window.localStorage.storyIds, {});
    cachedItems = parseJson(window.localStorage.cachedItems, {});
    logCtrl.info(`load ${Object.keys(cachedItems).length} cached item from localStorage`);
  }

  static save() {
    if (typeof window === 'undefined') {
      return;
    }
    if (typeof window.localStorage === 'undefined') {
      return;
    }
    window.localStorage.setItem('storyIds', JSON.stringify(storyIds));
    window.localStorage.setItem('cachedItems', JSON.stringify(cachedItems));
    logCtrl.info(`save ${Object.keys(cachedItems).length} cached item to localStorage`);
  }
}

class ItemStore extends EventEmmiter {
  // fetch story from network by its id
  fetchItem(id) {
    logCtrl.debug(`fetch item ${id}`);
    itemRef(id)
      .then(res => res.json())
      .then(item => this.onItemUpdated(item));
  }

  onItemUpdated(item) {
    logCtrl.debug(`item updated. id=${item.id}, title=${item.title}`);
    cachedItems[item.id] = item;
    this.emit(item.id, item);
  }

  toggleCollapse(id) {
    if (cachedItems[id]) {
      if ('collapsed' in cachedItems[id]) {
        cachedItems[id].collapsed = !cachedItems[id].collapsed;
      } else {
        cachedItems[id].collapsed = true;
      }
      this.emit(id, cachedItems[id]);
      return cachedItems[id].collapsed;
    }
    logCtrl.error(`error: toggleCollapse -> item not exist ${id}`);
    return false;
  }

  static getCacheItem(id) {
    logCtrl.debug(`get cached item for ${id}`);
    return cachedItems[id] || null;
  }

  static isCollapsed(id) {
    if (cachedItems[id]) {
      if (typeof cachedItems[id].collapsed === 'undefined') {
        return false;
      }
      return cachedItems[id].collapsed;
    }
    Log.error(`error: isCollapsed -> item not exist ${id}`);
    return false;
  }

  static childCount(id) {
    if (cachedItems[id] && cachedItems[id].kids) {
      let cnt = 0;
      cachedItems[id].kids.forEach((kid) => {
        cnt += ItemStore.childCount(kid);
      });
      return cnt + cachedItems[id].kids.length;
    }
    return 0;
  }
}

class UserStore extends EventEmmiter {
  fetchUser(id) {
    logCtrl.debug(`fetch user ${id}`);
    userRef(id)
      .then(res => res.json())
      .then(user => this.onUserUpdated(user));
  }

  onUserUpdated(user) {
    logCtrl.debug(`user updated. id=${user.id}, about=${user.about}`);
    this.emit(user.id, user);
  }
}

export {
  StoryStore,
  ItemStore,
  UserStore
};
