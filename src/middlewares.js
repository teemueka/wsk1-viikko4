import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const thumbnailPath = filePath + '_thumb.png';
  try {
    await sharp(filePath).resize(160, 160).toFormat('png').toFile(thumbnailPath);
    next();
  } catch (error) {
    console.log('Error creating thumbnail', error);
    return res.status(500).send('Error creating thumbnail');
  }
};

export { createThumbnail };
