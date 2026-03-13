const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'bad',
        description: '! Say Bad',
    },
];

const rest = new REST({ version: '10' }).setToken("MTQ4MTIyNDMyNDQ0MTcwNjU1OA.GCaVsb.W4jxF_Rm1B5rXmmOhW_wpGqRH-gNMLNj3gpPF4");

async function Command() {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands("1481224324441706558"), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

Command();