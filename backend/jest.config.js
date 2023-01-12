/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: [
    "src/test",
  ],
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
}