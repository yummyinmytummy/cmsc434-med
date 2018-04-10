function initPOS(){
  BASE_COLOR = "#cccccc";
  MENU_COLOR = "#939393";
  TEXT_COLOR = "#000000";
  BUTTON_COLOR = "#b7e1ff";
  FOOD_COLOR = "#ffffff";

  //Initial set up area
  var canvas = document.getElementById('canvas');
  canvas.width = 1200;
  canvas.height = 700;

  //The highest level containers
  stage = new createjs.Stage(canvas);
  var servCon = new createjs.Container();
  servCon.name = "Server";
  var chefCon = new createjs.Container();
  chefCon.name = "Chef";

  //Structures to keep track of various things
  topLevelCons = [servCon, chefCon];
  var customCons = [];
  var ticketCount = 0;
  var tickets = [];
  var currentTicket;

  //chefCon.tickets = [];
  currentHash = menuPerLetter;


  //This is the part that makes a new view for each custom element
  stations.forEach(function(ele){
    stat = new createjs.Container();
    stat.name = ele;
    createHeader(stat, stat.name);
    createBottom(stat);
    customCons.push(stat);
  });

  topLevelCons = topLevelCons.concat(customCons);

  var select = document.getElementById('pageSelect');
  topLevelCons.forEach(function(con){
    var opt = document.createElement("option");
    opt.value= con.name;
    opt.innerHTML = con.name;
    select.appendChild(opt);
  });

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
  var servMainCon = new createjs.Container();
  var servCheckCon = new createjs.Container();
  servCheckCon.alpha = 0;
  createBottom(servMainCon);

  //Setup for the serv main
  newCheckContain = new createjs.Container();
  var addButton = new createjs.Shape();
  addButton.graphics.beginFill(BUTTON_COLOR).drawRect(1050, 610, 120, 80);
  var newCheck = new createjs.Text("  New\nCheck", "32px Arial", TEXT_COLOR);
  newCheck.x = 1060;
  newCheck.y = 615;

  newCheckContain.addChild(addButton, newCheck);
  newCheckContain.on("click",function(){
    servMainCon.alpha = 0;
    servCheckCon.alpha = 1;
    currentTicket = [ticketCount,[]];
    tickets.push(currentTicket);
    ticketCount++;
    stage.update();
  })
  servMainCon.addChild(newCheckContain);

  var menuFooter = new createjs.Shape();
  menuFooter.graphics.beginFill(MENU_COLOR).drawRect(0, 600, 1200, 100);


  //Setup for the serv check
  var checkLine = new createjs.Shape();
  checkLine.graphics.beginStroke("black");
  checkLine.graphics.moveTo(600, 50).lineTo(600, 700);

  var checkFooter = new createjs.Shape();
  checkFooter.graphics.beginFill(MENU_COLOR).drawRect(0, 600, 1200, 100);
  checkFooter.graphics.beginFill(MENU_COLOR).drawRect(1050, 0, 150, 700);

  var checkContain = new createjs.Container();
  var checkTicketContainer = new createjs.Container();
  var checkButton = new createjs.Shape();
  checkButton.graphics.beginFill(FOOD_COLOR).drawRect(650, 80, 350, 490);
  var checkText = new createjs.Text("Check", "36px Arial", TEXT_COLOR);
  checkText.x = 780;
  checkText.y = 85;
  checkContain.addChild(checkButton, checkText, checkTicketContainer);


  var menuBaseContain = new createjs.Container();
  var menuContain = new createjs.Container();
  var menuButton = new createjs.Shape();
  menuButton.graphics.beginFill(FOOD_COLOR).drawRect(30, 80, 530, 490);
  var menuText = new createjs.Text("Menu", "36px Arial", TEXT_COLOR);
  menuText.x = 245;
  menuText.y = 85;
  menuContain.addChild(menuText);

  var menuSearchContain = new createjs.Container();
  var searchChildContain = new createjs.Container();
  var searchText = new createjs.Text("", "36px Arial", TEXT_COLOR);
  searchText.x = 265;
  searchText.y = 85;
  menuSearchContain.addChild(searchText, searchChildContain);
  menuSearchContain.alpha = 0;

  menuBaseContain.addChild(menuButton, menuContain, menuSearchContain);

  //Creates the alphabet for the menu
  x1 = 60;
  y1 = 140;
  for (i = 0; i < 23; i++){
    if (x1 > 500){
      y1 += 85;
      x1 = 60;
    }
    letterCon = new createjs.Container();
    var letterButton = new createjs.Shape();
    letterButton.graphics.beginFill(BUTTON_COLOR).drawRect(x1, y1, 75, 75);
    var letter = new createjs.Text(String.fromCharCode(65 + i), "36px Arial", TEXT_COLOR);
    letter.x = x1 + 20;
    letter.y = y1 + 15;
    letterCon.addChild(letterButton, letter);
    letterCon.on("click", callbackClose(i, function(num){
      if (currentHash[String.fromCharCode(97 + num)]){
        menuContain.alpha = 0;
        menuSearchContain.alpha = 1;
        searchText.text = String.fromCharCode(65 + num);
        buildSearch(currentHash[String.fromCharCode(97 + num)], searchChildContain, currentTicket, checkTicketContainer);
        stage.update();
      }
    }));
    menuContain.addChild(letterCon);

    x1 += 100
  }
  //The xyz button
  letterCon = new createjs.Container();
  var letterButton = new createjs.Shape();
  letterButton.graphics.beginFill(BUTTON_COLOR).drawRect(x1, y1, 175, 75);
  var letter = new createjs.Text("X Y Z", "36px Arial", TEXT_COLOR);
  letter.x = x1 + 40;
  letter.y = y1 + 15;
  letterCon.addChild(letterButton, letter);
  menuContain.addChild(letterCon);

  var foodContain = new createjs.Container();
  var foodButton = new createjs.Shape();
  foodButton.graphics.beginFill(BUTTON_COLOR).drawRect(30, 610, 100, 80);
  var foodText = new createjs.Text("Food", "36px Arial", TEXT_COLOR);
  foodText.x = 40;
  foodText.y = 630;
  foodContain.addChild(foodButton, foodText);

  var drinkContain = new createjs.Container();
  var drinkButton = new createjs.Shape();
  drinkButton.graphics.beginFill(BUTTON_COLOR).drawRect(150, 610, 100, 80);
  var drinkText = new createjs.Text("Drink", "36px Arial", TEXT_COLOR);
  drinkText.x = 160;
  drinkText.y = 630;
  drinkContain.addChild(drinkButton, drinkText);

  var backContain = new createjs.Container();
  var backButton = new createjs.Shape();
  backButton.graphics.beginFill(BUTTON_COLOR).drawRect(1065, 50, 120, 80);
  var backText = new createjs.Text("Back", "36px Arial", TEXT_COLOR);
  backText.x = 1085;
  backText.y = 70;
  backContain.addChild(backButton, backText);

  servCheckCon.addChild(checkLine, checkFooter, foodContain, drinkContain,
    menuBaseContain, checkContain, backContain);

  servCon.addChild(servMainCon, servCheckCon);


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
  var name = new createjs.Text(name, "36px Arial", TEXT_COLOR);
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

function buildSearch(letter, container, ticket, ticketContain){
  initX = 60;
  initY = 130;

  letter.forEach(function(element){
    var buttonContain = new createjs.Container();
    var item = new createjs.Shape();
    item.graphics.beginFill(BUTTON_COLOR).drawRect(initX, initY, 460, 40);
    var itemName = new createjs.Text(element, "32px Arial", TEXT_COLOR);
    itemName.x = initX + 10;
    itemName.y = initY;
    buttonContain.addChild(item, itemName);
    buttonContain.name = element;
    buttonContain.on("click", function(){
      ticket[1].push([buttonContain.name, [], []]);
      redrawTicket(ticket, ticketContain);
    });
    initY += 50;
    container.addChild(buttonContain);
  });
}

function redrawTicket(currentTicket, ticketContainer){
  var x1 = 670;
  var y1 = 140;
  ticketContainer.removeAllChildren();
  total = 0;
  currentTicket[1].forEach(function(entree){
      var entreeName = new createjs.Text(entree[0], "20px Arial", TEXT_COLOR);
      entreeName.x = x1;
      entreeName.y = y1;
      var priceName = new createjs.Text(prices[entree[0]], "20px Arial", TEXT_COLOR);
      priceName.x = x1 + 230;
      priceName.y = y1;
      ticketContainer.addChild(entreeName, priceName);
      total += prices[entree[0]];

      entree[1].forEach(function(add){
        var addName = new createjs.Text("+ " + add, "16px Arial", TEXT_COLOR);
        addName.x = x1 + 20;
        addName.y = y1;
        ticketContainer.addChild(addName);
        y1 += 30;

      });

      entree[2].forEach(function(remove){
        var removeName = new createjs.Text("- " + remove, "16px Arial", TEXT_COLOR);
        removeName.x = x1 + 20;
        removeName.y = y1;
        ticketContainer.addChild(removeName);
        y1 += 30;

      });

      y1 += 30;
  });
  var totalName = new createjs.Text("Total: " + total.toFixed(2), "20px Arial", TEXT_COLOR);
  totalName.x = x1 + 200;
  totalName.y = y1;
  ticketContainer.addChild(totalName);
  stage.update();
}

function drawTickets(con, ticket, stage){
  //Make a container for the entire ticket.
  ticketCon = new createjs.Container();


  con.addChild();
  stage.update();
}

function drawCookTicket(){

}

function Ticket(num, items){
  this.num = num;
  this.item = items;
}

function callbackClose(i, callback){
   return function(){
      return callback(i);
    }
}

function changePage(){
  var select = document.getElementById("pageSelect");
  var selectedValue = select.options[select.selectedIndex].value;
  topLevelCons.forEach(function(con){
    if (con.name == selectedValue){
      con.alpha = 1;
    } else{
      con.alpha = 0;
    }
  });
  stage.update();
}
