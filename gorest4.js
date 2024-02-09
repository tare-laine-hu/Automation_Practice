import http from "k6/http"
import {check} from "k6"




export const options = {
    vus: 10,
    duration: '1s',
  };

export default function createUser(){
   let randomNumber = parseInt(Math.random()*999999)+1

    const uri = "https://gorest.co.in/public/v2/users"

    const bearer = "309eb15e5d6341b7b345516c3229fd41b684ddfcf376b8ceabda8c9b9a2343e9"

    const headers = {
        'Authorization' : `Bearer ${bearer}`
    }

    const reqBody = {
    "name":"Tenali"+randomNumber, 
    "gender":"male", 
    "email":"tenali.ramaKrishna"+randomNumber+"@gmail.com",
    "status":"active"
    }

    const res = http.post(uri, reqBody,  {headers: headers})

    console.log(res.body)        

    check(res, {
        'Status is 201' : (r)=> r.status===201,
        'Body includes id' : (r) => res.body.includes("id"),
        'Body includes name' : (r) => res.body.includes("name"),
        'Body includes email' : (r) => res.body.includes("email"),
        'Body includes status' : (r) => res.body.includes("status")

    })

}

