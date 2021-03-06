/* eslint react/no-danger: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import { Link } from 'react-router';
import urlParse from 'url-parse';
import TimeAgo from 'react-timeago';

function hostName(url) {
  return urlParse(url, true).hostname;
}

function postTime(secs) {
  return <TimeAgo date={secs * 1000} />;
}

function postBy(userId) {
  return <Link to={`/user/${userId}`}>{userId}</Link>;
}

function renderTitle(item) {
  const hasUrl = !!item.url;
  const title = item.title ? item.title : `Comment item ${item.id}`;
  const itemTitle = hasUrl ? <a href={item.url}>{item.title}</a>
      : <Link to={`/${item.type}/${item.id}`}>{title}</Link>;
  return (
    <div className="item__title">
      {itemTitle}
      {hasUrl && ' '}
      {hasUrl && <span className="item__host">
        {`(${hostName(item.url)})`}</span>}
    </div>
  );
}

function renderMeta(item) {
  return (
    <div className="item__meta">
      {item.score} points by {postBy(item.by)} {postTime(item.time)}
      {(item.descendants === 0 || item.descendants > 0) && ' | '}
      <Link to={`/${item.type}/${item.id}`}>
        {item.descendants === 0 && 'discuss'}
        {item.descendants > 0 && `${item.descendants} comments`}
      </Link>
    </div>
  );
}

function renderHtmlText(text, className) {
  if (!text) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

function renderText(item) {
  return renderHtmlText(item.text, 'item__text');
}

function renderCommentMeta(item, collapsed, childCount, toggleCollapse) {
  return (
    <div className="comment__meta">
      {postBy(item.by)} {postTime(item.time)}
      <span className="comment__collapse" onClick={toggleCollapse}>
        {' '} [{collapsed ? `+${childCount}` : '-'}]
      </span>
    </div>
  );
}

function renderCommentText(item) {
  return renderHtmlText(item.text, 'comment__text');
}

function getPage(pageSize, curPage, numItems) {
  let page = curPage;
  page = (page && /^\d+$/.test(page) ? Math.max(1, Number(page)) : 1);

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(numItems, (startIndex + pageSize));
  const hasNext = endIndex < numItems;
  return { page, startIndex, endIndex, hasNext };
}

export {
  renderTitle,
  renderMeta,
  renderText,
  renderCommentMeta,
  renderCommentText,
  postTime,
  renderHtmlText,
  getPage
};
