import { prisma } from '@/database/prisma.js';
import { AppError } from '@/utils/AppError.js';
import { type Request, type Response } from 'express';
import { z } from 'zod';

class StatusController {
  async update(request: Request, response: Response) {
    const paramsSchema = z.object({ id: z.uuid() });
    const bodySchema = z.object({
      status: z.enum(['pending', 'approved', 'rejected']),
    });

    const { id } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    const refundStatus = await prisma.refunds.findUnique({
      where: {
        id,
      },
    });

    if (refundStatus?.status === 'approved') {
      throw new AppError(
        'This refund has already approved, you cannot change status anymore'
      );
    }

    if (refundStatus?.status === 'rejected') {
      throw new AppError(
        'This refund has already rejected, you cannot change status anymore'
      );
    }

    const updated = await prisma.refunds.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });

    return response.json(updated);
  }
}

export { StatusController };
