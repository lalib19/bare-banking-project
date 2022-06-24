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
    _id_expense: 'int',
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
    _id_income: 'int',
  },
  primaryKey: '_id_income',
};

export type RegisterType = {
  beneficiary: string;
  amount: string;
  date: string;
  category: string;
  comments: string;
  _id_income?: number;
  _id_expense?: number;
};


export const realm = Realm.open({
  path: 'myrealm',
  schema: [ExpenseSchema, IncomeSchema],
  deleteRealmIfMigrationNeeded: true,
});

