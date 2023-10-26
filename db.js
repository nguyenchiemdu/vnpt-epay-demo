const mongoose = require('mongoose');
async function connect() {

    try {        
        await mongoose.connect('mongodb+srv://nguyenchiemdu:552001@cluster0.ojpjhsm.mongodb.net/dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        }).then(_=> {
            console.log('Connected to Mongodb server')
        });
    }
        catch (error) {
        console.log('Connect Mongo DB failure!');
        console.log('Error: ',error)
    }

}

module.exports = { connect };
