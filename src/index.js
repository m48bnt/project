import express from 'express';
import cors from 'cors';

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

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
