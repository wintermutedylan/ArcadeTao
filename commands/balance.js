const teamModel = require("../models/teamSchema");
module.exports = {
    name: 'balance',
    aliases: ['bal', 'teambal', 'teambalance'],
    permissions: [],
    description: "Add members to the team",
    async execute(client, message, cmd, args, Discord){
        if (args.length === 0){
            var partOfATeam = false;
            var teamName = "";
            let allTeamData = await teamModel.find({});
            var sorted = allTeamData.sort((a, b) => (b.invaders) - (a.invaders));
            for (var i = 0; i < allTeamData.length; i++){
                var membersArray = allTeamData[i].members;
                if (membersArray.includes(message.author.id)){
                    partOfATeam = true;
                    teamName = allTeamData[i].teamID;
                    
                }
                
            }
            
            if (!partOfATeam){
                return message.reply("You are currently not apart of a team.  Please join a team or add a team name after bal to check on other teams");
            } else {
                var pos;
                var i;
                for(i = 0; i < sorted.length; i++){
                    pos = i + 1;
                    
                    try {
                    await teamModel.findOneAndUpdate(
                        {
                        teamID: sorted[i].teamID
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
                const targetData = await teamModel.findOne({ teamID: teamName});
                var membersArray = [];
                for (var k = 0; k < targetData.members.length; k++){
                    var user = await client.users.fetch(targetData.members[k]);
                    membersArray.push(`${user.username}#${user.discriminator}\n`);
                }
                
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#BE0000')
                .setAuthor(`${targetData.teamID}'s Balance`)
                .setDescription(`__**Ranking: #${targetData.position}**__`)
                .addFields(
                    { name: 'Coins', value: `${targetData.coins} <a:sparklycoins:879892770733572137> `, inline: true},
                    { name: 'Invaders', value: `${targetData.invaders} :space_invader:`,inline: true },
                    { name: 'Members', value: `${membersArray.join(" ")}`,inline: true }
                )
                

                message.channel.send({ embeds: [newEmbed] });

            }
        } else {
            let allTeamData = await teamModel.find({});
            var sorted = allTeamData.sort((a, b) => (b.invaders) - (a.invaders));
            var teamName = args.join(" ");
            var pos;
                var i;
                for(i = 0; i < sorted.length; i++){
                    pos = i + 1;
                    
                    try {
                    await teamModel.findOneAndUpdate(
                        {
                        teamID: sorted[i].teamID
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
                const targetData = await teamModel.findOne({ teamID: teamName});
                if (!targetData) return message.reply("That team does not exist. Please try again");
                var membersArray = [];
                for (var k = 0; k < targetData.members.length; k++){
                    var user = await client.users.fetch(targetData.members[k]);
                    membersArray.push(`${user.username}#${user.discriminator}\n`);
                }
                if (membersArray.length === 0){
                    membersArray.push(`None`);
                }
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#BE0000')
                .setAuthor(`${targetData.teamID}'s Balance`)
                .setDescription(`__**Ranking: #${targetData.position}**__`)
                .addFields(
                    { name: 'Coins', value: `${targetData.coins} <a:sparklycoins:879892770733572137> `, inline: true},
                    { name: 'Invaders', value: `${targetData.invaders} :space_invader:`,inline: true },
                    { name: 'Members', value: `${membersArray.join(" ")}`,inline: true }
                )
                

                message.channel.send({ embeds: [newEmbed] });



        }


    }
}