module.exports = {
    parserOptions: {
        project: "index.js",
        sourceType: "module",
        ecmaVersion: 6,
    },
    plugins: ["prettier"],
    extends: ["prettier"],
    root: true,
    env: {
        node: true,
        jest: true,
        es6: true,
    },
    rules: {
        "indent": ["error", 4],
        "quotes": ["error", "double", { avoidEscape: true }],
        "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
        "semi": ["error", "never"],
        "no-trailing-spaces": "error",
        "space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "no-multi-str": "off",
        "quote-props": ["error", "consistent-as-needed"],
        "linebreak-style": ["error", "unix"],
        "object-curly-spacing": ["error", "always"],
        "comma-dangle": [
            "error",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "never",
                exports: "never",
                functions: "never",
            },
        ],
        "keyword-spacing": ["error"],
    },
}
