import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp)
describe("Travel Requests", ()=>{
    const user = {
            email: 'jackswalter7@gmail.com',
            password: '12345678',
            };
    it("Should not get direct travel request if token has expired", async ()=>{
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6Ik0iLCJsYXN0X25hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJqYWNrc3dhbHRlcjdAZ21haWwuY29tIiwiYWRkcmVzcyI6IktpZ2FsaSIsImxhbmd1YWdlIjoiS2lueWFyd2FuZGEiLCJwcm9maWxlX3BpY3R1cmUiOiJtZS5qcGciLCJpYXQiOjE2MDM4OTg0NDMsImV4cCI6MTYwMzkwNTY0M30.RoVwDUPXmnC9O9CCeexBeNhVbSiFobmXXXCm1tbTPM8"
        const res = await request(app)
        .get("/api/v1/requests/direct-reports/1")
        .set("Authorization", token)
        expect(res).to.have.status(401)
        expect(res.body).to.have.deep.property("message").equals("session has expired")
    })
    it("Should not get direct travel request if you are not an approved manager", async ()=>{
        var User = await request(app).post("/api/v1/user/login").send(user)
        const result = await request(app)
        console.log("-------------- " + User.body.data)
        .get("/api/v1/requests/direct-reports/4")
        .set("Authorization", await User.body.data)
        await expect(result).to.have.status(401)
        await expect(result.body).to.have.deep.property("message").equals("you are not an approved manager")
    })
})