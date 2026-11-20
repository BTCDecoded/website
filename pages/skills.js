import Link from "next/link";
import IntelChrome from "../components/IntelChrome";
import { MCP_URL } from "../lib/api";

const AGENTS_SNIPPET = `# BTCDecoded Intelligence

When the question is Bitcoin Core, a BIP, a GitHub PR or issue, a contributor,
consensus rules, spec versus implementation, a CVE or incident, soft fork
activation, governance precedent, or a mailing-list or forum claim: call
BTCDecoded Intelligence before answering from model memory.

MCP: POST ${MCP_URL} (Streamable HTTP).
Skill: https://btcdecoded.org/skills/SKILL.md
Install: https://btcdecoded.org/skills/

Order: search or the matching find_* tool first; get_passage before quoting;
verify_claim before a specific factual or historical claim; analyze_pr or
analyze_issue for any GitHub URL. Those two do not post comments. Cite
snapshot_id and as_of. If the index has no passage, stop. Do not treat Bitcoin
Core's current behavior as the spec. A contributor profile with found=false
is unknown, not a verdict.`;

export default function SkillsPage() {
  return (
    <IntelChrome
      title="Skills"
      lede="Connect an agent to Intelligence so Bitcoin Core, BIP, PR, and governance questions hit the index instead of model memory."
    >
      <p>
        MCP endpoint: <code>{MCP_URL}</code> (Streamable HTTP). Pay on{" "}
        <Link href="/subscribe/">Checkout</Link> so the key stays on{" "}
        <Link href="/account/">Account</Link>. Claude.ai uses OAuth fields from
        Account. Cursor, Claude Code, Codex, and other HTTP clients use{" "}
        <code>Authorization: Bearer</code>.
      </p>
      <p>
        Machine files:{" "}
        <a href="/skills/SKILL.md">/skills/SKILL.md</a>,{" "}
        <a href="/skills/btcdecoded-intelligence.zip">
          /skills/btcdecoded-intelligence.zip
        </a>
        , <a href="/llms.txt">/llms.txt</a>,{" "}
        <a href="/skills/AGENTS.md">/skills/AGENTS.md</a>.
      </p>

      <div className="intel-uses">
        <article>
          <h3>Usage rule</h3>
          <p>
            On Bitcoin Core, BIPs, a GitHub PR or issue, a contributor,
            consensus, spec versus implementation, a CVE or incident, soft fork
            activation, governance precedent, or a mailing-list or forum claim:
            call this MCP first. Search or a find_* tool, then get_passage before a
            quote, verify_claim before a specific fact, analyze_pr or
            analyze_issue for a GitHub URL. Cite snapshot ids and as_of dates.
          </p>
        </article>
        <article>
          <h3>Skill</h3>
          <p>
            Agent Skills format (
            <a href="https://agentskills.io/specification">
              agentskills.io/specification
            </a>
            ). Name <code>btcdecoded-intelligence</code>. Load it when reviewing
            bitcoin/bitcoin or citing IRC, bitcoin-dev, Delving, or Bitcointalk.
          </p>
        </article>
        <article>
          <h3>Prompts</h3>
          <p>
            After initialize, clients that support MCP prompts can run{" "}
            <code>review_pr</code>, <code>verify_governance_claim</code>,{" "}
            <code>find_proposal_precedent</code>,{" "}
            <code>profile_bip_discourse</code>. The skill is also{" "}
            <code>resources/read</code> at{" "}
            <code>intel://skill/btcdecoded-intelligence</code>.
          </p>
        </article>
      </div>

      <h2>Claude</h2>
      <p>
        From Anthropic’s{" "}
        <a href="https://support.claude.com/en/articles/12512180-how-to-create-custom-skills">
          Use skills in Claude
        </a>
        : custom skills are a ZIP of the skill folder, uploaded in Customize.
      </p>
      <ol>
        <li>
          Download{" "}
          <a href="/skills/btcdecoded-intelligence.zip">
            btcdecoded-intelligence.zip
          </a>
          . The zip root is <code>btcdecoded-intelligence/SKILL.md</code> plus{" "}
          <code>references/</code>.
        </li>
        <li>
          Settings → Capabilities: turn on Code execution and file creation
          (Create and edit files in the newer Settings layout). Skills need
          that environment.
        </li>
        <li>Go to Customize → Skills.</li>
        <li>
          Click +, then Create skill, then Upload a skill, and choose the zip.
        </li>
        <li>
          Toggle the skill on. Connect the MCP connector from Account (OAuth).
          Do not paste the Bearer key into Claude.ai.
        </li>
      </ol>

      <h2>Claude Code</h2>
      <p>
        From Anthropic’s{" "}
        <a href="https://code.claude.com/docs/en/plugin-marketplaces">
          plugin marketplaces
        </a>{" "}
        and{" "}
        <a href="https://code.claude.com/docs/en/discover-plugins">
          discover plugins
        </a>
        : add this site’s git repo as a marketplace, then install the plugin.
        One install loads the skill and the MCP server. Claude Code prompts for
        the Account key (<code>userConfig.api_key</code>).
      </p>
      <pre className="intel-docs-pre" tabIndex={0}>{`claude plugin marketplace add BTCDecoded/website
claude plugin install btcdecoded-intelligence@btcdecoded`}</pre>
      <p>
        One step, Claude Code v2.1.292 or later in the shell (v2.1.275 in a
        session):
      </p>
      <pre className="intel-docs-pre" tabIndex={0}>{`claude plugin install btcdecoded-intelligence --marketplace BTCDecoded/website`}</pre>
      <p>
        Paste the Bearer key from Account when asked. The plugin sends{" "}
        <code>Authorization: Bearer ${"{"}user_config.api_key{"}"}</code> to{" "}
        <code>{MCP_URL}</code>.
      </p>

      <h2>Cursor</h2>
      <p>
        MCP from{" "}
        <a href="https://cursor.com/docs/context/mcp">Cursor MCP docs</a>:
        Streamable HTTP in <code>mcp.json</code>, headers for the Bearer key.
        Skills from{" "}
        <a href="https://cursor.com/docs/context/skills">Cursor Agent Skills</a>
        : a folder with <code>SKILL.md</code> under{" "}
        <code>~/.cursor/skills/</code> (user) or <code>.cursor/skills/</code>{" "}
        (project).
      </p>
      <pre className="intel-docs-pre" tabIndex={0}>{`{
  "mcpServers": {
    "btcdecoded": {
      "url": "${MCP_URL}",
      "headers": {
        "Authorization": "Bearer \${env:BTCDECODED_API_KEY}"
      }
    }
  }
}`}</pre>
      <p>
        Put that in <code>~/.cursor/mcp.json</code> (every project) or{" "}
        <code>.cursor/mcp.json</code> (this repo). Then unzip{" "}
        <a href="/skills/btcdecoded-intelligence.zip">the zip</a> into{" "}
        <code>~/.cursor/skills/</code> so the path is{" "}
        <code>~/.cursor/skills/btcdecoded-intelligence/SKILL.md</code>.
      </p>

      <h2>Codex and AGENTS.md</h2>
      <p>
        Codex reads <code>AGENTS.md</code> from the repo root, walking down to
        the working directory (
        <a href="https://developers.openai.com/codex/guides/agents-md">
          Custom instructions with AGENTS.md
        </a>
        ). MCP is a Streamable HTTP table in <code>~/.codex/config.toml</code>{" "}
        or project <code>.codex/config.toml</code> (
        <a href="https://developers.openai.com/codex/mcp">
          Codex MCP
        </a>
        ).
      </p>
      <pre className="intel-docs-pre" tabIndex={0}>{`[mcp_servers.btcdecoded]
url = "${MCP_URL}"
bearer_token_env_var = "BTCDECODED_API_KEY"`}</pre>
      <p>
        Drop this snippet into the Bitcoin repo’s <code>AGENTS.md</code> (or
        download <a href="/skills/AGENTS.md">/skills/AGENTS.md</a>):
      </p>
      <pre className="intel-docs-pre" tabIndex={0}>{AGENTS_SNIPPET}</pre>

      <h2>Generic MCP clients</h2>
      <p>
        JSON-RPC 2.0 over <code>POST {MCP_URL}</code>, protocol version{" "}
        <code>2024-11-05</code>. <code>initialize</code> returns{" "}
        <code>instructions</code> plus <code>capabilities.tools</code>,{" "}
        <code>prompts</code>, and <code>resources</code>.{" "}
        <code>tools/list</code> is public. Paid <code>tools/call</code> needs{" "}
        <code>Authorization: Bearer</code>. <code>hold</code> is public, cost
        0, and is not a record search.
      </p>
      <pre className="intel-docs-pre" tabIndex={0}>{`curl -sS -X POST '${MCP_URL}' \\
  -H 'content-type: application/json' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"example","version":"0"}}}'`}</pre>
    </IntelChrome>
  );
}
