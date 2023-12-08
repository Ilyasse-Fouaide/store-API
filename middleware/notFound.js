const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      status: 404,
      message: "Not Found!."
    }
  });
}

module.exports = notFound;
