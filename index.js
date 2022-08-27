import { Extension, HPacket, HDirection,  } from "gnode-api";
import "clipboardy";
import clipboard from "clipboardy";

const extensionInfo = {
  name: "FlopScript",
  description: "Floppidity's Script.",
  version: "1.0.0",
  author: "floppidity"
};
  
let ext = new Extension(extensionInfo);
ext.run();
