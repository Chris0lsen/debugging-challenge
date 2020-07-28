const { writeFileSync } = require('fs')
const axios = require('axios')

const ACTIVITIES_URL = 'http://www.boredapi.com/api/activity/'

let data = []
let activity
;(async () => {
  for (var i = 0; i < 100; i++) {
    activity = await axios.get(ACTIVITIES_URL).then((res) => res.data)

    if (!data.find(({ key }) => key === activity.key)) {
      data.push(activity)
    }
  }
  writeFileSync('./activities.json', JSON.stringify(data), 'utf-8')
  console.log(data)
  console.log(`${data.length} activities saved`)
})()
