// const App = require('../../client/App/index.jsx');

// jest.mock('socket.io-client', () => {
//   const emit = jest.fn();
//   const on = jest.fn();
//   const socket = { emit, on };
//   return jest.fn(() => socket);
// });

describe('<App />', () => {
  it('should have a decent test', () => {
    expect('a string').toEqual('a string');
  });
});
