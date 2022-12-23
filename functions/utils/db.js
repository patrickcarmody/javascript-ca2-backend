const mongoose = require('mongoose');

const connect = async () => {
    let db = null;

    try {
        await mongoose.connect(process.env.DB_ATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });

        console.log("Successfully connected to DB");
        db = mongoose.connection;
    }
    catch(error) {
        console.log(error); 
    }
};

module.exports = connect;