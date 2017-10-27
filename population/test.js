var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;

var UserSchema = new Schema({
    name: {type: String, unique: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

var User = mongoose.model('User', UserSchema);

var PostSchema = new Schema({
    poster: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    title: String,
    content: String
});

var Post = mongoose.model('Post', PostSchema);

var CommentSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    commenter: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String
});

var Comment = mongoose.model('Comment', CommentSchema);

mongoose.connect('mongodb://localhost:27017/population-test',function(err){
    if(err)
        throw err;
    //createDate();
});

function createDate(){

    var userIds = [new ObjectId, new ObjectId, new ObjectId],
        postIds = [new ObjectId, new ObjectId, new ObjectId],
        commentIds = [new ObjectId, new ObjectId, new ObjectId];

    var users = [],
        posts = [],
        comments = [];

    users.push({
        _id: userIds[0],
        name: 'aikin',
        posts: [postIds[0]]
    });

    users.push({
        _id: userIds[1],
        name: 'luna',
        posts: [postIds[1]]
    });

    users.push({
        _id: userIds[2],
        name: 'luajin',
        posts: [postIds[2]]
    });

    posts.push({
        _id      : postIds[0],
        title    : 'post-by-aikin',
        poster   : userIds[0],
        comments : [commentIds[0]]
    });
    posts.push({
        _id      : postIds[1],
        title    : 'post-by-luna',
        poster   : userIds[1],
        comments : [commentIds[1]]
    });
    posts.push({
        _id      : postIds[2],
        title    : 'post-by-luajin',
        poster   : userIds[2],
        comments : [commentIds[2]]
    });

    comments.push({
        _id       : commentIds[0],
        content   : 'comment-by-luna',
        commenter : userIds[1],
        post      : postIds[0]
    });
    comments.push({
        _id       : commentIds[1],
        content   : 'comment-by-luajin',
        commenter : userIds[2],
        post      : postIds[1]
    });
    comments.push({
        _id       : commentIds[2],
        content   : 'comment-by-aikin',
        commenter : userIds[1],
        post      : postIds[2]
    });

    /*
        三个 Models的关系:一个user--has many-->post。一个post--has one-->user，has many-->comment。一个comment--has one-->post和user
     */
    User.create(users, function(err, docs) {
        Post.create(posts, function(err, docs) {
            Comment.create(comments, function(err, docs) {
            });
        });
    });

}


User.find()
    .populate('posts','title',null,{sort: {title: -1}})
    .exec(function(err,docs){
        if(err)
            console.log("Error: "+ err);
        else
            console.log(docs[0].posts[0].title);
    });

User.findOne({name: 'luajin'})
    .populate({
        path: 'posts',
        select: { title: 1},
        options: {
            sort: { title: -1}
        }
    })
    .exec(function(err,docs){
        if(err)
            console.log("Error: "+ err);
        else
            console.log(docs.posts[0].title);
    });

Post.findOne({title: 'post-by-aikin'})
    .populate('poster comments','-_id')
    .exec(function(err,doc){
        if(err)
            console.log(err);
        else{
            console.log(doc.poster._id, doc.poster.name);
            console.log(doc.comments[0]._id, doc.comments[0].content);
        }
    });
//当两个关联的字段同时在一个path里面时，select必须是document(s)

Post.findOne({title: 'post-by-aikin'})
    .populate({
        path: 'poster comments',
        select: '-_id'
    })
    .exec(function(err, doc){
        if(err)
            console.log(err);
        else{
            console.log(doc.poster._id, doc.poster.name);
            console.log(doc.comments[0]._id, doc.comments[0].content);
        }
    });

Post.findOne({title: 'post-by-aikin'})
    .populate(['poster', 'comments'])
    .exec(function(err, doc){
        if(err)
            console.log(err);
        else{
            console.log(doc.poster._id, doc.poster.name);
            console.log(doc.comments[0]._id, doc.comments[0].content);
        }
    });

Post.findOne({title: 'post-by-aikin'})
    .populate([
        {path: 'poster', select: '-_id'},
        {path: 'comments', select: '-comments'}
    ])
    .exec(function(err, doc){
        if(err)
            console.log(err);
        else{
            console.log(doc.poster._id, doc.poster.name);
            console.log(doc.comments[0]._id, doc.comments[0].content);
        }
    });

Post.find({title: 'post-by-aikin'})
    .populate('poster comments')
    .exec(function(err, doc){

        var opts = [{
            path: 'comments.commenter',
            model: 'User'
        }];

        Post.populate(doc, opts, function(err, populatedDocs){
            console.log(populatedDocs[0].poster.name, populatedDocs[0].comments[0].commenter.name);
        });
    });

User.findOne({name: 'aikin'})
    .exec(function(err, doc){

        if(err)
            console.log(err);
        else{

            var opts = [{
                path: 'posts',
                select: 'title'
            }];

            doc.populate(opts, function(err, populatedDoc){
                if(err)
                    console.log(err);
                else{
                    console.log(populatedDoc.posts[0].title);
                }
            });
        }
    });