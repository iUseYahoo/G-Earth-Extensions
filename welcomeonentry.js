import { Extension, HPacket, HDirection, HMessage, GAsync } from "gnode-api";

const extensionInfo = {
  name: "FlopScript",
  description: "Floppidity's Script.",
  version: "1.0.0",
  author: "floppidity"
};
  
let ext = new Extension(extensionInfo);
ext.run();


ext.interceptByNameOrHash(HDirection.TOCLIENT, "Users", hUser => {
  const packet = hUser.getPacket();
  /*
  {in:Users}{i:1}{i:64336848}{s:": their username here:"}{s:"their motto"}{s:"hr-3163-1395.hd-209-1369.ch-255-110.lg-275-110.ha-3662-110-1408.ea-1402.fa-1202-110.ca-3131-91-90.cc-3158-110"}{i:870}{i:11}{i:1}{s:"9.5"}{i:2}{i:1}{s:"m"}{i:585379}{i:3}{s:"DoJ - Secretary Cabinet"}{s:""}{i:3312}{b:false}
  */
 packet.readInteger()
 packet.readInteger()
 const username = packet.readString()
 console.log("Username: " + username)
 setTimeout(() => {
   ext.sendToServer(new HPacket(`{out:Chat}{s:"Welcome ${username}"}{i:0}{i:117}`));
 }, 2000);
  
})

  