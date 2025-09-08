const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO");

/**
 * Controller class for managing User resources.
 */
class UserController extends GlobalController {
  constructor() {
    super(UserDAO);
  }

  async create(req, res) {
  // Log only when email is already registered
    let {
      firstName,
      lastName,
      age,
      email,
      password,
      confirmPassword,
    } = req.body;

    // Convierte age a número
    age = Number(age);

    if (
      !firstName ||
      !lastName ||
      age === undefined ||
      age === null ||
      isNaN(age) ||
      age < 0 ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden." });
    }
    try {
      // Validar si el email ya existe
      const existingUser = await this.dao.model.findOne({ email });
      if (existingUser) {
        console.log(`Registration rejected 409 Conflict: email already registered (${email})`);
        return res.status(409).json({ message: "Este correo ya está registrado" });
      }
      const user = await this.dao.create({
        firstName,
        lastName,
        age,
        email,
        password,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Export a singleton instance of UserController.
 */
module.exports = new UserController();
