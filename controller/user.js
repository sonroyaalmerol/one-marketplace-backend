const User = require('../models/user');
const Advertisement = require('../models/advertisement');

const config = require('../config/config');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const getErrorMessage = (err) => {
  console.log(err);
  let message = '';

  if (err.message) {
    message = err.message;
  }
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  }
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message)
        message = err.errors[errName].message;
    }
  }

  return message;
};

module.exports.getUser = (req, res, next) => {
  let id = req.params.id;

  User.findById(id, (err, ad) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    }

    return res.status(200).json(ad);
  });
}

module.exports.getSelf = async function (req, res, next) {
  try {
    let id = req.payload.id;
    let me = await User.findById(id).exec();

    return res.status(200).json(me)

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error)
    });
  }


}

module.exports.register = function (req, res, next) {
  let user = new User(req.body);
  user.provider = 'local';

  user.save((err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: getErrorMessage(err)
      });
    }

    return res.json({
      success: true,
      message: 'User created successfully!'
    });
  });
};

module.exports.getUserAdvertisements = function(req,res,next)
{
  let id = req.params.id;

  if (id !== req.payload.id) {
    Advertisement.find({ 
      user: id, 
      expiresAt: { $gt: new Date() },
      $or: [
        {
            disabled: false
        },
        {
            disabled: null
        }
      ]
    }, (err, ads) => 
    {
        if(err)
        {
          return res.status(500).json({ error: err });
        }
        else
        {
          return res.status(200).json(ads);
        }
    });
  } else {
    Advertisement.find({ user: id }, (err, ads) => 
    {
        if(err)
        {
          return res.status(500).json({ error: err });
        }
        else
        {
          return res.status(200).json(ads);
        }
    });
  }
}

module.exports.signIn = function (req, res, next) {
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(400).json({
            success: false,
            message: err || info.message
          });
        }

        req.login(
          user, {
            session: false
          },
          async (error) => {
            if (error) {
              return next(error);
            }

            const payload = {
              id: user._id,
              email: user.email
            };
            const token = jwt.sign({
                payload: payload
              },
              config.SECRETKEY, {
                algorithm: 'HS512',
                expiresIn: "20min"
              }
            );

            return res.json({
              success: true,
              token: token
            });
          }
        );
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: getErrorMessage(error)
        });
      }
    }
  )(req, res, next);
}


module.exports.getUser = (req, res, next) => {
  let id = req.params.id;

  User.findById(id, (err, user) =>{
      if(err)
      {
        console.log(err);
        return res.status(500).json({ error: err });
      }
      else {
        delete user.password;
        
        return res.status(200).json(user);
      }
  });
}

module.exports.editUser = (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndUpdate(id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
  }, (err, user) =>{
      if(err)
      {
          return res.status(500).json({ error: err });
          console.log(err);
      }
      else 
      {
          return res.status(200).json(user);
      }
  });
}