const teamModel = require("../models/teamSchema");
module.exports = {
    name: 'addmember',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Add members to the team",
    async execute(client, message, cmd, args, Discord){
        const teamMember = args[0];
        let allTeamData = await teamModel.find({});
        for (var i = 0; i < allTeamData.length; i++){
            var membersArray = allTeamData[i].members;
            if (membersArray.includes(teamMember)){
                return message.reply(`This user is already a member of Team **${allTeamData[i].teamID}**`);
            }
            
        }
        
        args.shift();
        var teamName = args.join(" ");
        
        
        
        
        let teamData;
        teamData = await teamModel.findOne({teamID: teamName});
        if (!teamData) return message.reply("Unfortunately, that team doesn't exist. :cry: ");
        if (teamData.members.length >= 6) return message.reply(`Team ${teamData.teamID} already has the maximum amount of members allowed!`);

        try {
            await teamModel.findOneAndUpdate(
                {
                    teamID: teamName
                }, 
                {
                $push: {
                    members: teamMember
                    
                },
                
            }
            );
            
            

            var user = await client.users.fetch(teamMember);
            return message.reply(`Congrats, you have successfully added **${user.username}#${user.discriminator}** to Team **${teamData.teamID}**`);
        } catch(err){
            console.log(err);
        }


    }
}
