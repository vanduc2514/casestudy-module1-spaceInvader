function createBeginner() {
    beginner.isSwarmDrop = true;
    beginner.swarmTravel += 5;
    beginner.swarmVelocity -= 150;
    beginner.bulletVelocity += 2;
}

function createIntermediate() {
    intermediate.isTimeDrop = true;
    intermediate.enemyTravel += 10;
    intermediate.enemyVelocity -= 200;
    intermediate.bulletVelocity += 3;
}

function createAdvance() {
    let randNum = Math.floor(Math.random() * 10);
    if (randNum % 2 === 0) {
        advance.isTimeDrop = true;
        advance.enemyTravel += 10;
        advance.enemyVelocity -= 200;

    }
    advance.isSwarmDrop = true;
    advance.swarmTravel += 15;
    advance.swarmVelocity -= 250;
    advance.bulletVelocity += 6;
}


function createExpertise() {
    intermediate.isSwarmDrop = true;
    intermediate.isTimeDrop = true;
    intermediate.swarmTravel += 10;
    intermediate.swarmVelocity -= 500;
    intermediate.enemyTravel += 20;
    intermediate.enemyVelocity -= 300;
    intermediate.bulletVelocity += 10;
}

