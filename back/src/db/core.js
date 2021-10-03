const coreColumns = (raw) => {
  if (raw) {
    return `id          SERIAL          PRIMARY KEY`;
  }
  return `id          SERIAL          PRIMARY KEY,
  "createdAt" TIMESTAMP       NOT NULL,
  "updatedAt" TIMESTAMP       NOT NULL`;
};

exports.coreColumns = coreColumns;
