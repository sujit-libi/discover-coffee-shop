export const getDomain = () => {
  return new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://discover-coffee-shop-mu.vercel.app'
      : 'http://localhost:3000',
  );
};
