
var px = 0;
var py = 0;
var particleBeingDragged = false;
var previousMouseX;
var previousMouseY;

var overParticle = false;

function getZoomedMouseX () {
	return winMouseX / zoomBy - xOffset / zoomBy;;

}

function getZoomedMouseY () {
	return winMouseY / zoomBy - yOffset / zoomBy;
}

function mousePressed() {
	if (overParticle) {
		px =  getZoomedMouseX();
		py =  getZoomedMouseY();
		particleBeingDragged = true;
		fill(255, 255, 255);
	} else {
	  	particleBeingDragged = false;
	}
}


function mouseDragged() {
	if (particleBeingDragged) {
		px =  getZoomedMouseX();
		py =  getZoomedMouseY();
	}
}

function mouseReleased() {
	particleBeingDragged = false;
}

function Particle (startingX = 0, delay, color, draggable = false) {
	this.delay = delay;
	this.diameter = 35;
	this.mass = this.diameter;

	this.originalValues = {
		startingX: startingX,
		startingY: -this.diameter,
		delay: delay,
		color: color
	}

	this.pos = { x: startingX , y: -this.diameter };
	this.velocity = 0;
	this.velocityX = 0; // only for dragged ones
	this.acceleration = this.mass * 0.005;
	this.allowOffScreen = false;

	this.color = color;
	this.bounce = 0;
	this.draggable = draggable;
	this.dragged = false;



	this.update = function () {
		if (this.draggable) {
			this.checkIfMouseIsOver();
		}

		if (particleBeingDragged && this.draggable) {
			this.dragged = true;
			this.pos.x = px;
			this.pos.y = py;
			this.generateVelocity();
			this.bounce = 0;
			return;
		}

		if (this.delay > 0) {
			this.delay=this.delay-10
			return;
		}



		this.manageXVelocity();

		this.manageYVelocity();


	}

	this.checkIfMouseIsOver = function () {
		// Test if the cursor is over the particle

		if (
			   getZoomedMouseX() > (this.pos.x - this.diameter/2)
			&& getZoomedMouseX() < (this.pos.x + this.diameter/2)
			&& getZoomedMouseY() > (this.pos.y - this.diameter/2)
			&& getZoomedMouseY() < (this.pos.y + this.diameter/2)
		) {
			overParticle = true;
		} else {
			overParticle = false;
		}
	}

	this.generateVelocity = function() {
		if(!previousMouseY) {
			this.velocity = this.acceleration;
			previousMouseY = getZoomedMouseY();
		} else {
			var newZoomedMouse = getZoomedMouseY();
			this.velocity = newZoomedMouse - previousMouseY;
			previousMouseY = getZoomedMouseY();
		}

		if(!previousMouseX) {
			this.velocityX = this.acceleration;
			previousMouseX = getZoomedMouseX();
		} else {
			var newZoomedMouseX = getZoomedMouseX();
			this.velocityX = previousMouseX - newZoomedMouseX;
			previousMouseX = getZoomedMouseX();
		}
	}

	this.manageXVelocity = function () {
		if(this.dragged){
			this.pos.x = this.pos.x - this.velocityX;

			/** Depending on which way the velocity is by which way the user threw it then bring it closer to 0 */
			if(this.velocityX < 0){
				this.velocityX += this.acceleration / 1.5;
			} else {
				this.velocityX -= this.acceleration / 1.5;
			}

			/** If it goes off of the edge of the right hand side of the screen, start it at the left. */
			if(this.pos.x - (this.diameter / 2) > width) {
				this.pos.x = -(this.diameter / 2);
			}


			/** If it goes off of the edge of the left hand side of the screen, start it at the right. */
			if(this.pos.x - (this.diameter / 2) < -this.diameter) {
				this.pos.x = width+(this.diameter / 2);
			}

		}
	}

	this.manageYVelocity = function () {
		this.velocity += this.acceleration;
		var posY = this.pos.y + this.velocity;


		/** Bit of a bounce! */
		if (
			posY + (this.diameter / 2) > height
			&&
			this.bounce < 2
		) {
			this.velocity *= -0.6;
			posY = height - this.diameter / 2;
			this.bounce++;
		} else if (posY - (this.diameter / 2) > height) {
			posY = -(this.diameter);
			this.bounce = 0;
			this.velocity = 0;
		}


		this.pos.y = posY;
	}


	this.show = function () {
		stroke(0);
		strokeWeight(0);
		fill(color, 80, 100);
		circle(this.pos.x, this.pos.y, this.diameter);
	}


	this.reset = function() {
		this.pos = { x: this.originalValues.startingX, y: this.originalValues.startingY - this.delay };
		this.velocity = 0;
		this.allowOffScreen = false;

		this.color = this.originalValues.color;
		this.bounce = 0;
	}

}