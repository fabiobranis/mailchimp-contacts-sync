import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '((\\.|/)(spec))\\.(ts|js)?$',
  testPathIgnorePatterns: ['/node_modules/', '/build/.*']
};
export default config;
