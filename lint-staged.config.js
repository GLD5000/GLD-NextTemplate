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
