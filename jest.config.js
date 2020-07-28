module.exports = {
    preset: 'ts-jest',
    collectCoverageFrom: [
        '<rootDir>/deployGenericSnsTopic/**/*.ts',
        '!<rootDir>/deployGenericSnsTopic/bin/*.ts',
        '<rootDir>/setTopicAtributes/src/*.ts',
        '<rootDir>/setTopicAtributes/src/**/*.ts',
        '!<rootDir>/setTopicAtributes/src/*.test.ts',
        '!<rootDir>/setTopicAtributes/src/**/*.test.ts',
    ],
    setupFiles: ['<rootDir>/deployGenericSnsTopic/.jest/setEnvironmentVariables.js'],
    testPathIgnorePatterns: [
        '<rootDir>/deployGenericSnsTopic/cdk.out/',
        '<rootDir>/deployGenericSnsTopic/dist/',
        '<rootDir>/setTopicAttributes/dist/',
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
