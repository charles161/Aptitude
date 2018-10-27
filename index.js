var express = require('express')
const bodyParser = require('body-parser');
const _ = require('lodash')


const app = express()

const port = 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let books = [
  {
    name:'OOPS',
    id: '1234',
    questions:[
      {
        name:'Select a language which uses OOPS',
        answer:0,
        options:['JAVA','C','Assembly','None of the above']
      },
      {
        name: 'Select a language which does not use OOPS',
        answer: 1,
        options: ['JAVA', 'C', 'C++', 'None of the above']
      }
    ]
  }
]
let scores = [
  {
    email:'varun@gmail.com',
    bookId:'1234',
    score:1
  },
  {
    email:'varun@gmail.com',
    bookId:'3456',
    score :5
  }
]
let users = [
  {
    name: 'Varun Raghu',
    email: 'varun@gmail.com',
    password: '123456789'
  },
  {
    name: 'Maria Charles',
    email: 'charles@gmail.com',
    password: '00000000'
  }
]

app.post('/login',(req,res) => {
  const {email,password} = req.body;
  let i = _.findIndex(users, ['email', email]);
  if(i>=0){
    if(users[i].password == password){
      res.json(users[i])
    }
    else{
      res.json({
  
        'message': 'invalid password'
      })
    }
  }else {
    res.json({

      'message':'login failed'
    })
  }
})

app.post('/register',(req,res) => {
  const {name,email,password} = req.body;
  users.push({
    name,email,password
  })
  res.json({
    'message': 'Registered Successfully'
  })
})

app.post('/createbook',(req,res) => {
  const book = req.body;
  books.push(book);
  res.json({
    'message': 'Book created Successfully'
  })
})

app.get('/getbook/:id/:email',(req,res) => {
  const id = req.params.id; 
  const email = req.params.email
  let i = _.findIndex(books, ['id', id]);
  let j = _.findIndex(scores, { email, 'bookId': id });
  if(i>=0){
    if(j>=0){
      res.json({
        ...books[i],
        score: scores[j].score
      })
    }
    else {
      res.json({
        ...books[i],
        score: 0
      })
    }
  }
  else{
    res.json({
      message:'Book not found'
    })
  }
})

app.post('/submit',(req,res) => {
  const scoreData = req.body;
  let j = _.findIndex(scores, { email: scoreData.email, 'bookId': scoreData.bookId });
  if(j>=0){
    scores[j].score= scoreData.score;
    res.json({
      message:'Submitted'
    })
  }
  else {
    scores.push(scoreData)
    res.json({
      message: 'Submitted'
    })
  }
})

app.listen(port, () => {
  console.log('listening on port 7000')
});

