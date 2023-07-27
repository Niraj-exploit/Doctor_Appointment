const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Role, UserRoleMapping } = require("../models");
const { getUserRoles } = require("../utils/userRoles");
require("dotenv").config();

exports.userRegister = async (req, res) => {
  const body = req.body;
  const existingUser = await User.findOne({ where: { email: body.email } });

  if (existingUser) {
    res.json({
      success: false,
      message: "User already registered",
    });
  } else {
    const hashPassword = await bcrypt.hash(body.password, 10);
    const user = await User.create({ ...body, password: hashPassword });
    const role = await Role.findOne({
      where: { code: process.env.SEEDER_PATIENT_CODE },
    });
    await UserRoleMapping.create({ user_id: user.id, role_id: role.id });

    res.json({
      success: true,
      message: "User created successfully",
    });
  }
};

exports.userLogin = async (req, res) => {
  const body = req.body;
  const existingUser = await User.findOne({ where: { email: req.body.email } });

  if (!existingUser) {
    res.json({
      success: false,
      message: "User not registered",
    });
  } else {
    const validPassword = await bcrypt.compare(
      body.password,
      existingUser.password
    );

    if (!validPassword) {
      res.json({
        success: false,
        message: "Invalid password",
      });
    } else {
      const roles = await UserRoleMapping.findAll({
        where: { user_id: existingUser.id },
      });

      const userRoles = [];

      for (const role of roles) {
        const roleEnt = await Role.findOne({ where: { id: role.role_id } });
        userRoles.push(roleEnt.code);
      }

      const token = jwt.sign(
        {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          roles: userRoles,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      res.json({
        success: true,
        message: "Login successful",
        token: token,
      });
    }
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();

  if (!users) {
    res.json({
      success: false,
      message: "Users not found",
    });
  } else {
    res.json({
      success: true,
      users: users,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const roles = await getUserRoles(user.id);

    return res.json({
      success: true,
      user: user,
      roles: roles,
    });
  } catch (error) {
    // Handle any errors that might occur during the database query
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user.",
    });
  }
};

exports.updateUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.json({
      success: false,
      message: "User not found",
    });
  } else {
    const updatedUser = await user.update(req.body);
    res.json({
      success: true,
      user: updatedUser,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.json({
      success: false,
      message: "User not found",
    });
  } else {
    const deletedUser = await user.destroy();
    res.json({
      success: true,
      user: deletedUser,
    });
  }
};

exports.assignUserRole = async (req, res, next) => {
  try {
    const { userId, roleIds } = req.body;

    // Check if the roleIds array is not empty
    if (!Array.isArray(roleIds) || roleIds.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid roleIds. Please provide an array of valid roleIds.",
      });
    }
    const user = await User.findByPk(userId);
    if(!user) {
      return res.status(404).json({
              status: false,
              message: "User not found",
            });
    }

    // Check if all roleIds exist in the roles table
    const existingRoles = await Role.findAll({
      where: {
        id: roleIds,
      },
    });
    if(existingRoles)

    // Check if the number of existing roles matches the number of provided roleIds
    if (existingRoles.length !== roleIds.length) {
      return res.status(400).json({
        status: false,
        message: "One or more provided roleIds do not exist.",
      });
    }

    // Get the names of all roles corresponding to the roleIds
    const roleNames = existingRoles.map((role) => role.name);

    // Check if any forbidden roles (doctor or admin) are included in the roleIds
    const forbiddenRoles = ["doctor", "admin"];
    const hasForbiddenRole = roleNames.some((roleName) =>
      forbiddenRoles.includes(roleName)
    );

    if (hasForbiddenRole && roleNames.includes("patient")) {
      return res.status(403).json({
        status: false,
        message:
          "Forbidden: Users cannot be assigned 'doctor' or 'admin' roles alongside 'patient'.",
      });
    }

    // Check if the user_id and role_id combinations already exist
    const existingMappings = await UserRoleMapping.findAll({
      where: {
        user_id: userId,
        role_id: roleIds,
      },
    });

    // Get the role_ids that are already assigned to the user
    const existingRoleIds = existingMappings.map((mapping) => mapping.role_id);

    // Filter out the role_ids that are already assigned
    const newRoleIds = roleIds.filter(
      (roleId) => !existingRoleIds.includes(roleId)
    );

    // Create new mappings for the remaining role_ids
    await Promise.all(
      newRoleIds.map(async (roleId) => {
        await UserRoleMapping.create({
          user_id: userId,
          role_id: roleId,
        });
      })
    );

    res.json({
      status: true,
      message: "Roles assigned",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "An error occurred while assigning roles.",
    });
  }
};


// exports.getAllUsersWithRoles = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       include: [
//         {
//           model: Role,
//           attributes: ["id", "name", "code"], // Include only specific attributes of the role, if needed
//         },
//       ],
//     });

//     if (!users || users.length === 0) {
//       res.json({
//         success: false,
//         message: "Users not found",
//       });
//     } else {
//       res.json({
//         success: true,
//         users: users,
//       });
//     }
//   } catch (error) {
//     console.error("Error occurred while fetching users with roles:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching users with roles",
//     });
//   }
// };
