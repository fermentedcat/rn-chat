import RNEventSource from 'react-native-event-source'
import { API_BASE_URL } from 'react-native-dotenv'

export class Sse {
  constructor(endpoint, token, callback) {
    this.options = { headers: { 'x-auth-token': token } }
    this.eventSource = new RNEventSource(
      `${API_BASE_URL}sse/${endpoint}`,
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
