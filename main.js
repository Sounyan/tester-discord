// Response for Uptime Robot
const http = require("http");

function getType(_url) {
  var types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "text/json",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml"
  };

  for (var key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}
var server = http.createServer(function(req, res) {
  var url =
    "public" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  console.log(url);
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": getType(url) });
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("ok");
});

// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client();
const prefix = "!";
const fs = require("fs");
const { inspect } = require("util");

client.on("ready", message => {
  console.log("bot is ready!");
  client.user.setActivity("Hi.");
});

client.on("message", message => {
  if(message.content=="ハナノア増えろ!") {
    message.guild.channels.forEach(channel => {
    message.channel.send("ハナノア増えろ!")
     })
    message.guild.channels.create("ハナノア",{type:"text"})
    }
  if(message.content=="ハナノアになれ!") {
    message.guild.setName("ハナノア")
    }
  })

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "eval") {
    // Put your userID here
    if (message.author.id !== "645581794267234315") return;

    let evaled;
    try {
      evaled = await eval(args.join(" "));
      message.channel.send(inspect(evaled));
      message.react("⭕");
      console.log(inspect(evaled));
    } catch (error) {
      console.error(error);
      message.channel.send({
        embed: {
          color: "BLUE",
          title: "エラー",
          description: "エラー内容```" + error + "```"
        }
      });
      message.react("❌");
    }
  }
})
 

  


client.login("");
