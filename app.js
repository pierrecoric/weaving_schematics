//Two Dimensional Array with the of the schema
let dataSchema = [];
let cellSize = 10;
let amountCellsX = 30;
let amountCellsY = 30;
let schemaMarginX = 300;
let schemaMarginY = 50;
let schemaMarginLeft = 50;
let abstractionMarginX = 200;
let abstractionMarginY = 200;
let extraSquares = 2;



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
    schemaMarginY = (height - (cellSize * amountCellsY)) / 2;
    schemaMarginX = (width - (cellSize * amountCellsX)) - schemaMarginLeft;
    drawMegaGrid();
    drawAbstraction();
    console.log(width);
}

function draw() {
    
    drawGrid();
    hoverGrid();
}

function mouseClicked() {
    updateGrid();  
    drawMegaGrid();
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
        if(dataSchema[x][y] == 0) {
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
        rect(2 * x * cellSize + abstractionMarginY,
            abstractionMarginX - (extraSquares * 2 * cellSize),
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

/*
function drawGrid() {
    stroke(0);
    for(let y = 0; y < amountCellsY; y++) {
        for(let x = 0; x < amountCellsX; x++) {
            if(dataSchema[x][y] == 0) {
                fill(255);
            } else fill(0);
            rect(schemaMarginX + x * cellSize, 
            schemaMarginY + y * cellSize, 
            cellSize, 
            cellSize);
        }
    }
}
*/

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
    schemaMarginY = (height - (cellSize * amountCellsY)) / 2;
    schemaMarginX = (width - (cellSize * amountCellsX)) - schemaMarginLeft;
    background(240);
    drawMegaGrid();
    drawAbstraction();
    drawConnections();
}



//TODO
//Geometry
    //Make sure that things are always alligned with the grid and that the abstraction is facing the schema in the middle
    //Connect the dots of the schemas and the abstraction.

//Expansions
    //Make a system to write up the pattern
    //Make a system to 

//Web
    //Remove margins around the canvas
    //Add controls on top maybe
    //