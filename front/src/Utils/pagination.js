import { productNegativeNum } from './number';

export const parsePageInput = (pageInput) => {
  return {
    page: parseInt(pageInput.page) || 0,
    perPage: parseInt(pageInput.perPage) || 0,
  };
};
export const parsePageForPost = (aPage) => {
  const page = aPage - 1;

  return productNegativeNum(page);
};
