export { default } from 'next-auth/middleware';

export const config = { matcher : ['/dashboard', '/edit/:id*', '/control-panel/:id*'] };
