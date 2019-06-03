"use strict";

import chai from 'chai';
import chaiHttp from 'chai-http' ;
import app from '../server';
import * as inventoryRoute from '../routes/inventoryRoutes.js';

chai.use(chaiHttp);
chai.should();

console.log(inventoryRoute)
describe('inventory' => () {
    describe('GET /'), () => {
        it('Should list all inventory', function(done) {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        }
    }
}

