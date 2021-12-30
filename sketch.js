let cOffset, cDelta;
let intensity = .75;


function setup() {

  colorMode(HSB, 1)
  createCanvas(innerWidth, innerHeight);

  // translate(width / 2, height / 2);
  cOffset = 0;
  cDelta = 0;
}
function draw() {
  circleField();
  noLoop();
}

function circleField() {
  let cDeltaShifted = (Math.ceil((cDelta * 5) % 12 / 2) / 6);
  let hue = (cOffset + cDeltaShifted) % 1;

  stroke(color(cOffset, 0, .5));
  background(color(cOffset, 0, .5));
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
      fill(color(hue, intensity, .5));
      if (x > y) {
        fill(color(cOffset, intensity, .5));
      }
      circle(p.x, p.y, p.r * 2);
      l[i] = p;
      area += p.r * p.r * Math.PI;
    } else {
      i--;
    }
  }
  console.log(hue, cDeltaShifted, cOffset, cDelta)
  // console.log(area, width * height, area / width / height);
  cDelta++;
  if (cDelta == 6) {
    cDelta = 0;
    cOffset += 1 / 12.;
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
