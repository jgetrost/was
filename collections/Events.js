Events = new Mongo.Collection('events');

eventSchema = new SimpleSchema({
  id: {
    type: String,
    label: "id",
    unique: true
  },
  updated: {
    type: Date,
    label: "updated"
  },
  published: {
    type: Date,
    label: "published"
  },
  title: {
    type: String,
    label: "title"
  },
  summary: {
    type: String,
    label: "summary"
  },
  capEvent: {
    type: String,
    label: "event"
  },
  capEffective: {
    type: Date,
    label: "effective"
  },
  capExpires: {
    type: Date,
    label: "expires"
  },
  capStatus: {
    type: String,
    label: "status"
  },
  capMsgType: {
    type: String,
    label: "msgType"
  },
  capCategory: {
    type: String,
    label: "category"
  },
  capUrgency: {
    type: String,
    label: "urgency"
  },
  capSeverity: {
    type: String,
    label: "severity"
  },
  capCertainty: {
    type: String,
    label: "certainty"
  },
  capAreaDesc: {
    type: String,
    label: "areaDesc"
},
  capPolygon: {
      optional: true,
      type: String,
      label: "polygon"
  }
});
Events.attachSchema(eventSchema);
