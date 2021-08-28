module.exports = {
    name: 'help',
    aliases: ['h'],
    permissions: [],
    description: "Displays all the commands a user and use",
    execute(client, message, cmd, args, Discord, profileData){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#BE0000')
        .setTitle('Avaliable Commands')
        .setDescription('All the commands that can be used')
        .addFields(
            { name: 'Prefix for Bot', value: '%'},
            { name: 'bal', value: 'either enter a team name to check their balance, \n or leave it blank to default to your team. \n example: %bal Tensura', inline: true },
            { name: 'leaderboard, lb', value: 'Displays the current leaderboard', inline: true}
        )
        .setFooter("Hope this helps");

        message.channel.send({ embeds: [newEmbed] });
    }
}