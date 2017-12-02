import fs from 'fs';
import mustache from 'mustache';
import serialize from 'serialize-javascript';

const INDEX_TEMPLATE_FILE = 'static/index.html';

const indexFileContent = fs.readFileSync(INDEX_TEMPLATE_FILE).toString();

/**
 * Render index page content with locale and reactString.
 * @param {string} reactString - Output from server rendering.
 * @param {object} head - Header.
 * @param {object} initialState - Initial state.
 * @param {object} asyncState - current state of the <AsyncComponentProvider />
 * @param {object} jobsState - current state of the <JobProvider />
 * @returns {string} - Index page content.
 */
const renderIndexPage = (
  reactString,
  head,
  initialState,
  asyncState,
  jobsState
) => {
  const data = {
    reactString,
    title: head.title.toString(),
    initialState: serialize(initialState),
    asyncState: serialize(asyncState),
    jobsState: serialize(jobsState),
  };
  return mustache.render(indexFileContent, data);
};

export default renderIndexPage;
