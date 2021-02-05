// const db = require("../models");
// const Planet = db.planets;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('POST Create Planet', () => {
    before(function (done) {
        server.on('ready', function() { 
            chai.request(server)
                .delete('/api/planets')
                .end((err, res) => {
                    console.log(res.body);
                });
            done();
          });     
    });

    it('should create a planet', (done) => {
        let planet = {
            name: "Yavin IV",
            climate: "windy",
            terrain: "terrain test"
        }
        
        chai.request(server)
            .post('/api/planets')
            .send(planet)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('Yavin IV');
                done();
            });
    });

    it('should get all planet paginated', (done) => {
        let planet = {
            name: "Tatooine",
            climate: "windy",
            terrain: "terrain test"
        }
        
        chai.request(server)
            .post('/api/planets')
            .send(planet)
            .end((err, res) => {
                            console.log(`Planet Created: ${planet.name}`)
                        });

        chai.request(server)
            .get('/api/planets')
            .end((err, res) => {
                res.body.should.have.property('totalItems').eql(2); //depends the test before to pass
                done();
            });
    });

    it('should get planet by id', (done) => {
        let planet_id; 

        let planet = {
            name: "Hoth",
            climate: "windy",
            terrain: "terrain test"
        }
        
        chai.request(server)
            .post('/api/planets')
            .send(planet)
            .end((err, res) => {
                            console.log(`Planet Created: ${planet.name}`);
                            planet_id = res.body.id;

                            chai.request(server)
                                .get(`/api/planets/${planet_id}`)
                                .end((err, res) => {
                                    console.log(res.body);
                                    res.body.should.have.property('name').eql('Hoth');
                                    done();
                                });
                        });
    });

    it('should delete planet by id', (done) => {
        let planet_id; 

        let planet = {
            name: "Hoth",
            climate: "windy",
            terrain: "terrain test"
        }
        
        
        chai.request(server)
            .post('/api/planets')
            .send(planet)
            .end((err, res) => {
                            console.log(`Planet Created: ${planet.name}`);
                            planet_id = res.body.id;

                            chai.request(server)
                                .delete(`/api/planets/${planet_id}`)
                                .end((err, res) => {
                                    console.log(res.body);
                                    res.body.should.have.property('message');
                                    done();
                                });
                        });

        
    });


});

