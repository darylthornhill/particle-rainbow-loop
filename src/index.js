
/*
YOUR SKETCH GOES HERE
*/
let cnv;
let zoomBy = 1;
let xOffset = 0;
let yOffset = 0;

let w = 500;
let h = 500;

var timer = 0;

var particles = [];

function setup() {
  cnv = createCanvas(w, h);
  cnv.parent('sketch-holder');
  pixelDensity(2);
  frameRate(60);
  windowResized();

  colorMode(HSB, 360, 100, 100);
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const x = 20 + (((width -30) / particleCount)) * i;

    // const y = -50;
    const delay = i * 35;
    const color = Math.floor(x % 360);

    particles[i] = new Particle(
      x,
      delay,
      color,
      i === 8
     );

  }

}

function draw() {
  background('rgba(0,0,0,1)')
  stroke(0);

  // timer = timer % Math.floor((6.1 * 60))

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];

    particle.update()
    particle.show()
  }

  // for (let i = 0; i < particles.length; i++) {
  //   const particle = particles[i];

  //   particle.update()
  //   particle.show()
  // }

  // if(timer > 17 * 60){
  //    removeParticles()
  // }

  // console.log(timer);
  // // if(timer > 6 * 60){
  // //   console.log('resetting');
  // //   resetParticles()
  // // }

  // timer++;
}

// function removeParticles() {
//   for (let i = 0; i < particles.length; i++) {
//     const particle = particles[i];
//     particle.allowOffScreen = true
//   }
// }

// function resetParticles() {
//   for (let i = 0; i < particles.length; i++) {
//     const particle = particles[i];
//     particle.reset();
//   }
// }


function windowResized() {
  // console.log('das');
  // w = window.innerHeight;
  // h = window.innerWidth;

  // zoomBy = (windowWidth / windowHeight + w/h < windowHeight / windowWidth) ? windowWidth / w : windowHeight / h;
  zoomBy = windowWidth > windowHeight ? windowHeight / h : windowWidth / w;
  cnv.style("zoom", zoomBy);
  xOffset = document.getElementById("sketch-holder").offsetLeft;
  yOffset = document.getElementById("sketch-holder").offsetTop;
}
