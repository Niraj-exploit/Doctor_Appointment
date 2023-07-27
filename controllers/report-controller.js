const multer = require("../middlewares/multer");
const { Report } = require("../models");
const { getUserRoles } = require("../utils/userRoles");
const cloudinary = require("../utils/cloudinary");
const generateNewFileName = require("../utils/fileName");

// Upload a photo to a subfolder
const parentFolder = process.env.FOLDER;
const profile = process.env.PROFILE;
const report = process.env.REPORT;
const uploaded = process.env.UPLOADED;
const updated = process.env.UPDATED;

const reportUploadFolder = `${parentFolder}/${report}/${uploaded}`;
const reportUpdatedFolder = `${parentFolder}/${report}/${updated}`;

exports.uploadReport = async (req, res) => {
  try {
    const roles = await getUserRoles(req.user.id);

  

    // Get the file extension from the original filename
    // const fileName = req.file.originalName.split('.').slice(0, -1).join('.');
    // const fileExtension = req.file.originalname.split(".").pop();


    
    const userName = req.user.name;
    const userId = req.user.id;
    const fileName = req.file.originalname;
    // Construct the new filename using the user name, user id, role, original file name, and file extension
    // const newFileName = `${userName}_${userId}_${roles}_${fileName}.${fileExtension}`;
    const newFileName = generateNewFileName(userName, userId, roles, fileName)
    console.log(req.user, newFileName);
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: newFileName,
      folder: reportUploadFolder
    });
    if (roles.includes("PATIENT")) {
      const report = await Report.create({
        title: req.body.title,
        patientId: req.user.id,
        report: result.secure_url,
        description: req.body.description,
      });
      res.json({
        message: "Report created successfully",
        report,
        success: true,
      });
    } else {
      const report = await Report.create({
        title: req.body.title,
        patientId: req.user.id,
        report: result.secure_url,
        description: req.body.description,
        patientId: req.body.patientId,
        updatedBy: req.user.id,
      });
      res.json({
        message: "Report posted to patient",
        report,
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the report",
      success: false,
    });
  }
};

exports.viewReport = async (req, res) => {
  const report = await Report.findByPk(req.params.id);
  if (!report) {
    return res.status(404).json({
      message: "Report not found",
      success: false,
    });
  } else {
    return res.json({
      message: "Report found",
      report,
      success: true,
    });
  }
};

exports.getAllReports = async (req, res) => {
  const reports = await Report.findAll();
  if (!reports) {
    return res.status(404).json({
      message: "Reports not found",
      success: false,
    });
  } else {
    return res.json({
      message: "Reports found",
      reports,
      success: true,
    });
  }
};

exports.updateReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file provided",
        success: false,
      });
    }
    const roles = await getUserRoles(req.user.id);
    const userName = req.user.name;
    const userId = req.user.id;
    const fileName = req.file.originalname;
    // Construct the new filename using the user name, user id, and random number
    // const newFileName = `${userName}_${userId}_${roles}_${fileName}.${fileExtension}`;
    const newFileName = generateNewFileName(userName, userId, roles, fileName)
    console.log(req.user, newFileName);


    const result = await cloudinary.uploader.upload(req.file.path,{
      public_id: newFileName,
      folder: reportUpdatedFolder
    });
    req.body.report = result.secure_url;

    const report = await Report.findByPk(req.params.id);
    if (!report) {
      return res.status(404).json({
        message: "Report not found",
        success: false,
      });
    } else {
      const roles = await getUserRoles(req.user.id);
      if (roles.includes("PATIENT")) {
        if (report.patientId !== req.user.id) {
          return res.json({
            success: false,
            message: "You are not authorized to update this report",
          });
        }
      }

      (report.title = req.body.title),
        (report.description = req.body.description),
        (report.report = result.secure_url),
        (report.updatedBy = req.user.id);
      await report.save();
      return res.json({
        message: "Report updated",
        report,
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the report",
      success: false,
    });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) {
      return res.status(404).json({
        message: "Report not found",
        success: false,
      });
    } else {
      report.destroy();
      return res.json({
        message: "Report deleted",
        report,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to delete report",
    });
  }
};
