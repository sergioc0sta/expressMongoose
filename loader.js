const server = require('./api/server')
require('./api/config/database')
const router = require('./api/routes/routes')
server.use('/api', router)