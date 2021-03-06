module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/cdk.out/', '<rootDir>/dist/'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    setupFiles: ['<rootDir>/.jest/setEnvironmentVariables.js'],
};
