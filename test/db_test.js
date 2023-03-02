const { foo } = require('../src/db')
const { tryIfDatabaseConnectionIsWorking } = require('../src/db')
const { destroy } = require('../src/db')

describe('db', function () {
    after(function () {
        destroy()
        // runs once after the last test in this block
    })
    it('call tryIfDatabaseConnectionIsWorking', async function () {
        await tryIfDatabaseConnectionIsWorking()
    })
})
