const ing = {lettuce:"Lettuce",patty:"Patty", dressing:"Dressing", bun:"Bun", cheese:"Cheese",
bacon:"Bacon", onion:"Onion", carrot:"Carrot", pepper:"Pepper", chicken:"Chicken",
milk:"Milk", pork:"Pork", tomato:"Tomato", pasta:"Pasta"};

const mealDef = {burger:"Burger", fettuccine:"Fettuccine Alfredo", balasmic:"Balsamic Salad"};

const menuPerLetter = {"b":[mealDef.balasmic, mealDef.burger], "f":[mealDef.fettuccine]};

const ingPerLetter = {"b":[ing.bacon, ing.bun],"c":[ing.cheese, ing.chicken], "d":[ing.dressing],
    "l":[ing.lettuce], "m":[ing.milk],"o":[ing.onion],
    "p":[ing.pasta,ing.patty,ing.pepper, ing.pork], "t":[ing.tomato]};


const menuDef = { "Balsamic Salad":[[ing.lettuce,ing.dressing],false, 5],
            "Burger": [[ing.bun, ing.cheese, ing.patty, ing.lettuce, ing.tomato], true, 15],
              "Fettuccine Alfredo": [[ing.milk, ing.cheese, ing.chicken, ing.pasta], false, 8]}

const stations = ["Grill", "Salad", "You", "Can", "Add", "Whatever"];

const prices = {"Balsamic Salad":7.95,
                "Burger": 11.95,
                "Fettuccine Alfredo": 10.59};
const mealStations = {"Burger":["Grill"], "Balsamic Salad":["Salad"], "Fettuccine Alfredo":["Grill", "Salad"]};
