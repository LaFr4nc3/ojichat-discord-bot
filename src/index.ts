import ChildProcess from 'child_process';
import Discord from 'discord.js';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user ? client.user.tag : ''}!`);
});

client.on('message', msg => {
  if (msg.content === '!ojichat') {
    ChildProcess.exec('ojichat', (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        return;
      } else {
        msg.channel
          .send(stdout)
          .catch(console.error);
      }
    });
  } else if (/^!ojichat ([亜-熙ぁ-んァ-ヶa-zA-Z0-9 ]*)$/.test(msg.content)) {
    const result = /^!ojichat ([亜-熙ぁ-んァ-ヶa-zA-Z0-9 ]*)$/.exec(msg.content);
    if (result && result[1]) {
      ChildProcess.exec(`ojichat ${result[1]}`, ((error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
          return;
        } else {
          msg.channel
            .send(stdout)
            .catch(console.error);
        }
      }));
    }
  }
});

if (process.env.DISCORD_TOKEN) {
  client.login(process.env.DISCORD_TOKEN)
    .catch(console.error);
} else {
  console.error('No Token!');
  process.exit(1);
}
