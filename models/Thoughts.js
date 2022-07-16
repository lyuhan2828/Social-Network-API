const { Schema, model } = require('mongoose');
const reactionSchema=require('./Reaction')
// const dateFormat = require('dateFormat');


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
        // get: timestamp => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
    }, 
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;