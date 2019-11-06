const express = require("express");
const app = express();

const fetch = require('node-fetch');

app.use(express.urlencoded({ extended: true }));
// app.use(flash());
app.use(express.json());
app.use(express.static(__dirname + '/public/dist/public')); /////COMMENT OUT IF TESTING VIA POSTMAN
// app.use(bodyParser.urlencoded({useNewUrlParser: true}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task_db', { useNewUrlParser: true });

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  complete: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

const PokemonSchema = new mongoose.Schema({
  base_experience: Number,
  abilities: Array,
  forms: Array,
  height: Number,
  location_area_encounters: String
})

const Task = mongoose.model("Task", TaskSchema);
const Pokemon = mongoose.model("Pokemon", PokemonSchema)


// require('./server/config/routes.js')(app);

// app.get('/', (req,res)=>{
//   res.render('index');
// })

app.get('/tasks', (req, res) => {
  Task.find()
    .then((allTasks) => {
      res.json(allTasks);
    })
})

app.get('/bulbasaur', (req, res) => {
  let bulb = fetch('https://pokeapi.co/api/v2/pokemon/1/')
    .then(data => {
      data.json()
    })
    .then((json) => {
      console.log('json', json);
    })

  console.log(bulb);
  console.log('aa');
})

app.get('/tasks/:id', (req, res) => {
  Task.find({ _id: req.params.id })
    .then((grabbed) => {
      res.json(grabbed[0]);
    })
})

app.post('/tasks', (req, res) => {
  console.log('the req.body coming from the post __________', req.body)
  const testing = new Task(req.body);
  testing.save()
    // let newTask = new Task();
    // newTask.title = req.body.title;
    // Task.create(req.body)
    .then(data => {
      console.log('yeah!')
      res.json(data);
    })
    .catch(err => res.json(err))
})

app.put('/tasks/:id', (req, res) => {
  Task.update({ _id: req.params.id }, req.body)
    .then((results) => {
      res.json({ success: true });
    })
    .catch(() => {
      res.json({ success: false });
    })
})

app.delete('/deleteone/:id', (req, res) => {
  Task.deleteOne({ _id: req.params.id })
    .then((results) => {
      res.json({ success: true });
    })
    .catch(() => {
      res.json({ success: false });
    })
})

app.delete('/deleteall', (req, res) => {
  Task.deleteMany({})
    .then((returnStuff) => {
      console.log(returnStuff);
      res.redirect('/tasks')
    })
})

// app.post('/tasks/:id', (req, res)=>{
//   Task.update({_id : req.params.id}, {
//     title : req.body.title,
//     description : req.body.description,
//     complete : req.body.complete
//   })
//   .then(()=>{
//     res.redirect(`/tasks/${req.params.id}`);
//   })
//   .catch(err => res.json(err);
// })

// app.get('/delete/:id', (req, res)=>{
//   Task.deleteOne({_id : req.params.id})
//   .then(()=>{
//     res.redirect('/tasks');
//   })
// })

app.listen(8000, () => {
  console.log('listening on the port 8000');
})