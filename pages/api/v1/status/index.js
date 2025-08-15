import database from "infra/database";

async function status(request, response) {
  const updated_at = new Date().toISOString();
  const dbVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = dbVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;"
  );
  const databaseMaxConnections =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;`,
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updated_at,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnections),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
