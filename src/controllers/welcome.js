// Welcome page controller

const welcome = (req, res) => {
  res.status(200).json({ status: 200, message: res.__('Welcome to Barefoot Nomad') });
};

export default welcome;
