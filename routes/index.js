var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { Blog } = require('../DB/Schema/Blog')
dotenv.config()

mongoose.connect(process.env.DB_URL).then(() => console.log("Connected to Database Successfully")).catch((err) => console.log(err))

// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const authenticate = (req, res, next) => {
  const apiKey = req.headers['api-key'] || req.query['api-key']
  if (apiKey===process.env.api_Key) {
    next(); 
  } else {
    return res.status(401).send("You can't access any endpoints without an API key.");
  }
}
router.use('/',authenticate)

router.post('/posts', async (req, res) => {
  try {
    let { title, content, category_id, category } = req.body
    const requiredparams = ['title', 'content', 'category_id', 'category']
    for (const key of requiredparams) {
      if (req.body[key] === undefined) {
        return res.status(400).send(`The ${key} is missing; please include it in the payload`);
      }
    }
    let Post = await Blog.create({ title, content, category, category_id })
    res.status(201).send("New Blog post created successfully")
  }
  catch (error) {
    res.status(500).send(`Internal server error ${error}`)
  }
})

router.get('/posts', async (req, res) => {
  try {
    let post = await Blog.find()
    if (post.length > 0) {
      res.status(200).send(post)
    }
    else {
      return res.status(204).send("No posts")
    }
  }
  catch (error) {
    res.status(500).send(`Internal server error ${error}`)
  }
})

router.get('/posts/:id', async (req, res) => {
  try {
    let { id } = req.params
    let post = await Blog.findById(id)
   
    if(!post){
    res.status(204).send("No posts")
    }
    else{
    res.status(200).send(post)
    }
  }
  catch (error) {
    res.status(500).send(`Internal server error ${error}`)
  }
})


router.put('/posts/:id', async (req, res) => {
  try {
    let { id } = req.params
    let { title, content } = req.body
    const requiredparams = ['title', 'content']

    for (const key of requiredparams) {
      if (req.body[key] === undefined) {
        return res.status(400).send(`The ${key} is missing; please include it in the payload`);
      }
    }

    let post = await Blog.updateOne({ _id: id }, {
      $set: { title, content }
    })
    let UpdatedPost=await Blog.findById(id)
    res.status(200).send(UpdatedPost)

  }
  catch (error) {
    res.status(500).send(`Internal server error ${error}`)
  }
})

router.get('/post/latest', async (req,res) => {
  try {
    const Categories = await Blog.find().distinct('category');
    const findbycategory = async (category) => {
      return Blog.findOne({ category:category }).sort({ created_at: -1 }).exec();
    }
    const latestPosts = await Promise.all(Categories.map(async (category) => {
      const Post = await findbycategory(category);
      return Post;
    })
    )
    res.status(200).send(latestPosts)
  }
  catch (error) {
    res.status(500).send(`Internal server error ${error}`)
  }
})

router.delete('/posts/:id', async (req, res) => {
  try {
    let { id } = req.params
    let post = await Blog.findOne({ _id: id })

    if (id === post?._id.toString()) {
      await Blog.deleteOne({ _id: id })
      res.status(200).send("Blog post deleted successfully")
    }
    else {
      return res.status(400).send('Please enter the correct blog post ID')
    }
  }
  catch (error) {
    res.status(500).send(`Internal server error ${error}`)
  }
})

module.exports = router;
