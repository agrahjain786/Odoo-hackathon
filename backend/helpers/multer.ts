import { Request } from "express";
import multer from "multer";

// Define allowed MIME types
const allowedMimeTypes: string[] = ["image/jpeg", "image/jpg", "image/png"];

const storage = multer.memoryStorage();

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
