const register = require('ts-swc-register/dist/register').default
register({
  tsconfig: process.argv[2]
})
const path = process.argv[2]
require(path)