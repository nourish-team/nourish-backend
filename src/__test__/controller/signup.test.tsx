
import signupModel from "../../model/signup.model";
import app from "../../app";
import { prismaMock }  from "../../singleton";
import request  from "supertest";



interface User {
    id: number,
    username: string,
    email: string,
    uid: string,
    created_at: string,
    updated_at: string
}



describe("POST /signup", () => {
    
    describe.only("If user succesfully created account", () => {

        it("Schould create a new user", async() => {
            const japanTime = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Tokyo",
              });

            const user: User = {
                id: 1,
                username: "frogman",
                email: "frogman@test.com",
                uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
                created_at: japanTime,
                updated_at: japanTime
            }

            prismaMock.users.create.mockResolvedValue(user)

            const newUser = await signupModel.createUser("frogman", "frogman@test.com", "ba927d96-3b2d-11ee-be256-0242ac120002x")

            expect(newUser).toEqual({
                    id: 1,
                    username: "frogman",
                    email: "frogman@test.com",
                    uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
                    created_at: japanTime,
                    updated_at: japanTime
                })
        })

        it("Should return statuscode 201 after succesful creation", async () => {
            const response = await request(app).post("/signup").send({
                username: "frogman",
                email: "frogman@test.com",
                uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
            })
            expect(response.statusCode).toEqual(201); 
        })

        it("Should return a id and username in body", async () => {
            const response = await request(app).post("/signup").send({
                username: "frogman2",
                email: "frogman2@test.com",
                uid: "ba927d96-3b2d-11ee-be56-0242ac120002x2",
            })

            expect(response.body).toEqual(200)
            expect(response.body.username).toBeDefined(); 
        })   
    })

    describe("Unsuccesful signup", () => {
        it("Should trow error is the user already exist", async () => {
          
            prismaMock.users.create.mockImplementation(() => {
                throw new Error('There was an error.')
              })
              
            const user2 =  await signupModel.createUser("frogman", "frogman@test.com", "ba927d96-3b2d-11ee-be56-0242ac120002x")
            
            expect(user2).toEqual(new Error("Something went wrong"))

        })

        it("Should trow error if username is empty", async() => {

            const response = await request(app).post("/signup").send({
                username: "",
                email: "frogman@test.com",
                uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
            })


            expect(response.statusCode).toEqual(400)
        })

        it("Should trow error if email adress is not unique", () => {

        })

        it("Should trow error if uid is not unique", () => {

        })

        it("Should trow error if any field is empty", () => {
            
        })

    })
})