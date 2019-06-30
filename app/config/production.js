export default {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    BASE_URL: JSON.stringify('http://zte.zalo.me')
  }
}
