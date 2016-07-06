/**
 * Created by Jeroen on 06/07/16.
 */
import './graph.html'
import {StreamOne} from '/imports/api/StreamOne/collection'
import {Meteor} from 'meteor/meteor'

Data = StreamOne

import {generateData} from '/imports/api/generalMethods/methods'

Template.graph.onCreated(function(){
    generateData.call()
})

Template.graph.helpers({
    streamData(){
        return StreamOne.find()
    }
})