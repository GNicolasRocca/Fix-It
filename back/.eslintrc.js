module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:reccomended", "plugin:@typescript-eslint/reccomended"],
    rules: {
        "no-restricted-imports": [
            "error",
            {
              "patterns": [
                {
                  "group": ["utils/*"],
                  "importNames": ["isEmpty"],
                  "message": "Use 'isEmpty' from lodash instead."
                }
              ]
            }
          ]
    },
};