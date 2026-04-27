//setup code for jest before running test
// The `@testing-library/jest-dom` library provides a set of custom jest matchers
// that you can use to extend jest. These will make your tests more declarative,
// clear to read and to maintain.
import '@testing-library/jest-dom';
import '@testing-library/react';
import '@testing-library/user-event';

// Polyfill for React Router which uses TextEncoder/TextDecoder in jsdom
if (typeof global.TextEncoder === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}
