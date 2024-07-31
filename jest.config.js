// jest.config.js
module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      '\\.module\\.css$': '<rootDir>/__mocks__/styleMock.js',
    },
  };