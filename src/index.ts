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

server.tool(
  "get_github_repos",
  "Get GitHub repositories for a specific username",
  {
    username: z.string().describe("GitHub username to fetch repositories for"),
  },
  async ({ username }) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          "User-Agent": "MCP-Server",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories for user ${username}`);
    }
    const repos = await response.json();
    const repoList = repos
      .map((repo: any, index: number) => `${index + 1}. ${repo.name}`)
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `github repositories for user ${username}:\n${repoList}`,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Error starting MCP server:", error);
  process.exit(1);
});
