import {View, Text} from 'react-native';
import React from 'react';
import Realm from 'realm';

export const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'int',
    name: 'string',
    status: 'string?',
  },
  primaryKey: '_id',
};

const realm = async () => {
  await Realm.open({
    path: 'myrealm',
    schema: [TaskSchema],
  });
};
