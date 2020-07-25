module.exports = {
    preset: 'ts-jest',
    collectCoverageFrom: [
        'infrastructure/**/*.ts',
        '!infrastructure/bin/*.ts',
        'cdk-set-topic-attributes-lambda/src/*.ts',
        'cdk-set-topic-attributes-lambda/src/**/*.ts',
        '!cdk-set-topic-attributes-lambda/src/*.test.ts',
        '!cdk-set-topic-attributes-lambda/src/**/*.test.ts',
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
            statements: 89.81,
            branches: 52.5,
            functions: 84.21,
            lines: 89.72,
        },
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    verbose: true,
};
