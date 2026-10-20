import uploadConfig from '@/configs/upload.js';
import { DiskStorage } from '@/providers/DiskStorage.js';
import { type Request, type Response } from 'express';
import { z, ZodError } from 'zod';

class UploadsController {
  async create(request: Request, response: Response) {
    const diskStorage = new DiskStorage();
    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, { error: 'File is required' }),
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
              {
                error: `File format invalid: Formats allowed are: ${uploadConfig.ACCEPTED_IMAGE_TYPES}`,
              }
            ),
          size: z
            .number()
            .positive()
            .refine((size) => size <= uploadConfig.MAX_FILE_SIZE, {
              error: `Max file size allowed is: ${uploadConfig.MAX_SIZE} mb`,
            }),
        })
        .catchall(z.unknown()); //  allow extra/unknown keys in Zod instead of stripping them out by default

      //console.log({ file: request.file });
      const file = fileSchema.parse(request.file);
      const filename = await diskStorage.saveFile(file.filename);

      return response.json({ filename });
    } catch (error) {
      if (error instanceof ZodError) {
        if (request.file) {
          await diskStorage.deleteFile(request.file.filename, 'tmp');
        }
        throw new Error(error.issues[0]?.message);
      }
      throw error;
    }
  }
}

export { UploadsController };
