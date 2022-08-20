import {
  Extension,
  HPacket,
  HDirection,
  HMessage
} from "gnode-api";


const extensionInfo = {
  name: "FlopScript",
  description: "Floppidity's Script.",
  version: "1.0.0",
  author: "floppidity"
};

let ext = new Extension(extensionInfo);
ext.run();


ext.interceptByNameOrHash(HDirection.TOSERVER, "GetSelectedBadges", hMessage => {
  // {out:GetSelectedBadges}{i:67041357}

  const packet = hMessage.getPacket();
  const id = packet.readInteger();
  
  if (id === 67041357) {
    ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Fam, You cannot kick yourself."}{i:0}{i:23}{i:0}{i:-1}`));
  } else { 
    console.log(`Clicked ID: ${id}`)
    
    // {out:KickUser}{i:31210849}
    setTimeout(() => {
      console.log(`\n--------------------\nKicking ${id}...`)
      ext.sendToServer(new HPacket(`{out:KickUser}{i:${id}}`))
      console.log(`Kicked ${id}...\n--------------------`)
      ext.sendToClient(new HPacket(`{in:Chat}{i:-1}{s:"Kicked UserID: ${id}."}{i:0}{i:23}{i:0}{i:-1}`))
    }, 300);
  }
})

ext.on("connect", () => {
  ext.sendToClient(new HPacket('{in:Chat}{i:-1}{s:"Kick Script has started."}{i:0}{i:23}{i:0}{i:-1}'))
  ext.sendToClient(new HPacket('{in:Chat}{i:-1}{s:"Simply click on someone to kick them."}{i:0}{i:23}{i:0}{i:-1}'))
})