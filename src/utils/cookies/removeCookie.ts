// Hàm để xóa cookie
export const removeCookie = (name: string): void => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
