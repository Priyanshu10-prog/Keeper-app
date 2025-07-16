import express from "express";
import axios  from "axios";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
const app=express();
const port=3000;
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));
const db=new pg.Client({
    user:"postgres",
    database:"note-keeper",
    host:"localhost",
    password:"071082@ad",
    port:5432

});
db.connect();

// post request for fetching data from frontend and then again sending it back
app.post("/add",async(req,res) =>{
    const{title,content}=req.body;
    console.log(req.body);
    try{
        const notes=await db.query("INSERT INTO notes(tite,content) VALUES($1,$2) RETURNING *",[title,content]);
        const data=notes.rows[0];
        res.status(201).json(data);

    }
    catch(err){
        res.status(500).json({error:"database insertion failed"});
        console.error("error from backend",err);


    }

});

app.get("/notes",async(req,res) =>{
    try{
        const request=await db.query("SELECT *  FROM notes");
        const data=request.rows;
        res.status(200).json(data);

    }
    catch(err){
        res.status(500).json({error:"error accesing database"});
        console.error("error fetching request",err);
    }
});

app.post("/delete", async(req,res) =>{
    const id=req.body.id;
    try{
        await db.query("DELETE FROM notes WHERE id=$1",[id])
        res.status(200).send("Deleted succesfully");
    }
    catch(err){
        res.status(500).json({error:"Internal server error"});
        console.error("error completing request",err);
    }
})


app.listen(port,() =>{
    console.log(`server is running at port ${port}`);
});
