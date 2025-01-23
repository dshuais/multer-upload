import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { formatDate, randomString } from 'turboutils';

const storage = multer.diskStorage({
  // 自定义目录
  destination: (req, file, cb) => {
    const fileDate = formatDate(new Date(), 'yyyyMMdd'),
      folder = req.body.fileName,
      folderPath = path.join(process.cwd(), `files/${folder}/${fileDate}`);
    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
    } catch (error) {
      console.error('Error creating directory:>> ', error);
    }

    cb(null, folderPath);
  },

  // 自定义文件名
  filename: (req, file, cb) => {
    let ext = 'png',
      fileName = '';
    try {
      ext = path.extname(file.originalname);
      fileName = randomString(24) + ext;
    } catch (error) {
      fileName = file.originalname;
      console.error('Error getting file extension:>> ', error);
    }
    cb(null, fileName);
  }
});

export default storage;
