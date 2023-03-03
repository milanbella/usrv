const { userVerifyPassword, userVerifyPasswordAndIssueJwt, userVerifyJwt } = require('../../src/business/user')
const { destroy } = require('../../src/db')
const expect = require('chai').expect;


describe('user', function () {

    after(function () {
        destroy();
    });

    it('userVerifyPassword() - correct password', async function () {
        let user = await userVerifyPassword('karol', 'xxxx')
        expect(user.username).to.be.equal('karol');
    })

    it('userVerifyPassword() - wrong password', async function () {
        let user = await userVerifyPassword('karol', 'xxxx___');
        expect(user).to.be.null;
    });

    it('userVerifyPasswordAndIssueJwt() - correct password', async function () {
      let user = await userVerifyPasswordAndIssueJwt('kniznica-app', 'karol', 'xxxx');
      expect(user.username).to.be.equal('karol');
      expect(user.jwt.length).to.be.greaterThan(0);
    });

    it('userVerifyJwt()', async function () {
      let user = await userVerifyPasswordAndIssueJwt('kniznica-app', 'karol', 'xxxx');
      expect(user.username).to.be.equal('karol');
      expect(user.jwt.length).to.be.greaterThan(0);

      let vresult = await userVerifyJwt(user.jwt, 'kniznica-app', 'karol')
      expect(vresult.payload).not.to.be.null;
      expect(vresult.protectedHeader).not.to.be.null;
      expect(vresult.payload.application).to.be.equal('kniznica-app');
      expect(vresult.payload.user).to.be.equal('karol');
    });
})
