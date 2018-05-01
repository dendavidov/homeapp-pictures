import axios from 'axios';
import { apiMiddleware } from './index';

jest.mock('axios');

describe('api-middleware', () => {
  let dispatchMock;
  let getStateMock;
  let nextMock;

  let middleware;

  beforeEach(() => {
    dispatchMock = jest.fn();
    getStateMock = jest.fn(() => ({}));

    nextMock = jest.fn();

    middleware = apiMiddleware({
      dispatch: dispatchMock,
      getState: getStateMock,
    })(nextMock);
  });

  it('should call next if action type !== "API"', () => {
    const action = { type: 'FOO', payload: 'awesomePayload' };
    middleware(action);

    expect(nextMock.mock.calls.length).toBe(1);
  });

  it('should call next with the same action if action type !== "API"', () => {
    const action = { type: 'FOO', payload: 'awesomePayload' };
    middleware(action);

    expect(nextMock.mock.calls[0][0]).toBe(action);
  });

  it('should throw Error if payload.prefix is undefined', () => {
    const action = { type: 'API', payload: {} };
    expect(() => {
      middleware(action);
    }).toThrowError('payload.prefix should be string and have length > 0');
  });

  it('should throw Error if payload.prefix is not string', () => {
    const action = { type: 'API', payload: { prefix: 4 } };
    expect(() => {
      middleware(action);
    }).toThrowError('payload.prefix should be string and have length > 0');
  });

  it('should throw Error if payload.prefix is empty string', () => {
    const action = { type: 'API', payload: { prefix: '' } };
    expect(() => {
      middleware(action);
    }).toThrowError('payload.prefix should be string and have length > 0');
  });

  it('should throw Error if payload.url is undefined', () => {
    const action = { type: 'API', payload: { prefix: 'FOO' } };
    expect(() => {
      middleware(action);
    }).toThrowError('payload.url should be string and have length > 0');
  });

  it('should throw Error if payload.url is not string', () => {
    const action = { type: 'API', payload: { prefix: 'FOO', url: 4 } };
    expect(() => {
      middleware(action);
    }).toThrowError('payload.url should be string and have length > 0');
  });

  it('should throw Error if payload.url is empty string', () => {
    const action = { type: 'API', payload: { prefix: 'FOO', url: '' } };
    expect(() => {
      middleware(action);
    }).toThrowError('payload.url should be string and have length > 0');
  });
});

describe('api-middleware. Successful cases', () => {
  let dispatchMock;
  let getStateMock;
  let nextMock;

  let middleware;

  beforeEach(() => {
    dispatchMock = jest.fn();
    getStateMock = jest.fn(() => ({}));

    nextMock = jest.fn();

    middleware = apiMiddleware({
      dispatch: dispatchMock,
      getState: getStateMock,
    })(nextMock);

    axios.mockImplementation(() =>
      Promise.resolve({
        data: {
          success: true,
          data: [1, 2, 3],
        },
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call dispatch 2 times', async () => {
    const action = {
      type: 'API',
      payload: { prefix: 'FOO', url: 'http://example.com' },
    };
    await middleware(action);
    expect(dispatchMock.mock.calls.length).toBe(2);
  });

  it('should call dispatch correct REQUEST action first', async () => {
    const action = {
      type: 'API',
      payload: { prefix: 'FOO', url: 'http://example.com' },
    };
    await middleware(action);
    expect(dispatchMock.mock.calls[0][0]).toEqual({
      payload: { status: 'REQUEST' },
      type: 'FOO_get_REQUEST',
    });
  });

  it('should call dispatch correct SUCCESS action second', async () => {
    const action = {
      type: 'API',
      payload: { prefix: 'FOO', url: 'http://example.com' },
    };
    await middleware(action);
    expect(dispatchMock.mock.calls[1][0]).toEqual({
      payload: [1, 2, 3],
      type: 'FOO_get_SUCCESS',
    });
  });

  it('should send correct request', async () => {
    const action = {
      type: 'API',
      payload: { prefix: 'FOO', url: 'http://example.com' },
    };
    await middleware(action);
    expect(axios.mock.calls[0][0]).toEqual({
      data: null,
      headers: {},
      method: 'get',
      url: 'http://example.com',
    });
  });

  it('should send process request method config', async () => {
    const action = {
      type: 'API',
      payload: { prefix: 'FOO', url: 'http://example.com', method: 'post' },
    };
    await middleware(action);
    expect(axios.mock.calls[0][0]).toEqual({
      data: null,
      headers: {},
      method: 'post',
      url: 'http://example.com',
    });
  });

  it('should handle dataProcessor config', async () => {
    const dataProcessorMock = jest.fn();

    const action = {
      type: 'API',
      payload: {
        prefix: 'FOO',
        url: 'http://example.com',
        dataProcessor: dataProcessorMock,
      },
    };
    await middleware(action);
    expect(dataProcessorMock.mock.calls.length).toBe(1);
  });

  it('should handle urlPostfix config', async () => {
    const action = {
      type: 'API',
      payload: {
        prefix: 'FOO',
        url: 'http://example.com',
        urlPostfix: 'test',
      },
    };
    await middleware(action);
    expect(axios.mock.calls[0][0]).toEqual({
      data: null,
      headers: {},
      method: 'get',
      url: 'http://example.com/test',
    });
  });

  it('should send process request onSuccess config', async () => {
    const onSuccessMock = jest.fn();

    const action = {
      type: 'API',
      payload: {
        prefix: 'FOO',
        url: 'http://example.com',
        onSuccess: onSuccessMock,
      },
    };
    await middleware(action);
    expect(onSuccessMock.mock.calls.length).toBe(1);
  });
});

describe('api-middleware. Error cases', () => {
  let dispatchMock;
  let getStateMock;
  let nextMock;

  let middleware;

  beforeEach(() => {
    dispatchMock = jest.fn();

    getStateMock = jest.fn(() => ({}));

    nextMock = jest.fn();

    middleware = apiMiddleware({
      dispatch: dispatchMock,
      getState: getStateMock,
    })(nextMock);

    axios.mockImplementation(() => Promise.reject(new Error('Error message')));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call dispatch 2 times', async () => {
    const action = {
      type: 'API',
      payload: { prefix: 'FOO', url: 'http://example.com' },
    };
    await middleware(action);
    expect(dispatchMock.mock.calls.length).toBe(2);
  });

  it('should handle success=false in response', async () => {
    axios.mockImplementation(() =>
      Promise.resolve({
        data: {
          success: false,
          message: 'awesomeErrorMessage',
        },
      })
    );

    const action = {
      type: 'API',
      payload: { prefix: 'FOO', url: 'http://example.com' },
    };
    await middleware(action);
    expect(dispatchMock.mock.calls.length).toBe(2);

    expect(dispatchMock.mock.calls[1][0]).toEqual({
      payload: 'awesomeErrorMessage',
      type: 'FOO_get_ERROR',
    });
  });

  it('should handle success=false and empty message in response', async () => {
    axios.mockImplementation(() =>
      Promise.resolve({
        data: {
          success: false,
        },
      })
    );

    const action = {
      type: 'API',
      payload: { prefix: 'FOO', url: 'http://example.com' },
    };
    await middleware(action);
    expect(dispatchMock.mock.calls.length).toBe(2);

    expect(dispatchMock.mock.calls[1][0]).toEqual({
      payload: 'Unknown error',
      type: 'FOO_get_ERROR',
    });
  });

  it('should send process request onError config', async () => {
    const onErrorMock = jest.fn();

    const action = {
      type: 'API',
      payload: {
        prefix: 'FOO',
        url: 'http://example.com',
        onError: onErrorMock,
      },
    };
    await middleware(action);
    expect(onErrorMock.mock.calls.length).toBe(1);
  });
});
