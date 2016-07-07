/**
 * Created by Jeroen on 06/07/16.
 */
import './graph.html'

import d3 from 'd3'

import {StreamOne} from '/imports/api/StreamOne/collection'
import {StreamTwo} from '/imports/api/StreamTwo/collection'
import {StreamThree} from '/imports/api/StreamThree/collection'
import {StreamFour} from '/imports/api/StreamFour/collection'
import {StreamFive} from '/imports/api/StreamFive/collection'

Template.graph.onCreated(function(){
    this.lineGenerator = d3.line().x((d, i)=>{return 1000/(StreamOne.find().fetch().length+1) * i}).y((d,i)=>{return 250}).curve(d3.curveBasis)


})

Template.graph.onRendered(function(){
    console.log(this.lineGenerator)
    const self = this

    this.autorun(function(){
        //Get the svg container
        const svg = d3.select("svg")

        //This would be the reactive datasource (reactive thanks to Meteor's autorun)
        const dataFromStreamOne = StreamOne.find().fetch()
        const dataFromStreamTwo = StreamTwo.find().fetch()
        const dataFromStreamThree = StreamThree.find().fetch()
        const dataFromStreamFour = StreamFour.find().fetch()
        const dataFromStreamFive = StreamFive.find().fetch()

        //Add 0-points to begin and end of graph
        dataFromStreamOne.unshift({value: 250})
        dataFromStreamOne.push({value: 250})

        dataFromStreamTwo.unshift({value: 250})
        dataFromStreamTwo.push({value: 250})

        dataFromStreamThree.unshift({value: 250})
        dataFromStreamThree.push({value: 250})

        dataFromStreamFour.unshift({value: 250})
        dataFromStreamFour.push({value: 250})

        dataFromStreamFive.unshift({value: 250})
        dataFromStreamFive.push({value: 250})

        //Update new path coordinates
        svg.selectAll("#streamOne").transition().attr("d", self.lineGenerator(dataFromStreamOne))
        svg.selectAll("#streamTwo").transition().attr("d", self.lineGenerator(dataFromStreamTwo))
        svg.selectAll("#streamThree").transition().attr("d", self.lineGenerator(dataFromStreamThree))
        svg.selectAll("#streamFour").transition().attr("d", self.lineGenerator(dataFromStreamFour))
        svg.selectAll("#streamFive").transition().attr("d", self.lineGenerator(dataFromStreamFive))
    })
})

Template.graph.events({
    'click #noGraph': function(event, template){
        event.preventDefault()
        template.lineGenerator = d3.line().x((d, i)=>{return 1000/(StreamOne.find().fetch().length+1) * i}).y((d,i)=>{return 250}).curve(d3.curveBasis)
    },
    'click #lineGraph': function(event, template){
        event.preventDefault()
        template.lineGenerator = d3.line()
            .x((d, i)=>{return 1000/(StreamOne.find().fetch().length+1) * i})
            .y((d)=>{return d.value})
            .curve(d3.curveBasis)
    },
    'click #polarGraph': function(event, template){
        event.preventDefault()
        template.lineGenerator = d3.line()
            .x((d, i)=>{return 1000/(StreamOne.find().fetch().length+1) * i})
            .y((d)=>{return d.value*0.5 + 125})
            .curve(d3.curveBasis)
    }
})