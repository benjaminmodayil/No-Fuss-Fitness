'use strict'
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/nofuss'
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-nofuss'
exports.PORT = process.env.PORT || 8080
