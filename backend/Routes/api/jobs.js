const express = require('express');
const router = express.Router();

//Load Book model
const Index = require('../../Models/IndexPage');

//@route GET api/books/test
// router.get('/test',(req,res)=>res.send('book route testing!'));

//@route GET api/indices
//@discription: get all notes
//@access Public
// router.get('/', (req,res)=>{
//     console.log(req);
//     Index.find()
//         .then(indices => res.json(indices))
//         .catch(err=>res.status(404).json({noIndicesFound:"Jobs Found"}));
// });

//@route GET api/indices/:id
//@discription: get note index by id
//@access Public
// router.get('/:id',(req,res)=>{
//     Index.findById(req.params.id)
//         .then(note => res.json(note))
//         .catch(err => res.status(404).json({noNotefound: 'No Note Found'}));
// });

//@discription: add/save Notes
//@access Public

// router.post('/',(req,res)=>{
//     Index.create(req.body)
//         .then(note => res.json({msg: 'Note addes successfully'}))
//         .catch(err=>res.status(400).json({error:'Unable to add this Note'}));

// });

//@discription: Update Notes
//@access public
// router.put('/:id',(req,res)=>{
//     Index.findByIdAndUpdate(req.params.id,req.body)
//         .then(note=>res.json({msg:'Updated Successfully'}))
//         .catch(err=> res.status(400).json({error:'Unable to update the Database'}));
// });

//@discription: Delete book by Id
//@access public
// router.delete('/:id',(req,res)=>{
//     Index.findByIdAndRemove(req.params.id,req.body)
//         .then(notes => res.json({msg:'Note entry deleted successfully'}))
//         .catch(err => res.status(404).json({error:'No such a Notes'}));
// });



//@route GET api/indices
//@description: Get all indices or filter by location, company, and job using regex
//@access Public
router.get('/', (req, res) => {
    const { location, name, job } = req.query;
    let query = {};

    // Check if parameters exist and add them to the query object
    if (location) {
        query.location = { $regex: new RegExp(location, 'i') }; // Case-insensitive regex for location
        console.log(query.location)
    }

    if (name) {
        query.name = { $regex: new RegExp(name, 'i') } // Case-insensitive regex for company
        console.log(name)
    }
    if (job) {
        query.job = { $regex: new RegExp(job, 'i') }; // Case-insensitive regex for job
    }

    Index.find(query)
        .then(indices => {
            if (indices.length === 0) {
                return res.status(404).json({ noIndicesFound: "No indices found" });
            }
            res.json(indices);
        })
        .catch(err => res.status(500).json({ error: "Internal Server Error" }));
});


//@route GET api/indices
//@description: Get all indices or filter by location, company, and job
//@access Public
// router.get('/', (req, res) => {
//     console.log(req);
//     const { location, name, job } = req.query;
//     let query = {};

//     // Check if parameters exist and add them to the query object
//     console.log(location);
//     if (location) {
//         query.location = location;

//     }
//     if (name) {
//         query.company = name;
//     }
//     if (job) {
//         query.job = job;
//     }
//     query.location={$regex: new RegExp("Bangalore",'i')}
//     console.log(query)
//     Index.find(query)
//         .then(indices => {
//             if (indices.length === 0) {
//                 return res.status(404).json({ noIndicesFound: "No indices found" });
//             }
//             res.json(indices);
//         })
//         .catch(err => res.status(500).json({ error: "Internal Server Error" }));
// });





module.exports = router;