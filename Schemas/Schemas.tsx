import React from 'react';
import Realm from 'realm';

export const ExpenseSchema = {
  name: 'Expense',
  properties: {
    beneficiary: 'string',
    amount: 'string',
    date: 'string',
    category: 'string',
    comments: 'string',
    _id_expense: 'string',
  },
  primaryKey: '_id_expense',
};

export const IncomeSchema = {
  name: 'Income',
  properties: {
    beneficiary: 'string',
    amount: 'string',
    date: 'string',
    category: 'string',
    comments: 'string',
    _id_income: 'string',
  },
  primaryKey: '_id_income',
};

export type RegisterType = {
  beneficiary: string;
  amount: string;
  date: string;
  category: string;
  comments: string;
  _id_income?: string;
  _id_expense?: string;
};


export const realm = Realm.open({
  path: 'myrealm',
  schema: [ExpenseSchema, IncomeSchema],
  deleteRealmIfMigrationNeeded: true,
});

