//revolutions are called outbreaks
var tickCount = 0;
var gameLoop;
const CURRENTVERSION = [1, 1, 0]
const secondaryPrefixes = [
    '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B'
]
const primaryPrefixes = [
    '', 'D', 'V', 'Tr', 'Qa', 'Qu', 'Sx', 'Sp', 'O', 'N', 'C'
]
var coinDefault = {
    res: {},
    events: {},
	games: {},
	UI: {},
}
coinDefault.version = CURRENTVERSION
resources = ['heads', 'tails', 'sides', 'robot', 'intelligence', 'art', 'creat', 'money', 'artwork', 'unrest', 'builder', 'artwork', 'book', 'enRobot', 'battery', 'boredom', 'ingenuity']
games = ['ttt']
events = ['outbreak']
resources.forEach(resor => coinDefault.res[resor] = {
    amount: 0,
    total: 0,
});
coinDefault.events.outbreak = {
    run: false,
    occured: false,
}
coinDefault.res.robot.text = "Buy Coin Flipping <u>R</u>obot"
coinDefault.res.robot.price = {
    heads: 1,
    tails: 1,
    sides: 1
}
coinDefault.games.ttt = {
	size: 2,
	pieces: 3,
	amount: 0,
	total: 0,
	inc: 1,
	formula: "3**(coin.games.ttt.size**2)",
	complete: 0,
}
coinDefault.robotTab = "Robots"
coinDefault.marketTab = "Market"
coinDefault.outbreakText = "A revolution is occuring!"
coinDefault.headsToTails = "5 Heads -> 1 Tails"
coinDefault.tailsToHeads = "5 Tails -> 1 Heads"
coinDefault.res.robot.funct = flipCoin
coinDefault.res.robot.total = 0
coinDefault.res.robot.increase = 1
coinDefault.res.robot.text = "Buy Coin Flipping Robot<br>"
coinDefault.res.builder = {
    amount: 0,
    text: "Buy <u>B</u>uilder Bot",
    price: {
        heads: 100,
        tails: 100,
        robot: 10
    },
    funct: buyRobot,
    total: 0,
    increase: 10
}
coinDefault.res.artwork = {
    amount: 0,
    total: 0,
    price: {
        art: 4
    },
}
coinDefault.res.book = {
    amount: 0,
    total: 0,
    price: {
        money: 1,
    },
    increase: 10
}
coinDefault.res.enRobot = {
    amount: 0,
    total: 0,
    price: {
        book: 2
    },
    increase: '2'
}
coinDefault.market = {
    selling: 1,
    display: "Artwork selling for"
}
coinDefault.sell = {
    art: '',
}
coinDefault.sacrifice = {
    amount: 0.1,
    total: 0
}
coinDefault.res.battery = {
    price: {
        sides: 1
    },
    display: '',
    increase: 1,
    amount: 0,
    total: 0
}
coinDefault.tab = "robot"
coinDefault.notation = 0
coinDefault.flip = "Flip Coin"
UIUpdate = [
    ['res heads amount', 'coin.res.heads.total > 0', 'Heads: ', false],
    ['res tails amount', 'coin.res.tails.total > 0', 'Tails: ', false],
    ['res sides amount', 'coin.res.sides.total > 0', 'Sides: ', false],
    ['res robot price', 'coin.res.heads.total > 0 && coin.res.tails.total > 0 && coin.res.sides.total > 0', 'coin.res.robot.text', false],
    ['res robot amount', 'coin.res.robot.total > 0', 'Robots: ', false],
    ['res builder price', 'coin.res.robot.total > 1', 'coin.res.builder.text', false],
    ['res builder amount', 'coin.res.builder.amount > 0 ', 'Builders: ', false],
    ['res intelligence amount', 'coin.res.intelligence.total > 0', 'Intelligence: ', false],
    ['outbreakText', 'coin.events.outbreak.run', '', true],
    ['res art amount', 'coin.res.art.total > 0', 'Art: ', false],
    ['res artwork amount', 'coin.res.artwork.total > 0', 'Artwork: ', false],
    ['res artwork price', 'coin.res.artwork.total > 0', 'Next artwork at ', false],
    ['robotTab', 'coin.res.artwork.total > 0 || coin.res.book.total > 0', '', true],
    ['marketTab', 'coin.res.artwork.total > 0 || coin.res.book.total > 0', '', true],
    ['res artwork amount', 'coin.res.artwork.total > 0', 'Artwork: ', false],
    ['res money amount', 'coin.res.money.total > 0', 'Money: $', false],
    ['res enRobot amount', 'coin.res.enRobot.amount > 0', 'Enlightened Robots: ', false],
    ['res creat amount', 'coin.res.creat.total > 0', 'Creativity: ', false],
    ['res book amount', 'coin.res.book.total > 0', 'Books: ', false],
    ['res book price', 'coin.res.money.total > 0 || coin.res.book.price', '<u>W</u>rite Book of Knowledge<br>', false],
    ['market range', 'coin.debug', '', true],
    ['singularity', 'coin.res.book.total > 0', '', false],
    ['sacrificeText', '!coin.events.outbreak.run && coin.res.robot.amount >= 100 && coin.events.outbreak.occured && coin.res.battery.amount < 1', '', true],
    ['res battery display', "!coin.events.outbreak.run && coin.events.outbreak.occured", '', false],
    ['res battery amount', 'coin.res.battery.total  > 0', 'Batteries: ', false],
    ['notationDisplay', 'true', 'Current Notation: ', true],
    ['market selling', 'coin.res.artwork.total > 0', '<u>S</u>ell Artwork For $', false],
    ['singularityBox', 'coin.res.book.total > 0', '', false],
    ['res battery burn', 'coin.res.battery.amount > 1', 'Burn all batteries to multiply next second by ', true],
    ['res enRobot price', 'coin.res.book.total > 0', 'Buy an Enlightened Robot<br>', false],
    ['res unrest amount', 'coin.debug', "UNREST: ", true],
    ['events outbreak chance', 'coin.debug', 'CHANCE OF OUTBREAK: ', true],
	['res boredom amount', 'true', 'Boredom: ', false],
	['gamesTab', 'true', '', true],
	['res ingenuity total', 'true', 'Total Inegnuity Earned: ', false],
	['res ingenuity amount', 'true', 'Ingenuity: ', false],
	['games ttt amount', 'true', 'Total Positions Solved: ', false],
	['games ttt total', 'true', 'Positions Left: ', false],
	['games ttt size', 'true', 'Size: ', false],
	['flip', 'true', '', false]
]
UIUpdate.forEach(update => {
	if (!update[3]){
		coinDefault.UI[update[0]] = false;
	}
})
RESET = [
	'res heads',
	'res tails',
	'res sides',
	'events outbreak',
	'market',
	'res art',
	'res creat',
	'res intelligence',
	'res money',
	'res sides',
	'res tails',
	'res unrest',
	'sacrifice',
	'res artwork',
	'res battery',
	'res builder',
	'res robot',
	'res book price'
]
HOTKEYS = {
	F: "flip",
	R: "res robot price",
	B: "res builder price",
	S: "market selling",
	W: "res book price",
	C: "sacrificeText",
	D: "res battery display"
}
FUNCTIONS = {
	"flip": {
		func: "flipCoin(1)",
		on: false
	},
	"res robot price": {
		func: "buy('robot', 1)",
		on: false
	},
	"res builder price":  {
		func: "buy('builder', 1)",
		on: false
	}
}

function updateUI() {
    if (coin.debug) {
        document.getElementById("debug").style.display = "block"
        if (document.getElementById("0").length === 0) {
            coin.debugSelected = []
            dropDown(document.getElementById("0"), Object.keys(coin))
        }
    } else {
        document.getElementById("debug").style.display = "none"
    }
	if (coin.res.builder.amount == 0) {
        coin.res.builder.text = "Buy <u>B</u>uilder Bot<br>"
    } else {
        coin.res.builder.text = format(2 + coin.res.enRobot.amount * 0.1) + 'x <u>B</u>uilder Bots<br>'
    }
    updateSacrificeText()
    updateBatteries()
    document.getElementById('export').setAttribute('data-clipboard-text', utoa(JSON.stringify(coin, replace)))
    updateTooltips()
    UIUpdate.forEach(element => {
        let x = element[0].split(' ')
        let tempEl = document.getElementById(element[0])
        if (eval(element[1]) || coin.UI[element[0]]) {
			element = deepCopy(element)
            if (!element[3]) {
				coin.UI[element[0]] = true
				tempEl.style.display = "block"
                tempEl.style.visibility = 'visible';
            } else {
                tempEl.style.display = "inline-block"
            }
            y = deepCopy(coin);
            x.forEach(layer => {
                y = y[layer]
            });
            let a = ' '
            if (typeof y == "object") {
                z = Object.keys(y)
                z.forEach(re => {
                    a += " " + format(String(y[re])) + " " + upperFirst(String(re));
                })
                y = a
            } else if (typeof y == 'number') {
                y = format(y)
            }
            if (element[2].includes('coin.')) {
                try {
                    element[2] = eval(element[2]) || ''
                } catch (err) {}
            }
            tempEl.innerHTML = element[2] + String(y)

        } else {
			if (!element[3]) {
                //tempEl.style.visibility = 'hidden';
            } else {
                tempEl.style.display = "none"
            }
        }
    });
    let pricesHTML = [].slice.call(document.getElementsByClassName("prices"));
    pricesHTML.forEach(tempEl => {
        x = tempEl.getAttribute('id')
        let t = x.split(' ')[1]
        if (buy(t, 1, false)) {
            tempEl.style.color = "#006400"
        } else {
            tempEl.style.color = "#ff0000"
        }

    })
	let boxesHTML = [].slice.call(document.getElementsByClassName("boxes"));
	boxesHTML.forEach(tempEl => {
		childs = [].slice.call(tempEl.children)
		childs.forEach(child => {
			if (child.style.visibility == "visible"){
				tempEl.style.visibility = "visible"
			}
		})
	})
	if (FUNCTIONS["res robot price"].on){
		coin.res.robot.text = "Buying Coin Flipping Robots<br>"
	} else {
		coin.res.robot.text = "Buy Coin Flipping Robots<br>"
	}
	if (FUNCTIONS["flip"].on){
		coin.flip = "Flipping Coins"
	} else {
		coin.flip = "Flip Coin"
	}
}

function updateTooltips() {
    document.getElementById('res intelligence amount').setAttribute('title', "Uh oh, your robots are getting smarter. I have a feeling them getting smarter will make them more likely to revolt, probably something like a " + format((coin.res.intelligence.amount) / 308 * 100) + '% chance right now. I also have a feeling them being smarter makes them produce ' + format(2 ** coin.res.intelligence.amount) + 'x more robots and coins though, so it may not all be bad.')
    document.getElementById('res robot amount').setAttribute('title', "What a nice robot. It'll flip coins for you, but since all of them will do it together it'll land on the same side for all. Currently flipping " + format(coin.res.robot.amount * 2 ** coin.res.intelligence.amount * 1.5 ** (coin.res.battery.amount >= 1)) + " coins per second.")
    document.getElementById('res builder amount').setAttribute('title', "Allows autonomous trading with Craig. You probably already know that from the other tooltip and I don't have a new joke, so I'll just tell you you're trading " + format(coin.res.builder.amount * 2 ** coin.res.intelligence.amount * 1.5 ** (coin.res.battery.amount >= 1)) + " times a second.")
    document.getElementById('res enRobot amount').setAttribute('title', "Forged by the singularity, enlightened robots will attempt to construct an additional artwork each revolution. Currently making " + format(coin.res.enRobot.amount) + " more artwork from that. Will also multiply art, currently by " + format(coin.res.enRobot.amount + 1) + "x")
    document.getElementById('res artwork amount').setAttribute('title', "So beautiful. Made with art, but more importantly makes your robots smarter. Each one doubles the amount of intelligence your robots generate. Currently making " + format(2 ** coin.res.artwork.amount) + "x extra intelligence")
    document.getElementById('res creat amount').setAttribute('title', "Somehow selling an artwork made all your artwork more valuable. Huh. Currently provides a " + format(2**(coin.res.creat.amount/2)) + "x bonus to Craig's price.")
}

function updateBatteries() {
    let current = coin.res.sides.amount / 10
    if (current > coin.res.battery.price.sides) {
        coin.res.battery.price.sides = current
    }
    coin.res.battery.display = "Spen<u>d</u> " + format(coin.res.battery.price.sides) + " sides to get 120 batteries"
}

function gainResources(outb) {
    if (!outb) {
        if (coin.res.robot.amount > 100) {
			coin.res.intelligence.amount = addLogs((0.001 * coin.res.robot.amount * 2 ** coin.res.artwork.amount), coin.res.intelligence.amount, 10);
			coin.res.intelligence.total++
            if (coin.res.battery.amount <= 0) {
                coin.res.unrest.amount += coin.res.intelligence.amount / 2;
                coin.res.unrest.total += coin.res.intelligence.amount / 2
            }
        }
        resources.forEach(t => {
            if (coin.res[t].amount > 0 && !coin.events.outbreak.run && (typeof(coin.res[t].funct) != "undefined")) {
                if (coin.res.intelligence.amount < 0) {
                    coin.res[t].funct(coin.res[t].amount);
                } else {
                    if (coin.res.battery.amount >= 1) {
                        coin.res[t].funct(coin.res[t].amount * (2 ** coin.res.intelligence.amount) * 1.5)
                    } else {
                        coin.res[t].funct(coin.res[t].amount * (2 ** coin.res.intelligence.amount));
                    }
                }
            }
        })
    } else {
        onOutbreak()
    }
}

function updateSacrificeText() {
    if (coin.res.robot.amount >= 100) {
        let t = ''
        t += 'Sa<u>c</u>rifice ' + format(coin.sacrifice.amount * 100) + '% of robots to trigger a revolution.'
        coin.sacrificeText = t
    }
}

function onOutbreak() {
    coin.res.unrest.amount = 0;
    coin.res.intelligence.amount = addLogs((0.001 * coin.res.robot.amount * 2 ** coin.res.artwork.amount), coin.res.intelligence.amount, 10);
    coin.res.art.amount += (Math.log2(coin.res.builder.amount + 1) * (coin.res.enRobot.amount + 1)) || 1
    coin.res.art.total += (Math.log2(coin.res.builder.amount + 1) * (coin.res.enRobot.amount + 1)) || 1
    let a = coin.res.artwork.total
    maxAmount = Math.ceil(maxArtwork(coin.res.art.amount, a))
    if (coin.res.art.amount >= artworkPrice(a, maxAmount + 1)) {
        maxAmount++
    } else if (coin.res.art.amount < artworkPrice(a, maxAmount)) {
        maxAmount--
    }
    maxAmount++
    if (maxAmount > 0 + 1) {
        maxAmount = 0 + 1
    }
    price = artworkPrice(a, maxAmount - 1)
    if (coin.res.art.amount >= price && maxAmount > 0 && coin.res.art.amount != Infinity) {
        coin.res.art.amount -= price
        coin.res.artwork.amount += maxAmount
        coin.res.artwork.total += maxAmount
        coin.res.artwork.price.art = (coin.res.artwork.total + 2) ** 2
    } else if (coin.res.art.amount == Infinity) {
        coin.res.artwork.amount += coin.res.enRobot.amount + 1
        coin.res.artwork.total += coin.res.enRobot.amount + 1
        coin.res.artwork.price.art = (coin.res.artwork.total + 2) ** 2
    }
}

function infinity() {
    coin.outbreakText = "Flipping and building has stopped."
    coin.res.tails.amount = Infinity
    coin.res.heads.amount = Infinity
    coin.res.sides.amount = Infinity
    coin.res.tails.total = Infinity
    coin.res.heads.total = Infinity
    coin.res.sides.total = Infinity
    coin.res.robot.amount = Infinity
    coin.res.robot.total = Infinity
}

function onTick() {
    updateUI();
    save();
    if (tickCount % coin.productive === coin.productive - 1) {
        if (coin.res.battery.amount > 0) {
            coin.res.battery.burn = Math.log2(coin.res.battery.amount) * 4
            coin.res.battery.amount--
        }
        if (coin.res.artwork.total > 0) {
            coin.market.selling = marketPrice()
        }
        if (coin.res.robot.amount > 100) {
            coin.events.outbreak.chance = coin.res.unrest.amount / 1024
            if (coin.res.robot.amount == Infinity) {
                infinity()
            }
            if ((Math.random() < coin.events.outbreak.chance && coin.res.battery.amount < 1) || (coin.res.intelligence.amount > 2 && !coin.events.outbreak.occured)) {
                coin.events.outbreak.run = true
                coin.events.outbreak.occured = true
            } else {
                coin.events.outbreak.run = false
            }
        } else {
            coin.events.outbreak.run = false
        }
        gainResources(coin.events.outbreak.run)
    }
	if (tickCount % 20 === 19){
		coin.productive = Math.floor(coin.res.boredom.amount + 20)
		if (coin.productive < 1){
			coin.productive = 1
		}
		if (coin.res.enRobot.amount >= 1){
			coin.res.boredom.amount = addLogs(coin.res.enRobot.amount / 10, coin.res.boredom.amount, 2)
			coin.res.boredom.total++
			if (document.getElementById("games ttt dump").checked){
				dumpBored('ttt', Math.floor(coin.res.boredom.amount))
			}
			if (coin.res.boredom.amount > coin.res.ingenuity.total + 1){
				coin.res.ingenuity.total++
				coin.res.ingenuity.amount++
			}
		}
	}
    updateSingularityBox()
	Object.keys(FUNCTIONS).forEach(f => {
		if (FUNCTIONS[f].on){
			eval(FUNCTIONS[f].func)
		}
	})
    tickCount++;
}

function updateSingularityBox() {
    let sing = ""
    sing += 'Keeping ' + format((coin.res.book.amount + 2)) + ' intelligence from books.<br>'
    //sing += 'Sacrificing heads, tails, sides, robots, builders, art, artwork, creativity, and money.<br>'
    sing += '<br>'
    sing += 'Note: The price of books will reset.'
    coin.singularity = "Singularity<br>"
    coin.singularityBox = sing
}

function load() {
    if (localStorage.getItem('flipCoin') != null) {
        coin = JSON.parse(localStorage.getItem('flipCoin'))
        if (coin.version == undefined) {
            coin.version = [0, 0, 0]
        }
        resources.forEach(r => {
            if (typeof(coin.res[r]) == "undefined") {
                coin.res[r] = coinDefault.res[r]
            }
            if (coin.res[r].amount == "infinity") {
                coin.res[r].amount = Infinity
            }
            if (coin.res[r].total == "infinity") {
                coin.res[r].total = Infinity
            }
			if (window[coin.res[r].funct]){
				coin.res[r].funct = window[coin.res[r].funct]
			}
        })
		if (!coin.games){
			coin.games = {};
		}
		games.forEach(g => {
            if (typeof(coin.games[g]) == "undefined") {
                coin.games[g] = coinDefault.games[g]
            }
		})
        let updated = false
        if (coin.version[2] != CURRENTVERSION[2]) {
            coin.version[2] = CURRENTVERSION[2]
            updated = true
        }
		if (coin.things){
			Object.keys(coin.things).forEach(thing => {
				coin.res[thing] = deepCopy(coin.things[thing])
			})
			delete coin.things
		}
		if (!coin.UI){
			coin.UI = deepCopy(coinDefault.UI)
		}
        coin.version = CURRENTVERSION
        if (updated) {
            console.log('Updated to v' + String(coin.version[0] + '.' + String(coin.version[1] + '.' + String(coin.version[2]))))
        }
        coin.sell = {
            art: '',
        }
    } else {
        coin = deepCopy(coinDefault);
		games.forEach(game => {
			newGame(game)
		})
    }
    switch (coin.notation) {
        case 1:
            coin.notationDisplay = "Scientific"
            break
        case 0:
            coin.notationDisplay = "Standard"
            break
    }
    coin.robotTab = "Robots"
    coin.marketTab = "Market"
	coin.gamesTab = "Games"
    coin.singularity = ""
    coin.sacrificeText = ""
    coin.market.display = "Artwork selling for"
    if (coin.tab) {
        document.getElementById(coin.tab + "Tab").click()
    } else {
        coin.tab = "robot"
    }
    gameLoop = setInterval(onTick, 50)
}

function save() {
    localStorage.setItem('flipCoin', JSON.stringify(coin, replace))
}

function deepCopy(source) {
    return jQuery.extend(true, {}, source);
}

function flipCoin(times) {
    if (((coin.res.heads.total + coin.res.tails.total) == 10) && coin.res.sides.total === 0) {
        coin.res.sides.amount++;
        coin.res.sides.total++;
    } else {
        let flip = parseInt(Math.random() * 100);
        if (flip <= 45) {
            coin.res.heads.amount += times || 0
            coin.res.heads.total += times || 0
        } else if (flip <= 90) {
            coin.res.tails.amount += times || 0
            coin.res.tails.total += times || 0
        } else {
            coin.res.sides.amount += times || 0
            coin.res.sides.total += times || 0
        }
    }
}

function buy(item, times, actualBuy = true) {
    if (times == Infinity && coin.res[item].amount == Infinity) {
        return
    }
    afford = true
    let thePrice = coin.res[item].price;
    let resNeeded = Object.keys(thePrice)
    resNeeded.forEach(r => {
        if (coin.res[r].amount < thePrice[r] * times || thePrice[r] == Infinity) {
            afford = false
        }
    })
    if (!actualBuy) {
        return afford
    }
    if (afford) {
        resNeeded.forEach(r => {
            if (times != Infinity) {
                coin.res[r].amount -= thePrice[r] * times
            } else {
                coin.res[r].amount = 0
            }
            if (times != Infinity) {
                if (typeof(coin.res[item].increase) == 'number') {
                    coin.res[item].price[r] *= (coin.res[item].increase) ** times
                } else {
                    coin.res[item].price[r] += parseFloat(coin.res[item].increase) * times
                    if (item == 'enRobot') {
                        coin.res.builder.text = format(2 + coin.res.enRobot.amount * 0.1) + 'x <u>B</u>uilder Bots<br>'
                    }
                }
            }
        })
        try {
            if (item != 'builder') {
                coin.res[item].amount += times
                coin.res[item].total += times
                if (item == "battery") {
                    coin.res.battery.amount += 120
                    coin.res.battery.total += 120
                }
            } else {
                if (coin.res.builder.amount > 0) {
                    coin.res.builder.amount *= 2 + (coin.res.enRobot.amount * 0.1)
                    coin.res.builder.total *= 2 + (coin.res.enRobot.amount * 0.1)
                } else {
                    coin.res[item].amount += times
                    coin.res[item].total += times
                }
            }
        } catch {}
    }
}

function buyBattery() {
    if (coin.res.sides.amount > coin.res.battery.price.sides) {
        coin.res.sides.amount -= coin.res.battery.price.sides
        coin.res.battery.amount += 120
        coin.res.battery.total += 120
    }
}


function upperFirst(lower) {
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function buyRobot(x) {
    buy('robot', x)
}

function format(num) {
	if (num < 0){
		negative = true
		num = Math.abs(num)
	} else {
		negative = false
	}
    let exp = Math.floor(Math.log10(num))
    var leading
    if (exp <= 2) {
        prefix = Number.parseFloat(num).toPrecision(3)
    }
    else if (exp == Infinity) {
        prefix = '∞'
    } else if (isNaN(exp)){
		prefix = 'Snap!'
	} else {
        switch (coin.notation) {
            case 0:
                let level = Math.floor(exp / 3)
                let primary = Math.floor(level / 10)
                let secondary = level % 10
                leading = Number.parseFloat(num / 10 ** (level * 3)).toPrecision(3)
                prefix = String(leading) + primaryPrefixes[primary] + (secondaryPrefixes[secondary] || '')
                break
            case 1:
                leading = (num / 10 ** exp).toPrecision(3)
                prefix = String(leading) + 'e' + String(exp)
        }
    }
	if (negative){
		prefix = '-'+ prefix
	}

    return prefix
}

function poop() {
    coin.res.tails.amount *= 10
}

function convert(res1, res2, times) {
    if (coin.res[res1].amount >= 5 * times) {
        coin.res[res2].amount += times
        coin.res[res2].total += times
        coin.res[res1].amount -= 5 * times
    }
}

function place(no) {

}

function wipe() {
    if (confirm("Are you sure?")) {
		clearInterval(gameLoop)
        localStorage.removeItem('flipCoin')
        window.location.reload(false)
    }
}
var clipboard = new ClipboardJS(document.getElementById("export"));

function importt() {
    let x = prompt("Save to import: ")
    let tempcoin = deepCopy(coin)
    try {
        coin = JSON.parse(atob(x))
        JSON.parse(atob(x))
        localStorage.setItem('flipCoin', atob(x))
        window.location.reload(false)
    } catch {
        coin = deepCopy(tempcoin)
        localStorage.setItem('flipCoin', tempcoin)
        window.location.reload(false)
    }
}

function openTab(evt, tabName) {
    coin.tab = tabName
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function marketPrice() {
    let c = 2**(coin.res.creat.amount/2)
    let deviation = getRandomArbitrary(0.5, 1.5)
    price = c * deviation
    if (price > 0) {
        coin.market.range = format(c * 0.5) + ' ' + format(c * 1.5)
        return price
    } else {
        coin.market.range = '0.500 1.50'
        return deviation
    }
}

function doc_keyDown(e) {
	keyPressed = String.fromCharCode(e.keyCode)
	actionDone = HOTKEYS[keyPressed]
	if (actionDone){
		if (document.getElementById(actionDone).style.visibility != "hidden"){
			document.getElementById(actionDone).click()
		}
	}
}

function sellArtwork(times) {
    if (coin.res.artwork.amount >= times) {
        coin.res.money.amount += times * coin.market.selling
        coin.res.money.total += times * coin.market.selling
        coin.res.artwork.amount -= times
        coin.res.creat.amount = addLogs(times, coin.res.creat.amount, 2)
        coin.res.creat.total += times
    }
}

function singularity() {
    if (confirm("Are you sure? This will reset almost everything.")) {
		RESET.forEach(resetting => {
			setToDefault(resetting)
		})
		coin.res.intelligence.amount = coin.res.book.amount + 2
		coin.res.intelligence.total = coin.res.book.amount + 2
        localStorage.setItem('flipCoin', JSON.stringify(coin, replace))
    }
}

function dropDown(ele, options) {
    ele.length = 0
    options.forEach(key => {
        let o = document.createElement("option");
        o.coin = key;
        o.text = key;
        ele.appendChild(o);
    })
}

function range(lower, upper) {
    return Array.from(new Array(parseInt(upper - lower)), (x, i) => i + lower)
}

function newDropDown(elem) {
    let selectedcoin = elem.options[elem.selectedIndex].coin;
    let len = coin.debugSelected.length + 1
    let toDelete = range(parseInt(elem.getAttribute('id')) + 1, len)
    try {
        toDelete.forEach(num => {
            document.getElementById(String(num)).remove()
        })
    } catch {}
    coin.debugSelected = coin.debugSelected.slice(0, parseInt(elem.getAttribute('id')))
    coin.debugSelected.push(selectedcoin)
    let x = deepCopy(coin)
    coin.debugSelected.forEach(n => {
        x = x[n]
    })
    if (typeof(x) != 'object') {
        let y = document.createElement('textarea')
        y.innerHTML = String(x)
        y.setAttribute('id', coin.debugSelected.length)
        y.setAttribute('onchange', "changecoin(this.value, this)")
        document.getElementById("debug").appendChild(y)
    } else {
        let y = document.createElement('select')
        dropDown(y, Object.keys(x))
        console.log(y)
        y.setAttribute('id', coin.debugSelected.length)
        y.setAttribute('onfocusout', "newDropDown(this)")
        document.getElementById("debug").appendChild(y)
    }
}

function changecoin(to, ele) {
    x = deepCopy(coin)
    coin.debugSelected.forEach(k => {
        x = x[k]
    })
    if (typeof(x) == 'number') {
        to = parseFloat(to)
    }
    setToValue(coin, to, coin.debugSelected)
}

function setToValue(obj, val, path) {
    var i;
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    obj[path[i]] = val;
}

function setToDefault(path){
	path = path.split(' ')
	x = deepCopy(coinDefault)
	for (i = 0; i < path.length; i++)
        x = x[path[i]];
	setToValue(coin, x, path)
}

function sacrifice() {
    if (!coin.events.outbreak.run && 10 ** coin.res.intelligence.amount < Infinity && coin.res.battery.amount < 1 && coin.res.robot.amount > 100) {
        coin.res.robot.amount *= 1 - coin.sacrifice.amount
        coin.sacrifice.total++
        coin.sacrifice.amount = 1 - 0.9 * 0.9 ** (coin.sacrifice.total)
        onOutbreak()
    }
}

function burnBatt() {
	if (coin.res.battery.amount > 0){
	    resources.forEach(t => {
	        if (coin.res[t].amount > 0 && !coin.events.outbreak.run && (t == 'robot' || t == 'builder')) {
	            coin.res[t].funct(coin.res[t].amount * (2 ** coin.res.intelligence.amount * Math.log2(coin.res.battery.amount) * 4));
	        }
	    })
	}
    coin.res.battery.amount = 0

}

function dumpBored(game, bored){
	if (bored < coin.games[game].total){
		coin.res.boredom.amount -= bored
		coin.games[game].amount += bored
		coin.games[game].total -= bored
	} else {
		coin.res.boredom.amount -= coin.games[game].total
		coin.games[game].complete++
		newGame(game)
	}
}

function artworkPrice(a, r) {
    return (1 / 6) * (1 + r) * (24 + 6 * a ** 2 + 13 * r + 2 * r ** 2 + 6 * a * (4 + r))
}

function maxArtwork(p, a) {
    return 1 / (6 * (2 ** (1 / 3))) * ((216 * a ** 3 + 972 * a ** 2 + Math.sqrt((216 * a ** 3 + 972 * a ** 2 + 1404 * a + 648 * p + 648) ** 2 - 108) + 1404 * a + 648 * p + 648) ** (1 / 3)) + 1 / (2 ** (2 / 3) * (216 * a ** 3 + 972 * a ** 2 + Math.sqrt((216 * a ** 3 + 972 * a ** 2 + 1404 * a + 648 * p + 648) ** 2 - 108) + 1404 * a + 648 * p + 648) ** (1 / 3)) + 0.5 * (-2 * a - 5)
}

function newGame(game){
	gameObj = coin.games[game]
	gameObj.amount = 0
	gameObj.size += gameObj.inc
	gameObj.total = eval(gameObj.formula)
}


function toggleNotation() {
    switch (coin.notation) {
        case 0:
            coin.notation = 1
            coin.notationDisplay = "Scientific"
            break
        case 1:
            coin.notation = 0
            coin.notationDisplay = "Standard"
            break
    }
}

function replace(name, val) {
    if (val == Infinity) {
        return "infinity"
    } else  if (typeof(val) == "function"){
        return val.name
    } else {
		return val
	}
}

function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
clipboard.on('success', function(e) {
    alert("Save copied successfully.")
});
clipboard.on('error', function(e) {
    alert("Error when copying save, please try again later.")
});

function addLogs(a, x, b) {
	if (a == Infinity){
		a = 1.797693134862315E+308
	}
    if (a != Infinity) {
        a = Math.log(a)/Math.log(b)
        return x + Math.log(1 + b ** (a - x))/Math.log(b)
    }
	return x
}
function toggleHold(evt){
	going = evt.id
	FUNCTIONS[going].on = !FUNCTIONS[going].on
	Object.keys(FUNCTIONS).forEach(f => {
		if (f != going){
			FUNCTIONS[f].on = false
		}
	})
}
document.addEventListener('keyup', doc_keyDown, false);
try {
	load();
}
catch(err){
	window.alert("ERROR: " + err + "\nPage will now reload.");
	window.location.reload(false)
}