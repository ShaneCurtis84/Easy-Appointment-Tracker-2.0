const router = require('express').Router();
const { Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');
// GET all galleries for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // attributes: ['blog_id', 'post_content'],
    const dbBlogData = await Blog.findAll({
      //   include: [
      //     Comment,
      //  ],
    });

    const blogs = dbBlogData.map((blogData) =>
      blogData.get({ plain: true })
    );
    console.log('here', blogs);
    console.log('comment', blogs[0].comments);
    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
// TODO: Replace the logic below with the custom middleware
router.get('/comment/:id', withAuth, async (req, res) => {
  // Checking whether the user is logged in and resulting navigation is done within withAuth
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        Comment,
      ],
    });
    const blog = dbBlogData.get({ plain: true });
    console.log ('in get for a blog', blog);
    res.render('comment', { blog,  loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
