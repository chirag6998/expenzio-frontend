import { AlertProps, ButtonProps } from "antd"
import { SizeType } from "antd/es/config-provider/SizeContext"
import { ReactNode } from "react"
import { Dayjs } from 'dayjs';

export interface ButtonParams extends ButtonProps {
    children: React.ReactNode,
    type: "link" | "text" | "default" | "primary" | "dashed" | undefined,
    size: SizeType,
    htmlType?: "button" | "submit" | "reset" | undefined
}

export type InputParams = {
    placeholder: string,
    width: string,
    type: string,
    value: string | number,
    onChange: Function,
    id: string,
    name: string,
    onBlur?: any
}

export type DropDownParams = {
    options: string[],
    onChange: Function
}

export type Tag = {
    name: string,
    frequency: "DAILY" | "MONTHLY"
}

export type ExpenseFromDb = {
    tag: string,
    amount: number,
    date: string,
    userId: string,
    _id: string
}

export type TagAndAmount = { tag: string, amount: number }

export type DateExpensesMap = Map<string, { tag: string, amount: number }[]>

export type State = {
    setup: {
        budget: number,
        tags: Tag[],
        dailyPendingTags: string[],
        monthlyPendingTags: string[]
    },
    user: {
        token: string
    },
    expenses: {
        totalAmount: number,
        expenses: ExpenseFromDb[]
    }
}

export type ExpenseParams = {
    name: string,
    saveExpense: Function
}

export type SwitchParams = {
    onChange: (checked: boolean) => void
}

export type User = {
    userName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type UpdateBudgetAPI = {
    amount: number,
    token: string
}

export type AddTagsAPI = {
    token: string,
    tags: Tag[]
}

export type AlertComponentParams = {
    message: string,
    type: AlertProps["type"]
}

export type ProtectedRouteParams = {
    children: ReactNode
}

export type FetchTagsAPI = {
    token: string,
    frequency: "DAILY" | "MONTHLY"
}

export type CreateExpenseAPI = {
    token: string,
    tagName: string,
    amount: number
}

export type FetchExpensesAPI = {
    token: string,
    startDate: string,
    endDate: string,
    tagName?: string
}

export type RangeValue = [Dayjs | null, Dayjs | null] | null;

export type DatePickerParams = {
    dates: RangeValue,
    setDates: Function
}