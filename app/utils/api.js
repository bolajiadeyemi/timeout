import {filter, flatten, uniq, isArray, includes, each, isEqual, difference } from 'lodash';
const venues = [
    {
        "name": "El Cantina",
        "food": ["Mexican"],
        "drinks": ["Soft drinks", "Tequila", "Beer"]
    },
    {
        "name": "Twin Dynasty",
        "food": ["Chinese"],
        "drinks": ["Soft Drinks", "Rum", "Beer", "Whisky", "Cider"]
    },
    {
        "name": "Spice of life",
        "food": ["Eggs", "Meat", "Fish", "Pasta", "Dairy"],
        "drinks": ["Vokda", "Gin", "whisky", "Rum", "Cider", "Beer", "Soft drinks"]
    },
    {
        "name": "The Cambridge",
        "food": ["Eggs", "Meat", "Fish", "Pasta", "Dairy"],
        "drinks": ["Vokda", "Gin", "Cider", "Beer", "Soft drinks"]
    },
    {
        "name": "Wagamama",
        "food": ["Japanese"],
        "drinks": ["Beer", "Cider", "Soft Drinks", "Sake"]
    },
    {
        "name": "Sultan Sofrasi",
        "food": ["Meat", "Bread", "Fish"],
        "drinks": ["Beer", "Cider", "Soft Drinks"]
    },
    {
        "name": "Spirit House",
        "food": ["Nuts", "Cheese", "Fruit"],
        "drinks": ["Vodka", "Gin", "Rum", "Tequila"]
    },
    {
        "name": "Tally Joe",
        "food": ["Fish", "Meat", "Salad", "Deserts"],
        "drinks": ["Beer", "Cider", "Soft Drinks", "Sake"]
    },
    {
        "name": "Fabrique",
        "food": ["Bread", "Cheese", "Deli"],
        "drinks": ["Soft Drinks", "Tea", "Coffee"]
    },
];

const users = [
    {
        "name": "John Davis",
        "wont_eat": ["Fish"],
        "drinks": ["Cider", "Rum", "Soft drinks"]
    },
    {
        "name": "Gary Jones",
        "wont_eat": ["Eggs", "Pasta"],
        "drinks": ["Tequila", "Soft drinks", "beer", "Coffee"]
    },
    {
        "name": "Robert Webb",
        "wont_eat": ["Bread", "Pasta"],
        "drinks": ["Vokda", "Gin", "Whisky", "Rum"]
    },
    {
        "name": "Gavin Coulson",
        "wont_eat": [],
        "drinks": ["Cider", "Beer", "Rum", "Soft drinks"]
    },
    {
        "name": "Alan Allen",
        "wont_eat": ["Meat", "Fish"],
        "drinks": ["Soft drinks", "Tea"]
    },
    {
        "name": "Bobby Robson",
        "wont_eat": ["Mexican"],
        "drinks": ["Vokda", "Gin", "whisky", "Rum", "Cider", "Beer", "Soft drinks"]
    },
    {
        "name": "David Lang",
        "wont_eat": ["Chinese"],
        "drinks": ["Beer", "cider", "Rum"]
    }
];


function getVenues(members) {
   let goodForDrinks = [];
   const safePlaces = [];

    members.forEach((member) => {
        each(member.drinks, (drink) => {
            goodForDrinks.push(venues.filter((venue) => includes(venue.drinks, drink)));
        });
    });
    goodForDrinks = uniq(flatten(goodForDrinks));

    members.forEach((member) => {
        each(member.wont_eat, (wontEat) => {
            safePlaces.push(goodForDrinks.filter((place) => {
                return !isEqual(place.food, wontEat) || place.food.length > wontEat.length;
            }))
        });
    });

    return uniq(flatten(safePlaces));
};

function getMembersCompleteInfo(members) {
    let membersArray = [];
    let goingMembers = members.split(',');

    goingMembers.forEach((member) => {
        membersArray.push(users.filter((user) => user.name === member.trim()))
    });

    return flatten(membersArray);
}

export function fetchSafePlaces(goingMembers) {
    const members = getMembersCompleteInfo(goingMembers);
    const safePlaces = getVenues(members);
    const unsafePlaces =  difference(venues, safePlaces);

    return {
        safePlaces,
        unsafePlaces
    };
}

