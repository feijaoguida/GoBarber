const { User } = require("../models");

class SessionController {
  async create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    const { email, password } = req.body;

    //O findeOne irá procurar um usuário no banco de dados onde o email seja
    //o mesmo no campo email. where: { email }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash("error", "Usuário não encontrado");
      return res.redirect("/");
    }

    if (!(await user.checkPassword(password))) {
      req.flash("error", "senha incorreta");
      return res.redirect("/");
    }

    req.session.user = user;

    return res.redirect("/app/dashboard");
  }

  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie("qualquerNome");
      return res.redirect("/");
    });
  }
}

module.exports = new SessionController();
