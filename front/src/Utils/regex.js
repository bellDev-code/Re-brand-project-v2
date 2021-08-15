const nickNameExpression = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 ._-]{2,16}$/i;

export const nickNameRegex = new RegExp(nickNameExpression);

const emailExpression = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

export const emailRegex = new RegExp(emailExpression);

const idExpression = /^[0-9a-z]{5,20}$/;

export const idRegex = new RegExp(idExpression);

const passwordExpression = /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-_+=]{1,50})(?=.*[a-zA-Z]{2,50}).{9,30}$/;

export const passwordRegex = new RegExp(passwordExpression);
