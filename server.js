const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // trying to find a free port (Amazon, Digital Ocean etc.), if it is not found, then go to port 5000
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());


const students = [{
    id: 1,
    name:'Asab',
    country:'Finland',
    age:250,
    bio:'A teacher and loves to teach.'
},
{
    id: 2,
    name:'Kunjan',
    country:'Nepal',
    age:250,
    bio:'A web ninja.'
},
{
    id: 3,
    name:'Masood',
    country:'Afghanistan',
    age:250,
    bio:'A react ninja.'
},
{
    id: 4,
    name:'Xurxe',
    country:'Galicia',
    age:250,
    bio:'A ninja of everything.'
},
{
    id: 5,
    name:'André',
    country:'Deutschland',
    age:33,
    bio:'A tramp, a gentleman, a poet, a dreamer, a tramp, a gentleman, a lonely fellow, always hopeful of romance and adventure.'
}]

app.get('/', (req,res) => res.send('Hello, Express!'));
app.get('/students', (req,res) => {
    res.json(students);
});

app.get('/students/:search', (req, res) => {
    const id = parseInt(req.params.search);
    const name = req.params.search.toLowerCase();
    let found = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id || students[i].name.toLowerCase() === name) {
            res.json(students[i]);
            found = true;
            break;
        }
    }
        res.send('Person not found');
    
});

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let found = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            students.splice(i, 1);
            res.send('A person has been removed.')
            found = true;
            break;
        }
    }
    if (!found) {
        res.send('Person not found');
    }
})

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, country, age, bio} = req.body;
    let found = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            students[i].name = name;
            students[i].country = country;
            students[i].age = age;
            students[i].bio = bio;
            found = true;
            res.send('A person with some id is modified.')
            break;
        }
    }
    if (!found) {
        res.send('Person not found.')
    }
})

app.post('/students', (req, res) => {
    console.log(req.body);
    const id = students.length + 1;
    const newStudent = req.body;
    newStudent.id = id;
    students.push(newStudent);
    res.send('New person added.');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`)
});
