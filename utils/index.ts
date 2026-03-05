export const getDomain = () => {
  return new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://sujitlibi.com.np'
      : 'http://localhost:3000',
  );
};
