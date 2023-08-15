# Getting Started with Next 13.4

## How I set up a project

# This is a step-by-step guide to make a [Next.js](https://nextjs.org/) project with:

1. [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) for type safety
2. [Tailwind CSS](https://tailwindcss.com/docs/installation) for styling
3. [Jest](https://jestjs.io/docs/getting-started) for testing components etc.
4. [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) for end to end testing etc.
5. [ESLint](https://eslint.org/docs/latest/use/getting-started) for linting
6. [Prettier](https://prettier.io/docs/en/install.html) for formatting
7. [Husky](https://typicode.github.io/husky/getting-started.html) & [Lint-Staged](https://github.com/okonet/lint-staged) for pre-commit testing and linting

## If you like this, checkout my other projects on [GitHub](https://github.com/GLD5000) or via my [Portfolio](https://gld-portfolio.vercel.app/)

## You can also read this guide on [my blog](https://gld-dev-blog.vercel.app/blogpost/clky99brt0000mi0851uxf2dm) or [dev.to](https://dev.to/gld5000):

> #### TLDR: This setup is available as a template in my [GitHub Account](https://github.com/GLD5000) if you want the quickest path to the end result or want to see the setup in context- [GLD-NextTemplate](https://github.com/GLD5000/GLD-NextTemplate)

## Installation and Repo setup

1. `npx create-next-app@latest`
2. `code my-app`
3. `git init`
4. `gh repo create`
5. `git add .`
6. `git commit . -m "Initial Commit"`
7. `git push -u origin main`

## Setup Testing

### Jest

1. Install Jest, ts-jest, jsdom, testing libraries & eslint plugins: `npm i -D jest ts-jest jest-environment-jsdom @testing-library/jest-dom @testing-library/react eslint-plugin-jest-dom eslint-plugin-testing-library`
2. Add jest.config.mjs

```
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

```

3. Add jest.setup.js:

```
import '@testing-library/jest-dom/extend-expect'
import React from 'react'

function MockImage(props) {
    return React.createElement('img', props)
}
jest.mock('next/image', () => MockImage)
```

4. Add scripts to package.json:

```
  "scripts": {
    "test": "clear && jest",
    "test:noClear": "jest",
    "test:watch": "clear && jest --watchAll",
  }
```

5. Add first test in `\_\_tests\_\_/home.test.tsx`:

```
import React from 'react';
import { render } from '@testing-library/react';
import Home from '@/app/page';

describe('Home component', () => {
  it('renders correctly', () => {
    render(<Home />);

    const heroHeading = screen.getByTestId('hero-heading');
    expect(heroHeading).toBeInTheDocument();

    const madeByText = screen.getByText(/Made by GLD5000/i);
    expect(madeByText).toBeInTheDocument();

  });
});

```

### Cypress

1. Install latest Cypress: `npm i -D cypress@latest` (currently "cypress": "^12.17.3" at time of writing)

2. Start a dev server in a terminal: `npm run dev`

3. Open Cypress from a second terminal: `npx cypress open`

4. Once open, click 'E2E Testing' button to configure and then click 'continue' (if you get an error relating to 'bundle' you may need to switch tsconfig.json `"moduleResolution": "bundler",` to `"moduleResolution": "node",`), when prompted for a browser choose e.g. Chrome and click to add scaffolded examples if you like.

5. Setup new config files **within the 'cypress' folder**:

### cypress/eslintrc.json with disabled rules to accommodate cypress example specs:

```
{
    "plugins": ["cypress"],
    "extends": ["plugin:cypress/recommended"],
    "rules": {
        "testing-library/await-async-utils": "off",
        "no-unused-expressions": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "cypress/unsafe-to-chain-command": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off",
        "func-names": "off",
        "@typescript-eslint/no-var-requires": "off",
        "global-require": "off",
        "testing-library/no-debugging-utils": "off",
        "no-param-reassign": "off"
    },
    "overrides": [
        {
            "files": ["viewport.cy.js", "waiting.cy.js"],
            "rules": {
                "cypress/no-unnecessary-waiting": "off"
            }
        }
    ]
}


```

### cypress/tsconfig.json:

```
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es5", "dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [
            {
                "name": "next"
            }
        ],
        "paths": {
            "@/*": ["./src/*"]
        }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
}

```

6. Update exclude and include in root tsconfig.json:

```
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts","cypress/tsconfig.json"],
    "exclude": ["node_modules", "./cypress.config.ts","cypress"]
```

7. Put an eslint disable comment in the cypress.config.ts:

```
/* eslint-disable */
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

```

8. Add script to package.json:

```
  "scripts": {
    ...
   "cypress": "npx cypress open"
  }
```

9. Add first test:

-   Add `data-testid` attribute to H1 on app/page.tsx:

```
    <h1 data-testid="hero-heading" className="w-fit mx-auto text-5xl font-bold text-center">
                Minimal Starter Template for
            </h1>

```

-   Add test in cypress/e2e/home.cy.ts:

```
describe("template spec", () => {
  it("H1 contains correct text", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testid='hero-heading']").contains("Minimal Starter Template for");
  });
});

```

## Setup Linting

1. Install prettier: npm i -D prettier eslint-plugin-prettier eslint-config-prettier
2. Make prettier config e.g.: `touch .prettierrc.js`
3. Configure prettier e.g.:

```
export default {
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: true,
};
```

4. Setup eslint: `npm init @eslint/config`
5. Install Eslint AirBnb: `npm i -D eslint-config-airbnb`
6. Get peer dependency list for AirBnb config: list peer dependencies `npm info "eslint-config-airbnb@latest"` e.g.:

```
   eslint: '^7.32.0 || ^8.2.0',
  'eslint-plugin-import': '^2.25.3',
  'eslint-plugin-jsx-a11y': '^6.5.1',
  'eslint-plugin-react': '^7.28.0',
  'eslint-plugin-react-hooks': '^4.3.0'
```

7. Paste into package.json devDependencies and watch for conflicts (duplicates) you will not need `eslint` if it is already installed with Next.js.
8. Run npm install to install the extra dependencies: `npm i`
9. Install Eslint typescript: `npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-airbnb-typescript`
10. Install testing plugins: `npm i -D eslint-plugin-jest-dom eslint-plugin-testing-library`
11. Update eslint config e.g.:

```
module.exports = {
    extends: [
        'next/core-web-vitals',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'airbnb',
        'prettier',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['prettier', 'react'],
    ignorePatterns: ['*.ttf', '*.css'],
    rules: {
        '@next/next/no-img-element': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'no-undef': 'off',
        'import/extensions': 'off',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-console': 'off',
        'react/jsx-no-bind': 'off',
        'react/prop-types': 'off',
        'no-use-before-define': ['error', { functions: false }],
        'react/jsx-filename-extension': 'off',
        'prettier/prettier': ['error'],
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                controlComponents: [
                    'InputSelect',
                    'SectionTitle',
                    'InputTitle',
                    'InputText',
                ],
                depth: 3,
            },
        ],
    },
}

```

## Setup Linting Pre Hooks

1. `npm i -D husky`
2. `npm pkg set scripts.prepare="husky install"`
3. `npm i` or `npm run prepare`
4. `npm install -D lint-staged`
5. Add hook: `npx husky add .husky/pre-commit "npx lint-staged"`
6. Make lint-staged configuration file:`touch lint-staged.config.js`
7. Add lint-staged configuration e.g.:

```
module.exports = {
    // this will check Typescript files
    '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

    // This will format and lint TS & JS Files
    '**/*.(ts|tsx|js)': (filenames) => [
        `yarn prettier --write ${filenames.join(' ')}`,
        `yarn eslint --fix --max-warnings=0 ${filenames.join(' ')}`,
    ],

    // this will Format MarkDown and JSON
    '**/*.(md|json)': (filenames) =>
        `yarn prettier --write ${filenames.join(' ')}`,
}
```

7. Add optional testing hook e.g.: `npx husky add .husky/pre-commit "npm run test:noClear"` so your pre-commit file could look something like this:

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:noClear
npx lint-staged

```

## Setup Additional Scripts

Package.json:

```
    "lint": "clear && next lint",
    "test": "clear && jest",
    "test:noClear": "jest",
    "test:watch": "clear && jest --watchAll",
    "test:v": "clear && jest --verbose",
    "format": "clear && prettier \"src/**/*.{js,jsx,ts,tsx,css,scss}\" --write",
    "lint:fix": "clear && prettier \"src/**/*.{js,jsx,ts,tsx,css,scss}\" --write && eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "lint:all": "clear && prettier \"src/**/*.{js,jsx,ts,tsx,css,scss}\" --write && eslint src --ext .js,.jsx,.ts,.tsx --fix && tsc --noEmit"
```

## That's It!

Not exactly a short process but this will give a really useful base to build quality code with. Don't forget to like / star if you found this useful! If you like, you can also check out my other [projects](https://github.com/GLD5000) and [blogs](https://dev.to/gld5000).
