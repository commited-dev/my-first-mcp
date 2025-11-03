import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "My First MCP",
  version: "0.0.1",
  capabilities: {
    tools: {},
  },
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Error starting MCP server:", error);
  process.exit(1);
});
