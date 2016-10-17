/* eslint react/no-danger: 0 */
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

function renderText(item) {
  if (!item.text) {
    return <div className="item__text" />;
  }

  return (
    <div className="item__text">
      <div dangerouslySetInnerHTML={{ __html: item.text }} />
    </div>
  );
}

export { renderTitle, renderMeta, renderText };
