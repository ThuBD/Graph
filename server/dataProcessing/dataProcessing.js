const getData = (jobs) => {
  return jobs.map((job, index) => {
    return {
      dateApp : job.date_applied.substring(1),
      dateHeard : job.date_heard.substring(1),
      company : job.company_name.substring(1),
      status : job.status.substring(1),
      salary : job.offered_salary.substring(1),
    };
  });
};

module.exports = {
  getData: getData
};