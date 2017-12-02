import { asyncComponent } from 'react-async-component';

const AsyncBackdoor = asyncComponent({
  resolve: () =>
    new Promise(resolve =>
      require.ensure(
        [],
        require => {
          resolve(require('./backdoor'));
        },
        'backdoor'
      )
    ),
});

export default AsyncBackdoor;
