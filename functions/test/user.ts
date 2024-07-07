process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
import { UserModel } from "../modules/User/model";

import chai from 'chai';
import chaiHttp from 'chai-http';

let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

const API = 'http://localhost:3001';

describe('Users', () => {
    describe('/POST/:userId track', () => {
        it('it should not POST user with invalid userId', (done) => {
              chai.request(API)
              .post('/user/BUn2GcGo')
              .send()
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("User is invalid or doesn't exist");
                done();
              });
        });
    });
    describe('/GET track', () => {
        it('it should GET all the Users', (done) => {
            chai.request(API)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    /*
    * Test the /PATCH route
    */
    describe('/PATCH/:userId track', () => {
        it('it should PATCH a user with correct userId field', (done) => {
            let userId = "JZ5iMGApDo"
            
            UserModel.findOne({id: userId}, (err, user) => {
                chai.request(API)
                    .patch('/users/JZ5iMGApDo')
                    .send(userId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('user');
                        res.body.should.have.property('message').eql('User successfully updated');
                        done();
                    });
            })
        });
    });
});