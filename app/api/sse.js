import RNEventSource from 'react-native-event-source'

// not updating properly, and file seems to fall asleep at prod
// import { API_BASE_URL } from 'react-native-dotenv'

export class Sse {
  constructor(endpoint, token, callback) {
    this.API_BASE_URL = 'https://snick-snack-api.herokuapp.com/api/'
    this.options = { headers: { 'x-auth-token': token } }
    this.eventSource = new RNEventSource(
      `${this.API_BASE_URL}sse/${endpoint}`,
      this.options)

    if (this.eventSource) {
      this.listen(callback)
    } else {
      this.cleanup()
    }
  }

  async listen(callback) {
    this.eventSource.addEventListener('message', async (event) => {
      const data = await JSON.parse(event.data)
      callback(data)
    })
  }

  async cleanup() {
    this.eventSource.removeAllListeners()
    this.eventSource.close()
  }
}
