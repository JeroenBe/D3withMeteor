/**
 * Created by Jeroen on 06/07/16.
 */
import './graph.html'
import {StreamOne} from '/imports/api/StreamOne/collection'
import {Meteor} from 'meteor/meteor'
import d3 from 'd3'

Data = StreamOne

import {generateData} from '/imports/api/generalMethods/methods'

Template.graph.onCreated(function(){
    generateData.call()
})

Template.graph.onRendered(function(){
    this.autorun(function(){

    const svg = d3.select("svg")
    const data = StreamOne.find().fetch()
        //Add 0-points to begin and end of graph
        data.unshift({value: 250})
        data.push({value: 250})

        //d3 Linegenerator
        const line = d3.line()
            .x((d, i)=>{return 1000/(data.length-1) * i})
            .y((d)=>{return d.value})
            .curve(d3.curveBasis)

        //Update new path coordinates
        svg.selectAll("path").transition().attr("d", line(data))

    })
})

Template.graph.helpers({
    streamData(){
        return StreamOne.find()
    }
})