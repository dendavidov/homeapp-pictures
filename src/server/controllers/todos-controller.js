import HTTPStatus from 'http-status';

import logger from '../logger';
import mongoose from '../dbInit';

const ToDoItem = mongoose.model('ToDoItem');

const getList = async ctx => {
  try {
    ctx.body = {
      success: true,
      data: await ToDoItem.find(),
    };
  } catch (err) {
    logger.error(err);
    ctx.throw(HTTPStatus.INTERNAL_SERVER_ERROR);
  }
};

const getItem = async ctx => {
  const data = await ToDoItem.findById(ctx.params.id);

  if (!data) ctx.throw(HTTPStatus.NOT_FOUND);

  try {
    ctx.body = {
      success: true,
      data,
    };
  } catch (err) {
    logger.error(err);
    ctx.throw(HTTPStatus.INTERNAL_SERVER_ERROR);
  }
};

const editItem = async ctx => {
  try {
    const item = await ToDoItem.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      {
        new: true,
      }
    );

    ctx.body = {
      success: true,
      data: item,
    };
  } catch (err) {
    logger.error(err);
    ctx.throw(HTTPStatus.INTERNAL_SERVER_ERROR);
  }
};

const addItem = async ctx => {
  try {
    const item = await ToDoItem.create({
      ...ctx.request.body,
    });

    ctx.body = {
      success: true,
      data: item,
    };
  } catch (err) {
    logger.error(err);
    ctx.throw(HTTPStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteItems = async ctx => {
  const { body } = ctx.request;

  if (!body || !Array.isArray(body)) ctx.throw(HTTPStatus.BAD_REQUEST);

  try {
    await ToDoItem.deleteMany({ _id: { $in: body } });
    ctx.body = {
      success: true,
    };
  } catch (err) {
    logger.error(err);
    ctx.throw(HTTPStatus.INTERNAL_SERVER_ERROR);
  }
};

export default {
  getList,
  getItem,
  editItem,
  addItem,
  deleteItems,
};
