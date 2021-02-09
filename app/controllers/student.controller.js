const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

//Create and Save a new Student Information
exports.create = (req, res) => {
    //Validate request
    if(!req.body.title){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //Create a new Student
    const student = {
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        dob: req.body.dob,
        sbio: req.body.sbio
    };

    //Save Student in the Database
    Student.create(student).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};

//Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const fname = req.query.fname;
    var condition = fname ? { fname: { [Op.like]: `%${fname}%` }} : null;

    Student.findAll({where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        })
    })
};

//Find a single Student with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Student with id: " + id
        });
    });
};

//Update a Student by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
        where: { id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Student was updated successfully."
            });
        }else{
            res.send({
                message: `Cannot update Student with id: ${id}. Maybe Student was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Student with id: " + id
        });
    });
};

//Delete a Student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Student.delete({
        where: { id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Student was deleted successfully."
            });
        }else{
            res.send({
                message: `Cannot delete Student with id: ${id}. Maybe Student was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Student with id: " + id
        });
    });
};

//Delete all Students from the database
exports.deleteAll = (req, res) => {
    Student.deleteAll({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Students was deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all Students."
        });
    });
};

//Find all Students
exports.findAll = (req, res) => {
    Student.findAll({where: {published: true}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving students."
        });
    });
};