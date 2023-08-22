
import signupModel from "../../model/signup.model";
import signupController from "../../controller/signup.controller";
import app from "../../app";
import { prismaMock }  from "../../singleton";
import request  from "supertest";


const japanTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Tokyo",
  });

interface User {
    id: number,
    username: string,
    email: string,
    uid: string,
    created_at: string,
    updated_at: string
}

describe("POST /signup", () => {
      
    describe("successful signup", () => {

        it("Schould create a new user", async() => {
            
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

            prismaMock.users.create.mockImplementation(():any  => {
                return {id: 1, username: "frogman"}
            })

            const response = await request(app).post("/signup").send({
                username: "frogman",
                email: "frogman@test.com",
                uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
            })

            expect(prismaMock.users.create).toBeCalled();
            expect(prismaMock.users.create).toBeCalledWith({
                data: {
                    username: "frogman",
                    email: "frogman@test.com",
                    uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
                    updated_at: japanTime,
                    created_at: japanTime
                },
                select: {
                id: true,
                username: true
                },
            })
            expect(response.body).toEqual({id: 1, username: "frogman"});
            
        })   
    })

    describe.only("unsuccessful signup", () => {
        it("Should throw error if the user already exist", async () => {
          
            prismaMock.users.create.mockImplementation((): any => {
                return {id: 1, username: "frogman"}
              }) 

            const user =  await signupModel.createUser("frogman", "frogman@test.com", "ba927d96-3b2d-11ee-be56-0242ac120002x")

            prismaMock.users.create.mockImplementation(() => {
                throw new Error()
            })
            const user2 =  await signupModel.createUser("frogman", "frogman@test.com", "ba927d96-3b2d-11ee-be56-0242ac120002x")
            
            expect(user2 instanceof Error).toBeTruthy()
            expect(user2).toEqual(new Error('new user cannot be created with this data'))

        })

        it("Should return a object with info when error occure", async () => {

            prismaMock.users.create.mockImplementation(() => {
                throw new Error()
            })

            const response = await request(app).post("/signup").send({
                username: "frogman",
                email: "frogman@test.com",
                uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
            })

            expect(response.statusCode).toEqual(400)
            expect(response.body).toHaveProperty("timestamp")
            expect(response.body).toHaveProperty("status")
            expect(response.body).toHaveProperty("message")
            expect(response.body).toHaveProperty("path")
        })

        it("Should throw an error when you receive userdata is empty", async () => {
            const response = await request(app).post("/signup").send({
                username: "frogman",
                email: "frogman@test.com",
                uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
            })

            expect(response.statusCode).toEqual(400)
            expect(response.body).toHaveProperty("message")
        })

        it("Should trow error if some essantial information is missing", async () => {
            const response = await request(app).post("/signup").send({
                username: "",
                email: "frogman@test.com",
                uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
            })

            const response2 = await request(app).post("/signup").send({
                username: "frogman",
                email: "",
                uid: "ba927d96-3b2d-11ee-be56-0242ac120002x",
            })

            const response3 = await request(app).post("/signup").send({
                username: "frogman",
                email: "frogman@test.com",
                uid: "",
            })

            expect(response.statusCode).toEqual(400)
            expect(response.body).toHaveProperty("timestamp")

            expect(response2.statusCode).toEqual(400)
            expect(response2.body).toHaveProperty("path")

            expect(response3.statusCode).toEqual(400)
            expect(response2.body).toHaveProperty("message")
            
        })
    })
})