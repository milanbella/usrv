const {
    vypozickaCreate,
    vypozickaVratenieKnihy,
    vypozickaGet,
    vypozickaGetHistoryOfVypozickaForStudent,
} = require('../../src/business/vypozicka')
const { destroy } = require('../../src/db')

describe('vypozicka', function () {
    after(function () {
        destroy()
    })
    it('call vypozickaCreate', async function () {
        let id = await vypozickaCreate(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'bde492e7-1902-4e34-a304-6e740d6729b2',
            'cce89900-2682-4ce4-98a8-6fcc287c9e4f'
        )
        if (!id) {
            throw new Error('Assertion failed')
        }
        let vypozicka = await vypozickaGet(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'bde492e7-1902-4e34-a304-6e740d6729b2',
            'cce89900-2682-4ce4-98a8-6fcc287c9e4f'
        )
        if (vypozicka.kniha_id !== 'cce89900-2682-4ce4-98a8-6fcc287c9e4f') {
            throw new Error('Assertion failed')
        }
    })
    it('call vypozickaVratenieKnihy', async function () {
        let id = await vypozickaCreate(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'bde492e7-1902-4e34-a304-6e740d6729b2',
            '2f10a042-6d4f-4148-a58e-174829da8ee8'
        )
        if (!id) {
            throw new Error('Assertion failed')
        }
        await vypozickaVratenieKnihy(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'bde492e7-1902-4e34-a304-6e740d6729b2',
            '2f10a042-6d4f-4148-a58e-174829da8ee8'
        )
        let vypozicka = await vypozickaGet(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'bde492e7-1902-4e34-a304-6e740d6729b2',
            '2f10a042-6d4f-4148-a58e-174829da8ee8'
        )
        if (vypozicka.datum_vratenia === null) {
            throw new Error('Assertion failed')
        }
    })
    it('call vypozickaGetHistoryOfVypozickaForStudent', async function () {
        let vypozicky = await vypozickaGetHistoryOfVypozickaForStudent(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'bde492e7-1902-4e34-a304-6e740d6729b2'
        )
        if (vypozicky.length < 1) {
            throw new Error('Assertion failed')
        }
    })
})
