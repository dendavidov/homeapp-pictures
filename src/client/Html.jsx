import React from 'react';

class Html extends React.Component {
  state = {};

  render() {
    const { reactAppString, script } = this.props;
    console.log('script', script);
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>test</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: reactAppString }} />
          <script src={script} />
        </body>
      </html>
    );
  }
}

export default Html;
