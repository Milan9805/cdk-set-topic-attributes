module.exports = {
    preset: 'ts-jest',
    collectCoverageFrom: [
        '<rootDir>/infrastructure/**/*.ts',
        '!<rootDir>/infrastructure/bin/*.ts',
        '<rootDir>/setTopicAtributes/src/*.ts',
        '<rootDir>/setTopicAtributes/src/**/*.ts',
        '!<rootDir>/setTopicAtributes/src/*.test.ts',
        '!<rootDir>/setTopicAtributes/src/**/*.test.ts',
    ],
    setupFiles: ['<rootDir>/infrastructure/.jest/setEnvironmentVariables.js'],
    testPathIgnorePatterns: [
        '<rootDir>/infrastructure/cdk.out/',
        '<rootDir>/infrastructure/dist/',
        '<rootDir>/cdk-set-topic-attributes-lambda/dist/',
    ],
    testEnvironment: 'node',
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    verbose: true,
};
