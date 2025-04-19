import { z } from 'zod';
import { useTranslation } from 'react-i18next';

export const useLoginSchema = () => {
  const { t } = useTranslation();
  return z.object({
    email: z.string().email({ message: t('validation.email_required') }),
    password: z.string().min(1, { message: t('validation.password_required') }),
  });
};
