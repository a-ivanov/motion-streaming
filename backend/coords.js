function deg2rad(degrees) {
  return degrees * Math.PI / 180;
}

function* circle(radius) {
  let angle = 0;
  let step = deg2rad(5);

  while (true) {
    let current = angle;
    angle += step;
    
    yield {
      x: radius * Math.cos(current),
      y: radius * Math.sin(current),
    }
  }
}

module.exports = circle(35);
