/**
 * Created by Jeroen on 05/07/16.
 */

import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import '/imports/ui/pages/home'
import '/imports/ui/components/graph'


FlowRouter.route('/', {
    name: 'graph',
    action: function(params) {
        BlazeLayout.render('home', {content: "graph"})
    }
})

