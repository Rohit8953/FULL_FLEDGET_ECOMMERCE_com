const User = require("../../models/userSchema");
const ProductUpload = require("../../models/productSchema");

exports.uploadproduct = async (req, res) => {
  try {
    const {
      productName,
      brandName,
      category,
      sellingPrice,
      price,
      description,
      productImage,
      id,
    } = req.body;

    const user = await User.findById(id);
    
    console.log(user);
    if (user?.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Only Admin can upload the product",
      });
    }

    if (
      !productName ||
      !brandName ||
      !category ||
      !price ||
      !sellingPrice ||
      !description
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill all details--->>>",
      });
    }

    const product = await ProductUpload.create({
      productName,
      brandName,
      category,
      price,
      description,
      sellingPrice,
      productImage,
    });
    return res.status(201).json({
      success: true,
      productdetail: product,
      message: "Your Product uploaded successfully",
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "Something went wrong during the product uploadation",
    });
  }
};
