/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
const config = {
    '*.{ts,tsx}': ['npm run lint', 'npm run format'],
    '**/!(*.ts|*.tsx)': ['npm run format'],
};
export default config;
