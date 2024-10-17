import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

export default tseslint.config(
    {
        ignores: [
            "**/dist/*",
            "**coverage/*",
            "**.github/*",
            "eslint.config.mjs",
            "jest.config.ts",
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ["./**/*.ts", "./**/*.tsx"],
    },
    {
        rules: {
            // Core focus: enforce types on variables, function return types, and parameters
            "@typescript-eslint/explicit-function-return-type": "error", // Require return types on functions
            "@typescript-eslint/no-unused-vars": "error", // Disallow unused variables
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" }, // allow unused variables prefixed with underscore
            ],
            "@typescript-eslint/typedef": [
                "error",
                {
                    parameter: true, // Require types for function parameters
                    propertyDeclaration: true, // Require types for class properties
                    variableDeclaration: true, // Require types for variables
                    memberVariableDeclaration: true, // Require types for member variables
                    variableDeclarationIgnoreFunction: true, // Ignore types for function variables
                },
            ],
            // Allow ES6 imports with CommonJS output
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-var-requires": "off",
        },
    }
);
