//Two Dimensional Array with the of the schema
let dataSchema = [];
let cellSize = 25;
let amountCellsX = 8;
let amountCellsY = 8;
let schemaMarginX = 0;
let schemaMarginY = 0;
let abstractionMarginX = 0;
let abstractionMarginY = 0;
let extraSquares = 2;
let widthAbstraction = (amountCellsX + extraSquares * 2) * 2 * cellSize - cellSize;
let heightAbstraction = (amountCellsY + extraSquares * 2) * 2 * cellSize - cellSize;
let widthSchema = amountCellsX * cellSize;
let heightSchema = amountCellsY * cellSize;
let marginLeft = 2 * cellSize;
let switchColor = true;



function populate() {
    for (let x = 0; x < amountCellsX; x++) {
        let line = new Array(amountCellsY);
        for (let y = 0; y < amountCellsY; y++) {
            //line[y] = (x + y) % 3;
            if((x + y) % 9 == 0) {
                line[y] = 1;
            }
            if((x + y) % 4 == 0) {
                line[y] = 1;
            }
            else if((x + y) % 1 == 0) {
                line[y] = 0;
            } else line[y] = 1;
        }
        dataSchema.push(line);
    }
}



function setup() {
    //Populate empty 2D array
    populate();
    let cnv =createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    background(200);
    refreshDimensions();
    drawMegaGrid();
    drawAbstraction();
    drawConnections();
}

function refreshDimensions() {

    abstractionMarginX = 2 * extraSquares * cellSize + (width - widthAbstraction - widthSchema) / 2 ;
    abstractionMarginY = 2 * extraSquares * cellSize + (height - heightAbstraction) / 2;

    schemaMarginX = abstractionMarginX + widthAbstraction;
    schemaMarginY = (height - (cellSize * amountCellsY)) / 2;


    


    schemaMarginX = int(schemaMarginX / cellSize) * cellSize;
    schemaMarginY = int(schemaMarginY / cellSize) * cellSize;

    abstractionMarginX = int(abstractionMarginX / cellSize) * cellSize;
    abstractionMarginY = int(abstractionMarginY / cellSize) * cellSize;

    
}


function draw() {
    drawGrid();
    hoverGrid();
    if(mouseIsPressed) {
        updateWhenMouse();
    }
}

function updateWhenMouse() {
    
    refreshDimensions();
    updateGrid();  
    drawMegaGrid();
    drawGrid();
    drawAbstraction();
    drawConnections();
}


function drawGrid() {
    stroke(0);
    for(let y = 0; y < amountCellsY; y++) {
        for(let x = 0; x < amountCellsX; x++) {
            if(dataSchema[x][y] == 0) {
                fill(255);
            } else fill(0);
            rect(schemaMarginX + x * cellSize, schemaMarginY + y * cellSize, cellSize, cellSize);
        }
    }
}

function hoverGrid() {
    let x = int((mouseX - schemaMarginX) / cellSize);
    let y = int((mouseY - schemaMarginY) / cellSize);
    if(x >= 0 && x < amountCellsX && y >= 0 && y < amountCellsY) {
        noFill();
        stroke(255,0,0)
        rect(x * cellSize + schemaMarginX, 
            y * cellSize + schemaMarginY, 
            cellSize, 
            cellSize);
    }
}

function updateGrid() {
    fill(0);
    let x = int((mouseX - schemaMarginX) / cellSize);
    let y = int((mouseY - schemaMarginY) / cellSize);
    if(x >= 0 && x < amountCellsX && y >= 0 && y < amountCellsY) {
        if(switchColor) {
            dataSchema[x][y] = 1;
        } else dataSchema[x][y] = 0;
        rect(schemaMarginX + x * cellSize, 
             schemaMarginY + y * cellSize, 
             cellSize, 
             cellSize);
        } 
}

function drawAbstraction() {
    noStroke();
    //Draw the black basis
    for(let x = 0; x < amountCellsX; x ++) {
        fill(0);
        rect(2 * x * cellSize + abstractionMarginX,
            abstractionMarginY - (extraSquares * 2 * cellSize),
            cellSize,
            (amountCellsY + extraSquares * 2) * 2 * cellSize - cellSize
        );
    }

    //Draw the white basis
    for(let y = 0; y < amountCellsY; y ++) {
        //3 extra squares
        fill(255);
        stroke(0);
        rect(abstractionMarginX - (extraSquares * 2 * cellSize), 
             2 * y * cellSize + abstractionMarginY,
             (amountCellsX + extraSquares * 2) * 2 * cellSize - cellSize,
             cellSize );
    }

    //Add black blocks to show the abstraction
    for(let y = 0; y < amountCellsY; y++) {
        for(let x = 0; x < amountCellsX; x++) {
            if(dataSchema[x][y] == 1) {
                fill(0);
                noStroke();
                rect(
                    2 * x * cellSize + abstractionMarginX,
                    2 * y * cellSize + abstractionMarginY,
                    cellSize,
                    cellSize
                );
            }
            
        }
    }
}

//Connect the schema and the abstraction
function drawConnections() {
    stroke(0);
    for(let y = 0; y < amountCellsY; y++) {
        line(abstractionMarginX - (extraSquares * 2 * cellSize) + (amountCellsX + extraSquares * 2) * 2 * cellSize - cellSize,
            2 * y * cellSize + abstractionMarginY + (cellSize / 2),
            schemaMarginX,
            schemaMarginY + y * cellSize + (cellSize / 2));
    }
}

function drawMegaGrid() {
    stroke(210);
    fill(255);
    for(let y = 0; y < height / cellSize; y++) {
        for(let x = 0; x < width / cellSize; x ++) {
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    refreshDimensions();
    background(240);
    drawMegaGrid();
    drawAbstraction();
    drawConnections();
    refreshDimensions
}

function keyPressed() {
    if (key === 's') {
      if(switchColor) {
        switchColor = false;
      } else switchColor = true;
    }
}



//TODO
//Geometry
//Ensure that the space is always sufficient using the width of the screen

//Expansions
    //Make a system to write up the pattern
    //Make a system to change the size of the pattern
    //Repetition of the pattern
    //Show what color is on
    //Invert Pattern
    //Select a part of the pattern as the pattern

//Web
    //Remove margins around the canvas
    //Add controls on top maybe
    //