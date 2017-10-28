// define db schema here using mongoose
const mongoose = require('mongoose');
const Schema   = mongoose.Schema,
      model    = mongoose.model.bind(mongoose),
      ObjectId = mongoose.Schema.Types.ObjectId;




const studentSchema = Schema({
    id: ObjectId,
    first_name: String,
    last_name: String,
    matric_number: String,
    profile_pic: String,
    course: String,
    form_of_entry: Number, // 0 - Undergrad, 1 - Direct Entry
    level: Number,
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

// const Product      = model('Product', productSchema);
// const Manufacturer = model('Manufacturer', manufacturerSchema);

module.exports = {Student};