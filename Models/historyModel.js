const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema ({
    users: {
        required: true,
        type: Array
    },
    owner: {
        required: false,
        type: String
    },
    creatin_date: {
        required: true,
        type: Date,
        default: new Date()
    },
    last_update: {
        required: true,
        type: Date,
        default: new Date()
    },
    history: {
        required: false,
        type: Array,
        default: []
    }
});

const HistoryModel = mongoose.model('historyschema', HistorySchema)

HistoryModel.getChatByUserId = function(id) {
    return HistoryModel.findById(id);
}

HistoryModel.getAllChats = function(orderedFor) {
    let res = !!orderedFor ? HistoryModel.find({}) : HistoryModel.find({}).sort({last_update: 1});
    return res
}

HistoryModel.createChannel = function(users) {
    let channel = HistoryModel.findOne({users: users})
    if (channel) return channel;
    channel = new HistoryModel({users: users, owner: users.length <= 2 ? null : users[0]});
    channel.save();
    return HistoryModel.findOne({users: users});
}

HistoryModel.addMsg = function(channelId) {
    let historyChannel = HistoryModel.getChatByUserId(channelId);
    // historyChannel.history.push({ msg: message, date: new Date(), author: author });
    // historyChannel.save();
    // HistoryModel.findOneAndUpdate({_id: channelId}, {history: })
    let one = HistoryModel.findOne({_id: channelId})
    let two = one
    console.log(two.model.schema.obj)
    if (!historyChannel) return false;
    return historyChannel;
}

module.exports = HistoryModel
  /**
  {
   users = [2+];
   owner if > 2 = id;
   creation_date = new Date();
   last_update = new Date();
   history:[{
    'users[id]': {
      msg: msg1,
      date: new Date()
    }]
   }
  }
  **/