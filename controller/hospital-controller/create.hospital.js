import hospitalDatabase from "../../models/hospital/hospital.modal.js";

export const createHospital = async (req, res) => {
  try {
    //   res.send("Create Hospital Route Working");
    const reqHostpitalInfo = req.body;
    const createHospitalInfo = await hospitalDatabase.create(reqHostpitalInfo);
    res.status(200).send({
      success: true,
      message: "Info Added Successfully",
    });
  } catch (error) {
    res.status(200).send(
      {
        success: true,
        message: "Info Added UnSuccessful",
      },
      error,
    );
  }
};
