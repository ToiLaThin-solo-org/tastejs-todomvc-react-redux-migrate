/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
const config = {
    '*.{ts,tsx}': ['npm run lint', 'npm run format'],
    '*.{js,json,md,css,scss,html}': ['npm run format'],
    // 👉 whitelist instead of blacklist, negate not exclude .yaml
    // '**/!(*.ts|*.tsx)': ['npm run format'],
};
export default config;
