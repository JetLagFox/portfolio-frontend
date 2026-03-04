import formidable from "formidable";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({ keepExtensions: true, maxFileSize: 10 * 1024 * 1024 });

  return new Promise((resolve) => {
    form.parse(req, async (err, _fields, files) => {
      if (err) {
        res.status(400).json({ error: "Error al procesar el archivo" });
        return resolve();
      }

      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      if (!file) {
        res.status(400).json({ error: "No se recibió ningún archivo" });
        return resolve();
      }

      // formidable v2 uses file.filepath (not file.path)
      const tempPath = file.filepath;
      const filename = `${Date.now()}.webp`;
      const outPath = path.join(uploadDir, filename);

      try {
        await sharp(tempPath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outPath);

        res.status(200).json({ url: `/uploads/${filename}` });
      } catch {
        res.status(500).json({ error: "Error al procesar la imagen" });
      }

      resolve();
    });
  });
}
