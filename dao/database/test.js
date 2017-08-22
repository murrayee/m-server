/**
 * Created by bear on 2017/7/17.
 */
const mongoose = require('mongoose');
const db_url = 'mongodb://localhost:27017/murray';

const db = mongoose.createConnection(db_url);
db.once('open', function () {
    console.log('Mongoose connected to ' + db_url);
});


var msgSchame = new mongoose.Schema({

    title: {type: String},
    content: {type: String, default: 'haha'},
    time: {type: Number}

})

var Msg = db.model('Msg', msgSchame)

//add

// for(var i=0;i<=100;i++){
//
//     Msg.create({
//         title: "a"+i,
//         time: new Date().getTime()
//
//     }, function (err, result) {
//         console.log('插入成功')
//         console.log(result)
//
//     })
// }

//delete
// Msg.remove({
//
//     title: '123'
//
// }, function (err, result) {
//
//     console.log('删除成功')
//     console.log(result)
// })


// update

// Msg.update({
//
//     title: "123"
//
// }, {$set: {title: "update"}}, function (err, result) {
//
//     console.log('更新成功')
//     console.log(result)
//
// })

//find 排序 限制条数  分页
//
// Msg.find({
// },function (err,result) {
//
//
//     console.log(result)
//
//
// }).sort({title:1}).skip(1).limit(10)


Msg.count({},function (err,result) {
    console.log(result)

})