const logout = (req, res) => {
  try {
    res.clearCookie('make', { path: '/api/v1/user/refresh-token' });

    res.status(200).json({ status: 200, message: res.__('Logout successful!') });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export default logout;
