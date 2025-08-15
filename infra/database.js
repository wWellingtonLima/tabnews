import { Client } from "pg";

async function query(queryObj) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  try {
    const res = await client.query(queryObj);
    return res;
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
