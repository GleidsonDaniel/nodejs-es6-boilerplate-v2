const { createClient } = require("graphql-ws");
import process from "process";

process.stdin.resume();

const client = createClient({
  url: "URL",
  webSocketImpl: require("ws"),
  connectionParams: {
    Authorization:
      "Bearer TOKEN",
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
  console.warn(subscription, "subscription");
  for await (const event of subscription) {
    console.warn(event, "event");
    break;
  }
})().catch((error) => {
  console.warn(error, "error");
});
