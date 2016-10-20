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

function renderTitle(item) {
  const hasUrl = !!item.url;
  const itemTitle = hasUrl ? <a href={item.url}>{item.title}</a>
      : <Link to={`/${item.type}/${item.id}`}>{item.title}</Link>;
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
      {item.score} points by {item.by} {postTime(item.time)}
      {(item.descendants === 0 || item.descendants > 0) && ' | '}
      <Link to={`/${item.type}/${item.id}`}>
        {item.descendants === 0 && 'discuss'}
        {item.descendants > 0 && `${item.descendants} comments`}
      </Link>
    </div>
  );
}

function renderHtmlText(item, className) {
  if (!item.text) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <div dangerouslySetInnerHTML={{ __html: item.text }} />
    </div>
  );
}

function renderText(item) {
  return renderHtmlText(item, 'item__text');
}

function renderCommentMeta(item, collapsed, childCount, toggleCollapse) {
  return (
    <div className="comment__meta">
      {item.by} {postTime(item.time)}
      <span className="comment__collapse" onClick={toggleCollapse}>
        {' '} [{collapsed ? `+${childCount}` : '-'}]
      </span>
    </div>
  );
}

function renderCommentText(item) {
  return renderHtmlText(item, 'comment__text');
}

export { renderTitle, renderMeta, renderText, renderCommentMeta, renderCommentText };
