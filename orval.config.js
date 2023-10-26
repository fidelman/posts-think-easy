const getConfig = (mutatorName, mutatorPath) => ({
  input: "https://frontend-test-be.stage.thinkeasy.cz/api-json",
  output: {
    target: `./src/api/${mutatorName}Endpoints.ts`,
    prettier: true,
    client: "axios",
    mode: "split",
    override: {
      mutator: {
        path: mutatorPath,
        name: mutatorName,
      },
    },
  },
  hooks: {
    afterAllFilesWrite: "prettier --write",
  },
});

module.exports = {
  client: getConfig("clientInstance", "./src/api/mutator/client-instance.ts"),
  server: getConfig("serverInstance", "./src/api/mutator/server-instance.ts"),
};
