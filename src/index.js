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
app.use(express.json()); 


app.get('/users', (req, res) => {
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
})


app.post('/users', (req, res) => { 
    const {name, age, email} = req.body; 

    const user = { name, age, email }; 

    const result = `My name is ${user.name}, I am ${user.age} years old and my email is ${user.email}`;

    res.send(result); 
}) 

app.listen(3000, () => {
    console.log('We be listening on 3000')
})

