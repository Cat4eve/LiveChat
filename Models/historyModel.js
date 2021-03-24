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

HistoryModel.getChatByUserId = async function(id) {
    let res = await HistoryModel.findOne({_id: id});
    if (res) return res;
}

HistoryModel.getChatByAllUsers = async function(users) {
    let channel = await HistoryModel.findOne({users: users}) || await HistoryModel.findOne({users: users.reverse()});
    return channel;
}

HistoryModel.getAllChats = function(orderedFor) {
    let res = !!orderedFor ? HistoryModel.find({}) : HistoryModel.find({}).sort({last_update: 1});
    return res;
}

HistoryModel.createChannel = async function(users) {
    let channel = await HistoryModel.findOne({users: users}) || await HistoryModel.findOne({users: users.reverse()});
    if (channel) return channel;
    channel = new HistoryModel({users: users, owner: users.length <= 2 ? null : users[0]});
    await channel.save();
    return await HistoryModel.findOne({users: users});
}

HistoryModel.addMsg = async function(channelId, message, author) {
    let historyChannel = await HistoryModel.getChatByUserId(channelId);
    // if (!historyChannel) historyChannel = HistoryModel.createChannel()
    historyChannel.history.push({ msg: message, date: new Date(), author: author })
    let ms = await HistoryModel.findOneAndUpdate({_id: channelId}, {history: historyChannel.history}, {new: true});
    ms.save();
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