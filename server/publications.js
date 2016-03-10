Meteor.publish('history', function () {
    return History.find({}, {limit: 10, sort: {createdAt: -1}});
});