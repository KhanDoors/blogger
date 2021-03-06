const BlogPost = require("../models/BlogPost");
const slugify = require("slugify");

exports.create = (req, res) => {
  const { title, content, user } = req.body;
  const slug = slugify(title);
  switch (true) {
    case !title:
      return res.status(400).json({ error: "Title is required" });
      break;
    case !content:
      return res.status(400).json({ error: "Content is required" });
    default:
      break;
  }
  BlogPost.create({ title, content, user, slug }, (err, blogpost) => {
    if (err) {
      console.log(err);
      res.status(400).jso({ error: "Duplicate post. Try another Title" });
    }
    res.json(blogpost);
  });
};

exports.list = (req, res) => {
  BlogPost.find({})
    .limit(10)
    .sort({ createdAt: -1 })
    .exec((err, blogposts) => {
      if (err) console.log(err);
      res.json(blogposts);
    });
};

exports.read = (req, res) => {
  const { slug } = req.params;
  BlogPost.findOne({ slug }).exec((err, blogpost) => {
    if (err) console.log(err);
    res.json(blogpost);
  });
};

exports.update = (req, res) => {
  const { slug } = req.params;
  const { title, content, user } = req.body;
  BlogPost.findOneAndUpdate(
    { slug },
    { title, content, user },
    { new: true }
  ).exec((err, blogpost) => {
    if (err) console.log(err);
    res.json(blogpost);
  });
};

exports.remove = (req, res) => {
  const { slug } = req.params;
  BlogPost.findOneAndRemove({ slug }).exec((err, blogpost) => {
    if (err) console.log(err);
    res.json({ message: "BlogPost Deleted" });
  });
};
