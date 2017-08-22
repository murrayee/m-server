/**
 * Created by bear on 2017/7/17.
 */
const mongoose = require('mongoose');
const db_url = 'mongodb://localhost:27017/murray';

const db = mongoose.createConnection(db_url);
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open', function () {
    console.log('Mongoose connected to ' + db_url);
});

module.exports={
    mongoose,db
}