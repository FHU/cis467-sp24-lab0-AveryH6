const facts = require('./facts.json')

const express = require('express')
const app = express()
var path = require('path')

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.render('index', {title: "Avery's Lab 0"})

})

// Greeter
// http://localhost:3000/greet?name=Avery&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)
    const date = new Date()
    const year = date.getFullYear()
    const age1 = (year - 1) - (req.query.dob)
    const age2 = year - (req.query.dob)
    const greeting = `Hello, ${req.query.name}! You are ${age1} or ${age2} years old.`
    res.render('greet', {title:"Greetings", message: greeting})

})


// Master Calculator
// /math/2/plus/3
app.get('/math/:num1/:op/:num2', (req, res)=> {
    // if else?
    const num1 = req.params.num1 - 0
    const num2 = req.params.num2 - 0
    const op = req.params.op
    let result

    switch(op){
        case 'plus':
            result = num1 + num2
            break
        case 'minus':
            result = num1 - num2
            break
        case 'times':
            result = num1 * num2
            break
        case 'divideby':
            result = num1 / num2
            break
        case 'tothepowerof':
            result = num1 ** num2
            break
        default:
            result = "Sorry! Could not calculate this request."
            break
    }
    res.render('math', {title: "Master Calculator", message: result})

})

// Pandoras Box
// /pandorasbox
app.get('/pandorasbox', (req, res)=> {

    // do the work
    // Maybe create a list of three, then randomize that number assigned to one of the three
    // Random Fact

    const randomPandora = Math.floor(Math.random() * 2)
    console.log(randomPandora)

    // switch(pandorasbox){
    //     case randomPandora === 0:
    //         const length = facts.length
    //         const random = Math.floor(Math.random() * length)
    //         const fact4 = facts[random].fact

    //         res.render('pandorasbox', {title: "Pandora's Box", message:fact4} )
    //     case randomPandora === 1:
    //         let joke = {}
    //         fetch("https://icanhazdadjoke.com/", {
    //             headers: {
    //                 "Accept": "application/json"
    //             }
    //             })
    //             .then(res => res.json())
    //             .then( (data) => {
    //                 res.render('pandorasbox', {title:"Pandora's Box", message: data.joke})
    //         })
    // }


    if(randomPandora === 0) {
        const length = facts.length
        const random = Math.floor(Math.random() * length)
        const fact4 = facts[random].fact

        res.render('pandorasbox', {title: "Pandora's Box", message:fact4} )
    } if (randomPandora === 1) {
        let joke = {}
        fetch("https://icanhazdadjoke.com/", {
            headers: {
                "Accept": "application/json"
            }
            })
            .then(res => res.json())
            .then( (data) => {
                res.render('pandorasbox', {title:"Pandora's Box", message: data.joke})
        })
    }

})