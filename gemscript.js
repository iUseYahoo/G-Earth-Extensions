import { Extension, HPacket, HDirection, HMessage, GAsync } from "gnode-api";

const extensionInfo = {
  name: "FlopScript",
  description: "Floppidity's Script.",
  version: "1.0.0",
  author: "floppidity"
};
  
let ext = new Extension(extensionInfo);
ext.run();


ext.interceptByNameOrHash(HDirection.TOSERVER, "GetSelectedBadges", hUser => {
  const packet = hUser.getPacket();
  // {out:GetSelectedBadges}{i:56980492}
  const userId = packet.readInteger();

  const giveGemAmount = 10;

  ext.sendToServer(new HPacket(`{out:GiveStarGemToUser}{i:${userId}}{i:${giveGemAmount}}`))
  ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Gave that user ${giveGemAmount} gems."}{i:0}{i:23}{i:0}{i:-1}`))

})

ext.on("connect", () => {
  ext.sendToClient(new HPacket('{in:Chat}{i:-1}{s:"Gem Script has started."}{i:0}{i:23}{i:0}{i:-1}'))
  ext.sendToClient(new HPacket('{in:Chat}{i:-1}{s:"Simply click on someone to give them gems."}{i:0}{i:23}{i:0}{i:-1}'))
})
  

ext.on("end", () => {
  console.log("G-Earth has disconnected.")
})