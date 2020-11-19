import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import models from '../src/models'
import 'dotenv/config';

use(chaiHttp)
describe("Travel Requests", ()=>{
    const user = {
            email: 'sequester@gmail.com',
            password: 'password',
            };
    const Comment = {
            comment:'Hello there!', 
        }
    it("Should make a travel request comment", async ()=>{
        var User = await request(app).post("/api/v1/user/login").send(user)
        const res = await request(app)
        .post("/api/v1/comment/0ce36391-2c08-3074-bddb-a4ea8cccbbc5")
        .set("Authorization", `Bearer ${User.body.data}`)
        .send(Comment)
        expect(res).to.have.status(200)
        expect(res.body).to.have.deep.property("tCommentData")
        expect(res.body).to.have.deep.property("message").equals("comment created successfully")
    })
    it("Should fail on invalid trip request id", async ()=>{
        var User = await request(app).post("/api/v1/user/login").send(user)
        const res = await request(app)
        .post("/api/v1/comment/0ce36391-2c08-3074-bddb-a4ea8cccbbb5")
        .set("Authorization", `Bearer ${User.body.data}`)
        .send(Comment)
        expect(res).to.have.status(400)
        // expect(res.body).to.have.deep.property("tCommentData")
        expect(res.body).to.have.deep.property("message").equals("Travel request with this id does not exist.")
    })
    after(()=>{
        // delete data inserted by the tests.
        const Comment = {
            comment:'Hello there!', 
        }
        models.TravelComments.destroy({where:Comment}).then((res) =>{
            console.log(res)
        })
        
    })
})