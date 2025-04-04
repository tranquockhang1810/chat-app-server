const AuthService = require("../services/auth.service");

class AuthFacade {
  async register(userData) {
    return await AuthService.register(userData);
  }

  async login(phone, password) {
    return await AuthService.login(phone, password);
  }
}

module.exports = new AuthFacade();
