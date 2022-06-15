`use strict`
const {app}=require("../src/server");
const supertest=require("supertest");
const mockRequest=supertest(app);
const { db }=require("../src/models/index");
process.env.SECRET = "TEST_SECRET";
let accessToken = null;

beforeAll(async () => {
    await db.sync();
});

describe("This is the jest test for the srever", ()=>{
    test('404 Not found page,', async () => { 
        const response= await mockRequest.get("/lolo")
        expect(response.status).toEqual(404)      
    });
    test("Test for the HOme route,", async ()=>{
        const response = await mockRequest.get("/")
        expect(response.status).toEqual(200)
     })
     test("Testing the SignUp method. ", async ()=>{
        const response=await mockRequest.post("/signup").send({
            username:"MURAD ALAZZEH1",
            password:"123@as1"
        })
        expect(response.status).toEqual(201)
        expect(response.body.username).toBeTruthy()
    })
    test('testing the sign in post method ', async () => {
        const response = await mockRequest.post('/signin').auth('MURAD ALAZZEH1','123@as1');
        expect(response.status).toBe(200);
    });
    test('testing the secret page access  ', async () => {
        const response = await mockRequest.get('/SecretPage')
        expect(response.status).toBe(200);
    });
    // test('basic fails with known user and wrong password ', async () => {

    //     const response = await mockRequest.post('/signin')
    //       .auth('admin', 'xyz')
    //     // const { user, token } = response.body;
    
    //     expect(response.status).toBe(403);
    //     expect(response.text).toEqual("Invalid Signin");
    //     // expect(user).not.toBeDefined();
    //     // expect(token).not.toBeDefined();
    //   });
    //   it('bearer fails with an invalid token', async () => {

    //     // First, use basic to login to get a token
    //     const response = await mockRequest.get('/signup')
    //       .set('Authorization', `Bearer foobar`)
    //     const userList = response.body;
    
    //     // Not checking the value of the response, only that we "got in"
    //     expect(response.status).toBe(403);
    //     expect(response.text).toEqual("Invalid Signin");
    //     expect(userList.length).toBeFalsy();
    //   });
    
    //   it('Succeeds with a valid token', async () => {
    
    //     const response = await mockRequest.get('/signup')
    //       .set('Authorization', `Bearer ${accessToken}`);
    
    //     expect(response.status).toBe(200);
    //     expect(response.body).toBeTruthy();
    //     expect(response.body).toEqual(expect.anything());
    //   });
    
    //   it('Secret Route fails with invalid token', async () => {
    //     const response = await mockRequest.get('/SecretPage')
    //       .set('Authorization', `bearer accessgranted`);
    
    //     expect(response.status).toBe(403);
    //     expect(response.text).toEqual("Invalid Signin");
    //   });

});

    afterAll(async () => {
        await db.drop();
    });