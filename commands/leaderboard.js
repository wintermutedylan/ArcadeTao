const teamModel = require("../models/teamSchema");
module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    permissions: [],
    description: "Display the current leaderboard",
    async execute(client, message, cmd, args, Discord){
        let allTeamData = await teamModel.find({});
        var n = args[0];
        if (!n){
            n = 0;
        }
        
        var partOfATeam = false;
        var teamName = "";
        //if (!n) return message.channel.send("You need to select a page. i.e $lb 1");
        
        var sorted = allTeamData.sort((a, b) => (b.invaders) - (a.invaders));
        for (var i = 0; i < allTeamData.length; i++){
            var membersArray = allTeamData[i].members;
            if (membersArray.includes(message.author.id)){
                partOfATeam = true;
                teamName = allTeamData[i].teamID;
                
            }
            
        }
        var pos;
        var i;
        var j;
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
         //this will be the team of the person asking for this command so i can say what their teams position is
        if (partOfATeam){
            const targetData = await teamModel.findOne({ teamID: teamName});
            

            
            const newEmbed = new Discord.MessageEmbed()
            .setTitle("**Leaderboard**")
            .setDescription(`__**Your Team's Ranking: #${targetData.position}**__`)
            .setColor('#BE0000')
            if(n === 0){
                n = 1;
            }
            n = Number(n) - 1;
            
            if (sorted.length > 10) sorted = sorted.slice(n * 10, n * 10 + 10);
            pos = 0;

            for(j = 0; j < sorted.length; j++){
                pos = j + 1;
             
                newEmbed.addFields(
                    { name: `#${Number(pos) + Number(n ) * 10}: ${sorted[j].teamID}`, value: `${sorted[j].coins} <a:sparklycoins:879892770733572137> + ${sorted[j].invaders} :space_invader:`, inline: false},
                )
                
                
                
            
                
            }
        
            message.channel.send({ embeds: [newEmbed] });
        } else {
            
            const newEmbed = new Discord.MessageEmbed()
            .setTitle("**Leaderboard**")
            .setDescription(`__**You aren't part of a Team**__`)
            .setColor('#BE0000')
            
            if(n == 0){
                n = 1;
            }
            n = Number(n) - 1;
            
            if (sorted.length > 10) sorted = sorted.slice(n * 10, n * 10 + 10);
            pos = 0;

            for(j = 0; j < sorted.length; j++){
                pos = j + 1;
             
                newEmbed.addFields(
                    { name: `#${Number(pos) + Number(n ) * 10}: ${sorted[j].teamID}`, value: `${sorted[j].coins} <a:sparklycoins:879892770733572137> + ${sorted[j].invaders} :space_invader:`, inline: false},
                )
                
                
                
            
                
            }
        
            message.channel.send({ embeds: [newEmbed] });

        }
    }
}