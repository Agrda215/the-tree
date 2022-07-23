addLayer("a", {
    name: "letter a", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
      autoupg:false,
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
        if(hasUpgrade("b", 13)) mult = mult.times(upgradeEffect("b", 13))
        if(hasUpgrade("b", 14)) mult = mult.times(upgradeEffect("b", 14))
       if(hasUpgrade("b", 22)) mult = mult.pow(10)
      if(hasUpgrade("b", 23)) mult = mult.pow(4)
      if(hasUpgrade("b", 24)) mult = mult.pow(4)
      if(hasUpgrade("b", 25)) mult = mult.pow(6)
      if(hasUpgrade("c", 12)) mult = mult.times(1e3)
        mult = mult.times(player.graph.points.sqrt().div(3).add(1))
        mult = mult.times(player.b.number.boost)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
  automate() {
    if (hasUpgrade("b", 15) && player.a.autoupg) {
      buyUpgrade(this.layer, 11)
      buyUpgrade(this.layer, 12)
      buyUpgrade(this.layer, 13)
      buyUpgrade(this.layer, 14)
      buyUpgrade(this.layer, 15)
      buyUpgrade(this.layer, 21)
      buyUpgrade(this.layer, 22)
    }
  },
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
      number:{
        resource:new Decimal(1),
        mulitipler:new Decimal(1),
        boost:new Decimal(1)
      }
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
  automate() {
    player.b.number.resource = player.b.number.resource.times(player.b.number.mulitipler)
    player.b.number.mulitipler = buyableEffect("b", 11).mul(buyableEffect("b", 12)).mul(buyableEffect("b", 13))
    player.b.number.boost = player.b.number.resource.sqrt()
    
    if (hasUpgrade("b", 23)) {
      player.b.points = player.b.points.add(1)
    }
    
    if (hasUpgrade("b", 24)) {
      player.b.points = player.b.points.add(4)
    }
    
    if (hasUpgrade("b", 25)) {
      player.b.points = player.b.points.add(245)
    }
    
    if (hasUpgrade("c", 13)) {
      player.b.points = player.b.points.add(new Decimal(1e6).sub(1))
    }
    
    if (hasUpgrade("c", 15)) {
      player.b.points = player.b.points.add(new Decimal(1.5e7))
    }
  },
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
      13:{
        title:"Tau a gain",
        description:"Tau your a gain.",
        cost:new Decimal(4),
        effect() {
        return new Decimal(Math.PI * 2)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      14:{
        title:"Tha't Overpower",
        description:"x1e4 a gain.",
        cost:new Decimal(5),
        effect() {
        return new Decimal(10000)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      15:{
        title:"Auto = Upg",
        description:"Unlock Automation for A Upgrades.",
        cost:new Decimal(7),
      },
      21:{
        title:"Something new?",
        description:"Unlock new tab.",
        cost:new Decimal(9),
      },
      22:{
        title:"whT",
        description:"what is ^10",
        cost:new Decimal(1000),
      },
      23:{
        title:"whT",
        description:"what is ^4 and auto gain.",
        cost:new Decimal(7500),
      },
      24:{
        title:"whT",
        description:"what is ^4 and gained by 4.",
        cost:new Decimal(25000),
      },
      25:{
        title:"Base 3",
        description:"what is ^6 and gained by 245 and unlock new layer.",
        cost:new Decimal(1e5),
      },
    },
  buyables: {
    11: {
        cost(x) { return new Decimal(10).add(x.mul(5)) },
        display() { return "<h2>Increase Number gain." },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(x) {
        let l = new Decimal.pow(2, x)
        return l
      }
    },
    12: {
        cost(x) { return new Decimal(1e6).add(x.mul(5)) },
        display() { return "<h2>Increase Number gain." },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(x) {
        let l = new Decimal.pow(32768, x)
        return l
      }
    },
    13: {
        cost(x) { return new Decimal(1e15).add(x.mul(5)) },
        display() { return "<h2>Increase Number gain." },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(x) {
        let l = new Decimal.pow(1e25, x)
        return l
      }
    },
},
    tabFormat: {
    "Main": {
        content: [
         "main-display",
         "prestige-button",
         "upgrades"
        ],
    },
    "Number": {
        content: [
         "main-display",
         "prestige-button",
          ["display-text",
        function() { return 'Get Number is ' + player.b.number.resource + ", Translated to a " + player.b.number.boost + " from a gain." },
        { "color": "yellow", "font-size": "30px", "font-family": "Consolas" }],
          ["display-text",
        function() { return "All This Mulitipler geted by " + player.b.number.mulitipler },
        { "color": "yellow", "font-size": "30px", "font-family": "Consolas" }],
         "buyables"
        ],
      unlocked() {return hasUpgrade("b", 21)}
    },
}
})

addLayer("c", {
    name: "letter 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "c", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches:["b"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#AAAAAA",
    requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
    resource: "c", // Name of prestige currency
    baseResource: "b", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(player.fan.points.sqrt().div(3).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("b", 25) || player.c.best.gt(0)},
    upgrades:{
      11:{
        title:"BIG GAIN",
        description:"x1e4 point gain.",
        cost:new Decimal(1)
      },
      12:{
        title:"A Million at thousand?",
        description:"x1e3 a gain.",
        cost:new Decimal(1)
      },
      13:{
        title:"GG +999,999 GG",
        description:"wow disk disk.",
        cost:new Decimal(2)
      },
      14:{
        title:"Something new?",
        description:"unlock new side.",
        cost:new Decimal(125)
      },
      15:{
        title:"+15,000,000 b gain.",
        description:"go = power?",
        cost:new Decimal(1e3)
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

addLayer("fan", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "orange",
    effectDescription() {return "multiplying c gain by "+format(player[this.layer].points.sqrt().div(3).add(1))},
    resource: "Fanny", 
    symbol: "F",
    row: "side",
    layerShown(){return hasUpgrade("c", 14)},
    clickables: {
    11: {
        display() {return "<h2>Fanny Increase"},
        canClick() {return true},
        onClick() {
          player[this.layer].points = player[this.layer].points.add(1)
        }
    }
}
},
)

addLayer("ab", {
    startData() { return {
        unlocked: true,
    }},
    color: "#C0C0C0",
    symbol: "⚙",
    row: "side",
    position: 1,
    name:"Autobuyers",
    tooltip: "Automation",
    layerShown() {return hasUpgrade("b", 14)},
    tabFormat: [["display-text",
    function() { return '<h2>Automation</h2>' }], "clickables"],
    clickables: {
        11: {
            title: "a Upgrades",
            display(){
                let text = "Locked"
                if (hasUpgrade("b", 15)) text = "Off"
                if (hasUpgrade("b", 15) && player.a.autoupg) text = "On"
                return text
            },
            unlocked() {return true},
            canClick() {return hasUpgrade("b", 15)},
            onClick() { player.a.autoupg = !player.a.autoupg },
            style: {"background-color"(){
                let color = "#666666"
                if (player.a.auto1upg) color = "#808080"
                return color
            }},
        },
    },
})

