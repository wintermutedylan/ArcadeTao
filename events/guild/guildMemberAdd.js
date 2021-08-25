const profileModel = require('../../models/profileSchema');

module.exports = async(client, discord, member) =>{
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        tickets: 50,
        cTickets: 0,
        position: 0
    });
    profile.save();
}