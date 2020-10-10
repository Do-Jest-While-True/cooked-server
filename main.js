const { db } = require('./server/db')
const app = require('./server/app')
const PORT = process.env.PORT || 8080

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log('db synced')
    app.listen(PORT, () => console.log(`serving meals on ${PORT}`))
  })
