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

function populate() {
    for(let x = 0; x < amountCellsX; x ++) {
        let line = new Array(amountCellsY).fill(0);
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
            abstractionMarginX - (3 * 2 * cellSize),
            cellSize,
            (amountCellsY + 6) * 2 * cellSize
        );
    } 
    //Draw the white basis
    for(let y = 0; y < amountCellsY; y ++) {
        //3 extra squares
        fill(255);
        stroke(0);
        rect(abstractionMarginX - (3 * 2 * cellSize), 
             2 * y * cellSize + abstractionMarginY,
             (amountCellsX + 6) * 2 * cellSize,
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
    drawMegaGrid();
    drawAbstraction();
    background(240);
}