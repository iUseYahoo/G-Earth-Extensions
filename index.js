import { Extension, HPacket, HDirection, HMessage, HEntity } from "gnode-api";

const extensionInfo = {
  name: "FlopScript",
  description: "Floppidity's Script.",
  version: "1.0.0",
  author: "floppidity"
};
  
let ext = new Extension(extensionInfo);
ext.run();

//{in:HandItemReceived}{i:1242}{i:8}
ext.interceptByNameOrHash(HDirection.TOCLIENT, 'HandItemReceived', hItem => {
  const packet = hItem.getPacket();
  const userId = packet.readInteger();

  // {out:PassCarryItem}{i:64336848}
  ext.sendToServer(new HPacket(`{out:PassCarryItem}{i:${users.get(userId)}}`));
})

ext.interceptByNameOrHash(HDirection.TOSERVER, "LookTo", look => {
  look.blocked = true;
})

let users = new Map();
ext.interceptByNameOrHash(HDirection.TOCLIENT, 'Users', hMessage => {
  HEntity.parse(hMessage.getPacket())
    .forEach(u => users.set(u.index, u.name));
});

