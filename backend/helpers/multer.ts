import { Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// Define allowed MIME types
const allowedMimeTypes: string[] = ["image/jpeg", "image/jpg", "image/png"];

// Directory for uploads
const uploadsDir = path.join(__dirname, "../public");

// Ensure the uploads directory exists, if not create it
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: Function
  ) {
    cb(null, uploadsDir);
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter function to check the MIME type (Size filter is yet to add)
const fileFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Allow the file
  } else {
    cb(new Error("Only JPEG, JPG, and PNG files are allowed!"), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter as any,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

export default upload;
