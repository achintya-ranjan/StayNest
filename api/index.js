const express = require('express'); //  Explained in word

const cors =require('cors');
const multer = require('multer');
const path = require('path');

const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const fs =require('fs');
const bcrypt = require('bcryptjs'); //Explained in notes
const jwt = require('jsonwebtoken'); //Explained in word file
const User = require('./models/User.js'); // importing a mongoose model that is related to user data
const jwtSecret = "sjnvskjndkjsdnsdncs"; //a random string as our jwtSecret
const mongoose = require("mongoose");//mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
//It helps in modelling application data, including built-in type casting, validation, query building

const bcryptSalt = bcrypt.genSaltSync(12);// 'bcrypt' is a popular library for hashing passwords in Node.js. .genSaltSync is a method provided by the bcrypt library. 
//This method generates a salt synchronously. A salt is a random value added to passwords before hashing to ensure that even identical passwords result in different hashes. 
//The "Sync" part of the method name indicates that it runs synchronously, meaning it blocks the execution of code until the salt is generated.

const app = express(); // defining our express app
const cookieParser = require('cookie-parser');//cookie-parser is a middleware module that parses cookies attached to the client request object. 
app.use(cookieParser());// it enables your Express application to parse cookies from the request headers

// connection string - mongodb+srv://achintyaranjan03:oBVv3eLagMCqvHkl@cluster0.ylpd2sz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
require('dotenv').config()//The dotenv module is used to load environment variables from a .env file into process.env.
//.config() When invoked, it reads the .env file, parses its contents, and assigns them to process.env.
mongoose.connect('mongodb+srv://achintyaranjan03:oBVv3eLagMCqvHkl@cluster0.ylpd2sz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0?directConnection=true');

app.use(express.json());     // Explained in notes
app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));   //This works so now we should be able to register a user

const imageDownloader= require('image-downloader');

app.get('/test',(req , res)=>
{
    res.json('test ok');
});

app.post('/register' , async (req,res)=> // receiving the post request here and then sending the response
{
    //We are handling the creation of a new user database
    const {name,email,password} = req.body;// taking the name, email, password from the request body, this is called destructuring syntax ( UNPACKING)
    try{
        //EXPLAINED IN WORD FILE
        const userDoc = await User.create({    //we are creating a new User and because of 'await' we are awaiting for the creation of a user and this function will return a newly created user
            name,email,
            password:bcrypt.hashSync(password,bcryptSalt), //we have used bcryptjs to hash our password and send it into the database simply as a text
        });
        res.json(userDoc);
    }
    catch(error)
    {
        res.status(422).json(error);
    }
});  

app.post('/login',async (req,res)=>    //receving the post request for a different end point
{
    const {email,password} = req.body;  
    const userDoc = await User.findOne({email}); //returning the first document that matches the specified critera-> {email:email}
    if(userDoc) //if it is not null
    {
        const passOk = bcrypt.compareSync(password , userDoc.password);//synchronous function compares a plaintext password with a hashed password
        if(passOk) //if it matches
        {
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id, 
                name:userDoc.name},
                jwtSecret,{},(err,token)=>   //EXPLAINED IN WORD FILE
            {
                if(err) throw err;
                res.cookie('token' ,token).json(userDoc);
            }) ;
        }
        else
        {
            res.status(422).json('pass not ok');
        }
    }
    else
    {
        res.json('not found');
    }
}) 

app.get('/profile' , (req,res)=>{
    const {token} = req.cookies; 
    if(token)
    {
        jwt.verify(token, jwtSecret,{},async (err,userData)=>{    //jwtString, secretKey, options, callback function
            if(err) throw err;                            //after verifying the token
            const {name,email,_id} = await User.findById(userData.id); //fetches user from the database with the given ID 
            res.json({name,email,_id});                        //now responding with that particular user information
        })
    }else{     // if we do not have token
        res.json(null);
    }
//because cookie is in req body in list of req headers. But you cannot read cookies yet. In orger to read cookies you need to use cookie-parser
}); // cam from UserContex.jsx



app.post('/logout' , (req,res)=>{
    res.cookie('token' , '').json(true); 
});

app.post('/upload-by-link',async (req,res)=>{
    console.log("uploading by link");
    console.log({__dirname});
    const {link} = req.body;
    const newName = Date.now() + '.jpg';
    const options = {
        url: link,
        dest: __dirname + '/uploads' + newName,    // it is always safe to pass full path to download directory
      };
    await imageDownloader.image(options);
    // .then(({ filename }) => {
    //     console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
    // })
    // .catch((err) => console.error(err));
      res.json(newName);
})

const photosMiddleware = multer({dest:__dirname + 'uploads'});
app.post('/upload' ,photosMiddleware.array('photos' ,100) , (req,res)=>{
    console.log("going to upload from your device");
    let uploadedFiles = [];
    console.log(req.files.length);
    for(let i=0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.'+ext;
        fs.renameSync(path , newPath);
        uploadedFiles.push(newPath.replace('uploads/' , ''));
    }
    res.json(req.files);
});




app.post('/places', (req,res)=>{
    const {token} = req.cookies; 
    const {title,address,addedPhoto, 
        description,perks,extraInfo, checkIn,checkOut,maxGuests,price} = req.body;
        jwt.verify(token, jwtSecret,{},async (err,userData)=>{    //jwtString, secretKey, options, callback function
        
            if(err) throw err;                            //after verifying the token
            const placeDoc =  await Place.create({  // this would return our place document from the database
                title,
                owner: userData.id,
                address ,   photos:addedPhoto,     description,    perks,      extraInfo ,     checkIn,
                checkOut,   maxGuests,  price,
            });
            res.json(placeDoc);
        });
});

app.get('/user-places',(req,res)=>{
    const {token} = req.cookies; 
    jwt.verify(token, jwtSecret,{},async (err,userData)=>{    //jwtString, secretKey, options, callback function
        const {id} = userData;
        res.json(await Place.find({
            owner:id,
        }));
    });
});

app.get('/places/:id',async (req,res)=>{
    res.json(req.params);
    const {id} = req.params;                        //return information about specific place
    res.json(await Place.findById(id));
});

app.put('/places',async (req,res)=>{   // updating the places list
    const {token} = req.cookies; 
    const {id,
        title,address,addedPhoto, 
        description,perks,extraInfo, checkIn,checkOut,maxGuests, price} = req.body;
    const placeDoc = await Place.findById(id);
    jwt.verify(token, jwtSecret,{},async (err,userData)=>{    //jwtString, secretKey, options, callback function
        if(err) throw err;
        if(userData.id === placeDoc.owner.toString){
            console.log({price});
            placeDoc.set({  // this would return our place document from the database
                title,  
                address ,   photos:addedPhoto,     description,    perks,      extraInfo ,     checkIn,
                checkOut,   maxGuests,  price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });

    app.get('/places',async (req,res)=>{             // from IndexPage
        res.json( await Place.find() );
    });

    
    
});

app.post('/bookings' , (req,res)=>{
    const {place,checkIn,checkOut,numberOfGuests, name,phone,price} = req.body;   //also need to save this in the database
    Booking.create({
        place,checkIn,checkOut,numberOfGuests, name,phone,price
    }).then((doc) => {
        res.json(doc);
    }).catch((err)=> {
        throw err;
    });
});

function getUserDataFromReq(req)
{
    return new Promise((resolve , reject)=> {
        jwt.verify(toke, jwtSecret,{},async (err,userData)=>{    //jwtString, secretKey, options, callback function
            if(err) throw err;
            resolve(userData); 
        });
    });
}

app.post('/bookings',async (req,res)=>{
    const userData = await getUserDataFromReq(req);
    const {place,checkIn,checkOut,numberOfGuests,name,phone,price} = req.body;
    Booking.create({
        place,checkIn,checkOut,numberOfGuests,name,phone,price, user:userData.id ,
    }).then((doc)=> {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

app.get('/bookings' , async (req,res)=> {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user : userData.id}).populate('place'));
});
//To user our User Model
//TO REGISTER OUR USER WE ARE GOING TO USE MONGODB, we will send our data there.
app.listen(4000);
//oBVv3eLagMCqvHkl - DB Password
