const { Schema, model } = require('mongoose');
const dateFormat = require('dateFormat');

const Thoughts = model('Thoughts', ThoughtsSchema);

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ ReactionSchema ],

    toJSON:{
        virtuals: true,
        getters: true
    },
    id: false

})

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


module.exports = Thoughts;