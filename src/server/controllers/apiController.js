import packageJson from '../../../package.json';

const getIndex = ctx => {
  ctx.body = {
    success: true,
    data: {
      name: packageJson.name,
      version: packageJson.version,
    },
  };
};
export default {
  getIndex,
};
