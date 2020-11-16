import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp)
describe("Travel Requests", ()=>{
    const user = {
            email: 'sequester@gmail.com',
            password: 'password',
            };
    // it("Should not make travel request if not logged in", async ()=>{
    //     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6Ik0iLCJsYXN0X25hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJqYWNrc3dhbHRlcjdAZ21haWwuY29tIiwiYWRkcmVzcyI6IktpZ2FsaSIsImxhbmd1YWdlIjoiS2lueWFyd2FuZGEiLCJwcm9maWxlX3BpY3R1cmUiOiJtZS5qcGciLCJpYXQiOjE2MDM4OTg0NDMsImV4cCI6MTYwMzkwNTY0M30.RoVwDUPXmnC9O9CCeexBeNhVbSiFobmXXXCm1tbTPM8"
    //     const res = await request(app)
    //     .get("/api/v1/requests/direct-reports/1")
    //     // .set("Authorization", token)
    //     expect(res).to.have.status(401)
    //     expect(res.body).to.have.deep.property("message").equals("You are not loged in")
    // })
    // it("Should not make travel request if token has expired", async ()=>{
    //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6Ik0iLCJsYXN0X25hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJqYWNrc3dhbHRlcjdAZ21haWwuY29tIiwiYWRkcmVzcyI6IktpZ2FsaSIsImxhbmd1YWdlIjoiS2lueWFyd2FuZGEiLCJwcm9maWxlX3BpY3R1cmUiOiJtZS5qcGciLCJpYXQiOjE2MDM4OTg0NDMsImV4cCI6MTYwMzkwNTY0M30.RoVwDUPXmnC9O9CCeexBeNhVbSiFobmXXXCm1tbTPM8"
    //     const res = await request(app)
    //     .get("/api/v1/requests/direct-reports/1")
    //     .set("Authorization", token)
    //     expect(res).to.have.status(401)
    //     expect(res.body).to.have.deep.property("message").equals("session has expired")
    // })
    it("Should get travel requests if you are logged in", async ()=>{
        var User = await request(app).post("/api/v1/user/login").send(user)
        const res = await request(app)
        .get("/api/v1/requests")
        .set('Authorization', `Bearer ${User.body.data}`);
        expect(res).to.have.status(200)
        expect(res.body).to.be.an("array")
    })
    it("Should get a single travel requests if you are logged in", async ()=>{
        var User = await request(app).post("/api/v1/user/login").send(user)
        const res = await request(app)
        .get("/api/v1/requests/")
        .set('Authorization', `Bearer ${User.body.data}`)
        .query({requestId:"5"})
        expect(res).to.have.status(200)
        expect(res.body).to.be.an("array")
    })
})