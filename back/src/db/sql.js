const { whereInIds, setOffset } = require("./scripts");

const sql = {
  user: {
    findByEmail: (fields) => `SELECT ${String(fields)} FROM public."User" WHERE email = $1`,
    checkByUsername: 'SELECT * FROM public."User" WHERE username = $1',
    checkByEmail: 'SELECT * FROM public."User" WHERE email = $1',
    loginUser: 'SELECT id, email, name, "createdAt", "phoneNumber" FROM public."User" WHERE id = $1',
    isExists: 'SELECT * FROM public."User" WHERE username = $1 OR email = $2',
    getUser: 'SELECT id, name, email, "createdAt", "phoneNumber" FROM public."User" WHERE id = $1',
  },
  verify: {
    find: 'SELECT * FROM public."Verification" WHERE payload = $1 AND code = $2',
  },
  product: {
    find: ({ id, paging, conditions }) => {
      let query = `
        SELECT 
        p.id, p.name, p.price, p.count, p.sale, p."categoryId", p."createdAt", p."updatedAt",
        b.id AS brand_id,
        b.name AS brand_name,
        f.id AS thumbnail_id,
        f.url AS thumbnail_url,
        f.key AS thumbnail_key
        FROM public."Product" AS p
        INNER JOIN "Brand" b ON p."brandId" = b.id
        INNER JOIN "File" f ON p."thumbnailId" = f.id
      `;

      query = whereInIds(query, "p.id", id);

      // conditions  {}

      if (conditions) {
        if (conditions.categoryId) {
          if (!id) {
            query += "WHERE";
          } else {
            query += " AND";
          }

          query += `
            p."categoryId" = ${conditions.categoryId}
          `;
        }
      }

      query += `
      ORDER BY p."id" DESC
      `;

      query = setOffset(query, paging);

      console.log(query);

      return query;
    },
    findDetail: ({ id, paging }) => {
      let query = `SELECT 
      p.id, p.name, p.price, p.count, p.sale, p."categoryId", p."createdAt", p."updatedAt",
      pi.id AS info_id, 
      pi.color AS info_color, 
      pi."offerGender" AS "info_offerGender", 
      pi.size AS info_size, 
      pi.manufacturer AS info_manufacturer, 
      pi.origin AS info_origin, 
      pd.id AS detail_id, 
      pd.material AS detail_material,
      b.id AS brand_id,
      b.name AS brand_name,
      f.id AS thumbnail_id,
      f.url AS thumbnail_url,
      f.key AS thumbnail_key
      FROM public."Product" AS p
      INNER JOIN "ProductInfo" pi ON p."infoId" = pi.id
      INNER JOIN "ProductDetail" pd ON p."detailId" = pd.id
      INNER JOIN "Brand" b ON p."brandId" = b.id
      INNER JOIN "File" f ON p."thumbnailId" = f.id
      
      `;

      query = whereInIds(query, "p.id", id);

      query += `
      ORDER BY p."id" DESC
      `;

      query = setOffset(query, paging);

      return query;
    },
    count: ({ conditions }) => {
      let query = `
        SELECT COUNT(*)
        FROM public."Product" p
    `;

      if (conditions) {
        if (conditions.categoryId) {
          query += `
            WHERE p."categoryId" = ${conditions.categoryId}
          `;
        }
      }
      return query;
    },
  },
  file: {
    find: (key, id) => {
      return `
        SELECT *
        FROM public."File" f
        WHERE f."${key}" = ${id}
      `;
    },
  },
};

module.exports = sql;
