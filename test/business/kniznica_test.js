const { kniznicaCreate } = require('../../src/business/kniznica')
const { kniznicaGet } = require('../../src/business/kniznica')
const { kniznicaUpdate } = require('../../src/business/kniznica')
const { kniznicaGetAll } = require('../../src/business/kniznica')
const { kniznicaAddStudent } = require('../../src/business/kniznica')
const { kniznicaRemoveStudent } = require('../../src/business/kniznica')
const { kniznicaGetAllStudents } = require('../../src/business/kniznica')
const { destroy } = require('../../src/db')
const { kniznicaAddKniha } = require('../../src/business/kniznica')
const { kniznicaRemoveKniha } = require('../../src/business/kniznica')
const { kniznicaGetAllKnihy } = require('../../src/business/kniznica')

describe('kniznica', function () {
    after(function () {
        destroy()
    })
    it('call kniznicaCreate', async function () {
        let id = await kniznicaCreate('kniznica c', 'tretia kniznica')
        if (!id) {
            throw new Error('Assertion failed')
        }
    })
    it('call kniznicaGet', async function () {
        await kniznicaGet('7991c1be-cb43-43bc-a389-210bf4aef8e0')
    })
    it('call kniznicaUpdate', async function () {
        let kniznica = await kniznicaGet('7991c1be-cb43-43bc-a389-210bf4aef8e0')
        await kniznicaUpdate(kniznica.id, kniznica.meno, 'blablabla')
        kniznica = await kniznicaGet(kniznica.id)
    })
    it('call kniznicaGetAll', async function () {
        await kniznicaGetAll()
    })
    it('call kniznicaGetAllStudents', async function () {
        let studenti = await kniznicaGetAllStudents(
            '2d5404e4-77f3-4726-a5ed-1f8b0744e526'
        )
        if (studenti.length < 1) {
            throw new Error('Assertion failed')
        }
    })
    it('call kniznicaAddStudent', async function () {
        await kniznicaAddStudent(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'a1f3ba63-1664-4ac3-a30c-115fe1cf5537'
        )
        let studenti = await kniznicaGetAllStudents(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0'
        )
        const student = studenti.find(function (student) {
            if (student.id === 'a1f3ba63-1664-4ac3-a30c-115fe1cf5537') {
                return true
            } else {
                return false
            }
        })
        if (!student) {
            throw new Error('Assertion failed')
        }
    })
    it('call kniznicaRemoveStudent', async function () {
        await kniznicaAddStudent(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'c6eba9ac-3877-46af-b6a0-b557f10434c0'
        )
        let studenti = await kniznicaGetAllStudents(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0'
        )
        let student = studenti.find(function (student) {
            if (student.id === 'c6eba9ac-3877-46af-b6a0-b557f10434c0') {
                return true
            } else {
                return false
            }
        })
        if (!student) {
            throw new Error('Assertion failed 1')
        }
        await kniznicaRemoveStudent(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'c6eba9ac-3877-46af-b6a0-b557f10434c0'
        )
        studenti = await kniznicaGetAllStudents(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0'
        )
        student = studenti.find(function (student) {
            if (student.id === 'c6eba9ac-3877-46af-b6a0-b557f10434c0') {
                return true
            } else {
                return false
            }
        })
        if (student) {
            throw new Error('Assertion failed 2')
        }
    })
    it('call kniznicaGetAllKnihy', async function () {
        let knihy = await kniznicaGetAllKnihy(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0'
        )
        if (knihy.length < 1) {
            throw new Error('Assertion failed')
        }
    })
    it('call kniznicaAddKniha', async function () {
        await kniznicaAddKniha(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            '2f10a042-6d4f-4148-a58e-174829da8ee8'
        )
        let knihy = await kniznicaGetAllKnihy(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0'
        )
        const kniha = knihy.find(function (knihaItem) {
            if (knihaItem.id === '2f10a042-6d4f-4148-a58e-174829da8ee8') {
                return true
            } else {
                return false
            }
        })
        if (!kniha) {
            throw new Error('Assertion failed')
        }
    })
    it('call kniznicaRemoveKniha', async function () {
        await kniznicaAddKniha(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'f4bf02ff-e971-4079-ac0b-d4169752525f'
        )
        let knihy = await kniznicaGetAllKnihy(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0'
        )
        let kniha = knihy.find(function (knihaItem) {
            if (knihaItem.id === 'f4bf02ff-e971-4079-ac0b-d4169752525f') {
                return true
            } else {
                return false
            }
        })
        if (!kniha) {
            throw new Error('Assertion failed 1')
        }
        await kniznicaRemoveKniha(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0',
            'f4bf02ff-e971-4079-ac0b-d4169752525f'
        )
        knihy = await kniznicaGetAllKnihy(
            '7991c1be-cb43-43bc-a389-210bf4aef8e0'
        )
        kniha = knihy.find(function (knihaItem) {
            if (knihaItem.id === 'f4bf02ff-e971-4079-ac0b-d4169752525f') {
                return true
            } else {
                return false
            }
        })
        if (kniha) {
            throw new Error('Assertion failed 2')
        }
    })
})
