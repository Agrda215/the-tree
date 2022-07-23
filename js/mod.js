let modInfo = {
	name: "The Tree",
	id: "letters",
	author: "Font1",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.0",
	name: "C & Fanny Cool Why?",
}

let changelog = `<h1>Changelog:</h1><br>
   <h3>v0.1.0 - C & Fanny Cool Why? (Letter 3 Layer, Fanny) and unlock new layer.</h3><br>
   - Added 1 Clickable<br>
   - Added ? Upgrades<br>
   - Added 2 Buyable<br>
   - Endgame at 25,000 c.<br>
   <h3>v0.0.2 - Numbers Atricles (Automation, Number) and unlock new layer.</h3><br>
   - Added 1 Automation<br>
   - Added 2 Tabs<br>
   - Added 7 Upgrades<br>
   - Added 1 Buyable<br>
   - Endgame at 1e5 b.<br>
	<h3>v0.0.1 - Start</h3><br>
		- Added 2 Layer<br>
    - Added 9 Upgrades<br>
    - Added 2 Clickable<br>
    - Added 1 Milestone<br>
    - Added 1 Side.<br>
    - Endgame at 2 b.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  if(hasUpgrade("a", 11)) gain = gain.times(2)
  if(hasUpgrade("a", 12)) gain = gain.times(upgradeEffect("a", 12))
  if(hasUpgrade("a", 13)) gain = gain.times(upgradeEffect("a", 13))
  if(hasUpgrade("a", 15)) gain = gain.times(upgradeEffect("a", 15))
  if(hasUpgrade("a", 21)) gain = gain.times(upgradeEffect("a", 21))
  if(hasUpgrade("b", 11)) gain = gain.times(upgradeEffect("b", 11))
  if(hasUpgrade("b", 12)) gain = gain.times(upgradeEffect("b", 12))
  if(hasUpgrade("c", 11)) gain = gain.times(1e4)
  gain = gain.times(player.a.points.add(1).sqrt())
  gain = gain.times(new Decimal.pow(2, player.b.points))
  gain = gain.times(new Decimal.pow(256, player.c.points))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
  "Points += 256<sup>c</sup> &times; 2<sup>b</sup> &times; √(a + 1)"
]

// Determines when the game "ends"
function isEndgame() {
	return player.b.points.gte(1e5)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}