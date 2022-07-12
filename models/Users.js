const { Schema, model } = require('mongoose');
const User = model('User', UserSchema);


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false 
})

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


module.exports = User;