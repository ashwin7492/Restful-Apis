const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
// uuidv4(); //to generate unique ids

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {
        id: uuidv4(),
        username: "ashu",
        content: "This is my first post"
    },
    {
        id: uuidv4(),
        username: "ashwin",
        content: "This is my second post"
    },
    {
        id: uuidv4(),
        username: "harsh",
        content: "This is my third post"
    }

];

app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts})
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req,res) => {
    // console.log(req.body); // to check what is coming from the form
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts"); // redirects to the /posts route after form submission
    // res.send("Data received"); 
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let {content} = req.body;
    let post = posts.find((p) => id === p.id);
    post.content = content;
    res.redirect("/posts");
    console.log(post);
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});