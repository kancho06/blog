/* eslint-env node */
/** @type {import('stylelint').Config} */
const config = {
    extends: 'stylelint-config-standard',
    customSyntax: '@stylelint/postcss-css-in-js',
    "rules": {
        "indentation": 4,
        "function-no-unknown": null,
        "no-empty-first-line": null,
        "rule-empty-line-before": null,
        "value-keyword-case": [
            "lower",
            {
                ignoreKeywords: [/.*/],
                ignoreProperties: [/.*/],
                ignoreFunctions: [/.*/],
            },
        ],
        "function-name-case": [
            "lower",
            {
                ignoreFunctions: [/.*/],
            },
        ],
    },
}
module.exports = config
