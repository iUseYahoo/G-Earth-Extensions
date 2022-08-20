import { Extension, HPacket, HDirection } from "gnode-api";
import { Client, Intents } from "discord.js";

const token = "";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const extensionInfo = {
  name: "HabCord",
  description: "Send habbo messages from discord",
  version: "1.0.0",
  author: "floppidity",
};

let ext = new Extension(extensionInfo);
ext.run();

client.on("message", async (message) => {
    let args = message.content.split(" ");
    if (args[0] === "!hab") {
        let msg = args.slice(1).join(" ")

        ext.sendToServer(new HPacket(`{out:Chat}{s:"${msg}"}{i:0}{i:2}`));

        message.reply("Message sent!");
    }
});

client.login(token);