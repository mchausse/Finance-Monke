/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: [
    "src/",
  ],
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
}