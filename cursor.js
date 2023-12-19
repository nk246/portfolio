let cursorRadius = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor(); // Hide the default cursor
}

function draw() {
    background(255);

    // Draw content that should be inverted
    fill(0);
    // Modify this part based on your content
    rect(100, 100, 200, 200);

    // Draw custom cursor
    fill(255);
    ellipse(mouseX, mouseY, cursorRadius * 2, cursorRadius * 2);

    // Apply blend mode to invert content behind the cursor
    blendMode(DIFFERENCE);
    // Modify this part based on your content
    rect(100, 100, 200, 200);
    blendMode(BLEND);
}

