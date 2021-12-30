let cOffset, cDelta;


function setup() {
  colorMode(HSB, 1)
  createCanvas(innerWidth, innerHeight);
  cOffset = 0;
  cDelta = 1 / 6.;
}
function draw() {
  circleField();
  noLoop();
}

function circleField() {
  let hue = (cOffset + cDelta) % 1;
  fill(color(hue, 1, 1));
  stroke(color(cOffset, 1, .5));
  background(color(cOffset, 1, .5));
  l = [];
  let r = Math.min(7, (innerHeight * innerHeight) / 1000);
  let breakLoopCount = 0;
  let count = (width * height) / r / r / Math.PI;

  // let count = 1;
  let area = 0;
  for (let i = 0; i < count; i++) {
    let x = map(random(), 0, 1, 0, width);
    let y = map(random(), 0, 1, 0, height);
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
      circle(p.x, p.y, p.r * 2);
      l[i] = p;
      area += p.r * p.r * Math.PI;
    } else {
      i--;
    }
  }
  console.log(hue, cDelta, cOffset, area, width * height, area / width / height);
  cDelta += 1 / 6.;
  if (cDelta >= 11 / 12.) {
    cDelta = 1 / 6.;
    cOffset += 5 / 12.;
    cOffset %= 1;
  }
}

function mousePressed() {
  loop();
}

function mouseReleased() { }
function mouseDragged() { }
function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  loop();
}
