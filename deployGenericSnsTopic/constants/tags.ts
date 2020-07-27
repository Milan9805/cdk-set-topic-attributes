const pkg = require('../package');

const Tags = [
    ['repo_name', pkg.name],
    ['defined_in', 'cdk'],
    ['project', pkg.name],
    ['pushed_by', process.env.PUSHED_BY],
];

module.exports = Tags;
