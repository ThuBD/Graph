const getData = (jobs, offerCount) => {
  return [jobs.map((job, index) => {
    if (job.status.substring(1) === 'offer') {
      offerCount++;
    };
    return {
      dateApp : job.date_applied.substring(1),
      dateHeard : job.date_heard.substring(1),
      company : job.company_name.substring(1),
      status : job.status.substring(1),
      salary : job.offered_salary.substring(1),
      expectedSalary : job.expected_salary.substring(1)
    };
  }), offerCount];
};

const getDerivative = (eachApp) => {
  let current = 0;
  let count = 0;
  let output1 = [];
  let output2 = [];
  eachApp.forEach((element, index) => {
    if (current === element) {
      count++;
    } else if (element - current === 1) {
      output1.push(count);
      count = 1;
      current = element;
    } else {
      output1.push(0);
      current = element;
    }
  });
  output1.push(count);
  let n;
  for (let i = 0; i < output1.length; i++) {
    n = 6;
    while (i - n < 0) {
      n--;
    }
    // console.log(output1.slice(i - n, i + 1))
    output2.push(output1.slice(i - n, i + 1).reduce((accum, elem) => {
      return (accum + elem)
    }));
  };
  n = 6;
  let last = output1.length;
  while (last - n < last) {
    output2.push(output1.slice(last - n, last).reduce((accum, elem) => {
      return (accum + elem)
    }));
    // console.log(output1.slice(last - n, last));
    n--;
  };
  return [output2, output1];
  // return derivatives
};

module.exports = {
  getData: getData,
  getDerivative: getDerivative
};