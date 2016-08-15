Meteor.methods({
    'scrape': function(){
        HTTP.call('GET',
            'https://alerts.weather.gov/cap/us.php?x=0',
            {},
            function(callError,callResponse){
                xml2js.parseString(callResponse.content, function (jsError, jsResult) {
                    //console.error('errors',jsError);
                    var i = 0;
                    for(entry of jsResult.feed.entry){
                        var toAdd = {
                            id: entry.id[0],
                            updated: new Date(Date.parse(entry.updated)),
                            published: new Date(Date.parse(entry.published)),
                            title: entry.title[0],
                            summary: entry.summary[0],
                            capEvent: entry['cap:event'][0],
                            capEffective: new Date(Date.parse(entry['cap:effective'])),
                            capExpires: new Date(Date.parse(entry['cap:expires'])),
                            capStatus: entry['cap:status'][0],
                            capMsgType: entry['cap:msgType'][0],
                            capCategory: entry['cap:category'][0],
                            capUrgency: entry['cap:urgency'][0],
                            capSeverity: entry['cap:severity'][0],
                            capCertainty: entry['cap:certainty'][0],
                            capAreaDesc: entry['cap:areaDesc'][0],
                            capPolygon: entry['cap:polygon'][0]
                        };
                        Events.upsert({id: toAdd.id}, {$set:{
                            updated: toAdd.updated,
                            published: toAdd.published,
                            title: toAdd.title,
                            summary: toAdd.summary,
                            capEvent: toAdd.capEvent,
                            capEffective: toAdd.capEffective,
                            capExpires: toAdd.capExpires,
                            capStatus: toAdd.capStatus,
                            capMsgType: toAdd.capMsgType,
                            capCategory: toAdd.capCategory,
                            capUrgency: toAdd.capUrgency,
                            capSeverity: toAdd.capSeverity,
                            capCertainty: toAdd.capCertainty,
                            capAreaDesc: toAdd.capAreaDesc,
                            capPolygon: toAdd.capPolygon
                        }});

                        i++;
                        //var date = new Date(Date.parse(entry.published))
                        //console.log(date);
                     }
                     console.log(new Date() + ' - Entries: ' + i);
                });
            }
        );
    }
});
