//revolutions are called outbreaks
var tickCount = 0;
const CURRENTVERSION = [0, 4, 1]
const secondaryPrefixes = [
  '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B'
]
const primaryPrefixes = [
  '', 'D', 'V', 'Tr', 'Qa', 'Qu', 'Sx', 'Sp', 'O', 'N', 'C'
]
var ValueDefault = {
  res: {},
  things: {},
  events: {}
}
resources = ['heads', 'tails', 'sides', 'robot', 'intelligence', 'art'],
things = ['robot', 'builder', 'artwork', 'book', 'enRobot']
both = ['robot']
events = ['outbreak']
resources.forEach(resor => ValueDefault.res[resor] = {
  amount: 0,
  total: 0,
});
things.forEach(thing => ValueDefault.things[thing] = {
  amount: 0,
  total: 0,
  funct: place
});
ValueDefault.events.outbreak = {
  run: false,
  occured: false,
}
ValueDefault.things.robot.text = "Buy Coin Flipping Robot"
ValueDefault.things.robot.price = {
  heads: 1,
  tails: 1,
  sides: 1
}
ValueDefault.robotTab = "Robots"
ValueDefault.marketTab = "Market"
ValueDefault.outbreakText = "A revolution is occuring!"
ValueDefault.headsToTails = "5 Heads -> 1 Tails"
ValueDefault.tailsToHeads = "5 Tails -> 1 Heads"
ValueDefault.things.robot.funct = flipCoin
ValueDefault.things.robot.total = 0
ValueDefault.things.robot.increase = 1
ValueDefault.things.builder = {
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
ValueDefault.things.artwork = {
  amount: 0,
  total: 0,
  price: {
    art: 4
  },
  funct: place,
}
ValueDefault.things.book = {
  amount: 0,
  total: 0,
  price: {
    heads: 1e300
  },
}
ValueDefault.things.enRobot = {
  amount: 0,
  total: 0,
  price: {
    heads: 1e300
  },
}
UIUpdate = [
  ['res heads amount', 'value.res.heads.total > 0', 'Heads: ']
  , ['res tails amount', 'value.res.tails.total > 0', 'Tails: '],
  ['res sides amount', 'value.res.sides.total > 0', 'Sides: '],
  ['things robot text', 'value.res.heads.total > 0 && value.res.tails.total > 0 && value.res.sides.total > 0 && value.res.robot.amount < Infinity', ''],
  ['things robot price', 'value.res.heads.total > 0 && value.res.tails.total > 0 && value.res.sides.total > 0 && value.res.robot.amount < Infinity', ''],
  ['things robot amount', 'value.things.robot.total > 0', 'Robots: '],
  ['things builder text', 'value.things.robot.total > 1 && value.things.builder.price.heads != Infinity', ''],
  ['things builder price', 'value.things.robot.total > 1 && value.things.builder.price.heads != Infinity', ''],
  ['things builder amount', 'value.things.builder.amount > 0 ', 'Builders: '],
  ['res intelligence amount', 'value.res.intelligence.total > 0', 'Intelligence: '],
  //['headsToTails', 'value.res.intelligence.total > 0', ''],
  //['tailsToHeads', 'value.res.intelligence.total > 0', ''],
  ['outbreakText', 'value.events.outbreak.run', ''],
  ['res art amount', 'value.res.art.total > 0', 'Art: '],
  ['things artwork amount', 'value.things.artwork.total > 0', 'Artwork: '],
  ['things artwork price', 'value.things.artwork.total > 0', 'Next artwork at '],
  ['robotTab', 'value.things.artwork.total > 0', ''],
  ['marketTab', 'value.things.artwork.total > 0', '']
  //['save', 'value.exportOpen', '']
  //['things enRobot amount', 'value.things.enRobot.total > 0', 'Enlightened Robots: '],
  //['things enRobot price', ]
]
function updateUI() {
  document.getElementById('export').setAttribute('data-clipboard-text',btoa(JSON.stringify(value)))
  UIUpdate.forEach(element => {
    let x = element[0].split(' ')
    let tempEl = document.getElementById(element[0])
    if (eval(element[1])) {
      tempEl.style.display = 'inline-block';
      y = deepCopy(value);
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
      }
      else if (typeof y == 'number') {
        y = format(y)
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
		  console.log(t)
		  console.log(buy(t, 1, false))
		  if (buy(t, 1, false)){
			  tempEl.style.color = "#7fff00"
		  } else {
			  tempEl.style.color = "#ff0000"
		  }
				  
	})
}

function onTick() {
  updateUI();
  save();
  if (tickCount % 20 === 19) {
    if (value.res.robot.amount > 100) {
      if (value.events.outbreak.run == false) {
        value.res.intelligence.amount += (0.001 * value.res.robot.amount * 2**value.things.artwork.amount)
        value.res.intelligence.total += (0.001 * value.res.robot.amount * 2**value.things.artwork.amount)
      }
      else {
        value.res.intelligence.amount += (0.1 * value.res.robot.amount  * 2**value.things.artwork.amount)
        value.res.intelligence.total += (0.1 * value.res.robot.amount  * 2**value.things.artwork.amount)
        value.res.art.amount += 1 * value.things.builder.amount
        value.res.art.total += 1 * value.things.builder.amount
        let r = value.things.enRobot.amount
         let a = value.things.artwork.amount
         let artworkPrice = (1/6)*(1 + r)*(24 + 6*a**2 + 13*r +2*r**2+6*a*(4 + r))
        if (value.res.art.amount >= artworkPrice){
          value.res.art.amount -= value.things.artwork.price.art
          value.things.artwork.amount++
          value.things.artwork.total++
          value.things.artwork.price.art = (value.things.artwork.amount+2+r)**2 
        }

      }
      let chanceOfOutbreak = Math.log10(value.res.intelligence.amount) / 308
      if (value.res.intelligence.amount == Infinity)  {
        value.res.tails.amount = Infinity
        value.res.heads.amount = Infinity
        value.res.sides.amount = Infinity
        value.res.tails.total = Infinity
        value.res.heads.total = Infinity
        value.res.sides.total = Infinity
        value.res.robot.amount = Infinity
        value.res.robot.total = Infinity
      }
      if (Math.random() < chanceOfOutbreak  || (value.res.intelligence.amount > 1e2 && !value.events.outbreak.occured)){
        value.events.outbreak.run = true
        value.events.outbreak.occured = true
      }
      else {
        value.events.outbreak.run = false
      }
    }
    things.forEach(t => {
      if (value.things[t].amount > 0 && !value.events.outbreak.run && t != 'artwork' && t != 'book' && t != 'enRobot') {
        if (value.res.intelligence.amount < 1) {
          value.things[t].funct(value.things[t].amount);
        }
        else {
          value.things[t].funct(value.things[t].amount * (2**Math.log10(value.res.intelligence.amount)));
        }
      }
    })
  }
  tickCount++;
}
function load() {
  if (localStorage.getItem('flipCoin') != null){
    value = JSON.parse(localStorage.getItem('flipCoin'))
    resources.forEach(r => {
      if (value.res[r].amount == null){
        value.res[r].amount = Infinity
      }
      if (value.res[r].total == null){
        value.res[r].total = Infinity
      }
    })
    things.forEach(t => {
      value.things[t].funct = ValueDefault.things[t].funct
      if (value.things[t].amount == null){
        value.things[t].amount = Infinity
      }
      if (value.things[t].total == null){
        value.things[t].total = Infinity
      }
      Object.keys(value.things[t].price).forEach(p => {
        if (value.things[t].price[p] == null){
          value.things[t].price[p] = Infinity
        }

      })
    })
    let updated = false
    if (value.version == undefined){
      value.version = [0,0,0]
    }
    if (value.version[2] != CURRENTVERSION[2]){
      value.version[2] = CURRENTVERSION[2]
      updated = true
    }
    if (value.version[0] < 1 && value.version[1] < 2){
      value.events.outbreak = deepCopy(ValueDefault.events.outbreak)
      updated = true
    }
    if (value.version[0] < 1 && value.version[1] < 3){
      value.things.enRobot = deepCopy(ValueDefault.things.enRobot)
      value.things.book = deepCopy(ValueDefault.things.book)
    }
    value.version = CURRENTVERSION
    if (updated){
      console.log('Updated to v' + String(value.version[0] + '.' + String(value.version[1] + '.' + String(value.version[2]))))
    }
  }
  else {
  value = deepCopy(ValueDefault);
  }
  value.robotTab = "Robots"
  value.marketTab = "Market"
  both.forEach(b => {
	  value.res[b] = value.things[b]
  });
  requestInterval(onTick, 50)
}
function save(){
  localStorage.setItem('flipCoin', JSON.stringify(value))
}
function requestInterval(fn, delay) {
  let requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })(),
    start = Date.now(),
    handle = {};

  function loop() {
    handle.value = requestAnimFrame(loop);
    let current = Date.now(),
      delta = current - start;
    if (delta >= delay) {
      fn();
      start = Date.now();
    }
  }
  handle.value = requestAnimFrame(loop);
  return handle;
}

function deepCopy(source) {
  return jQuery.extend(true, {}, source);
}
function flipCoin(times) {
  if (((value.res.heads.total + value.res.tails.total) == 10) && value.res.sides.total === 0) {
    value.res.sides.amount++;
    value.res.sides.total++;
  }
  else {
    let flip = parseInt(Math.random() * 100);
    if (flip <= 45) {
      value.res.heads.amount += times || 0
      value.res.heads.total += times || 0
    }
    else if (flip <= 90) {
      value.res.tails.amount += times || 0
      value.res.tails.total += times || 0
    } else {
      value.res.sides.amount += times || 0
      value.res.sides.total += times || 0
    }
  }
}
function buy(item, times, actualBuy = true) {
  if (times == Infinity && value.things[item].amount == Infinity){
    return
  }
  afford = true
  let thePrice = value.things[item].price;
  let resNeeded = Object.keys(thePrice)
  resNeeded.forEach(r => {
    if (value.res[r].amount < thePrice[r] * times || thePrice[r] == Infinity) {
      afford = false
    }
  })
  if (!actualBuy){
	return afford
  }
  if (afford) {
    resNeeded.forEach(r => {
      if (times != Infinity){
      value.res[r].amount -= thePrice[r] * times}
      else {
        value.res[r].amount = 0
      }
      value.things[item].price[r] *= (value.things[item].increase) ** times
    })
    try {
      if (item != 'builder') {
        value.res[item].amount += times
        value.res[item].total += times
      }
      else {
        if (value.things.builder.amount > 0) {
          value.things.builder.amount *= 2
          value.things.builder.total *= 2
        }
        else {
          value.things[item].amount += times
          value.things[item].total += times
          value.things.builder.text = 'Double Builder Bots'
        }
      }
    }
    catch {
    }
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
  if (exp <= 2) {
    return Number.parseFloat(num).toPrecision(3)
  }
  if (exp == Infinity) {
    return '∞'
  }
  else {
    let level = Math.floor(exp / 3)
    let primary = Math.floor(level / 10)
    let secondary = level % 10
    let leading = Number.parseFloat(num / 10 ** (level * 3)).toPrecision(3)
    prefix = String(leading) + primaryPrefixes[primary] + (secondaryPrefixes[secondary] || '')
    return prefix
  }
}
function poop() {
  value.res.tails.amount *= 10
}
function convert(res1, res2, times) {
  if (value.res[res1].amount >= 5 * times) {
    value.res[res2].amount += times
    value.res[res2].total += times
    value.res[res1].amount -= 5 * times
  }
}
function place(no){

}
function wipe(){
  if (confirm("Are you sure?")){
    value = deepCopy(ValueDefault)
    localStorage.removeItem('flipCoin')
	window.location.reload(false)
    load()
  }
}
new ClipboardJS(document.getElementById("export"));
function importt(){
  let x = prompt("Save to import: ")
  try {
    let tempValue = deepCopy(value)
    localStorage.setItem('flipCoin',atob(x))
    	window.location.reload(false)
  }
  catch {
    value = deepCopy(tempValue)
    localStorage.setItem('flipCoin', tempValue)
    	window.location.reload(false)
  }
}
function openTab(evt, tabName) {
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
document.getElementsByClassName("tablinks")[0].click()
load();
