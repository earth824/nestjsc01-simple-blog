import { registerAs } from '@nestjs/config';
import { jwtEnvSchema } from 'src/config/schema';

export default registerAs('jwt', () => {
  const { data, success } = jwtEnvSchema.safeParse(process.env);
  if (!success) {
    throw new Error('JWT env validation error');
  }
  return data;
});
