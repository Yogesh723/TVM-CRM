interface Row {
    team: string;
    employeeName: string;
    taskDetails: string;
    status: string;
    scrumTiming: string;
    morningSession: string;
    middaySession: string;
    afternoonSession: string;
    eveningSession: string;
    nonBillableHrs: string;
    nonBillableStatus: string;
    dailyScore: string;
    comments: string;
    [key: string]: string;
  }