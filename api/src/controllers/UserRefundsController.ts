import { prisma } from '@/database/prisma.js';
import { type Request, type Response } from 'express';
import { z } from 'zod';

class UserRefundsController {
  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const refunds = await prisma.user.findFirst({
      where: {
        id,
      },
      orderBy: { createdAt: 'desc' },
      include: { refunds: true },
    });

    return response.json(refunds);
  }
}

export { UserRefundsController };
