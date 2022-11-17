const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
module.exports = app => {
  // middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } })
          if (!user) {
            return done(
              null,
              false,
              req.flash('error_messages', 'Email does not exists.')
            )
          }
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
            return done(
              null,
              false,
              req.flash('error_messages', 'Email or password incorrect!')
            )
          }
          return done(null, user)
        } catch (err) {
          return done(err, false)
        }
      }
    )
  )

  // 設定序列化和反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findByPk(id)
      user = user.toJSON()
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}
