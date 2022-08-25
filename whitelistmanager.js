import { Extension, HPacket, HDirection, HMessage, HEntity } from "gnode-api";
import fs from "fs";

const extensionInfo = {
  name: "FlopScript",
  description: "Floppidity's Script.",
  version: "1.0.0",
  author: "floppidity"
};
  
let ext = new Extension(extensionInfo);
ext.run();

ext.interceptByNameOrHash(HDirection.TOSERVER, "Chat", hMessage => {
  const packet = hMessage.getPacket();
  const message = packet.readString();

  let args = message.split(" ");

  if (args[0] === "/wl") {
    hMessage.blocked = true;
    if (!args[1]) return ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Usage: /wl <username>"}{i:0}{i:23}{i:0}{i:-1}`));

    whitelist.push(args[1].toString());

    if (whitelist.includes(args[1])) {
      ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"${args[1]} has been added to the whitelist."}{i:0}{i:23}{i:0}{i:-1}`));
      ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Current whitelist:"}{i:0}{i:23}{i:0}{i:-1}`));
      for (const user of whitelist) {
        ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"${user}"}{i:0}{i:23}{i:0}{i:-1}`));
      }
      fs.writeFileSync("./whitelist.json", JSON.stringify(whitelist));

    } else {
      ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"${args[1]} could not be added to the whitelist."}{i:0}{i:23}{i:0}{i:-1}`));
    }
  }

  if (args[0] === '/wlremove') {
    hMessage.blocked = true;
    if (!args[1]) return ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Usage: /wlremove <username>"}{i:0}{i:23}{i:0}{i:-1}`));

    if (whitelist.includes(args[1])) {
      whitelist.splice(whitelist.indexOf(args[1]), 1);
      ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"${args[1]} has been removed from the whitelist."}{i:0}{i:23}{i:0}{i:-1}`));
      ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Current whitelist:"}{i:0}{i:23}{i:0}{i:-1}`));
      for (const user of whitelist) {
        ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"${user}"}{i:0}{i:23}{i:0}{i:-1}`));
      }
      // save the whitelist array to a file
      fs.writeFileSync("./whitelist.json", JSON.stringify(whitelist));
    } else {
      ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"${args[1]} is not in the whitelist."}{i:0}{i:23}{i:0}{i:-1}`));
    }
  }

  if (args[0] === '/wlclear') {
    hMessage.blocked = true;
    whitelist = [];
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"The whitelist has been cleared."}{i:0}{i:23}{i:0}{i:-1}`));
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Current whitelist:"}{i:0}{i:23}{i:0}{i:-1}`));
    for (const user of whitelist) {
      ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"${user}"}{i:0}{i:23}{i:0}{i:-1}`));
    }
    fs.writeFileSync("./whitelist.json", JSON.stringify(whitelist));
  }

  if (args[0] === '/list') {
    hMessage.blocked = true;
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Current whitelist:"}{i:0}{i:23}{i:0}{i:-1}`));
    for (const user of whitelist) {
      ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"${user}"}{i:0}{i:23}{i:0}{i:-1}`));
    }
  }

  if (args[0] === '/wlroom') {
    hMessage.blocked = true;

    for (const user of users) {
      whitelist.push(user[1]);
      
      // save the whitelist array to a file
      fs.writeFileSync("./whitelist.json", JSON.stringify(whitelist));
    }
  }

  if (args[0] === '/help') {
    hMessage.blocked = true;
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"/wl <username> - Adds a user to the whitelist."}{i:0}{i:23}{i:0}{i:-1}`));
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"/wlremove <username> - Removes a user from the whitelist."}{i:0}{i:23}{i:0}{i:-1}`));
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"/wlclear - Clears the whitelist."}{i:0}{i:23}{i:0}{i:-1}`));
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"/list - Lists the current whitelist."}{i:0}{i:23}{i:0}{i:-1}`));
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"/help - Displays this help message."}{i:0}{i:23}{i:0}{i:-1}`));
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"/wlroom - Adds all users who enter the room after you to the whitelist."}{i:0}{i:23}{i:0}{i:-1}`));
  }
})

let users = new Map();
ext.interceptByNameOrHash(HDirection.TOCLIENT, 'Users', hMessage => {
  HEntity.parse(hMessage.getPacket())
    .forEach(u => users.set(u.index, u.name));
});

ext.on('connect', () => {
  ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Doorbell opener script has started."}{i:0}{i:23}{i:0}{i:-1}`));
  ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Doorbell opener will automatically let whitelisted doorbell ringers inside."}{i:0}{i:23}{i:0}{i:-1}`));
  ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Please use '/help' for a list of commands."}{i:0}{i:23}{i:0}{i:-1}`));
})

