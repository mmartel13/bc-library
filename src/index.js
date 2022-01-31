const { response } = require('express');
const express = require('express'); 
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const credentials = require("../credentials.json");

initializeApp({
    credential: cert(credentials),
})

const db = getFirestore();


const app = express();
app.use(express.json()); //this telling the server accept json data

app.get('/users', (req, res) => { //request, response shorthand. The route is the /. // THE SLASH IS THE LOCATION. COULD PUT '/USERS'
     const userCollection = db.collection("users");

    userCollection
    .get()
    .then(snapshot => {
        
        const users = []
        snapshot.forEach(doc => {
            users.push({id: doc.id, ...doc.data()})
        })
        res.send(users)
     })

   
     // res.send('Hello World!'); //res is response. 
})

app.post('/users', (req, res) => { 
    const {name, age, email} = req.body; //request the body(the body is always whats being sent to the server in a post. the body is an object. here were deconstructing the object to only pull what we need) THIS IS PULLING WHAT THE USER HAS INPUT AS THEIR NAME, AGE AND EMAIL.

    const user = { name, age, email }; //I have these variables I want to create an object with these variables. I am also saying the key of these properties are name, age and email. 

    const result = `My name is ${user.name}, I am ${user.age} years old and my email is ${user.email}`;

    res.send(result); //sending the result back to the user
}) 

app.listen(3000, () => {
    console.log('We be listening on 3000')
})

