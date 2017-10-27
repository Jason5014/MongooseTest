var User = require('./user.js');

var UserDao = function(){}

//添加数据
UserDao.prototype.insert = function(){

    var user = new User({
        username: 'Jason',
        userpwd: '123456',
        userage: 37,
        logindate: new Date()
    });

    user.save(function(err,res){
        if(err)
            console.log("Error: " + err);
        else
            console.log("Res: " + res);
    });
}

//更新数据
UserDao.prototype.update = function(){
    var wherestr = {'username': 'Jason'},
        updatestr = {'userpwd': '1234567'};
    User.update(wherestr, updatestr, function(err,res){
        if(err)
            console.log("Error: " + err);
        else
            console.log("Res: "+ res);
    })
}

//根据ID查找数据
UserDao.prototype.findByIdAndUpdate = function(){
    var id = '59dc8e0bc95ad42974c92667',
        updatestr = {'userpwd': '12345'};

    User.findByIdAndUpdate(id, updatestr, function(err,res){
        if(err)
            console.log("Error: " + err);
        else
            console.log("Res: " + res);
    });
}

//删除数据
UserDao.prototype.del = function(){
    var wherestr = { 'username': 'Jason'};

    User.remove(wherestr, function(err, res){
        if(err){
            console.log("Error: " + err);
        }else{
            console.log("Res: " + res);
        }
    })
}

//条件查询
UserDao.prototype.getByConditions = function(){
    var wherestr = {'username': 'Jason'};
    var opt = {"username": 1 ,"_id": 0};    //1表示输出，0表示不输出

    User.find(wherestr, opt, function(err,res){
        if(err)
            console.log("Error: "+err);
        else
            console.log("Res: "+res);
    })

}

//统计
UserDao.prototype.getByConditionsCount = function(){
    var wherestr = {};

    User.count(wherestr, function(err, res){
        if(err)
            console.log("Error: "+err);
        else
            console.log("Res: "+res);
    })
}

//根据_id查询
UserDao.prototype.getById = function(){
    var id = '59dc94f1d17ae20c60bbd79e';

    User.findById(id, function(err, res){
        if(err)
            console.log("Error: "+err)
        else
            console.log("Res: "+res);
    })
}

//模糊查询
UserDao.prototype.getByRegex = function(){
    var whereStr = {'username': {$regex:/o/i}};

    User.find(whereStr, function(err, res){
        if(err)
            console.log("Error " + err);
        else
            console.log("Res: " + res);
    })
}

//分页查询
UserDao.prototype.getByPager = function(){
    var pageSize = 5,
        currentPage = 1,
        sort = {'logindate': -1},
        condition = {},
        skipNum = (currentPage - 1) * pageSize;

    User.find(condition).skip(skipNum).limit(pageSize).sort(sort).exec(function(err, res){
        if(err)
            console.log("Error: "+err);
        else
            console.log("Res: "+res);
    });


}

module.exports = new UserDao();