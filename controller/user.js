let User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  let id = req.params.id;

  User.findById(id, (err, ad) =>{
      if(err)
      {
          console.log(err);
          res.status(500).json({ error: err });
      }
      else {
          res.status(200).json(ad);
      }

  });
}