class DebugMenu {
  constructor() {
    this.visible = false;
    this.options = [
      { name: "Moon Gravity", value: false },
      { name: "Music", value: true },
      { name: "SFX", value: true },
    ];
  }

  toggle() {
    this.visible = !this.visible;
  }

  update() {
    if (!this.visible) return;
  }

  applySetting(index) {
    switch (index) {
      case 0: // Moon Gravity
        world.gravity.y = this.options[0].value ? GRAVITY / 6 : GRAVITY;
        break;
      case 1: // Music
        musicEnabled = this.options[1].value;
        if (this.options[1].value) {
          if (musicSfx && !musicSfx.isPlaying()) musicSfx.play();
        } else {
          if (musicSfx && musicSfx.isPlaying()) musicSfx.stop();
        }
        break;
      case 2: // SFX
        sfxEnabled = this.options[2].value;
        break;
    }
  }

  mousePressed() {
    if (!this.visible) return;

    let menuX = VIEWW / 2 - 80;

    for (let i = 0; i < this.options.length; i++) {
      let y = 50 + i * 20;
      let buttonX = menuX + 80;
      let buttonY = y - 8;
      let buttonW = 35;
      let buttonH = 14;
      if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonW &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonH
      ) {
        this.options[i].value = !this.options[i].value;
        this.applySetting(i);
      }
    }
  }

  draw() {
    if (!this.visible) return;

    camera.off();

    // Draw semi-transparent background
    fill(0, 0, 0, 150);
    rect(0, 0, VIEWW, VIEWH);

    // Set smaller font
    textSize(10);

    // Center the menu
    let menuX = VIEWW / 2 - 80;

    // Draw menu
    fill(255);
    textAlign(LEFT);
    text("Debug Menu", menuX, 30);

    for (let i = 0; i < this.options.length; i++) {
      let y = 50 + i * 20;
      text(this.options[i].name, menuX, y);

      // Draw button
      let buttonX = menuX + 80;
      let buttonY = y - 8;
      let buttonW = 35;
      let buttonH = 14;
      fill(100);
      rect(buttonX, buttonY, buttonW, buttonH);
      fill(255);
      textAlign(CENTER);
      text(
        this.options[i].value ? "ON" : "OFF",
        buttonX + buttonW / 2,
        buttonY + buttonH / 2 + 4,
      );
      textAlign(LEFT);
    }

    text("Click buttons to toggle, T to close", menuX, VIEWH - 20);

    camera.on();
  }
}
