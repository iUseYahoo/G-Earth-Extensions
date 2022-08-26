import { Extension, HPacket, HDirection,  } from "gnode-api";

const extensionInfo = {
    name: "FlopScript",
    description: "Floppidity's Script.",
    version: "1.0.0",
    author: "floppidity"
};

let ext = new Extension(extensionInfo);
ext.run();

async function main() {
    setInterval(() => {
        ext.sendToServer(new HPacket("{out:AvatarExpression}{i:0}"))
    }, 120000)
}

main();
