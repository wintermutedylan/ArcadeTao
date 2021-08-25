module.exports = {
    name: 'milim',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setTitle("Arcade Tao")
        .setURL('https://discord.gg/ganyumains')
        .setDescription("Milim!!!!!!!!!")
        .addFields(
            {name: 'Rule 1', value: 'Be nice'},
            {name: 'Rule 2', value: 'Praise Milim :heart: '},
            {name: 'Rule 3', value: 'bully melody <:hehehe:850914083967729676>'}

        )
        .setImage('https://i.redd.it/s2754m4u81m51.jpg')
        .setFooter('MILIM');
        

        message.channel.send({ embeds: [newEmbed] });

        
    }

    
}
