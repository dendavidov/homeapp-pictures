import { combineReducers } from 'redux';

import { ApiController } from '../libs/api';

const configs = {
  todosList: {
    prefix: 'TODOS',
    url: '/api/v1/todos',
    initialData: [],
  },
};

const todosListController = new ApiController(configs.todosList);

export const fetchTodos = todosListController.fetch;

export default combineReducers({
  list: todosListController.reducer,
});
