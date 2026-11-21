import hospitalDatabase from "../../models/hospital/hospital.modal.js";

export const allHospitalInfo = async (req, res) => {
  try {
    const allHospital = await hospitalDatabase.find();
    res.status(200).json(allHospital).send({
      success: true,
      message: "All Hospital Info Found",
    });
  } catch (error) {
    res.status(200).send(
      {
        success: true,
        message: "Hospital Info not found",
      },
      error,
    );
  }
};
