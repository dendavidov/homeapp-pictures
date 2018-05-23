import { ApiController } from '../libs/api';

const configs = {
  photoLabels: {
    prefix: 'PHOTOS',
    url: '/api/v1/photoLabels',
    initialData: {},
  },
};

const photoLabelsController = new ApiController(configs.photoLabels);

export const fetchPhotoLabels = photoLabelsController.fetch;

export default photoLabelsController.reducer;
