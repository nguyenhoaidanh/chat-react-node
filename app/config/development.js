export default {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
    BASE_URL: JSON.stringify('http://localhost:3000')
  }
}
