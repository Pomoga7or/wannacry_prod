import { createDirectus, rest} from '@directus/sdk';

// Создаем клиент без аутентификации для публичных данных
export const directus = createDirectus('https://directus.wannacry.shop').with(rest());

