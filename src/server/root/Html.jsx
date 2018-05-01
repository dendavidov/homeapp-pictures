import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const inlineScript = body => (
  <script
    type="text/javascript"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: body }}
  />
);

class Html extends React.Component {
  state = {};

  render() {
    const {
      reactAppString,
      script,
      style,
      initialState,
      asyncState,
      jobsState,
    } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>test</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {style && (
            <link
              href={style}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
            />
          )}
          {inlineScript(`window.INITIAL_STATE=${serialize(initialState)}`)}
          {inlineScript(`window.ASYNC_STATE=${serialize(asyncState)}`)}
          {inlineScript(`window.JOBS_STATE=${serialize(jobsState)}`)}
        </head>
        <body>
          <div
            id="app"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: reactAppString }}
          />
          <script src={script} />
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  reactAppString: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
  style: PropTypes.string,
  initialState: PropTypes.shape().isRequired,
  asyncState: PropTypes.shape().isRequired,
  jobsState: PropTypes.shape().isRequired,
};

Html.defaultProps = {
  style: null,
};

export default Html;
