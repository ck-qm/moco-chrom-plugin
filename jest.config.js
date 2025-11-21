module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'MOCO Chrome Plugin Test Report',
        outputPath: 'test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        sort: 'status'
      }
    ]
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
