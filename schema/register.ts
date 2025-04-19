import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useRegisterSchema = () => {
  const { t } = useTranslation();

  return z
    .object({
      email: z.string().email({ message: t('validation.email_required') }),
      firstname: z
        .string()
        .min(1, { message: t('validation.firstname_required') }),
      lastname: z
        .string()
        .min(1, { message: t('validation.lastname_required') }),
      phone: z.string().min(1, { message: t('validation.phone_required') }),
      password: z
        .string()
        .min(10, { message: t('validation.password_too_short') }),
      confirmPassword: z
        .string()
        .min(8, { message: t('validation.confirm_required') }),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: t('validation.passwords_do_not_match'),
      path: ['confirmPassword'],
    });
};
