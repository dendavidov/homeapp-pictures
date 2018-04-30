import React from 'react';
import PropTypes from 'prop-types';

class Html extends React.Component {
  state = {};

  render() {
    const { reactAppString, script, style } = this.props;
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
};

Html.defaultProps = {
  style: null,
};

export default Html;
