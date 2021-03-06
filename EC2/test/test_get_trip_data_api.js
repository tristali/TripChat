const should = require('should');
const request = require('supertest');
const app = require('../app.js');

let Cookies;

describe('# Test get trip data api', () => {
    // login
    it('POST /exe/accounts/login', function (done) {
        request(app)
            .post('/exe/accounts/login')
            .set('Accept','application/json')
            .send({"email": "z7631614@gmail.com", "password": "ec2server", provider: "email"})
            .expect('Content-Type', 'application/json')
            .expect(200)
            .end( (err, res) => {
                res.body.message.should.equal('Scott，歡迎回來!');
                // Save the cookie to use it later to retrieve the session
                Cookies = res.header['set-cookie'];
                done();
        });
    });

    // get trip data
    it('POST /exe/trips/getTripData', function (done) {
        let req = request(app).post('/exe/trips/getTripData');
        // Set cookie to get saved user sessio
        req.cookies = Cookies;
        req.set('Accept','application/json')
        .send({trip_id: 34})
        .expect('Content-Type', 'aplication/json')
        .expect(200)
        .end( (err, res) => {
            res.body.trip_title.should.equal('清境農場咩咩咩');
            done();
        });
    });
})