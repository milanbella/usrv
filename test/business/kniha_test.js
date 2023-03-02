const { knihaCreate } = require('../../src/business/kniha')
const { knihaGet } = require('../../src/business/kniha')
const { knihaUpdate } = require('../../src/business/kniha')
const { knihaGetAll } = require('../../src/business/kniha')
const { destroy } = require('../../src/db')

describe('kniha', function () {
    after(function () {
        destroy()
    })
    it('call knihaCreate', async function () {
        let id = await knihaCreate('kniha c', 'tretia kniha')
        if (!id) {
            throw new Error('Assertion failed')
        }
    })
    it('call knihaGet', async function () {
        await knihaGet('6f304175-2ea4-4405-ae52-2c5736d1614d')
    })
    it('call knihaUpdate', async function () {
        let kniha = await knihaGet('6f304175-2ea4-4405-ae52-2c5736d1614d')
        await knihaUpdate(kniha.id, kniha.titul, 'blablabla')
        kniha = await knihaGet(kniha.id)
    })
    it('call knihaGetAll', async function () {
        await knihaGetAll()
    })
})
