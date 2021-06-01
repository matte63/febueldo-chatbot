const tmi = require("tmi.js");

const channels = process.env.CHANNEL_LIST.trim().split(" ");
const seconds = parseInt(process.env.INTERVAL_SECONDS);
const on_start = process.env.ON_START === "true";

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: channels
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // replyMsg(target, context, msg, self); // I suggest to comment this line and edit the function
}

// Replies to a specific message

function replyMsg(target, context, msg, self) {
  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  /* switch (commandName) {
    case "ciao":
      client.say(target, `ciao <3`);
      console.log(`* Executed ${commandName} command`);
      break;

    default:
      console.log(`* Unknown command ${commandName}`);
  } */

  /* TODO 
    add:
      -  uievil
      -  criseldia
      -  wildlotus
      -  alefry
      -  ???
  */

  if (msg.toLowerCase().includes("quiz")) {
    client.say(target, `la bellissima quiz <3`);
    console.log(`* Executed quiz command`);
  }
  if (msg.toLowerCase().includes("chiuiz")) {
    client.say(target, `si dice quiz uwu`);
    console.log(`* Executed chiuiz command`);
  }
  if (msg.toLowerCase().includes("raffa")) {
    client.say(target, `raffa <3`);
    console.log(`* Executed raffa command`);
  }
  if (
    msg.toLowerCase().includes("gattone") &&
    !msg.toLowerCase().includes("ilgattonetv")
  ) {
    client.say(target, `!so ilgattonetv`);
    console.log(`* Executed gattone command`);
  }
  if (msg.toLowerCase().includes("pollo")) {
    client.say(target, `polloooooo <3`);
    console.log(`* Executed pollo command`);
  }
  if (msg.toLowerCase().includes("kengrav")) {
    client.say(target, `kengrav clown HahaDoge`);
    console.log(`* Executed clown command`);
  }
  if (msg.toLowerCase().includes("pollazzo")) {
    client.say(target, `e che bel pollazzo`);
    console.log(`* Executed pollazzo command`);
  } else {
    console.log(
      `* Unknown command from ${context["username"]}: ${commandName}`
    );
  }
  return;
}

// Function called to send an heart
function sendHeart() {
  for (let i = 0; i < channels.length; i++) {
    let target = channels[i];
    client.say(target, `<3`);
    console.log(`* Sent a heart <3 to ${target}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);

  console.log(`* ON_START is set to ${on_start}`);
  if (on_start) sendHeart();

  let s = 30;
  if (seconds >= 30) {
    console.log(`* Time is set to ${seconds} s`);
    s = seconds;
  } else {
    console.log(`* Time set is lower than 30 s, reverting to default.`);
  }
  setInterval(() => sendHeart(), s * 1000);
}
