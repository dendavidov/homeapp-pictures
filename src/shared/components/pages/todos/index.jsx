import { asyncComponent } from 'react-async-component';

const AsyncMainLayout = asyncComponent({
  resolve: () =>
    new Promise(resolve =>
      require.ensure(
        [],
        require => {
          resolve(require('./Todos'));
        },
        'todos'
      )
    ),
});

export default AsyncMainLayout;
