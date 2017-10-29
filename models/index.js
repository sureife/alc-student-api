// define db schema here using mongoose
const mongoose = require('mongoose');
const Schema   = mongoose.Schema,
      model    = mongoose.model.bind(mongoose),
      ObjectId = mongoose.Schema.Types.ObjectId;




const studentSchema = Schema({
    id: ObjectId,
    first_name: {
        type:String,
        required: [true, 'Please Enter a First Name'],
        max: 100
    },
    last_name: {
        type:String,
        required: [true, 'Please Enter a Last Name'],
        max: 100
    },
    matric_number: {
        type:String,
        required: [true, 'Please Enter your Matric Number']
    },
    profile_pic: String,
    course: String,
    form_of_entry: {
        type:Number,
        enum: [0, 1,]
    }, // 0 - Undergrad, 1 - Direct Entry
    level: Number,
});

const userSchema = Schema({
    id: ObjectId,
    first_name: {
        type:String,
        required: [true, 'Please Enter a First Name'],
        max: 100
    },
    last_name: {
        type:String,
        required: [true, 'Please Enter a Last Name'],
        max: 100
    },
    username: {
        type:String,
        required: [true, 'Please Enter a Username'],
        max: 100
    },
    password: {
        type:String,
        required: [true, 'Please Enter a Password'],
        max: 100
    },
});



// Example Schema Definition
// const productSchema = Schema({
//     id: ObjectId,
//     name: String,
//     image: String,
//     price: Number,
//     description: String,
//     // One to many relationship
//     manufacturer: {type: ObjectId, ref: 'Manufacturer'}
// });

// const manufacturerSchema = Schema({
//     id: ObjectId,
//     name: String,
// });

const Student = model('Student', studentSchema);
const User =  model('User', userSchema);

// const Product      = model('Product', productSchema);
// const Manufacturer = model('Manufacturer', manufacturerSchema);

module.exports = {Student,User};