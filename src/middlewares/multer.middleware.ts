import multer from "multer";

console.log(">>>dirname: ", __dirname);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploaded-csv-files");
  },
  filename: function (req, file, cb) {
    console.log(">>>here: ", file?.fieldname, file?.filename);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
