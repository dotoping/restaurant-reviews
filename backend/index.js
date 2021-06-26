import app from './server'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import RestaurantsDAO from './dao/restaurantsDAO'

dotenv.config()

// MongoDB configuration
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        poolSize: 50,
        wtimeout: 2500,
        userNewUrlParse: true
    }
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        RestaurantsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })