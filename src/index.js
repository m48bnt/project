import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

let pc = {};

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World'
  });
});

// var livereload = require('livereload');
// var server = livereload.createServer();
// server.watch(__dirname);

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

app.get('/task3A*', (req, res) => {
  let result = pc;
  let i = 0;
  const path = req.originalUrl;
  let pathList = path.split('/');
  pathList.splice(0,2);
  let array = [];

  for (var j = 0; j < pathList.length; j++) {

    if ( pathList[j] !== '' ) {

      array.push(pathList[j]);

    }

  }

  pathList = array;

  console.log(pathList);

  // console.log(pc.length);
  const reqursive = function (obj) {
    // console.log(obj);
    if (pathList.length > i && pathList[0] !== '') {
      for (var key in obj) {
        if (pathList.indexOf(key) !== -1) {
          result = obj[key];
          i++;
          reqursive(obj[key]);
          break
        }
      }
    } else {
      result = obj;
      i++;
    }
  };

  if (pathList.indexOf('volumes') !== -1) {
    pathList.splice(0,1);
    pathList.push('hdd');
    reqursive(pc);

    const volumes_names = [];
    const volumes_total = {};

    for (let i = 0; i < result.length; i++) {
      if (volumes_names.indexOf(result[i].volume) < 0) volumes_names.push(result[i].volume);
    }

    for (let j = 0; j < volumes_names.length; j++) {
      const volumes_sizes = [];

      for (let k = 0; k < result.length; k++) {
        if (volumes_names[j] === result[k].volume) volumes_sizes.push(result[k].size);
      }

      volumes_total[volumes_names[j]] = volumes_sizes.reduce((a, b) => a + b) + 'B';
    }

    result = volumes_total;


  } else if (pathList) {
    reqursive(pc);
    // for (var key in pc) {
    //   if (pathList.indexOf(key) !== -1) {
    //     result = pc[key];
    //   }
    // } else {
    //
    // }
  }
  if (pathList.length > i) {
    res.status(404).send('Not Found');
  } else {
    res.json(result);
  }
});

app.listen(3000, () => {
  const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

  fetch(pcUrl).then(async (res) => {
    pc = await res.json();
    return '123'
  }).catch(err => {
    console.log('Чтото пошло не так:', err);
  });
  console.log('Your app listening on port 3000!');
});
