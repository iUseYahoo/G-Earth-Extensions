import {
    Extension,
    HPacket,
    HDirection,
    HMessage
  } from "gnode-api";
  
  
  const extensionInfo = {
    name: "HabCord",
    description: "Send habbo messages from discord",
    version: "1.0.0",
    author: "floppidity",
  };
  
  let ext = new Extension(extensionInfo);
  ext.run();
  
  function send(packet) {
    ext.sendToServer(new HPacket(packet));
  }
  
  ext.interceptByNameOrHash(HDirection.TOSERVER, "AvatarExpression", hMessage => {
    const packet = hMessage.getPacket();
    const expression_number = packet.readInteger();
  
    if (expression_number === 5) {
      // User is sleeping
      setTimeout(() => { // Wait half a second before messaging " "
        send('{out:Chat}{s:" "}{i:0}{i:16}');
      }, 500);
    }
  })
  
  ext.interceptByNameOrHash(HDirection.TOSERVER, 'Chat', hMessage => {
    let hPacket = hMessage.getPacket();
  
    let message = hPacket.readString();
  
    if (message === ":doj".toLowerCase()) {
      hMessage.blocked = true;
      send('{out:GetGuestRoom}{i:78370460}{i:0}{i:1}');
    }
  
    if (message == ':usdf'.toLowerCase()) {
      hMessage.blocked = true;
      send('{out:GetGuestRoom}{i:71911277}{i:0}{i:1}')
    }
    
    if (message === ':dojhome') {
      hMessage.blocked = true;
      send('{out:GetGuestRoom}{i:78353033}{i:0}{i:1}')
    } 
  });
  
  ext.on('connect', () => {
    ext.sendToClient(new HPacket('{in:Chat}{i:-1}{s:"Commands are as follows:"}{i:0}{i:2}{i:0}{i:-1}'))
    ext.sendToClient(new HPacket('{in:Chat}{i:-1}{s:":doj - teleport to DOJ room"}{i:0}{i:2}{i:0}{i:-1}'))
    ext.sendToClient(new HPacket('{in:Chat}{i:-1}{s:":usdf - teleport to USDF room"}{i:0}{i:2}{i:0}{i:-1}'))
    ext.sendToClient(new HPacket('{in:Chat}{i:-1}{s:":dojhome - teleport to DOJ main base"}{i:0}{i:2}{i:0}{i:-1}'))
  });
  