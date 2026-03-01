// Provide Web Crypto's getRandomValues for Node versions that don't expose globalThis.crypto
try {
    if (!globalThis.crypto || !globalThis.crypto.getRandomValues) {
        const { webcrypto } = require('crypto');
        globalThis.crypto = webcrypto;
    }
} catch (e) {
    // ignore - best-effort polyfill
}
