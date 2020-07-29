/**
 * @jest-environment node
 */

const axios = require('axios')
const createServer = require('../server')

let server
let url

beforeAll(() => {
  server = createServer().listen(0)
  url = `http://localhost:${server.address().port}`
})

afterAll(() => {
  server.close()
})

describe('activities api', () => {
  test('returns 10 activities by default', async () => {
    const res = await axios.get(`${url}/api`)
    expect(res.status).toBe(200)
    expect(res.data.length).toBe(10)
  })

  test('sorts by field ascending and descending', async () => {
    let res = await axios.get(`${url}/api?sortBy=activity&sortAsc=true`)
    expect(res.data.length).toBe(10)
    expect(res.data[0].activity).toBe('Back up important computer files')

    res = await axios.get(`${url}/api?sortBy=price&sortAsc=false`)
    expect(res.data.length).toBe(10)
    expect(res.data[0].activity).toBe('Go see a Broadway production')
  })
})
