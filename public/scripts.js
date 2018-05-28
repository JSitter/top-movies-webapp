// fetch("https://douglas-adams-backend.herokuapp.com").then((res)=>{
//     // console.log(res.text())
//     // console.log(res.status)
//     res.text()
// }).then(( data)=>{
//     console.log(data)
// })
let api_address = "https://douglas-adams-backend.herokuapp.com"
fetch(api_address).then((response)=>response.text())
.then((json)=> console.log(json))