let points = [];
let i = 0;
let order = 10;
let a = 0;

function setup() {
  createCanvas(300, 300);
  colorMode(HSB, 255);
  background(0);
  hilbert(order, 0, 0, min(height, width), 'up');
}

function draw() {
  for (let num = 0; num < pow(4, 5); num++) {
    let h = map(a, 0, points.length, 0, 255);
    stroke(h, 255, 255);
    line(points[a].x, points[a].y, points[a + 1].x, points[a + 1].y);
    a = (a + 1) % (points.length - 1);
  }
  if (a == 0)
    background(0);
}

function hilbert(n, x, y, len, dir) {
  let pow2 = pow(2, n + 1);
  if (n == 1) {
    switch (dir) {
      case 'up': {
        points.push(createVector(x + len / pow2, y + len - len / pow2),
                    createVector(x + len / pow2, y + len / pow2),
                    createVector(x + len - len / pow2, y + len / pow2),
                    createVector(x + len - len / pow2, y + len - len / pow2));
      }
      break;
    case 'left': {
      points.push(createVector(x + len / pow2, y + len - len / pow2),
                  createVector(x + len - len / pow2, y + len - len / pow2),
                  createVector(x + len - len / pow2, y + len / pow2),
                  createVector(x + len / pow2, y + len / pow2));
    }
    break;
    case 'down': {
      points.push(createVector(x + len - len / pow2, y + len / pow2),
                  createVector(x + len - len / pow2, y + len - len / pow2),
                  createVector(x + len / pow2, y + len - len / pow2),
                  createVector(x + len / pow2, y + len / pow2));
    }
    break;
    default: {
      points.push(createVector(x + len - len / pow2, y + len / pow2),
                  createVector(x + len / pow2, y + len / pow2),
                  createVector(x + len / pow2, y + len - len / pow2),
                  createVector(x + len - len / pow2, y + len - len / pow2));
    }
    }
    return;
  }
  switch (dir) {
    case 'up': {
      hilbert(n - 1, x, y + len / 2, len / 2, 'left');
      hilbert(n - 1, x, y, len / 2, 'up');
      hilbert(n - 1, x + len / 2, y, len / 2, 'up');
      hilbert(n - 1, x + len / 2, y + len / 2, len / 2, 'right');
    }
    break;
  case 'right': {
    hilbert(n - 1, x + len / 2, y, len / 2, 'down');
    hilbert(n - 1, x, y, len / 2, 'right');
    hilbert(n - 1, x, y + len / 2, len / 2, 'right');
    hilbert(n - 1, x + len / 2, y + len / 2, len / 2, 'up');
  }
  break;
  case 'left': {
    hilbert(n - 1, x, y + len / 2, len / 2, 'up');
    hilbert(n - 1, x + len / 2, y + len / 2, len / 2, 'left');
    hilbert(n - 1, x + len / 2, y, len / 2, 'left');
    hilbert(n - 1, x, y, len / 2, 'down');
  }
  break;
  default: {
    hilbert(n - 1, x + len / 2, y, len / 2, 'right');
    hilbert(n - 1, x + len / 2, y + len / 2, len / 2, 'down');
    hilbert(n - 1, x, y + len / 2, len / 2, 'down');
    hilbert(n - 1, x, y, len / 2, 'left');
  }
  break;
  }
}