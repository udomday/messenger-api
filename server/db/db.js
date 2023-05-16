const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: 'qqSspo225',
    host: 'localhost',
    port: 5432,
    database: 'messenger_api'
})

module.exports = pool
