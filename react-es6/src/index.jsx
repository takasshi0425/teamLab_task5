import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


axios.get('http://localhost/teamLab_task_Version1/api/users/get')

// thenで成功した場合の処理をかける
.then(response => {
  console.log('status:', response.status); // 200
  console.log('body:', response.data);     // response body.

  // catchでエラー時の挙動を定義する
}).catch(err => {
  console.log('err:', err);
});

const data = { name : 'Test', exp : 'test', price: 100 };
axios.post('http://localhost/teamLab_task_Version1/api/users/', data).then(response => {
    console.log('body:', response.data);  // Yohei Munesada
});
