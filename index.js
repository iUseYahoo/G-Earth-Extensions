import { Extension, HPacket, HDirection,  } from "gnode-api";
import {GlobalKeyboardListener} from "node-global-key-listener";
const v = new GlobalKeyboardListener();

const extensionInfo = {
  name: "FlopScript",
  description: "Floppidity's Script.",
  version: "1.0.0",
  author: "floppidity"
};
  
let ext = new Extension(extensionInfo);
ext.run();

var oldMessage = "";

ext.interceptByNameOrHash(HDirection.TOSERVER, "Chat", (hMessage)=>{
    const packet = hMessage.getPacket();
    var message = packet.readString();
    // store the old message
    oldMessage = message;
})

v.addListener(function (e, down) {
    if (e.state == "DOWN" && e.name == "UP ARROW") {
        // send the old message to the server
        ext.sendToServer(new HPacket(`{out:Chat}{s:"${oldMessage}"}{i:0}{i:2}`));
    }
});
