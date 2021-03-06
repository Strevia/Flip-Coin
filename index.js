//revolutions are called outbreaks
var tickCount = 0;
const CURRENTVERSION = [1, 1, 0]
const secondaryPrefixes = [
    '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B'
]
const primaryPrefixes = [
    '', 'D', 'V', 'Tr', 'Qa', 'Qu', 'Sx', 'Sp', 'O', 'N', 'C'
]
var coinDefault = {
    res: {},
    things: {},
    events: {}
}
coinDefault.version = CURRENTVERSION
resources = ['heads', 'tails', 'sides', 'robot', 'intelligence', 'art', 'creat', 'money', 'artwork', 'unrest'],
    things = ['robot', 'builder', 'artwork', 'book', 'enRobot', 'battery']
both = ['robot', 'artwork', 'book']
events = ['outbreak']
resources.forEach(resor => coinDefault.res[resor] = {
    amount: 0,
    total: 0,
});
things.forEach(thing => coinDefault.things[thing] = {
    amount: 0,
    total: 0,
    funct: place
});
coinDefault.events.outbreak = {
    run: false,
    occured: false,
}
coinDefault.things.robot.text = "Buy Coin Flipping Robot"
coinDefault.things.robot.price = {
    heads: 1,
    tails: 1,
    sides: 1
}
coinDefault.robotTab = "Robots"
coinDefault.marketTab = "Market"
coinDefault.outbreakText = "A revolution is occuring!"
coinDefault.headsToTails = "5 Heads -> 1 Tails"
coinDefault.tailsToHeads = "5 Tails -> 1 Heads"
coinDefault.things.robot.funct = flipCoin
coinDefault.things.robot.total = 0
coinDefault.things.robot.increase = 1
coinDefault.things.builder = {
    amount: 0,
    text: "Buy Builder Bot",
    price: {
        heads: 100,
        tails: 100,
        robot: 10
    },
    funct: buyRobot,
    total: 0,
    increase: 10
}
coinDefault.things.artwork = {
    amount: 0,
    total: 0,
    price: {
        art: 4
    },
    funct: place,
}
coinDefault.things.book = {
    amount: 0,
    total: 0,
    price: {
        money: 1,
    },
    increase: 10
}
coinDefault.things.enRobot = {
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
coinDefault.things.battery = {
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
UIUpdate = [
    ['res heads amount', 'coin.res.heads.total > 0', 'Heads: ', false],
    ['res tails amount', 'coin.res.tails.total > 0', 'Tails: ', false],
    ['res sides amount', 'coin.res.sides.total > 0', 'Sides: ', false],
    ['things robot price', 'coin.res.heads.total > 0 && coin.res.tails.total > 0 && coin.res.sides.total > 0', 'Buy Coin Flipping Robot<br>', false],
    ['things robot amount', 'coin.things.robot.total > 0', 'Robots: ', false],
    ['things builder price', 'coin.things.robot.total > 1', 'coin.things.builder.text', false],
    ['things builder amount', 'coin.things.builder.amount > 0 ', 'Builders: ', false],
    ['res intelligence amount', 'coin.res.intelligence.total > 0', 'Intelligence: ', false],
    ['outbreakText', 'coin.events.outbreak.run', '', false],
    ['res art amount', 'coin.res.art.total > 0', 'Art: ', false],
    ['things artwork amount', 'coin.things.artwork.total > 0', 'Artwork: ', false],
    ['things artwork price', 'coin.things.artwork.total > 0', 'Next artwork at ', false],
    ['robotTab', 'coin.things.artwork.total > 0 || coin.things.book.total > 0', '', true],
    ['marketTab', 'coin.things.artwork.total > 0 || coin.things.book.total > 0', '', true],
    ['res artwork amount', 'coin.things.artwork.total > 0', 'Artwork: ', false],
    ['res money amount', 'coin.res.money.total > 0', 'Money: $', false],
    ['things enRobot amount', 'coin.things.enRobot.amount > 0', 'Enlightened Robots: ', false],
    ['res creat amount', 'coin.res.creat.total > 0', 'Creativity: ', false],
    ['things book amount', 'coin.things.book.total > 0', 'Books: ', false],
    ['things book price', 'coin.res.money.total > 0', 'Write Book of Knowledge<br>', false],
    ['market range', 'coin.debug', '', false],
    ['singularity', 'coin.things.book.total > 0', '', false],
    ['sacrificeText', '!coin.events.outbreak.run && coin.res.robot.amount >= 100 && coin.events.outbreak.occured && coin.things.battery.amount < 1', '', false],
    ['things battery display', "!coin.events.outbreak.run && coin.events.outbreak.occured", '', false],
    ['things battery amount', 'coin.things.battery.total  > 0', 'Batteries: ', false],
    ['notationDisplay', 'true', 'Current Notation: ', true],
    ['market selling', 'coin.things.artwork.total > 0', 'Sell Artwork For $', false],
    ['singularityBox', 'coin.things.book.total > 0', '', false],
    ['things battery burn', 'coin.things.battery.amount > 1', 'Burn all batteries to multiply next second by ', false],
    ['things enRobot price', 'coin.things.book.total > 0', 'Buy an Enlightened Robot<br>', false],
    ['res unrest amount', 'coin.debug', "UNREST: ", false],
    ['events outbreak chance', 'coin.debug', 'CHANCE OF OUTBREAK: ', false]
]
HOTKEYS = {
	F: "flip",
	R: "things robot price",
	B: "things builder price",
	S: "market selling",
	W: "things book price",
	C: "sacrificeText",
	D: "things battery display"
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
    updateSacrificeText()
    updateBatteries()
    document.getElementById('export').setAttribute('data-clipboard-text', utoa(JSON.stringify(coin, replace)))
    updateTooltips()
    UIUpdate.forEach(element => {
        let x = element[0].split(' ')
        let tempEl = document.getElementById(element[0])
        if (eval(element[1])) {
			element = deepCopy(element)
            if (!element[3]) {
                tempEl.style.display = 'block';
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
                    a += " " + upperFirst(String(re) + " " + format(String(y[re])));
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
            tempEl.style.display = 'none';
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
}

function updateTooltips() {
    document.getElementById('res intelligence amount').setAttribute('title', "Uh oh, your robots are getting smarter. I have a feeling them getting smarter will make them more likely to revolt, probably something like a " + format((coin.res.intelligence.amount) / 308 * 100) + '% chance right now. I also have a feeling them being smarter makes them produce ' + format(2 ** coin.res.intelligence.amount) + 'x more robots and coins though, so it may not all be bad.')
    document.getElementById('things robot amount').setAttribute('title', "What a nice robot. It'll flip coins for you, but since all of them will do it together it'll land on the same side for all. Currently flipping " + format(coin.res.robot.amount * 2 ** coin.res.intelligence.amount * 1.5 ** (coin.things.battery.amount >= 1)) + " coins per second.")
    document.getElementById('things builder amount').setAttribute('title', "Allows autonomous trading with Craig. You probably already know that from the other tooltip and I don't have a new joke, so I'll just tell you you're trading " + format(coin.things.builder.amount * 2 ** coin.res.intelligence.amount * 1.5 ** (coin.things.battery.amount >= 1)) + " times a second.")
    document.getElementById('things enRobot amount').setAttribute('title', "Forged by the singularity, enlightened robots will attempt to construct an additional artwork each revolution. Currently making " + format(coin.things.enRobot.amount) + " more artwork from that. Will also multiply art, currently by " + format(coin.things.enRobot.amount + 1) + "x")
    document.getElementById('things artwork amount').setAttribute('title', "So beautiful. Made with art, but more importantly makes your robots smarter. Each one doubles the amount of intelligence your robots generate. Currently making " + format(2 ** coin.res.artwork.amount) + "x extra intelligence")
    document.getElementById('res creat amount').setAttribute('title', "Somehow selling an artwork made all your artwork more valuable. Huh. Currently provides a " + format(Math.sqrt(coin.res.creat.amount)) + "x bonus to Craig's price.")
}

function updateBatteries() {
    let current = coin.res.sides.amount / 10
    if (current > coin.things.battery.price.sides) {
        coin.things.battery.price.sides = current
    }
    coin.things.battery.display = "Spend " + format(coin.things.battery.price.sides) + " sides to get 120 batteries"
}

function gainResources(outb) {
    if (!outb) {
        if (coin.res.robot.amount > 100) {
            addIntel((0.001 * coin.res.robot.amount * 2 ** coin.things.artwork.amount));
            if (coin.things.battery.amount <= 0) {
                coin.res.unrest.amount += coin.res.intelligence.amount / 2;
                coin.res.unrest.total += coin.res.intelligence.amount / 2
            }
        }
        things.forEach(t => {
            if (coin.things[t].amount > 0 && !coin.events.outbreak.run && (t == 'robot' || t == 'builder')) {
                if (coin.res.intelligence.amount < 0) {
                    coin.things[t].funct(coin.things[t].amount);
                } else {
                    if (coin.things.battery.amount >= 1) {
                        coin.things[t].funct(coin.things[t].amount * (2 ** coin.res.intelligence.amount) * 1.5)
                    } else {
                        coin.things[t].funct(coin.things[t].amount * (2 ** coin.res.intelligence.amount));
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
        t += 'Sacrifice ' + format(coin.sacrifice.amount * 100) + '% of robots to trigger a revolution.'
        coin.sacrificeText = t
    }
}

function onOutbreak() {
    coin.res.unrest.amount = 0;
    addIntel(0.1 * coin.res.robot.amount * 2 ** coin.things.artwork.amount);
    coin.res.art.amount += (Math.log2(coin.things.builder.amount + 1) * (coin.things.enRobot.amount + 1)) || 1
    coin.res.art.total += (Math.log2(coin.things.builder.amount + 1) * (coin.things.enRobot.amount + 1)) || 1
    let a = coin.res.artwork.total
    maxAmount = Math.ceil(maxArtwork(coin.res.art.amount, a))
    if (coin.res.art.amount >= artworkPrice(a, maxAmount + 1)) {
        maxAmount++
    } else if (coin.res.art.amount < artworkPrice(a, maxAmount)) {
        maxAmount--
    }
    maxAmount++
    if (maxAmount > coin.things.enRobot.amount + 1) {
        maxAmount = coin.things.enRobot.amount + 1
    }
    price = artworkPrice(a, maxAmount - 1)
    if (coin.res.art.amount >= price && maxAmount > 0 && coin.res.art.amount != Infinity) {
        coin.res.art.amount -= price
        coin.things.artwork.amount += maxAmount
        coin.things.artwork.total += maxAmount
        coin.things.artwork.price.art = (coin.things.artwork.total + 2) ** 2
    } else if (coin.res.art.amount == Infinity) {
        coin.things.artwork.amount += coin.things.enRobot.amount + 1
        coin.things.artwork.total += coin.things.enRobot.amount + 1
        coin.things.artwork.price.art = (coin.things.artwork.total + 2) ** 2
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
    if (tickCount % 20 === 19) {
        if (coin.things.builder.amount == 0) {
            coin.things.builder.text = "Buy Builder Bot<br>"
        } else {
            coin.things.builder.text = format(2 + coin.things.enRobot.amount * 0.1) + 'x Builder Bots<br>'
        }
        if (coin.things.battery.amount > 0) {
            coin.things.battery.burn = Math.log2(coin.things.battery.amount) * 4
            coin.things.battery.amount--
        }
        if (coin.res.artwork.total > 0) {
            coin.market.selling = marketPrice()
        }
        if (coin.res.robot.amount > 100) {
            coin.events.outbreak.chance = coin.res.unrest.amount / 1024
            if (coin.res.robot.amount == Infinity) {
                infinity()
            }
            if ((Math.random() < coin.events.outbreak.chance && coin.things.battery.amount < 1) || (coin.res.intelligence.amount > 2 && !coin.events.outbreak.occured)) {
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
    if (coin.things.book.total > 0) {
        updateSingularityBox()
    }
    tickCount++;
}

function updateSingularityBox() {
    let sing = ""
    sing += 'Keeping ' + format((coin.things.book.amount + 2)) + ' intelligence from books.<br>'
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
        if (coin.version[0] < 1) {
            try {
                if (coin.res.creat.total == 0) {
                    coin.res.creat = deepCopy(coinDefault.res.creat)
                }
            } catch {
                coin.res.creat = deepCopy(coinDefault.res.creat)
            }
            try {
                if (coin.res.money.total == 0) {
                    coin.res.money = deepCopy(coinDefault.res.money)
                }
            } catch {
                coin.res.money = deepCopy(coinDefault.res.money)
            }
            coin.res.artwork = coin.things.artwork
            coin.market = deepCopy(coinDefault.market)
            if (coin.things.book.price.heads == 1e300) {
                coin.things.book = deepCopy(coinDefault.things.book)
            }
            try {
                if (coin.things.battery.total == coinDefault.things.battery.total) {
                    coin.things.battery = deepCopy(coinDefault.things.battery)
                }
            } catch {
                coin.things.battery = deepCopy(coinDefault.things.battery)
            }
            try {
                if (coin.sacrifice.total == 0) {
                    coin.sacrifice = deepCopy(coinDefault.sacrifice)
                }
            } catch {
                coin.sacrifice = deepCopy(coinDefault.sacrifice)
            }
            if (typeof(coin.notation) != "number") {
                coin.notation = 0
                coin.notationDisplay = "Standard"
            }
            try {
                if (coin.things.battery.total == coinDefault.things.battery.total) {
                    coin.things.battery = deepCopy(coinDefault.things.battery)
                }
            } catch {
                coin.things.battery = deepCopy(coinDefault.things.battery)
            }
            coin.debug = false
            coin.market.range = ''
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
        })
        things.forEach(t => {
            if (typeof(coin.things[t]) == "undefined") {
                coin.things[t] = coinDefault.things[t]
            }
            coin.things[t].funct = coinDefault.things[t].funct
            if (coin.things[t].amount == "infinity") {
                coin.things[t].amount = Infinity
            }
            if (coin.things[t].total == "infinity") {
                coin.things[t].total = Infinity
            }
            Object.keys(coin.things[t].price).forEach(p => {
                if (coin.things[t].price[p] == "infinity") {
                    coin.things[t].price[p] = Infinity
                }

            })
        })
        let updated = false
        if (coin.version[2] != CURRENTVERSION[2]) {
            coin.version[2] = CURRENTVERSION[2]
            updated = true
        }
        if (coin.version[0] < 1 && coin.version[1] < 2) {
            coin.events.outbreak = deepCopy(coinDefault.events.outbreak)
            updated = true
        }
        if (coin.version[0] < 1 && coin.version[1] < 3) {

            coin.things.enRobot = deepCopy(coinDefault.things.enRobot)
            coin.things.book = deepCopy(coinDefault.things.book)
        }
        if (coin.things.enRobot.price.heads == 1e300) {
            coin.things.enRobot = deepCopy(coinDefault.things.enRobot)
        }
        coin.version = CURRENTVERSION
        if (updated) {
            console.log('Updated to v' + String(coin.version[0] + '.' + String(coin.version[1] + '.' + String(coin.version[2]))))
        }
        both.forEach(b => {
            coin.res[b] = coin.things[b]
        });
        coin.sell = {
            art: '',
        }
    } else {
        coin = deepCopy(coinDefault);
        both.forEach(b => {
            coin.res[b] = coin.things[b]
        });
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
    coin.singularity = ""
    coin.sacrificeText = ""
    coin.market.display = "Artwork selling for"
    if (coin.tab) {
        document.getElementById(coin.tab + "Tab").click()
    } else {
        coin.tab = "robot"
    }
    requestInterval(onTick, 50)
}

function save() {
    localStorage.setItem('flipCoin', JSON.stringify(coin, replace))
}

function requestInterval(fn, delay) {
    let requestAnimFrame = (function() {
            return (
                window.requestAnimationFrame ||
                function(callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                }
            );
        })(),
        start = Date.now(),
        handle = {};

    function loop() {
        handle.coin = requestAnimFrame(loop);
        let current = Date.now(),
            delta = current - start;
        if (delta >= delay) {
            fn();
            start = Date.now();
        }
    }
    handle.coin = requestAnimFrame(loop);
    return handle;
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
    if (times == Infinity && coin.things[item].amount == Infinity) {
        return
    }
    afford = true
    let thePrice = coin.things[item].price;
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
                if (typeof(coin.things[item].increase) == 'number') {
                    coin.things[item].price[r] *= (coin.things[item].increase) ** times
                } else {
                    coin.things[item].price[r] += parseFloat(coin.things[item].increase) * times
                    if (item == 'enRobot') {
                        coin.things.builder.text = format(2 + coin.things.enRobot.amount * 0.1) + 'x Builder Bots<br>'
                    }
                }
            }
        })
        try {
            if (item != 'builder') {
                coin.things[item].amount += times
                coin.things[item].total += times
                if (item == "battery") {
                    coin.things.battery.amount += 120
                    coin.things.battery.total += 120
                }
            } else {
                if (coin.things.builder.amount > 0) {
                    coin.things.builder.amount *= 2 + (coin.things.enRobot.amount * 0.1)
                    coin.things.builder.total *= 2 + (coin.things.enRobot.amount * 0.1)
                } else {
                    coin.things[item].amount += times
                    coin.things[item].total += times
                }
            }
        } catch {}
    }
}

function buyBattery() {
    if (coin.res.sides.amount > coin.things.battery.price.sides) {
        coin.res.sides.amount -= coin.things.battery.price.sides
        coin.things.battery.amount += 120
        coin.things.battery.total += 120
    }
}


function upperFirst(lower) {
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function buyRobot(x) {
    buy('robot', x)
}

function format(num) {
    let exp = Math.floor(Math.log10(num))
    var leading
    if (exp <= 2) {
        return Number.parseFloat(num).toPrecision(3)
    }
    if (exp == Infinity) {
        return '∞'
    } else if (isNaN(exp)){
		return 'Snap!'
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
        coin = deepCopy(coinDefault)
        localStorage.setItem('flipCoin', JSON.stringify(coinDefault, replace))
        window.location.reload(false)
    }
}
var clipboard = new ClipboardJS(document.getElementById("export"));

function importt() {
    let x = prompt("Save to import: ")
    let tempcoin = deepCopy(coin)
    try {
        coin = JSON.parse(atou(x))
        JSON.parse(atou(x))
        localStorage.setItem('flipCoin', atou(x))
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
    let c = coin.res.creat.amount
    let deviation = getRandomArbitrary(0.5, 1.5)
    price = Math.sqrt(c) * deviation
    if (price > 0) {
        coin.market.range = format(Math.sqrt(c) * 0.5) + ' ' + format(Math.sqrt(c) * 1.5)
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
		if (document.getElementById(actionDone).style.display != "none"){
			document.getElementById(actionDone).click()
		}
	}
}

function sellArtwork(times) {
    if (coin.res.artwork.amount >= times) {
        coin.res.money.amount += times * coin.market.selling
        coin.res.money.total += times * coin.market.selling
        coin.res.artwork.amount -= times
        coin.res.creat.amount += times
        coin.res.creat.total += times
    }
}

function singularity() {
    if (confirm("Are you sure? This will reset almost everything.")) {
        let c = coin.res.creat.amount
        let er = coin.things.enRobot
        let intel = (coin.things.book.amount + 2)
        let b = coin.things.book
        let notation = coin.notation
        coin = deepCopy(coinDefault)
        coin.res.intelligence.amount = intel
        coin.res.intelligence.total = intel
        coin.things.enRobot = er
        coin.things.book = b
        coin.things.book.price = coinDefault.things.book.price
        coin.notation = notation
        localStorage.setItem('flipCoin', JSON.stringify(coin, replace))
        coin.tab = "robot"
        window.location.reload(false)
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

function sacrifice() {
    if (!coin.events.outbreak.run && 10 ** coin.res.intelligence.amount < Infinity && coin.things.battery.amount < 1 && coin.things.robot.amount > 100) {
        coin.res.robot.amount *= 1 - coin.sacrifice.amount
        coin.sacrifice.total++
        coin.sacrifice.amount = 1 - 0.9 * 0.9 ** (coin.sacrifice.total)
        onOutbreak()
    }
}

function burnBatt() {
	if (coin.things.battery.amount > 0){
	    things.forEach(t => {
	        if (coin.things[t].amount > 0 && !coin.events.outbreak.run && (t == 'robot' || t == 'builder')) {
	            coin.things[t].funct(coin.things[t].amount * (2 ** coin.res.intelligence.amount * Math.log2(coin.things.battery.amount) * 4));
	        }
	    })
	}
    coin.things.battery.amount = 0

}

function artworkPrice(a, r) {
    return (1 / 6) * (1 + r) * (24 + 6 * a ** 2 + 13 * r + 2 * r ** 2 + 6 * a * (4 + r))
}

function maxArtwork(p, a) {
    return 1 / (6 * (2 ** (1 / 3))) * ((216 * a ** 3 + 972 * a ** 2 + Math.sqrt((216 * a ** 3 + 972 * a ** 2 + 1404 * a + 648 * p + 648) ** 2 - 108) + 1404 * a + 648 * p + 648) ** (1 / 3)) + 1 / (2 ** (2 / 3) * (216 * a ** 3 + 972 * a ** 2 + Math.sqrt((216 * a ** 3 + 972 * a ** 2 + 1404 * a + 648 * p + 648) ** 2 - 108) + 1404 * a + 648 * p + 648) ** (1 / 3)) + 0.5 * (-2 * a - 5)
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

function addIntel(a) {
    if (a != Infinity) {
        x = coin.res.intelligence.amount
        a = Math.log10(a)
        coin.res.intelligence.amount = x + Math.log10(1 + 10 ** (a - x))
        coin.res.intelligence.total = x + Math.log10(1 + 10 ** (a - x))
    }
}
document.addEventListener('keydown', doc_keyDown, false);
load();