const teamModel = require("../models/teamSchema");
module.exports = {
    name: 'removecoins',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Remove coins to users",
    async execute(client, message, cmd, args, Discord){
        if (!args.length) return message.channel.send("You need to mention a Team to give them coins");
        const amount = args.pop(); 
        
        const target = args.join(" ");
        
        
        

        if (amount % 1 != 0 || amount <= 0) return message.channel.send("Amount must be a whole number");
        
        try {
            const targetData = await teamModel.findOne({ teamID: target});
            if (!targetData) return message.channel.send(`This Team doesn't exist in the db`);
            if(targetData.coins - amount < 0){
                return message.reply(`This Team doesn't have enough coins for that`);
            }

                await teamModel.findOneAndUpdate(
                    
                    {
                    teamID: targetData.teamID
                    }, 
                    {
                    $inc: {
                        coins: -amount,
                    },
                }
                );
                
                return message.reply(`Team ${targetData.teamID} has had ${amount} coins removed!`);
        } catch (err){
            console.log(err);
        }

    }
}