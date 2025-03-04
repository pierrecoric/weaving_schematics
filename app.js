//Two Dimensional Array with the of the schema
let dataSchema = [];
let cellSize = 30;
let amountCellsX = 9;
let amountCellsY = 9;
let extraSquares = 1;

let schemaMarginX = 0;
let schemaMarginY = 0;
let schemaMarginLeft = extraSquares * 2 * cellSize;
let abstractionMarginX = 0;
let abstractionMarginY = 0;
let abstractionOffset = extraSquares * cellSize;
let widthAbstraction = (amountCellsX * 2 * cellSize) - cellSize + (2 * abstractionOffset);
let heightAbstraction = (amountCellsY * 2 * cellSize) - cellSize  + (2 * abstractionOffset);
let widthSchema = amountCellsX * cellSize;
let heightSchema = amountCellsY * cellSize;
let marginLeft = 0;

//Function to populate the initial array
function populate() {
    for (let x = 0; x < amountCellsX; x++) {
        let line = new Array(amountCellsY);
        for (let y = 0; y < amountCellsY; y++) {
            //line[y] = (x + y) % 3;
            if((x + y) % 2 == 0) {
                line[y] = 0;
            } else line[y] = 1;
        }
        dataSchema.push(line);
    }
}


function setup() {
    //Populate empty 2D array
    populate();
    //Create canvas.
    let cnv =createCanvas(windowWidth, windowHeight);
    cnv.elt.addEventListener("contextmenu", e => e.preventDefault());
    cnv.style('display', 'block');
    background(200);
    refreshDimensions();
    drawMegaGrid();
    drawAbstraction();
    drawConnections();
}



function refreshDimensions() {
    //Margins of the abstraction
    abstractionMarginX = (width - widthAbstraction) / 2  + (abstractionOffset);
    abstractionMarginY = (height - heightAbstraction) / 2 + (abstractionOffset);
    //Margins of the schema
    schemaMarginX = abstractionMarginX + widthAbstraction - abstractionOffset + schemaMarginLeft;
    schemaMarginY = (height - (cellSize * amountCellsY)) / 2;

    //Allign margins on the grid.
    schemaMarginX = roundOnCellSize(schemaMarginX);
    schemaMarginY = roundOnCellSize(schemaMarginY);
    abstractionMarginX = roundOnCellSize(abstractionMarginX);
    abstractionMarginY = roundOnCellSize(abstractionMarginY);

    //The width of the whole thing = widthAbstraction + widthSchema + schemaMarginLeft
}

function roundOnCellSize(n) {
    return int(n / cellSize) * cellSize;
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
        if(mouseButton == LEFT) {
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
        //Black Rectangle
        rect(
            2 * x * cellSize + abstractionMarginX,
            abstractionMarginY - (abstractionOffset),
            cellSize,
            (amountCellsY * 2 * cellSize) - cellSize  + (2 * abstractionOffset)
        );
    }

    //Draw the white basis
    for(let y = 0; y < amountCellsY; y ++) {
        //3 extra squares
        fill(255);
        stroke(0);
        rect(abstractionMarginX - (abstractionOffset), 
             2 * y * cellSize + abstractionMarginY,
             (amountCellsX * 2 * cellSize) - cellSize + (2 * abstractionOffset),
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
        line(
            abstractionMarginX + widthAbstraction - (abstractionOffset),
            2 * y * cellSize + abstractionMarginY + (cellSize / 2),
            schemaMarginX,
            schemaMarginY + y * cellSize + (cellSize / 2)
        );
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


//Use the form to change the size of the thing.
let formSize = document.getElementById("formSize");
function handleFormSize(event) {
    event.preventDefault();
    alert("proute");
}

formSize.addEventListener("submit", handleFormSize);



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