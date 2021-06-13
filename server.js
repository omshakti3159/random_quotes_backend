const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const cors = require('cors')
const MongoClient=mongo.MongoClient;

const PORT= process.env.PORT || 3159
const mongoUrl="mongodb+srv://omy:13580@Okm@randomquotesapp.sjchk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
let db

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    db.collection("users").find({}).toArray((err ,result)=>{
        if(err) throw err
        res.send(result)
    })
    
})


app.post('/newuser',async(req,res)=>{
    let id=`rq${Math.floor(Math.random()*1000000)}`
    let user={
        _id:id,
        'name':req.body.name,
        'email':req.body.email
    }
    let count=await db.collection('users').countDocuments({email:req.body.email})
    if(count){
        await db.collection('users').find({email:req.body.email}).toArray((err,resultDocs)=>{
            if(err) throw err
            res.send(resultDocs)
        })
    }
    else{
        await db.collection('users').insertOne(user,(err)=>{
            if(err) throw err
                res.send([user])
        })
    }
})


app.get('/myquotes',(req,res)=>{
    let id = req.query.id
        db.collection('quotes').find({userId:id}).toArray((err,result)=>{
            if(err) throw err
            res.send(result)
        })
})

app.post('/myquotes',(req,res)=>{
    const id=Math.floor(Math.random()*1000000000)
    let post={
        _id:id,
        userId:req.body.userId,
        quote:req.body.quote,
        author:req.body.author
    }
    db.collection('quotes').insertOne(post,(err)=>{
        if(err) throw err
        res.send('quotes saved successfully')
    })
})


MongoClient.connect(mongoUrl,{ useNewUrlParser: true, useUnifiedTopology: true },(err,connection)=>{
    if(err) throw err
    db = connection.db('randomquotes')
    console.log('connected to database')
    app.listen(PORT,(err)=>{
        if(err) throw err
        console.log("server is running")
    })
})