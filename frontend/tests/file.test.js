import {describe,test,expect} from "vitest"

describe ("test durchlauf",()=>{
    const user={
        firstname:"Mondschein",
        lastname:"Sterne",
        age:25,
        single:true,
        language:["Deutsch","Russisch"]
    }
    test ("user Name sollte Mondschein sein",()=>{
       expect(user.firstname).toBe("Mondschein")
       expect(user.firstname).toBeTypeOf("string")
    })

    test("user Nachname sollte Sterne sein",()=>{
        expect(user.lastname).toBe("Sterne")
        expect(user.lastname).toBeTypeOf("string")
    })

    test("user soll 25 Jahre alt sein",()=>{
        expect(user.age).toBeGreaterThanOrEqual(25)
        expect(user.age).toBeTypeOf("number")
    })
    test("user soll Singel sein",()=>{
        expect(user.single).toBe(true)
        expect(user.single).toBeTypeOf("boolean")
    })
    test("user soll deutsch und Russisch sprechen können",()=>{
        expect(user.language).contains("Deutsch").contains("Russisch")
        expect(user.language.length).toBeGreaterThanOrEqual(2)
    })
})