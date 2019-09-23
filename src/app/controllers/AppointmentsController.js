const { User } = require("../models");

class AppointmentsController {
  async create(req, res) {
    const provider = await User.findByPk(req.params.provider);

    return res.render("appointments/create", { provider });
  }
}

module.exports = new AppointmentsController();
