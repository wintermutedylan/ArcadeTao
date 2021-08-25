const teamModel = require("../models/teamSchema");
module.exports = {
    name: 'giveinvaders',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Give invaders to users",
    async execute(client, message, cmd, args, Discord){
        if (!args.length) return message.channel.send("You need to mention a player to give them coins");
        const amount = args.pop(); 
        
        const target = args.join(" ");
        
        
        

        if (amount % 1 != 0 || amount <= 0) return message.channel.send("Amount must be a whole number");
        
        try {
            const targetData = await teamModel.findOne({ teamID: target});
            if (!targetData) return message.channel.send(`This team doesn't exist in the db`);

                await teamModel.findOneAndUpdate(
                    
                    {
                    teamID: targetData.teamID
                    }, 
                    {
                    $inc: {
                        invaders: amount,
                    },
                }
                );
                
                return message.reply(`Team ${targetData.teamID} has been given ${amount} invaders!`);
        } catch (err){
            console.log(err);
        }

    }
}