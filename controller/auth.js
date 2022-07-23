let passport = require('passport');
let Advertisement = require('../models/advertisement');
let UserModel = require('../models/user');

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  }
  if (err.message) {
    return err.message;
  } else {
    return 'Unknown server error';
  }
};

// helper function for guard purposes
exports.requireAuth = function (req, res, next) {
  passport.authenticate('tokencheck', {
    session: false
  }, function (err, user, info) {
    if (err) return res.status(401).json({
      success: false,
      message: getErrorMessage(err)
    });
    if (info) return res.status(401).json({
      success: false,
      message: info.message
    });
    req.payload = user;
    next();
  })(req, res, next);
}

exports.isOwner = async function (req, res, next) {
  try {
    let id = req.params.id;
    let advertisement = await Advertisement.findById(id).populate('user');

    if (advertisement == null) // Item not found
    {
      throw new Error('Item not found'); // Express catches the error.
    } else if (advertisement.user != null) { // Item has a owner

      if (advertisement.user._id != req.payload.id) {

        let currentUser = await UserModel.findOne({
          _id: req.payload.id
        }, 'admin');

        if (currentUser.admin != true) { // User is not a admin
          return res.status(403).json({
            success: false,
            message: 'User is not authorized to modify this item.'
          });
        }
      }
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error)
    });
  }

}