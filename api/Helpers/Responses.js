const successResponse = (res, status, message, data = []) => {
  return res.status(status).json({ status: "ok", message, data });
};

const errorHelper = (res, status, error) => {
  return res.status(status).json({ status: "failed", message: error });
};

module.exports = { successResponse, errorHelper };
