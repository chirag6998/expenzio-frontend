import { DateExpensesMap, ExpenseFromDb } from "../types/types";

export function getDateExpensesMap(expenses: ExpenseFromDb[]): DateExpensesMap {

    const dateExpensesMap: DateExpensesMap = new Map();

    for (let expense of expenses) {
        const newExpense = { tag: expense.tag, amount: expense.amount }
        const existingExpense = dateExpensesMap.get(expense.date);
        if (existingExpense) existingExpense.push(newExpense);
        else dateExpensesMap.set(expense.date, [newExpense]);
    }

    return dateExpensesMap;
}