Meteor.publish('drawable', function(){
	return Events.find({"capPolygon": {$ne:null}, "capExpires": {$gte : new Date()}});
})
