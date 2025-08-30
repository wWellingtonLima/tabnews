import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.updated_at).toBeDefined();

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      const databaseVersion = responseBody.dependencies.database.version;
      expect(databaseVersion).toBe("16.0");

      const maxConnections = responseBody.dependencies.database.max_connections;
      expect(maxConnections).toEqual(100);

      const openedConnections =
        responseBody.dependencies.database.opened_connections;
      expect(openedConnections).toBe(1);
    });
  });
});
