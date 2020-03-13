function createBeginner() {
   currentLevel = beginner;
    beginner.isSwarmDrop = true;
    beginner.swarmTravel += 5;
    beginner.swarmVelocity -= 150;
    beginner.bulletVelocity += 25;
}

function createIntermediate() {
    currentLevel = intermediate;
    intermediate.isTimeDrop = true;
    intermediate.enemyTravel += 10;
    intermediate.enemyVelocity -= 200;
    intermediate.bulletVelocity += 50;
}

function createAdvance() {
    currentLevel = advance;
    let randNum = Math.floor(Math.random() * 10);
    if (randNum % 2 === 0) {
        advance.isTimeDrop = true;
        advance.enemyTravel += 10;
        advance.enemyVelocity -= 200;

    }
    advance.isSwarmDrop = true;
    advance.swarmTravel += 15;
    advance.swarmVelocity -= 250;
    advance.bulletVelocity += 75;
}


function createExpertise() {
    currentLevel = expertise;
    intermediate.isSwarmDrop = true;
    intermediate.isTimeDrop = true;
    intermediate.swarmTravel += 10;
    intermediate.swarmVelocity -= 500;
    intermediate.enemyTravel += 20;
    intermediate.enemyVelocity -= 300;
    intermediate.bulletVelocity += 100;
}

function createGod() {
    currentLevel = god;
    god.isSwarmDrop = true;
    god.isTimeDrop = true;
    god.swarmTravel += 30;
    god.swarmVelocity -= 1000;
    god.enemyTravel += 30;
    god.enemyVelocity -= 500;
    god.bulletVelocity += 100;
}

