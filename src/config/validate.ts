import { appEnvSchema } from 'src/config/schema';

export const validate = (config: Record<string, any>) => {
  const { data, success, error } = appEnvSchema.safeParse(config);
  if (!success) {
    console.log(error.issues);
    throw new Error('Env validation error');
  }
  return data;
};
