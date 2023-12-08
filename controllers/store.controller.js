module.exports.index = async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to the API" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Internal Server Error"
      }
    })
  }
}
