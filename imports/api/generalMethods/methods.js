/**
 * Created by Jeroen on 06/07/16.
 */
import {Meteor} from 'meteor/meteor'

import {StreamOne} from '/imports/api/StreamOne/collection'


var valueNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

export const generateData = {
    name: 'generateRandomDataStream',
    run (){
        Meteor.setInterval(function () {
            for (key of valueNames) {
                StreamOne.update({name: key}, {value: Math.random() * 100})
            }
        }, Math.random() * 100)
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
    }
})


export const testMethod = {
    name: 'test',
    run (){
        console.log('hello from method')
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
    [testMethod.name]: function(args){
        testMethod.run.call(args)
    }
})