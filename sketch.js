rTurn1 = 530;
rTurn2 = 530;
lTurn1 = 530;
lTurn2 = 530;
let ball;
let launcher;
let roof;
let floor;
let insideWall;
let leftWall;
let rightWall;
let goal1;
let goal2;
let leftCircle;
let middleCircle;
let rightCirlce;
let smallCircle;
let leftArmAttachment;
let rightArmAttachment;
let leftArmCircle;
let leftArmLine1;
let leftArmLine2;
let rightArmCircle;
let rightArmLine1;
let rightArmLine2;
let leftLineObstacle;
let rightLineObstacle;
let block;
let button;
let flipper;
let timer = 5;

function setup() {
  createCanvas(400, 600);

  makeFlippers();

  button = new Sprite();

  world.gravity.y = 5;

  //ball
  ball = new Sprite();
  ball.diameter = 20;
  ball.y = 100;
  ball.x = 200;

  //504 337.5

  //laucher
  launcher = new Sprite();
  launcher.collider = "static";
  launcher.x = 338;
  launcher.y = 505;
  launcher.w = 25;
  launcher.h = 3;

  //roof
  roof = new Sprite(
    199.5,
    98,
    [
      42,
      radians(-4200),
      42,
      radians(1000),
      42,
      radians(1000),
      42,
      radians(1000),
      42,
      radians(1000),
      42,
      radians(21000),
      42,
      radians(1000),
      42,
      radians(1000),
      42,
      radians(1000),
      42,
      radians(1000),
    ],
    "static"
  );

  //floor
  floor = new Sprite(200, 550, [300, 0], "static");

  //inside wall
  insideWall = new Sprite(325.5, 380, [340, 90], "static");

  //left wall
  leftWall = new Sprite(50, 358.5, [383, 90], "static");

  //right wall
  rightWall = new Sprite(350, 358.5, [383, 90], "static");

  //goal
  goal1 = new Sprite(
    190,
    145,
    [
      20,
      radians(3565),
      20,
      radians(-1800),
      20,
      radians(-1800),
      20,
      radians(-1800),
      20,
      radians(-1800),
    ],
    "static"
  );
  goal2 = new Sprite(
    190,
    144,
    [
      20,
      radians(3565),
      20,
      radians(-1800),
      20,
      radians(-1800),
      20,
      radians(-1800),
      20,
      radians(-1800),
    ],
    "static"
  );
  goal1.color = "white";

  //cirlce obstacles
  leftCircle = new Sprite(114, 189, 35, "static");
  middleCircle = new Sprite(190, 240, 35, "static");
  rightCircle = new Sprite(266, 189, 35, "static");
  //smallCircle = new Sprite(187.5, 375, 1, 'static');

  //left line to left arm
  leftArmAttachment = new Sprite(80, 480, [73, 33.5], "static");

  //left arm
  //leftArmLine1 = new Sprite(147, 511.5, [60, 38], 'static');
  //leftArmLine1 = new Sprite(147, 488, [60, -28], 'static');
  leftArmCircle = new Sprite(120, 508, 20, "static");

  //right line to right arm
  rightArmAttachment = new Sprite(295, 480, [73, -33.5], "static");

  //right arm
  rightArmCircle = new Sprite(255, 508, 20, "static");

  //line obstacles
  leftLineObstacle = new Sprite(130, 322.5, [59, 48], "static");
  rightLineObstacle = new Sprite(245, 322.5, [59, -48], "static");

  Block();
}

let displayTime = 0;

function draw() {
  background(255);

  if (displayTime > 0) {
    displayTime = displayTime - 1;
    textAlign(CENTER, CENTER);
    textSize(50);
    text("GOAAAAAAAL", width / 2, height / 2);
  } else {
    if (checkForGoal()) {
      displayTime = 60;
      ball.y = 504;
      ball.x = 337;
      return;
    }

    checkKeys();

    //button
    button.collider = "static";
    button.x = 375;
    button.y = 520;
    button.w = 20;
    button.h = 20;
    button.color = "red";
    if (button.mouse.pressing()) {
      let launches = [
        -6.5,
        -7,
        -7.03,
        -7.2,
        -7.4,
        -7.5,
        -8.2,
        -8.3,
        -9,
        -9.5,
        -10,
        -20,
      ];
      launcher.collider = "k";
      launcher.vel.y = random(launches);
    }

    //launcher stop
    if (launcher.y < 330) {
      launcher.y = 505;
      launcher.vel.y = 0;
    }

    //restart
    if (ball.y > 535) {
      ball.y = 503;
      ball.x = 337.5;
    }

    //print(ball.x, ball.y);
  }
}

function checkKeys() {
  if (kb.pressing("ArrowLeft")) {
    flipperL.rotateTo(0, 380, 20, 0);
  } else {
    flipperL.rotateTo(0, 380, 20, 70);
  }

  if (kb.pressing("ArrowRight")) {
    flipperR.rotateTo(0, 380, 20, -70);
  } else {
    flipperR.rotateTo(0, 380, 20, -140);
  }
}

function makeFlippers() {
  //left flipper
  flipperL = new Sprite();
  flipperL.collider = "k";
  flipperL.x = 140;
  flipperL.y = 515;
  flipperL.w = 2;
  flipperL.h = 60;

  //right flipper
  flipperR = new Sprite();
  flipperR.collider = "k";
  flipperR.x = 235;
  flipperR.y = 515;
  flipperR.w = 2;
  flipperR.h = 60;

  //   flipperL = new Sprite();
  //   flipperL.collider = "k";
  //   flipperL.x = 130;
  //   flipperL.y = 380;
  //   flipperL.w = 2;
  //   flipperL.h = 100;

  //   flipperR = new Sprite();
  //   flipperR.collider = "k";
  //   flipperR.x = 270;
  //   flipperR.y = 380;
  //   flipperR.w = 2;
  //   flipperR.h = 100;
}

function Block() {
  //block
  if (ball.x < 330) {
    block = new Sprite(338, 190, [49, -59.5], "static");
  } else {
   return false;
  }
}

function checkForGoal() {
  if (ball.collided(goal2)) {
    return true;
  } else {
    return false;
  }
}
