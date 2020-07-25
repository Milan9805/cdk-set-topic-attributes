module.exports = {
    '*.{js,ts}': ['prettier --write', 'xo'],
    '*.{json,md}': 'prettier --write',
    'package.json': ['prettier --write', 'sort-package-json'],
};
