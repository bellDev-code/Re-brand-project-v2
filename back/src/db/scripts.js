const { coreColumns } = require("./core");

const createTable = async (client, tableName, onlyId) => {
  return client.query(
    `
  CREATE TABLE IF NOT EXISTS public."${tableName}"(
    ${coreColumns(onlyId)}
  )
  `
  );
};
const addColumn = async (
  client,
  tableName,
  { name, type, nullable, unique }
) => {
  await client.query(
    `
      ALTER TABLE public."${tableName}"
      ADD COLUMN IF NOT EXISTS "${name}" ${type} ${nullScript(
      nullable
    )} ${uniqueScript(unique)}
      `
  );
};

const addColumns = async (client, tableName, columns) => {
  await queryResolveAll(client, tableName, columns, addColumn);
};

const nullScript = (nullable) => (nullable ? "" : "NOT NULL");
const uniqueScript = (unique) => (unique ? "UNIQUE" : "");

const setRelation = async (
  client,
  tableName,
  { referenceTableName, name, referenceColumnName, nullable }
) => {
  await addColumn(client, tableName, {
    name: name,
    type: "SERIAL",
    nullable: nullable,
  });

  const FKName = generateFKName(tableName, referenceTableName, name);

  await client.query(
    `
    DO $$
    BEGIN
        IF NOT EXISTS (
          SELECT constraint_name 
          FROM information_schema.constraint_column_usage 
          WHERE constraint_name = '${FKName}'
          )
        THEN 
        ALTER TABLE public."${tableName}"
        ADD CONSTRAINT ${FKName}
        FOREIGN KEY("${name}")
          REFERENCES public."${referenceTableName}"(${
      referenceColumnName || "id"
    });
    END IF;
    END
    $$
  `
  );
};

const setRelations = async (client, tableName, relations) => {
  await queryResolveAll(client, tableName, relations, setRelation);
};

const queryResolveAll = async (client, tableName, elements, callback) => {
  if (Array.isArray(elements)) {
    for (const element of elements) {
      await callback(client, tableName, element);
    }
  } else {
    await callback(client, tableName, elements);
  }
};

const generateFKName = (tableName, referenceTableName, name) =>
  `fk_${tableName.toLowerCase()}_${referenceTableName.toLowerCase()}_${name.toLowerCase()}`;

exports.createTable = createTable;
exports.addColumns = addColumns;
exports.setRelation = setRelation;
exports.setRelations = setRelations;
