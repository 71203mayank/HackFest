const mongoose = require('mongoose');
const IndexSchema = new mongoose.Schema({
    // 'job': job_position, 'link': job_link, 'location': job_location, 'description': job_description, 'name': "Google"
    job:String,
    link: String,
    location:String,
    description:String,
    name:String
});

module.exports = mongoose.model('jobs',IndexSchema);