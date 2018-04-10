function initPOS(){
  BASE_COLOR = "#cccccc";
  MENU_COLOR = "#939393";
  TEXT_COLOR = "#000000";
  BUTTON_COLOR = "#b7e1ff";

  //Initial set up area
  var canvas = document.getElementById('canvas');
  canvas.width = 1200;
  canvas.height = 700;

  //The highest level containers
  var stage = new createjs.Stage(canvas);
  var servCon = new createjs.Container();
  var chefCon = new createjs.Container();

  //Structures to keep track of various things
  var topLevelCons = [servCon, chefCon];
  var customCons = [];
  chefCon.tickets = [];

  //This is the part that makes a new view for each custom element
  stations.forEach(function(ele){
    stat = new createjs.Container();
    stat.name = ele;
    createHeader(stat, stat.name);
    createBottom(stat);
    customCons.push(stat);
  });

  topLevelCons = topLevelCons.concat(customCons);

  var background = new createjs.Shape();
  background.graphics.beginFill(BASE_COLOR).drawRect(0, 0, 1200, 700);
  stage.addChild(background);
  topLevelCons.forEach(function(child){
    child.alpha = 0;
    stage.addChild(child);
  })

  //Server view is the inital display
  servCon.alpha = 1;

  //Initial setup of server display
  createHeader(servCon, "Server");



  //Initial setup of chef display
  createHeader(chefCon, "Chef");
  createBottom(chefCon);

  var stationLine = new createjs.Shape();
  stationLine.graphics.beginStroke("black");
  stationLine.graphics.moveTo(1000, 0).lineTo(1000, 600).lineTo(1200, 600);

  var stationText = new createjs.Text("Stations", "32px Arial", TEXT_COLOR);
  stationText.x = 1040;
  stationText.y = 8;

  var initY = 70;
  //Add button for each custom station
  customCons.forEach(function(element){
    buttonContain = new createjs.Container();
    var statButton = new createjs.Shape();
    statButton.graphics.beginFill(BUTTON_COLOR).drawRect(1025, initY, 150, 50);
    statText = new createjs.Text(element.name, "32px Arial", TEXT_COLOR);
    statText.x = 1030;
    statText.y = initY + 10;
    initY += 70;
    buttonContain.addChild(statButton, statText);
    buttonContain.on("click", function(){
      topLevelCons.forEach(function(ele){
        ele.alpha = 0;
      })
      element.alpha = 1;
      stage.update();
      //Need to make back button AND disable the chef fiddling with the menu items?
    })
    //buttonContain.on("click", goToContainer(stage, ele, topLevelCons));
    chefCon.addChild(buttonContain);
  });

  chefCon.addChild(stationLine, stationText);

  stage.update();
}

//Helper Methods
function createHeader(contain, name){
  var titleHeader = new createjs.Shape();
  titleHeader.graphics.beginFill(MENU_COLOR).drawRect(0, 0, 1200, 50);
  var name = new createjs.Text(name, "32px Arial", TEXT_COLOR);
  name.x = 30;
  name.y = 8;
  contain.addChild(titleHeader, name);
}

function createBottom(contain){
  var menuFooter = new createjs.Shape();
  menuFooter.graphics.beginFill(MENU_COLOR).drawRect(0, 600, 1200, 100);

  //Drawing the back button
  var backButton = new createjs.Shape();
  backButton.graphics.beginFill(BUTTON_COLOR).drawRect(30, 610, 100, 80);

  var backTri = new createjs.Shape();
  backTri.graphics.beginStroke("black");
  backTri.graphics.beginFill("black");
  backTri.graphics.moveTo(35, 650).lineTo(120, 615).lineTo(120, 685).lineTo(35, 650);

  //Drawing the forward button
  var forButton = new createjs.Shape();
  forButton.graphics.beginFill(BUTTON_COLOR).drawRect(150, 610, 100, 80);

  var forTri = new createjs.Shape();
  forTri.graphics.beginStroke("black");
  forTri.graphics.beginFill("black");
  forTri.graphics.moveTo(245, 650).lineTo(160, 615).lineTo(160, 685).lineTo(245, 650);

  var pastButton = new createjs.Shape();
  pastButton.graphics.beginFill(BUTTON_COLOR).drawRect(400, 610, 120, 80);
  var past = new createjs.Text("  Past\nOrders", "32px Arial", TEXT_COLOR);
  past.x = 410;
  past.y = 615;


  contain.addChild(menuFooter, backButton, forButton, backTri, forTri, pastButton, past);

}

function drawTickets(con, ticket, stage){
  //Make a container for the entire ticket.
  ticketCon = new createjs.Container();


  con.addChild();
  stage.refresh();
}

function drawCookTicket(){

}

function Ticket(num, items){
  this.num = num;
  this.item = items;
}
