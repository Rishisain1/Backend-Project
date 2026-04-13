import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)// we dont want to use we save as original name because file is stay for verly short period of time
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage })