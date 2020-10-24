import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var basex = require('base-x')
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

export default basex(ALPHABET)
