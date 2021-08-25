const teamModel = require("../models/teamSchema");
module.exports = {
    name: 'removemember',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Add members to the team",
    async execute(client, message, cmd, args, Discord){
        const teamMember = args[0];
        args.shift();
        var teamName = args.join(" ");
        
        teamData = await teamModel.findOne({teamID: teamName});
        if (!teamData.members.includes(teamMember)){
            return message.reply(`The user does not belong to team **${teamData.teamID}**`);
        } else {
            try {
                await teamModel.findOneAndUpdate(
                    {
                        teamID: teamName
                    }, 
                    {
                    $pull: {
                        members: teamMember
                        
                    },
                    
                }
                );
                
                
    
                var user = await client.users.fetch(teamMember);
                return message.reply(`Congrats, you have successfully removed **${user.username}#${user.discriminator}** from the team **${teamData.teamID}**`);
            } catch(err){
                console.log(err);
            }
        }

    }
    
}