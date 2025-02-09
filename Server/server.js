import {app} from './app.js'

import { dbConnect } from './src/db/dbConnect.js'
import CONFIG from './src/config/config.js'

dbConnect()
    .then(() => {
        app.listen(CONFIG.PORT, () => {
            console.log("Task Management  Server is running on Port 4000")
        })
    })