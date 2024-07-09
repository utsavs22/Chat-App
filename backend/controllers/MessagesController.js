const MessageModel = require("../models/MessageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const from = req.user.id;
        const {to, message} = req.body;

        const data = await MessageModel.create({
            message: {text:message},
            users: [from,to],
            sender: from,
        })
        if(data) return res.json({status:true,msg: "Message added successfully"})
        return res.json({status:false,msg: "Failed to add message to db"})
      } catch (ex) {
        next(ex);
      }
}
module.exports.getAllMessages = async (req, res, next) => {
    try {
        const from = req.user.id;
        const { to } = req.body;

        const messages = await MessageModel.find({
                users:{
                    $all:[from,to],
                },
            }).sort({ updatedAt: 1 });
            const finalMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text
                }
            });
        return res.json({status:true,messages: finalMessages})
      } catch (ex) {
        next(ex);
      }
}