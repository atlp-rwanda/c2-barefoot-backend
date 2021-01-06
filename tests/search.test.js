import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

use(chaiHttp);

describe('Test search locations',  () =>{
    it('should return locations based on the location name and country', async ()=>{
        const search = await request(app).get('/api/v1/search/locations?search=');
        expect(search.type).to.equal('application/json');
        expect(search).to.have.status(200);
        expect(search.body).to.have.property('counts');
        expect(search.body).to.have.property('rows');
        expect(search.body).to.have.property('page');
        expect(search.body).to.have.property('limit');
    });

    it('should return an error message when there is empty results', async () =>{
        const search = await request(app).get('/api/v1/search/locations?search=testsst');
        expect(search.type).to.equal('application/json');
        expect(search).to.have.status(404);
        expect(search.body).to.have.property('error');
        expect(search.body.error).to.equal('Location not found!');
    });
});

describe('Test search Accommodations', () =>{
    it('should return accommodations based on the locationId', async () =>{
        let locationID='c6028e0d-ef88-4693-ab49-f37669891724';
        const search = await request(app).get(`/api/v1/search/accommodations?fromLocation=${locationID}`);
        expect(search.type).to.equal('application/json');
        expect(search).to.have.status(200);
        expect(search.body).to.have.property('counts');
        expect(search.body).to.have.property('page');
        expect(search.body).to.have.property('limit');
        expect(search.body).to.have.property('rows');
    });
})