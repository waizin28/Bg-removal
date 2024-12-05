import axios from 'axios';
import fs from 'fs';
import formData from 'form-data';
import userModel from '../models/userModel.js';

// Controller to remove background from image
const removeBackground = async (req, res) => {
  try {
    // get image from frontend
    const { clerkId } = req.body;
    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No Credits Balance',
        creditBalance: user.creditBalance,
      });
    }

    const imagePath = req.file.path;
    // Reading image file
    // store file using this path
    const imageFile = fs.createReadStream(imagePath);

    // need to convert to multi part data
    const formData = new FormData();
    formData.append('image_file', imageFile);

    // send to clip drop api
    const { data } = await axios.post(
      'https://clipdrop-api.co/remove-background/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    // create base 64 image
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // update user credit balance
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.status(200).json({
      success: true,
      resultImage: resultImage,
      creditBalance: user.creditBalance - 1,
      message: 'Background removed successfully',
    });
  } catch (error) {
    console.log('error', error);
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { removeBackground };
