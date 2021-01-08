import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

use(chaiHttp);

describe('Test search locations',  () =>{
    it('should return all locations ', async ()=>{
        const search = await request(app).get('/api/v1/search/locations/all');
        expect(search.type).to.equal('application/json');
        expect(search).to.have.status(200);
        expect(search.body.locations).to.have.property('count');
        expect(search.body.locations).to.have.property('rows');
    });
});

describe('Test search Accommodations', () =>{
    it('should return accommodations based on the country and city', async () =>{
        let country='rwanda', city='kigali';
        const search = await request(app).get(`/api/v1/search/accommodations?fromLocation=${country}&city=${city}`);
        expect(search.type).to.equal('application/json');
        expect(search).to.have.status(200);
        expect(search.body).to.have.property('counts');
        expect(search.body).to.have.property('page');
        expect(search.body).to.have.property('limit');
        expect(search.body).to.have.property('rows');
    });
    it('should return accommodations based on the city', async () =>{
        let city='kigali';
        const search = await request(app).get(`/api/v1/search/accommodations?city=${city}`);
        expect(search.type).to.equal('application/json');
        expect(search).to.have.status(200);
        expect(search.body).to.have.property('counts');
        expect(search.body).to.have.property('page');
        expect(search.body).to.have.property('limit');
        expect(search.body).to.have.property('rows');
    });
    
    it('should return accommodations based on the country ', async () =>{
        let country='rwanda';
        const search = await request(app).get(`/api/v1/search/accommodations?fromLocation=${country}`);
        expect(search.type).to.equal('application/json');
        expect(search).to.have.status(200);
        expect(search.body).to.have.property('counts');
        expect(search.body).to.have.property('page');
        expect(search.body).to.have.property('limit');
        expect(search.body).to.have.property('rows');
    });

})