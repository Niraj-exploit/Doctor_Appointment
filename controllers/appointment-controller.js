const { User, Appointment } = require("../models");
const { getUserRoles } = require("../utils/userRoles");

exports.createAppointment = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;
    const patientId = user.id;
    const doctorId = req.params.id;

    const doctor = await User.findOne({ where: { id: doctorId } });
    const userRole = await getUserRoles(doctorId);
    if (!doctor || !userRole.includes("DOCTOR")) {
      return res.status(404).json({
        message: "The requested doctor is not found or is not a valid doctor",
      });
    }
    const { date, time } = req.body;
    const appointment = await Appointment.create({
      date: date,
      time: time,
      patientId: patientId,
      doctorId: doctorId,
      status: "pending",
    });
    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to create appointment",
    });
  }
};

exports.viewAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json({
      success: true,
      message: "Appointments found",
      appointments: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to fetch appointment",
    });
  }
};

exports.viewAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
    });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Appointment found",
      appointment: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to fetch appointment",
    });
  }
};

exports.confirmAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
    });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    appointment.status = "confirmed";
    await appointment.save();
    res.status(200).json({
      success: true,
      message: "Appointment confirmed",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to confirm appointment",
    });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
    });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    appointment.status = "cancelled";
    await appointment.save();
    res.status(200).json({
      success: true,
      message: "Appointment cancelled",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to cancel appointment",
    });
  }
};

exports.rejectAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
    });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    appointment.status = "rejected";
    await appointment.save();
    res.status(200).json({
      success: true,
      message: "Appointment rejected",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to reject appointment",
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
    });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    await appointment.destroy();
    res.status(200).json({
      success: true,
      message: "Appointment deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to delete appointment",
    });
  }
};
