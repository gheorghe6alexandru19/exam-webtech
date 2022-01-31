const express = require("express");
const cors = require('cors');
const sequelize = require('./database')
const port = 8080;

//force:false - data persists
//force:true - data resets
sequelize.sync({ force:false}).then(() => console.log('Database synced'));

const app = express();

// import models
const Company = require("./model/company");
const Founder = require("./model/founder");

//1:M
Company.hasMany(Founder);
//Company.belongsToMany(Founder, {through: "founders"});

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//listen and CRUD
app.listen(port,() => {
    console.log("Server running on port " + port);
});

//GET all companies
app.get("/companies", async (req,res,next) => {
    try {
        const companies = await Company.findAll();
        res.status(200).json(companies);
    } catch (e) {
        next(e);
    }
});

//POST a company
app.post("/companies", async (req,res,next) => {
    try {
        await Company.create(req.body);
        res.status(201).json({message:"Company created"});
    } catch (e) {
        next(e);
    }
});

//PUT a company by ID
 app.put('/companies/:id', async (req,res,next) => {
     try {
         const reqId = req.params.id;
         const company = await Company.findOne({where: {id: reqId}});
         company.name = req.body.name;
         company.dateFounded = req.body.dateFounded;
         await company.save();
         res.status(202).json("Company updated");
     } catch (e) {
         console.log(e.message);
     }
 })

 //DELETE a company by ID
 app.delete('/companies/:id', async (req,res,next) => {
     try {
        const reqId = req.params.id;
        await Company.destroy({ where: {id: reqId}});
        res.status(202).json({message:"Company deleted"});
     } catch (e) {
         console.log(e.message);
     }
 })

 //GET a company's founders
app.get('/companies/:companyID/founders', async (req,res,next) => {
    try {
        const company = await Company.findByPk(req.params.companyID, {
            include: [Founder],
        });
        if (company) {
            res.status(200).json(company.founders);
        } else {
            res.status(404).json({ message: "Couldn't find specified company"});
        }
    } catch (e) {
        next(e);
    }
});

//POST a founder into specified company
app.post('/companies/:companyID/founders', async(req,res,next) => {
    try {
        const company = await Company.findByPk(req.params.companyID);
        if (company) {
            const founder = new Founder(req.body);
            founder.companyId = company.id;
            await founder.save();
            res.status(201).json({ message: "Founder added"});
        } else {
            res.status(404).json({ message: "Couldn't find specified company"})
        }
    } catch(e) {
        next(e);
    }
})

//PUT a specific founder from a specific company
app.put("/companies/:companyID/founders/:founderID", async(req,res,next) => {
    try {
        const company = await Company.findByPk(req.params.companyID);
        if(company) {
            const founder = await Founder.findOne({where: {id: req.params.founderID}});
            if(founder) {
                founder.name = req.body.name;
                founder.role = req.body.role;
                await founder.save();
                res.status(202).json("Founder updated");
            } else {
                res.status(404).json({message: "Couldn't find specified student"});
            }
        } else {
            res.status(404).json({message: "Couldn't find specified company"})
        }
    } catch (e) {
        console.log(e.message);
    }
})

//DELETE a specific founder from a specific company
app.delete('/companies/:companyID/founders/:founderID', async (req,res,next) => {
    try {   
        const company = await Company.findByPk(req.params.companyID);
        if(company) {
            await Founder.destroy({where: {id: req.params.founderID}});
            res.status(202).json({message: "Founder removed"});
        } else {
            res.status(404).json({message:"Couldn't find specified company"})
        }
    } catch (e) {
        console.log(e.message);
    }
})