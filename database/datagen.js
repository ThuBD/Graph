let randomNumb;

let offerCount = 0;
let numbApplied = 30 + Math.ceil(300 * Math.random());
let data = []
for (var i = 0; i < numbApplied; i++) {
  randomNumb =  Math.random();
  data[i] = {};
  data[i].dateApp = faker.date.between('2018-09-01', '2019-01-14');
  data[i].dateHeard = faker.date.future(0.1, data[i].dateApp);
  // Get date difference to give weight to higher chance of higher salary over time
  let a = moment([2018, 8, 1]);
  let b = moment([data[i].dateHeard.getFullYear(), data[i].dateHeard.getMonth(), data[i].dateHeard.getDate()])
  // let b = moment([]);
  let daysSinceFirstApp = b.diff(a, 'days');
  data[i].company = faker.company.companyName();
  if (randomNumb > 0.97) {
    data[i].status = 'accepted';
    let lowerLimit = 55000 + daysSinceFirstApp * 20000 / (daysSinceFirstApp + 50);
    let upperLimit = 105000 + daysSinceFirstApp * 40000 / (daysSinceFirstApp + 50);
    data[i].salary = faker.commerce.price(lowerLimit, upperLimit, 2, "$");
    offerCount++;
  } else {
    data[i].status = 'rejected';
    data[i].salary = null;
  }
}

//