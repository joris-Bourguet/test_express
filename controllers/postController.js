const qs = require('qs')

exports.handleGetPostList = async (req, res) => {
  try {
    const {page, limit} = req.query;

    let url = process.env.API_BASE_URL + '/posts';

    const query = {
      _page: page || 1,
      _limit: limit || 5,
    }

    url =  `${url}?${qs.stringify(query)}`;

    const posts = await fetch(url)
      .then(response => response.json())
      .then(json => json)
      .catch(err => console.log('err', err));

    res.json({
      total: Number(posts.length),
      page: Number(query._page),
      limit: Number(query._limit),
      data: posts,
    })
  } catch (err) {
    res.status(500).json({error: 'Something went wrong!'});
  }
}

exports.handleGetPost = async (req, res) => {
  try {
    let url = process.env.API_BASE_URL + '/posts/' + req.params.id;

    const post = await fetch(url)
      .then(response => response.json())
      .then(json => json)
      .catch(err => console.log('err', err));

    if (Object.keys(post).length === 0) {
      return res.status(404).json({error: 'Post not found'});
    }

    return res.json({
      data: post,
    })
  } catch (err) {
    res.status(500).json({error: 'Something went wrong!'});
  }
}