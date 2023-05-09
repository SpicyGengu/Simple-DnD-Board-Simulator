class Creature {
    constructor(posX, posY, size, color, name) {
      this.posX = posX;
      this.posY = posY;
      this.size = size;
      this.color = color;
      this.name = name;
      this.isDeleted = false;
    }
    
    update() {
      if(this.isDeleted != true) {
        push();
        fill(this.color);
        circle(this.posX, this.posY, this.size);
        fill(255);
        textAlign(CENTER);
        textSize(0.4 * this.size);
        text(this.name, this.posX, this.posY + this.size * 0.8);
        if(mouseIsPressed && 
           dist(this.posX, this.posY, mouseX, mouseY) <= this.size / 2 &&
           isHolding < 1) {
          this.posX = mouseX + movedX;
          this.posY = mouseY + movedY;
          isHolding++;
        }
        pop();
      }
      //print(this.posX)
    }
    
    mouseIsInHitbox() {
      if(dist(this.posX, this.posY, mouseX, mouseY) <= this.size / 2) {
        return true;
      } else {
        return false;
      }
    }
}