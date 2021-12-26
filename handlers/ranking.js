const config = require("../botconfig/config.json")
const canvacord = require("canvacord");
const Discord = require("discord.js");
const Canvas = require("canvas");
Canvas.registerFont('Genta.ttf', {
  family: 'Genta'
})
Canvas.registerFont("UbuntuMono.ttf", {
    family: "UbuntuMono"
})
const { GetUser } = require("./functions")

module.exports = function (client) {
}