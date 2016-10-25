/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import Spinner from 'react-spinkit';
import Log from 'loglevel';
import Paginator from './Paginator';
import StoryListItem from './StoryListItem';
import { getPage } from './Utils';

const logView = Log.getLogger('view');

function renderStoryList(props) {
  const items = [];
  const ids = props.ids;
  const page = getPage(30, props.location.query.page, ids.length);
  logView.debug(`${props.location}: render page ${page.page}.`);
  for (let i = page.startIndex; i < page.endIndex; i += 1) {
    items.push(
      <StoryListItem key={ids[i]} itemId={ids[i]} />);
  }
  if (items.length === 0) {
    items.push(
      <div key={props.type}>
        <Spinner spinnerName="three-bounce" noFadeIn />
        {`loading ${props.type} ...`}
      </div>);
  }
  return (
    <div>
      <ol className="storylist" start={page.startIndex + 1}>
        {items}
      </ol>
      <Paginator
        pathname={props.location.pathname}
        page={page.page}
        hasNext={page.hasNext}
      />
    </div>
  );
}

renderStoryList.propTypes = {
  ids: React.PropTypes.arrayOf(Number).isRequired,
  location: React.PropTypes.object.isRequired,
  type: React.PropTypes.string
};

renderStoryList.defaultProps = {
  type: 'stories'
};

export default renderStoryList;
