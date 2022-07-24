/** @type {import('next').NextConfig} */
const ENV = process.env.ENV || 'local';

require('dotenv').config({
  path: `./.env.${ENV}`, // I'm in a monorepo, so I go back in the directory
})

const env = {}

Object.keys(process.env).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    env[key] = process.env[key]
  }
});

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env
};
