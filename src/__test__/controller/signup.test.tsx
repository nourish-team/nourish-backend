import signupController from "../../controller/signup.controller";
import { Request, Response } from "express";

const request= {
    body: {
        username: "frogman",
        email: "frogman@test.com",
        uid: "ba927d96-3b2d-11ee-be56-0242ac120002"
    }
}

describe("Singup", () => {
    let mockRequest: Partial<Request>
    it("If user was created return a status code 201", () => {
    })
})