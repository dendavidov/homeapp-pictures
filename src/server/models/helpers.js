export const toJSON = {
  virtuals: true,
  transform: (doc, ret) => {
    /* eslint-disable no-param-reassign, no-underscore-dangle */
    delete ret._id;
    delete ret.__v;
    ret.id = doc._id;
    /* eslint-enable no-param-reassign, no-underscore-dangle */
  },
};

export const sysProps = {
  createDate: { type: Date, default: new Date() },
  modifiedDate: { type: Date, default: new Date() },
};
