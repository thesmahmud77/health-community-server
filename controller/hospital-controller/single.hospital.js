import hospitalDatabase from "../../models/hospital/hospital.modal.js";

export const singleHospitalInfo = async (req, res) => {
  try {
    const id = req.params._id;
    const hospitalInfo = await hospitalDatabase.findOne(id);
    res.status(200).json(hospitalInfo).send({
      success: true,
      message: "Hospital Info Found",
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
