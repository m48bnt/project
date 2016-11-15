import express from 'express';
import cors from 'cors';
//import mongoose from 'mongoose';
import fetch from 'isomorphic-fetch';
//import Promise from 'bluebird';

//mongoose.Promise = Promise;
//mongoose.connect('mongodb://publicdb.mgbeta.ru/agurin_skb3');
//const Cat = mongoose.model('Cat', {
//  name: String
//});


//fetch.Promise = Promise;

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};

fetch(pcUrl).then(async (res) => {
  pc = await res.json();
  return '123'
}).catch(err => {
  console.log('Чтото пошло не так:', err);
});

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World'
  });
});

app.get('/task2A', (req, res) => {

  const sum = (+req.query.a || 0) + (+req.query.b || 0);
	res.send(sum.toString());

});

app.get('/task2B', (req, res) => {

  var checkString = function (string) {
    return string.toLowerCase().replace(/ +/g, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
  };

  var fullName = req.query.fullname ? checkString(req.query.fullname).split(' ') : [];

  var invalidFullName = 'Invalid fullname';

  var result;

  var checkWord = function (string) {
    return string.match( /[0-9_\/]/) === null;
  };

  var firstLetterToUpper = function (string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  };


  if (fullName.length === 3) {
    if (checkWord(fullName[2]) && checkWord(fullName[0]) && checkWord(fullName[1])) {
      result = firstLetterToUpper(fullName[2]) + ' ' + firstLetterToUpper(fullName[0].substr(0, 1)) + '. ' + firstLetterToUpper(fullName[1].substr(0, 1)) + '.';
    } else {
      result = invalidFullName;
    }
  } else if (fullName.length === 2) {
    if (checkWord(fullName[1]) && checkWord(fullName[0])) {
      result = firstLetterToUpper(fullName[1]) + ' ' + firstLetterToUpper(fullName[0].substr(0, 1)) + '.';
    } else {
      result = invalidFullName;
    }
  } else if (fullName.length === 1) {
    if (checkWord(fullName[0])) {
      result = firstLetterToUpper(fullName[0]);
    } else {
      result = invalidFullName;
    }
  } else {
    result = invalidFullName;
  }

  res.send(result);
});

app.get('/task3A', (req, res) => {
  //fetch(pcUrl).then(async (res) => {
  //  pc = await res.json();
  //  return '123'
  //}).catch(err => {
  //  console.log('Чтото пошло не так:', err);
  //});

  res.send("task3A");

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
