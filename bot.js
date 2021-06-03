const tmi = require("tmi.js");

const channels = process.env.CHANNEL_LIST.trim().split(" ");
const seconds = parseInt(process.env.INTERVAL_SECONDS);
const on_start = process.env.ON_START === "true";
const min_interval = parseInt(process.env.MIN_INTERVAL);
if (min_interval < 30) min_interval = 30;

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

var last_bot_msg = {}; // Last message library sent by BOT_USERNAME in CHANNEL_LIST

var first_fry = {}; // First message library sent by FRY_USERNAME in CHANNEL_LIST

// Update last_bot_msg
function updateLastBotMsg(target, context, msg, self) {
  if (
    context["username"].toLowerCase() === process.env.BOT_USERNAME.toLowerCase()
  ) {
    last_bot_msg[target] = {
      username: context["username"],
      message: msg,
      date: Date.now()
    };
    let time = new Date(last_bot_msg[target]["date"]);
    console.log(
      `* Last message in ${target}: \"${
        last_bot_msg[target]["message"]
      }\", ${time.toUTCString()}`
    );
  }
}

// Send `notte fry` to Fry
function sendFirstFry(target, context, msg, self) {
  if (
    context["username"].toLowerCase() === process.env.FRY_USERNAME &&
    first_fry[target] === undefined
  ) {
    first_fry[target] = {
      username: context["username"],
      message: msg,
      date: Date.now()
    };

    let time = new Date(first_fry[target]["date"]);
    console.log(
      `* First message: \"${
        first_fry[target]["message"]
      }\", ${time.toUTCString()}`
    );
    setTimeout(() => client.say(target, `notte fry`), 1000); // Replies `notte fry`
  }
}

// Reply to a specific message
function replyMsg(target, context, msg, self) {
  // Remove whitespace from chat message
  const msg_ = msg.trim();

  // If the command is known, let's execute it
  /* switch (commandName) {
    case "ciao":
      client.say(target, `ciao <3`);
      console.log(`* Executed ${commandName} command`);
      break;

    default:
      console.log(`* Unknown command ${commandName}`);
  } */

  msg = msg.toLowerCase();

  let kiwi_start = [
    "chi",
    "chiu",
    "cu",
    "cui",
    "ki",
    "kiw",
    "kui",
    "kwi",
    "ku",
    "qu",
    "qui"
  ]; // Chiuiz name start
  let kiwi_end = [
    "wi",
    "wiz",
    "uiz",
    "uz",
    "iz",
    "ii",
    "iuiuz",
    "uiuiz",
    "iuz",
    "iiz",
    "i",
    "u",
    "w",
    "z"
  ]; // Chiuiz name end

  var kiwi = ""; // Chiuiz name alternatives

  kiwi =
    kiwi_start[Math.floor(Math.random() * kiwi_start.length)] +
    kiwi_end[Math.floor(Math.random() * kiwi_end.length)]; // Chiuiz name alternatives build

  const replies = {
    quiz: `la bellissima ${kiwi} LuvHearts`,
    chiuiz: `non si dice chiuiz ma ${kiwi} LuvPeekL`,
    raffa: `raffaaaaaaaaaa <3`,
    pollo: `polloooooooooo <3`,
    kengrav: `clown HahaDoge`,
    criseldia: `cri LuvBlondeR`,
    alefry: `serviva qualcuno che parlasse della morfologia del territorio ligure e chi meglio di alefry`,
    whievil: `uievil <3`,
    wildlotus: `PrideFlower`
  };

  let found_reply_key = false;

  for (const key in replies) {
    if (msg.includes(key)) {
      client.say(target, replies[key]);
      console.log(`* Executed ${key} command in ${target}`);
      found_reply_key = true;
    }
  }

  if (!found_reply_key)
    console.log(
      `* Unknown command in ${target} from ${context["username"]}: ${msg_}`
    );

  return;
}

// Send a heart
function sendHeart() {
  for (let i = 0; i < channels.length; i++) {
    let target = channels[i];
    client.say(target, `<3`);
    console.log(`* Sent a heart <3 to ${target}`);
  }
}

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot
  sendFirstFry(target, context, msg, self);
  let last_msg_date = 0;
  if (last_bot_msg[target] !== undefined)
    last_msg_date = last_bot_msg[target]["date"];
  if (Date.now() - last_msg_date > min_interval * 1000) {
    setTimeout(() => replyMsg(target, context, msg, self), 1000);
  } // Avoids spam even from BOT_USERNAME, default interval is set to 30 s
  updateLastBotMsg(target, context, msg, self);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);

  let s = min_interval;
  if (seconds > min_interval) {
    console.log(`* Delay is set to ${seconds} s`);
    s = seconds;
  } else {
    console.log(`* Delay is lower than 30 s, reverting to default.`);
  }

  console.log(`* ON_START is set to ${on_start}`);

  if (on_start) sendHeart();

  setInterval(() => sendHeart(), s * 1000);
}
