import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleDBExceptions = (error: any) => {
  console.log('[>> handleDBExceptions <<]:', error);
  const { code, detail } = error;
  if (code === '23505') {
    throw new BadRequestException(detail);
  }

  throw new InternalServerErrorException();
};
