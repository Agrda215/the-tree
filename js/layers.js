addLayer("a", {
    name: "letter a", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "a", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("a", 22)) mult = mult.times(upgradeEffect("a", 22))
        mult = mult.times(player.graph.points.sqrt().div(3).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
  clickables: {
    11: {
        display() {return "<h2>+50K a Point</h2>"},
        canClick() {return true},
        unlocked() {return hasMilestone("a", 0)},
        onClick() {
          player.a.points = player.a.points.add(5e4)
        }
    }
},
    upgrades:{
      11:{
        title:"Double gain",
        description:"Double your point gain.",
        cost:new Decimal(1)
      },
      12:{
        title:"Point Booster",
        description:"even every gain.",
        cost:new Decimal(3),
        effect() {
        return player[this.layer].points.add(2).log2()
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      13:{
        title:"x4 Gain",
        description:"even every gain.",
        cost:new Decimal(10),
        effect() {
        return new Decimal(4)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      14:{
        title:"Something new?",
        description:"unlock new side.",
        cost:new Decimal(35)
      },
      15:{
        title:"x15 Gain",
        description:"even every gain.",
        cost:new Decimal(10000),
        effect() {
        return new Decimal(15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      21:{
        title:"x1000 Gain",
        description:"even every gain.",
        cost:new Decimal(75000),
        effect() {
        return new Decimal(1000)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      22:{
        title:"Base 2",
        description:"Mulitipler a increase by 30 and unlock something new.",
        cost:new Decimal(1e8),
        effect() {
        return new Decimal(30)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
    },
    milestones: {
    0: {
        requirementDescription: "1,000,000 a",
        effectDescription: "Passive base by 3 and unlock new clickable.",
        done() {return player.a.points.gte(1e6)}
    },
    },
    passiveGeneration() {
        passivebase = 0
        if (hasMilestone("a", 0)) passivebase += 3
        return passivebase
    },
})

addLayer("b", {
    name: "letter b", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "b", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["a"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#55FF00",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "b", // Name of prestige currency
    baseResource: "a", // Name of resource prestige is based on
    baseAmount() {return player.a.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(0.5)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("a", 22) || player.b.best.gt(0)},
    upgrades:{
      11:{
        title:"Tau gain",
        description:"Tau your point gain.",
        cost:new Decimal(1),
        effect() {
        return new Decimal(Math.PI * 2)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      12:{
        title:"Increase ((sqrt(b) * pi) + 1) gain.",
        description:"have these spent.",
        cost:new Decimal(2),
        effect() {
        return player.b.points.sqrt().mul(Math.PI).add(1)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
    }
})

addLayer("graph", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "blue",
    effectDescription() {return "multiplying a gain by "+format(player[this.layer].points.sqrt().div(3).add(1))},
    resource: "Graph", 
    symbol: "G",
    row: "side",
    layerShown(){return hasUpgrade("a", 14)},
    clickables: {
    11: {
        display() {return "<h2>Graph Increase"},
        canClick() {return true},
        onClick() {
          player[this.layer].points = player[this.layer].points.add(1)
        }
    }
}
},
)

