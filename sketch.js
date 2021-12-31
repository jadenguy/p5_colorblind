let cOffset, cDelta;
let intensity = .75;
let field;


function setup() {
  colorMode(HSB, 1);
  createCanvas(innerWidth, innerHeight);

  field = buildTable();
  cOffset = 0;
  cDelta = 0;
  incrementColor();
}
function draw() {
  drawField();
  noLoop();
}

function drawField() {
  translate(width / 2, height / 2);
  let cDeltaShifted = (Math.ceil((cDelta * 5) % 12 / 2) / 6);
  let cOffsetShifted = cOffset / 12;
  let hue = (cOffsetShifted + cDeltaShifted) % 1;
  stroke(color(cOffsetShifted, 0, .5));
  background(color(cOffsetShifted, 0, .5));
  let l = field;
  l.forEach(p => {
    fill(color(hue, intensity, .5));
    if (p.x > p.y) {
      fill(color(cOffsetShifted, intensity, .5));
    }
    circle(p.x, p.y, p.r * 2);
  });
}

function incrementColor() {
  cDelta += 1;
  if (cDelta >= 6) {
    cDelta %= 6;
    cOffset++;
    cOffset %= 2;
  }
  console.log(cOffset, cDelta)
}

function decrementColor() {
  cDelta--;
  if (cDelta < 0) {
    cDelta = 5;
    cOffset++;
    cOffset %= 2;
  }
  console.log(cOffset, cDelta)
}

function buildTable() {
  let r = Math.min(7, (innerHeight * innerHeight) / 1000);
  let count = (width * height) / r / r;
  l = [];
  let breakLoopCount = 0;
  for (let i = 0; i < count; i++) {
    let x = map(random(), 0, 1, -width / 2, width / 2);
    let y = map(random(), 0, 1, -height / 2, height / 2);
    let p = { r: r, x: x, y: y };
    let printCircle = true;
    for (let j = 0; printCircle && j < l.length; j++) {
      let e = l[j];
      let a = p.x - e.x;
      let b = p.y - e.y;
      let c = Math.sqrt(a * a + b * b);
      if (c < e.r || c - e.r < 2) {
        printCircle = false;
        breakLoopCount++;
      }
      p.r = Math.min(p.r, c - e.r);
    }
    if (breakLoopCount > 100000) {
      console.log(i, count, i / count);
      break;
    }
    if (printCircle) {
      l[i] = p;
    } else {
      i--;
    }
  }
  return l;
}

function mousePressed() {

}

function mouseReleased() {
  incrementColor();
  loop();
}

function mouseDragged() { decrementColor(); }
function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  field = buildTable();
  loop();
}
