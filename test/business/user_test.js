const { userVerifyPassword } = require('../../src/business/user')
const { destroy } = require('../../src/db')

describe('user', function () {
    after(function () {
        destroy()
    })
    it('call userVerifyPassword', async function () {
        let user = await userVerifyPassword('karol', 'xxxx')
        if (user.username !== 'karol') {
            throw new Error('Assertion failed')
        }
    })
})
