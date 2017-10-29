const Models = require('../models/index');
const Student = Models.Student;

const studentsController = {
    index(req, res) {
        // Returns all students
        console.log("Here");
        Student.find({})
            .exec((err, students) => {
                console.log("Here2");
                if(err){
                    console.log(err);
                }
                res.json(students);
            });
    },
    show(req, res){
        // Return a single student
        const idParam = req.params.id;

        // Returns a single student
        // based on the passed in ID parameter
        Student
            .findOne({_id: idParam})
            .exec( (err, student) => res.json(student) );
    },
    create(req, res){
        // Create a new student
        const requestBody = req.body;
        // Creates a new record from a submitted form
        const newStudent = new Student(requestBody);
        // and saves the record to
        // the database
        newStudent.save( (err, saved) => {
            // Returns the saved student
            // after a successful save
            Student
                .findOne({_id: saved._id})
                .exec((err, student) => res.json(student));
        } )
    },
    update(req, res){
        // Update student details
        const idParam = req.params.id;
        const student = req.body;
        // Finds a student to be updated
        Student.findOne({_id: idParam}, (err, data) => {
            // Updates the student payload
            data.first_name = student.first_name;
            data.last_name = student.last_name;
            data.matric_number = student.matric_number;
            data.profile_pic = student.profile_pic;
            data.course = student.course;
            data.form_of_entry= student.price;
            data.level = student.level;
            
            // Saves the product
            data.save((err, updated) => res.status(200).json(updated));
        })

    },
    destroy(req, res){
        // Delete student details
        const idParam = req.params.id;
        // Removes a product
        Student.findOne({_id: idParam}).remove( (err, removed) => res.status(204) )
    },
};

module.exports = studentsController;