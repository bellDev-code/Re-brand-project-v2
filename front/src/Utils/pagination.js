import { productNegativeNum } from './number';

export const parsePageInput = (pageInput, defaultPerPage) => {
  return {
    page: parseInt(pageInput.page) || 1,
    perPage: parseInt(pageInput.perPage) || defaultPerPage,
  };
};
export const parsePageForPost = (aPage) => {
  const page = aPage - 1;

  return productNegativeNum(page);
};
