export class MonthReportPost{

    constructor(
      public dateReport: string,
      public rentExpense: number,
      public advertisingExpense: number,
      public utilitiesExpense: number) {}
}
