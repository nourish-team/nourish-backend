
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
    
    describe("If user succesfully created account", () => {

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

            await expect(signupModel.createUser("frogman", "frogman@test.com", "ba927d96-3b2d-11ee-be56-0242ac120002x"))
                .resolves
                .toEqual({
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

        
    })
})