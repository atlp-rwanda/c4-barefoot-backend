const successResponse = (res, status, message, data) => {
    res.status(status).json({
      success: true,
      message,
      data
    });
  };
  
  export default successResponse;