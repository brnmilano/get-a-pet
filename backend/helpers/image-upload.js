const multer = require("multer");
const path = require("path");

// Destino para armazenar as imagens
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    cb(null, `public/images/${folder}`);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 100, // Limite de 100MB
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|png)$/)) {
      cb(new Error("Apenas arquivos JPEG e PNG são permitidos!"));
    }

    cb(undefined, true);
  },
});

module.exports = {
  imageUpload,
};
