/**
 * Created by Jeroen on 06/07/16.
 */
import './graph.html'
import {StreamOne} from '/imports/api/StreamOne/collection'
import {Meteor} from 'meteor/meteor'

import {testMethod} from '/imports/api/generalMethods/methods'

Template.graph.onCreated(function(){
    console.log('from graph')
    testMethod.call()
})