const express = require('express')
const fetch = require('node-fetch')
const redis = require('redis')

const PORT = process.env.PORT || 5000
const REDIS_PORT = process.env.REDIS_PORT || 6379
const client = redis.createClient(REDIS_PORT)
const app = express()

const CACHE_TIME = 5 // 5 seconds

function setResponse(username, repos) {
  return `<h2>${username} has ${repos} Github repos</h2>`
}

async function getRepos(req, res) {
  try {
    const { username } = req.params
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    const repos = data.public_repos

    client.setex(username, CACHE_TIME, repos)
    res.send(setResponse(username, repos))
    console.log('was fetched')
  } catch (err) {
    console.error(err)
    res.status(500)
  }
}

function cache(req, res, next) {
  const { username } = req.params

  client.get(username, (err, data) => {
    if (err) throw err

    if (data !== null) {
      res.setHeader('X-From-Cache', 1)
      res.send(setResponse(username, data))
      console.log('from redis cache')
    } else {
      next()
    }
  })
}

app.get('/repos/:username', cache, getRepos)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
