const query = async (client, queryText, values, callback) => {
  const { rows } = await client.query(queryText, values);

  const isError = callback(rows);
  if (isError) {
    throw new Error("");
  }
  return rows;
};

exports.query = query;
