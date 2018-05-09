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
  var cookTickets = [];
  var currentTicket;

  //chefCon.tickets = [];
  currentHash = menuPerLetter;


  //This is the part that makes a new v iew for each custom element
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

  //Initial setup of chef display
  createHeader(chefCon, "Chef");
  createBottom(chefCon);

  var stationLine = new createjs.Shape();
  stationLine.graphics.beginStroke("black");
  stationLine.graphics.moveTo(1000, 0).lineTo(1000, 700);

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

  var invContain = new createjs.Container();
  var invButton = new createjs.Shape();
  invButton.graphics.beginFill(BUTTON_COLOR).drawRect(1020, 610, 160, 80);
  var invText = new createjs.Text("Inventory", "36px Arial", TEXT_COLOR);
  invText.x = 1025;
  invText.y = 630;
  invContain.addChild(invButton, invText);

  chefCon.addChild(stationLine, stationText, invContain);





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
  var checkText = new createjs.Text("Check #" + (ticketCount + 1), "36px Arial", TEXT_COLOR);
  checkText.x = 760;
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
    if (String.fromCharCode(97 + i) in menuPerLetter){
      letterButton.graphics.beginFill(BUTTON_COLOR).drawRect(x1, y1, 75, 75);
    } else{
      letterButton.graphics.beginFill(BASE_COLOR).drawRect(x1, y1, 75, 75);
    }

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
  letterButton.graphics.beginFill(BASE_COLOR).drawRect(x1, y1, 175, 75);
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
  modsContain.on("click", function(){
    var sendConfirm = new createjs.Shape();
    sendConfirm.graphics.beginFill(MENU_COLOR).drawRect(300, 200, 570, 170);
    var sendLabel = new createjs.Text("Modifications", "36px Arial", TEXT_COLOR);
    sendLabel.x = 480;
    sendLabel.y = 210;

    var yesButton = new createjs.Shape();
    yesButton.graphics.beginFill(BUTTON_COLOR).drawRect(315, 270, 130, 70);
    var yesText = new createjs.Text("Add", "36px Arial", TEXT_COLOR);
    yesText.x = 345;
    yesText.y = 285;

    var noButton = new createjs.Shape();
    noButton.graphics.beginFill(BUTTON_COLOR).drawRect(455, 270, 130, 70);
    var noText = new createjs.Text("No", "36px Arial", TEXT_COLOR);
    noText.x = 495;
    noText.y = 285;

    var subButton = new createjs.Shape();
    subButton.graphics.beginFill(BUTTON_COLOR).drawRect(595, 270, 120, 70);
    var subText = new createjs.Text("Sub", "36px Arial", TEXT_COLOR);
    subText.x = 625;
    subText.y = 285;

    var sideButton = new createjs.Shape();
    sideButton.graphics.beginFill(BUTTON_COLOR).drawRect(725, 270, 130, 70);
    var sideText = new createjs.Text("On Side", "36px Arial", TEXT_COLOR);
    sideText.x = 725;
    sideText.y = 285;

    sendContain.addChild(sendConfirm, sendLabel, yesButton, yesText, noButton, noText,
      subButton, subText, sideButton, sideText)
    stage.update();
  });

  modsContain.addChild(modsButton, modsText);

  var repContain = new createjs.Container();
  var repButton = new createjs.Shape();
  repButton.graphics.beginFill(BUTTON_COLOR).drawRect(750, 610, 120, 80);
  var repText = new createjs.Text("Repeat", "36px Arial", TEXT_COLOR);
  repText.x = 750;
  repText.y = 630;
  repContain.on("click", function(){
    currItem = currentTicket[1].pop();
    currentTicket[1].push(currItem);
    currentTicket[1].push(currItem);
    redrawTicket(currentTicket, checkTicketContainer);
    stage.update();
  });
  repContain.addChild(repButton, repText);

  var sendContain = new createjs.Container();
  var sendButton = new createjs.Shape();
  sendButton.graphics.beginFill(BUTTON_COLOR).drawRect(1065, 610, 120, 80);
  var sendText = new createjs.Text("SEND", "36px Arial", TEXT_COLOR);
  sendText.x = 1075;
  sendText.y = 630;
  sendContain.on("click", function(){
    //getting start time.

    // var errorConfirm = new createjs.Shape();
    // errorConfirm.graphics.beginFill(MENU_COLOR).drawRect(290, 200, 590, 170);
    // var errorLabel = new createjs.Text("Error: Cannot send an empty check", "36px Arial", TEXT_COLOR);
    // errorLabel.x = 300;
    // errorLabel.y = 210;
    //
    // var okButton = new createjs.Shape();
    // okButton.graphics.beginFill(BUTTON_COLOR).drawRect(510, 270, 150, 70);
    // var okText = new createjs.Text("OK", "36px Arial", TEXT_COLOR);
    // okText.x = 560;
    // okText.y = 285;

    var sendConfirm = new createjs.Shape();
    sendConfirm.graphics.beginFill(MENU_COLOR).drawRect(300, 200, 570, 170);
    var sendLabel = new createjs.Text("Send check #1 to kitchen?", "36px Arial", TEXT_COLOR);
    sendLabel.x = 380;
    sendLabel.y = 210;

    var yesButton = new createjs.Shape();
    yesButton.graphics.beginFill(BUTTON_COLOR).drawRect(400, 270, 150, 70);
    var yesText = new createjs.Text("Yes", "36px Arial", TEXT_COLOR);
    yesText.x = 440;
    yesText.y = 285;

    var noButton = new createjs.Shape();
    noButton.graphics.beginFill(BUTTON_COLOR).drawRect(610, 270, 150, 70);
    var noText = new createjs.Text("No", "36px Arial", TEXT_COLOR);
    noText.x = 660;
    noText.y = 285;

    sendContain.addChild(sendConfirm, sendLabel, yesButton, yesText, noButton, noText)
    stage.update();

    currentTicket.push(new Date().getTime() / 1000);
    cookTickets.push(currentTicket);
    drawChefTickets(cookTickets, chefCon);
    customCons.forEach(function(con){
      drawCookTickets(cookTickets, con);

    });
  });
  sendContain.addChild(sendButton, sendText);

  var voidContain = new createjs.Container();
  var voidButton = new createjs.Shape();
  voidButton.graphics.beginFill("#fceb53").drawRect(1065, 250, 120, 80);
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
  clearButton.graphics.beginFill("#fca453").drawRect(1065, 340, 120, 80);
  var clearText = new createjs.Text("Clear", "36px Arial", TEXT_COLOR);
  clearText.x = 1080;
  clearText.y = 360;
  clearContain.on("click", function(){
    currentTicket[1] = [];
    redrawTicket(currentTicket, checkTicketContainer);
  });
  clearContain.addChild(clearButton, clearText);

  var cancelContain = new createjs.Container();
  var cancelButton = new createjs.Shape();
  cancelButton.graphics.beginFill("#fc5353").drawRect(1065, 430, 120, 80);
  var cancelText = new createjs.Text("Cancel", "36px Arial", TEXT_COLOR);
  cancelText.x = 1070;
  cancelText.y = 450;
  cancelContain.on("click", function(){
    var sendConfirm = new createjs.Shape();
    sendConfirm.graphics.beginFill(MENU_COLOR).drawRect(300, 200, 570, 170);
    var sendLabel = new createjs.Text("Cancel Check #1?", "36px Arial", TEXT_COLOR);
    sendLabel.x = 430;
    sendLabel.y = 210;

    var yesButton = new createjs.Shape();
    yesButton.graphics.beginFill(BUTTON_COLOR).drawRect(400, 270, 150, 70);
    var yesText = new createjs.Text("Yes", "36px Arial", TEXT_COLOR);
    yesText.x = 440;
    yesText.y = 285;

    var noButton = new createjs.Shape();
    noButton.graphics.beginFill(BUTTON_COLOR).drawRect(610, 270, 150, 70);
    var noText = new createjs.Text("No", "36px Arial", TEXT_COLOR);
    noText.x = 660;
    noText.y = 285;

    sendContain.addChild(sendConfirm, sendLabel, yesButton, yesText, noButton, noText)
    stage.update();
  })
  cancelContain.addChild(cancelButton, cancelText);

  var payContain = new createjs.Container();
  var payButton = new createjs.Shape();
  payButton.graphics.beginFill("#8efc53").drawRect(1065, 520, 120, 80);
  var payText = new createjs.Text("Pay", "36px Arial", TEXT_COLOR);
  payText.x = 1095;
  payText.y = 540;
  payContain.addChild(payButton, payText);

  var backContain = new createjs.Container();
  var backButton = new createjs.Shape();
  backButton.graphics.beginFill("#fc5353").drawRect(1065, 50, 120, 80);
  var backText = new createjs.Text("Back", "36px Arial", TEXT_COLOR);
  backText.x = 1085;
  backText.y = 70;
  backContain.on("click", function(){
    servMainCon.alpha = 1;
    servCheckCon.alpha = 0;
    stage.update();
  });
  backContain.addChild(backButton, backText);

  servCheckCon.addChild(checkLine, checkFooter, foodContain, drinkContain,
    menuBaseContain, checkContain, backContain, sendContain, modsContain,
    repContain, payContain, cancelContain, clearContain, voidContain);

  servCon.addChild(servMainCon, servCheckCon);

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
      if (menuDef[buttonContain.name][1] == true){
        var doneness = new createjs.Shape();
        doneness.graphics.beginFill(MENU_COLOR).drawRect(300, 200, 570, 170);
        var doneName = new createjs.Text(buttonContain.name + ": How Well Done?", "36px Arial", TEXT_COLOR);
        doneName.x = 400;
        doneName.y = 210;
        var rare = new createjs.Shape();
        rare.graphics.beginFill("#f74242").drawRect(315, 270, 100, 80);
        var rareText = new createjs.Text("Rare", "36px Arial", TEXT_COLOR);
        rareText.x = 325;
        rareText.y = 290;
        var medrare = new createjs.Shape();
        medrare.graphics.beginFill("#f77a41").drawRect(425, 270, 100, 80);
        var medRareText = new createjs.Text("Med.\nRare", "36px Arial", TEXT_COLOR);
        medRareText.x = 435;
        medRareText.y = 273;
        var med = new createjs.Shape();
        med.graphics.beginFill("#f79241").drawRect(535, 270, 100, 80);
        var medText = new createjs.Text("Med.", "36px Arial", TEXT_COLOR);
        medText.x = 545;
        medText.y = 290;
        var medwell = new createjs.Shape();
        medwell.graphics.beginFill("#d87927").drawRect(645, 270, 100, 80);
        var medWellText = new createjs.Text("Med.\nWell", "36px Arial", TEXT_COLOR);
        medWellText.x = 650;
        medWellText.y = 273;
        var well = new createjs.Shape();
        well.graphics.beginFill("#a85208").drawRect(755, 270, 100, 80);
        var wellText = new createjs.Text("Well", "36px Arial", TEXT_COLOR);
        wellText.x = 770;
        wellText.y = 290;

        ticketContain.addChild(doneness, doneName, rare, rareText,
          medrare, medRareText, med, medText, medwell,medWellText, well, wellText)
        stage.update()
      }
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

function drawChefTickets(cookTickets, chefContain){
  ticketBaseContain = new createjs.Container();
  chefContain.addChild(ticketBaseContain);
  x1 = 50;
  y1 = 60;
  cookTickets.forEach(function(ticket){
    var itemContain = new createjs.Container();
    var itemShape = new createjs.Shape();
    itemShape.graphics.beginFill(FOOD_COLOR).drawRect(x1, y1, 240, 200);
    var numText = new createjs.Text("#" + ticket[0], "20px Arial", TEXT_COLOR);
    numText.x = x1 + 210;
    numText.y = y1 + 5;
    itemContain.addChild(itemShape, numText);
    y2 = y1 + 20;
    x2 = x1 + 10;
    ticket[1].forEach(function(item){
      var itemText = new createjs.Text(item[0], "18px Arial", TEXT_COLOR);
      itemText.x = x2 + 5;
      itemText.y = y2 + 5;
      y2 += 30;
      itemContain.addChild(itemText);
    });
    ticketBaseContain.addChild(itemContain);
    x1 += 320;
    if (x1 > 1000){
      x1 = 50;
      y1 += 220;
    }
  });
  stage.update();
}

function drawCookTickets(cookTickets, cookContain){
  //Remove prev ticket contain if it exists
  cookContain.removeChildAt(9);

  ticketBaseContain = new createjs.Container();
  cookContain.addChild(ticketBaseContain);
  x1 = 50;
  y1 = 60;
  cookTickets.forEach(function(ticket){
    var longest = getLongestItem(ticket);
    ticket[1].forEach(function(item){
      if (mealStations[item[0]].includes(cookContain.name)){
        var itemContain = new createjs.Container();
        var itemShape = new createjs.Shape();
        itemShape.graphics.beginFill(FOOD_COLOR).drawRect(x1, y1, 240, 60);
        var itemText = new createjs.Text(item[0], "18px Arial", TEXT_COLOR);
        itemText.x = x1 + 5;
        itemText.y = y1 + 5;
        var numText = new createjs.Text("#" + ticket[0], "20px Arial", TEXT_COLOR);
        numText.x = x1 + 210;
        numText.y = y1 + 5;
        itemContain.addChild(itemShape, itemText, numText);
        y1 += 70;
        if (y1 > 600){
          y1 = 60;
          x1 += 300;
        }
        if (!(ticket[3] + longest - menuDef[item[0]][2] >= new Date().getTime()/1000)){
          createjs.Tween.get(itemContain)
              .wait((ticket[3] + longest - menuDef[item[0]][2] - new Date().getTime()/1000)*1000 )
              .to({alpha:1}, 0);
        }
        ticketBaseContain.addChild(itemContain);

      }

    });
  });
  stage.update();
}

function getLongestItem(ticket){
  longest = 0;
  ticket[1].forEach(function(element){
    if (menuDef[element[0]][2] > longest){
      longest = menuDef[element[0]][2];
    }
  });
  return longest;
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
