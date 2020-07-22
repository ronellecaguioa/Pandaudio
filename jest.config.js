module.exports = {
  collectCoverage: true,
  rootDir: './',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'lib'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  // setupFiles: ['<rootDir>/__tests__/setup/socketMock.js'],
  // setupFilesAfterEnv: ['./__tests__/setup/windowMock.js'],
};
