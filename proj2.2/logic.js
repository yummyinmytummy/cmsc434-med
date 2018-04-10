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
  addButton.graphics.beginFill(BUTTON_COLOR).drawRect(1065, 610, 120, 80);
  var newCheck = new createjs.Text("  New\nCheck", "32px Arial", TEXT_COLOR);
  newCheck.x = 1075;
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
        buildSearch(String.fromCharCode(65 + num),currentHash[String.fromCharCode(97 + num)],menuSearchContain, currentTicket, checkTicketContainer);
        //Add forward, back and actual back buttons.
        var backButton = new createjs.Shape();
        backButton.graphics.beginFill(BUTTON_COLOR).drawRect(60, 520, 40, 40);

        var backTri = new createjs.Shape();
        backTri.graphics.beginStroke("black");
        backTri.graphics.beginFill("black");
        backTri.graphics.moveTo(64, 540).lineTo(96, 524).lineTo(96, 556).lineTo(64, 540);

        //Drawing the forward button
        var forButton = new createjs.Shape();
        forButton.graphics.beginFill(BUTTON_COLOR).drawRect(485, 520, 40, 40);

        var forTri = new createjs.Shape();
        forTri.graphics.beginStroke("black");
        forTri.graphics.beginFill("black");
        forTri.graphics.moveTo(521, 540).lineTo(489, 556).lineTo(489, 524).lineTo(521, 540);

        var backContain = new createjs.Container();
        var back = new createjs.Shape();
        back.graphics.beginFill(BUTTON_COLOR).drawRect(110, 520, 365, 40);
        var backText = new createjs.Text("Back", "32px Arial", TEXT_COLOR);
        backText.x = 250;
        backText.y = 523;
        backContain.addChild(back, backText);
        backContain.on("click", function(){
          menuSearchContain.alpha = 0;
          menuContain.alpha = 1;
          stage.update();
        });

        menuSearchContain.addChild(backButton, backTri, forButton, forTri, backContain);

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

  var modsContain = new createjs.Container();
  var modsButton = new createjs.Shape();
  modsButton.graphics.beginFill(BUTTON_COLOR).drawRect(610, 610, 120, 80);
  var modsText = new createjs.Text("Mods", "36px Arial", TEXT_COLOR);
  modsText.x = 625;
  modsText.y = 630;
  modsContain.addChild(modsButton, modsText);

  var repContain = new createjs.Container();
  var repButton = new createjs.Shape();
  repButton.graphics.beginFill(BUTTON_COLOR).drawRect(750, 610, 120, 80);
  var repText = new createjs.Text("Repeat", "36px Arial", TEXT_COLOR);
  repText.x = 750;
  repText.y = 630;
  repContain.addChild(repButton, repText);

  var sendContain = new createjs.Container();
  var sendButton = new createjs.Shape();
  sendButton.graphics.beginFill(BUTTON_COLOR).drawRect(1065, 610, 120, 80);
  var sendText = new createjs.Text("SEND", "36px Arial", TEXT_COLOR);
  sendText.x = 1075;
  sendText.y = 630;
  sendContain.addChild(sendButton, sendText);

  var voidContain = new createjs.Container();
  var voidButton = new createjs.Shape();
  voidButton.graphics.beginFill(BUTTON_COLOR).drawRect(1065, 250, 120, 80);
  var voidText = new createjs.Text("Void", "36px Arial", TEXT_COLOR);
  voidText.x = 1085;
  voidText.y = 270;
  voidContain.on("click", function(){
    currentTicket[1].pop();
    redrawTicket(currentTicket, checkTicketContainer);
  });
  voidContain.addChild(voidButton, voidText);


  var clearContain = new createjs.Container();
  var clearButton = new createjs.Shape();
  clearButton.graphics.beginFill(BUTTON_COLOR).drawRect(1065, 340, 120, 80);
  var clearText = new createjs.Text("Clear", "36px Arial", TEXT_COLOR);
  clearText.x = 1070;
  clearText.y = 360;
  clearContain.on("click", function(){
    currentTicket[1] = [];
    redrawTicket(currentTicket, checkTicketContainer);
  });
  clearContain.addChild(clearButton, clearText);

  var cancelContain = new createjs.Container();
  var cancelButton = new createjs.Shape();
  cancelButton.graphics.beginFill(BUTTON_COLOR).drawRect(1065, 430, 120, 80);
  var cancelText = new createjs.Text("Cancel", "36px Arial", TEXT_COLOR);
  cancelText.x = 1070;
  cancelText.y = 450;
  cancelContain.addChild(cancelButton, cancelText);

  var payContain = new createjs.Container();
  var payButton = new createjs.Shape();
  payButton.graphics.beginFill(BUTTON_COLOR).drawRect(1065, 520, 120, 80);
  var payText = new createjs.Text("Pay", "36px Arial", TEXT_COLOR);
  payText.x = 1095;
  payText.y = 540;
  payContain.addChild(payButton, payText);

  var backContain = new createjs.Container();
  var backButton = new createjs.Shape();
  backButton.graphics.beginFill(BUTTON_COLOR).drawRect(1065, 50, 120, 80);
  var backText = new createjs.Text("Back", "36px Arial", TEXT_COLOR);
  backText.x = 1085;
  backText.y = 70;
  backContain.addChild(backButton, backText);

  servCheckCon.addChild(checkLine, checkFooter, foodContain, drinkContain,
    menuBaseContain, checkContain, backContain, sendContain, modsContain,
    repContain, payContain, cancelContain, clearContain, voidContain);

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

function buildSearch(character,letter, container, ticket, ticketContain){
  container.removeAllChildren();
  var searchText = new createjs.Text(character, "36px Arial", TEXT_COLOR);
  searchText.x = 265;
  searchText.y = 85;

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
  container.addChild(searchText);
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
