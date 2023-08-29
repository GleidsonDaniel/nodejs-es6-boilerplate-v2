const { createClient } = require("graphql-ws");
import process from "process";

process.stdin.resume();

const client = createClient({
  url: "URL",
  webSocketImpl: require("ws"),
  connectionParams: {
    headers: {
      Authorization: "Bearer TOKEN",
    },
  },
});

(async () => {
  const subscription = client.iterate({
    query: `subscription ($id: String!) {
      transaction(id: $id) {
        id
        status
      }
    }`,
    variables: { id: "TRANSACTION_ID" },
  });
  for await (const event of subscription) {
    console.warn(JSON.stringify(event), "event");
  }
})().catch((error) => {
  console.warn(error, "error");
});
