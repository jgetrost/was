import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
   Meteor.call('scrape');
   Meteor.setInterval(function(){Meteor.call('scrape');}, 1000*30);
});
