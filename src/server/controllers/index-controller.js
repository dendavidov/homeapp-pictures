const getIndex = ctx => {
  ctx.body = {
    success: true,
    data: {
      // todo fix
      name: 'APP NAME',
      version: 'APP_VERSION',
    },
  };
};

export default {
  getIndex,
};
