
const chai = require('chai');
const should = chai.should();
const url = "http://localhost:5000";
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Users', ()=>{
   it('should get all the users', (done)=>{
      chai.request(url)
          .get('/api/users')
          .end((err, res)=>{
             res.should.have.status(200);
             res.body.users.should.be.a('array');
             res.body.avgBackups.should.be.a('string');
             res.body.avgTickets.should.be.a('string');
             done();
          });
   });
});