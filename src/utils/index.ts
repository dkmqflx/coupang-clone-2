type cookieType = 'accessToken' | 'refreshToken';

export const parseCookie = (
  cookieString: string | undefined,
  type: cookieType
) => {
  if (!cookieString) return undefined;

  const cookieValue = cookieString
    ?.split(';')
    .find((item) => item.includes(type));

  return cookieValue?.split('=')[1];
};
