const validInt = (target) => {
  const parsed = parseInt(target);

  if (isNaN(parsed)) {
    throw new Error();
  }

  return Math.floor(parsed);
};

exports.validInt = validInt;
