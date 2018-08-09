const {expect} = require('chai');
const request = require('supertest');

const {app, close} = require('../app.js');
const db = require('../db.js');

describe('The app', () => {

    after(() => {
        close();
        db.close();
    });

    it('should load users', async () => {
        // setup
        await db.get('users').remove({});
        await db.get('users').insert({ givenName: 'Alan2', familyName: 'Turing'});
        const expected = JSON.parse(JSON.stringify(await db.get('users').find({})));

        // exercise
        const response = await request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect(200);

        // assert
        expect(response.body).to.deep.equal({ givenName: 'Alan', familyName: 'Turing'});
    });
});