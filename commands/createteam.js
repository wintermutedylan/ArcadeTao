const teamModel = require("../models/teamSchema");
module.exports = {
    name: 'createteam',
    aliases: ['register', 'create'],
    permissions: ["ADMINISTRATOR"],
    description: "Create Team",
    async execute(client, message, cmd, args, Discord){
        var teamName = args.join(" ");
        teamData = await teamModel.findOne({teamID: teamName});
        if (teamData) return message.reply(`The team ${teamName} already exists!`);
        
        try{
            
                let team = await teamModel.create({
                    teamID: teamName,
                    members: [],
                    coins: 50,
                    invaders: 0,
                    position: 0
                });
                team.save();
            
        } catch(err){
            console.log(err);
        }
/*
        let allTeamData = await teamModel.find({});
        var sorted = allTeamData.sort((a, b) => (b.tickets + (b.cTickets * 5)) - (a.tickets + (a.cTickets * 5)));
        var pos;
        var i;

        
        

        for(i = 0; i < sorted.length; i++){
            pos = i + 1;
            
            try {
            await profileModel.findOneAndUpdate(
                {
                userID: sorted[i].userID
                }, 
                {
                $set: {
                    position: pos,
                },
            }
            );
            
            }catch (err){
                console.log(err);
            }
            
        }
        */
        message.reply('Team created.  You can now add members to it using &addMember');
    }
}