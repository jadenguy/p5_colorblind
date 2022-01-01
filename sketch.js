let cOffset, cDelta;
let satLower = .25;
let satUpper = .5;
let field;


function setup() {
  console.log('setup');
  colorMode(HSB, 1);
  createCanvas(innerWidth, innerHeight);

  field = buildTable();
  cOffset = 0;
  cDelta = 0;
  incrementColor();
}
function draw() {
  console.log('step');
  funcs = [];
  const triangle = (point) => { return point.x > point.y }
  const plus = (point) => { return Math.abs(point.x) < .25 || Math.abs(point.y) < .25 }
  const square = (point) => { return Math.abs(point.x) < .5 && Math.abs(point.y) < .5 }
  funcs.push(triangle);
  funcs.push(plus);
  funcs.push(square);
  drawField(random(funcs));
  noLoop();
  // console.log('stepDone');
}

function drawField(eval = (point) => { return point.x > point.y }) {
  // console.log('drawing');
  let minAxis = Math.min(width, height);
  let newScale = minAxis / 2;
  translate(width / 2, height / 2);
  scale(newScale);

  let hueShift = (Math.ceil((cDelta * 5) % 12 / 2) / 6);
  let bgHue = cOffset / 12;
  let hue = (bgHue + hueShift) % 1;
  stroke(color(bgHue, 0, .5));
  background(color(bgHue, 0, .5));
  noStroke();

  for (let i = 0; i < field.length; i++) {
    const point = field[i];
    const intensity = random(satLower, satUpper);
    fill(color(bgHue, intensity, .5));
    if (eval(point)) {
      fill(color(hue, intensity, .5));
    }
    circle(point.x, point.y, point.r * 2);
  }
}

function incrementColor() {
  // console.log('inc');
  cDelta += 1;
  if (cDelta >= 6) {
    cDelta %= 6;
    cOffset++;
    cOffset %= 2;
  }
  console.log(cOffset, cDelta)
}

function decrementColor() {
  // console.log('dec');
  cDelta--;
  if (cDelta < 0) {
    cDelta = 5;
    cOffset++;
    cOffset %= 2;
  }
  console.log(cOffset, cDelta)
}

function buildTable() {
  // console.log('building');
  let count = 100000;
  points = [];
  let breakLoopCount = 0;
  while (points.length < count) {
    let point = {
      r: random(.01, .02),
      x: random(-1, 1),
      y: random(-1, 1),
    };
    let valid = true;
    for (let j = 0; j < points.length; j++) {
      let other = points[j];
      let a = point.x - other.x;
      let b = point.y - other.y;
      let c = Math.sqrt(a * a + b * b);
      if (c < other.r || c - other.r < .005) {
        valid = false;
        breakLoopCount++;
        break;
      }
      point.r = Math.min(point.r, c - other.r);
    }
    if (breakLoopCount > count) {
      console.log(points.length, count, points.length / count);
      break;
    }
    if (valid) {
      points.push(point);
    }
  }
  return points;
}

function mousePressed() { }

function mouseReleased() {
  incrementColor();
  loop();
}

function mouseDragged() {
  // decrementColor();
}
function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  // field = buildTable();
  loop();
}
