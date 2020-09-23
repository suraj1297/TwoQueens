// importing library for taking input
const prompt = require("prompt-sync")();

//variable chessCharacters & chessNumber  which maps x and y cordinate to chess cordinates
//ex: [2,0] = "C8"

const chessCharacters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const chessNumber = [7, 6, 5, 4, 3, 2, 1, 0];


// queen1 will holda details abt queen1
let queen1 = {
    direction: "S",
    position: {
        x: 1,
        y: 1,
    },
    whereAbouts: [],
};

// queen1 will holda details abt queen2
let queen2 = {
    direction: "N",
    position: {
        x: 2,
        y: 1,
    },
    whereAbouts: [],
};


// Function calculates the new position of queen after taking the noOfSteps(number of steps)
// and direction into direction
const updateCoordinates = (
    xSteps,
    ySteps,
    xOperator = "add",
    yOperator = "add"
) => {

    // both variables will be updated with new positions
    let xValue = null;
    let yValue = null;

    // Updates x coordinate
    if (xOperator === "add") {
        xValue = queen.position.x + Number.parseInt(xSteps);
    } else if (xOperator === "sub") {
        xValue = queen.position.x - Number.parseInt(xSteps);
    }

    // updates y coordinate
    if (yOperator === "add") {
        yValue = queen.position.y + Number.parseInt(ySteps);
    } else if (yOperator === "sub") {
        yValue = queen.position.y - Number.parseInt(ySteps);
    }

    //getting opposite queens coordinates
    let oppQueen = whichQueen === 1 ? queen2 : queen1

    let opp_queen_x = oppQueen.position.x
    let opp_queen_y = oppQueen.position.y

    console.log(`X: ${xValue}, Y: ${yValue}`)
    console.log(opp_queen_x, opp_queen_y);

    // checks if the coordinates go out of boards limit or if the new move of one queen leads the queen at same 
    // as of other queen hen it will show message the move is not possible
    if (yValue >= 0 && yValue <= 7 && xValue >= 0 && xValue <= 7 && (opp_queen_x !== xValue || opp_queen_y !== yValue)) {
        queen.position.y = yValue;
        queen.position.x = xValue;
    } else {
        console.log("Move not possible");
    }
};


// object holds the directions as key and will update the queens position as per the noOfsteps
// asked for by calling updateCoordinates function hen move function is called.
const Coordinates = {
    S: {
        fullForm: "South",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = 0),
                (ySteps = noOfSteps),
                (xOperator = "add"),
                (yOperator = "add")
            ),
    },
    N: {
        fullForm: "North",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = 0),
                (ySteps = noOfSteps),
                (xOperator = "add"),
                (yOperator = "sub")
            ),
    },
    E: {
        fullForm: "East",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = 0),
                (xOperator = "add"),
                (yOperator = "add")
            ),
    },
    W: {
        fullForm: "West",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = 0),
                (xOperator = "sub"),
                (yOperator = "add")
            ),
    },
    NE: {
        fullForm: "North East",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = noOfSteps),
                (xOperator = "add"),
                (yOperator = "sub")
            ),
    },
    NW: {
        fullForm: "North West",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = noOfSteps),
                (xOperator = "sub"),
                (yOperator = "sub")
            ),
    },
    SE: {
        fullForm: "South East",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = noOfSteps),
                (xOperator = "add"),
                (yOperator = "add")
            ),
    },
    SW: {
        fullForm: "South West",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = noOfSteps),
                (xOperator = "sub"),
                (yOperator = "add")
            ),
    },
};

// return queen location and direction
const queenLocation = () =>
    `${chessCharacters[queen.position.x]}${
    chessNumber[queen.position.y] + 1
  } facing "${Coordinates[queen.direction].fullForm}"`;

// Function takes new direction abbreviation i.e N,S,E as input so that the direction of queen can be changed.
const changeDirection = (newDirection) => {
    queen.direction = newDirection.toUpperCase()
};

// function pulls the new/last position of queen and update the whereabouts property by pushing new position.
const updatePosition = () => {
    queen.whereAbouts.push(queenLocation());
};

const queenDetails = (noOfSteps = 1) => {
    movingDirection = queen.direction;
    oldXCoordinates = queen.position.x;
    oldYCoordinates = queen.position.y;
    console.log(`-> Queens's last position : ${queenLocation()} \n`);
    Coordinates[movingDirection].move(noOfSteps);
    if (
        oldXCoordinates !== queen.position.x ||
        oldYCoordinates !== queen.position.y
    ) {
        updatePosition();
        console.log(`-> Queen's new position : ${queenLocation()} \n`);
    }
};

// Moves Queen by one step
const moveForward = () => {
    queenDetails();
};

// Moves Queen by n steps
const jumpMoveForward = (noOfSteps) => {
    queenDetails(noOfSteps);
};

// returns queens position logs
const log = () => queen.whereAbouts;


// after every move queen will be changed whichQueen wil hold number to denote if to choose queen first or second
var whichQueen = 1;
// as per whichQueen queen varibale ill hold the reference to repective queen.
var queen = null;
var exit = false;

do {

    // copying queen variable as queen1 if 
    queen = whichQueen === 1 ? queen1 : queen2;
    console.log(`-> Queen ${whichQueen} Active`);

    console.log(`-> Queen's current position: ${queenLocation()} \n`);
    // will check is queen has been moved or not
    let moved = false;


    // first asking for options and checking if user has moved queen or not. User cannot go to next queen untill
    // he has moved current queen.
    do {
        // asking for move if no entry is passed then it will again ask for options.
        var option = "";
        do {
            console.log("Choose move for queen\n")
            console.log("1. Change Direction\n2. Move Queen\n3. Exit")
            option = prompt("-> ");

        } while (!"123".includes(option) || !option)

        switch (option) {
            case "1":
                // asking for new direction
                let newDirection = ""
                do {
                    newDirection = prompt("Enter new direction from ->(N, S, E, W, NE, NW, SE, SW): ");
                } while (!["S", "W", "N", "E", "NE", "NW", "SE", "SW"].includes(newDirection) || !newDirection)

                // changing the position of quen as per input
                changeDirection(newDirection);
                console.log(`Queen's current position: ${queenLocation()}\n`);
                // console.log(`-> Changed Queen's direction to "${Coordinates[queen.direction]["fullForm"]} (${queen.direction})" \n`)
                break;
            case "2":
                let steps = NaN;
                do {
                    steps = prompt(`By how many steps you want to move Queen ${whichQueen}: `);
                } while (isNaN(parseInt(steps)))
                jumpMoveForward(steps);
                moved = true;
                break;
            default:
                moved = true;
                exit = true;
                break;
        }
    } while (!moved)
    console.log('*********************************\n')

    whichQueen = whichQueen === 1 ? 2 : 1;
} while (!exit)