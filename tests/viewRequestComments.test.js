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
    it("Should get travel requests comments", async ()=>{
        var User = await request(app).post("/api/v1/user/login").send(user)
        const res = await request(app)
        .get("/api/v1/comment")
        .set("Authorization", User.body.data)
        expect(res).to.have.status(200)
        expect(res.body).to.be.an("array")
    })
    it("Should get a single travel requests comment", async ()=>{
        var User = await request(app).post("/api/v1/user/login").send(user)
        const res = await request(app)
        .get("/api/v1/comment/041f6104-799a-439a-b282-19f62c60849c")
        .set("Authorization", User.body.data)
        expect(res).to.have.status(200)
        expect(res.body).to.be.an("array")
    })
})