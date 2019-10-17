let mode = process.env.NODE_ENV
let apiUrl = 'https://ddw.buzz/site/wp-json/buzzer/v1'

if (mode === 'development') {
  apiUrl = 'http://localhost:8083/wp-json/buzzer/v1'
}

export default {
  // apiUrl: 'http://localhost:8083/wp-json/buzzer/v1'
  apiUrl: apiUrl
}
