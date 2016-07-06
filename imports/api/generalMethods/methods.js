/**
 * Created by Jeroen on 06/07/16.
 */
import {Meteor} from 'meteor/meteor'

import {StreamOne} from '/imports/api/StreamOne/collection'

var valueNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

export const generateData = {
    name: 'generateRandomDataStream',
    run (){
        if(StreamOne.find().fetch().length == 0){
            Meteor.call('initializeData')
        }
        if(Meteor.isServer){
            Meteor.setInterval(function () {
                for (key of valueNames) {
                    StreamOne.update(StreamOne.findOne({name: key})._id, {$set: {value: Math.random() * 100}})
                }
            }, Math.random() * 500)
        }

    },
    call(args, callback){
        const options = {
            returnStubValue: true,
            throwStubExceptions: true
        }
        Meteor.apply(this.name, [args], options, callback)
    }
}

Meteor.methods({
    [generateData.name]: function(args) {
        generateData.run.call(this, args)
    },
    initializeData(){
        for(key of valueNames){
            StreamOne.insert({name: key, value: 0})
        }
    }
})