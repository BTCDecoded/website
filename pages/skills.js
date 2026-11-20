import Link from "next/link";
import CopyField from "../components/CopyField";
import IntelChrome from "../components/IntelChrome";
import { MCP_URL } from "../lib/api";

const CLAUDE_CODE = `claude plugin marketplace add BTCDecoded/website
claude plugin install btcdecoded-intelligence@btcdecoded`;

const CLAUDE_CODE_ONE = `claude plugin install btcdecoded-intelligence --marketplace BTCDecoded/website`;

const CURSOR_MCP = `{
  "mcpServers": {
    "btcdecoded": {
      "url": "${MCP_URL}",
      "headers": {
        "Authorization": "Bearer \${env:BTCDECODED_API_KEY}"
      }
    }
  }
}`;

const CODEX_MCP = `[mcp_servers.btcdecoded]
url = "${MCP_URL}"
bearer_token_env_var = "BTCDECODED_API_KEY"`;

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

const CURL_INIT = `curl -sS -X POST '${MCP_URL}' \\
  -H 'content-type: application/json' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"example","version":"0"}}}'`;

export default function SkillsPage() {
  return (
    <IntelChrome title="Skills" heading={false}>
      <article className="intel-hero">
        <div className="intel-hero__copy">
          <p className="intel-hero__kicker">BTCDecoded Intelligence</p>
          <h1>Connect an agent to the index</h1>
          <p className="intel-hero__lede">
            Install the skill so Bitcoin Core, BIP, PR, and governance questions
            hit Intelligence instead of model memory. Pay on{" "}
            <Link href="/subscribe/">Checkout</Link>; the key stays on{" "}
            <Link href="/account/">Account</Link>. Claude.ai uses OAuth. Cursor,
            Claude Code, Codex, and other HTTP clients use{" "}
            <code>Authorization: Bearer</code>.
          </p>
          <div className="hero-ctas">
            <a
              href="/skills/btcdecoded-intelligence.zip"
              className="btn btn-primary"
            >
              Download skill zip
            </a>
            <Link href="/subscribe/" className="btn btn-secondary">
              Get a key
            </Link>
            <Link href="/account/" className="btn btn-outline">
              Account
            </Link>
          </div>
        </div>
        <ul className="intel-hero__facts" aria-label="Skill at a glance">
          <li>
            <span className="intel-hero__k">MCP</span>
            <span>Streamable HTTP</span>
          </li>
          <li>
            <span className="intel-hero__k">Skill</span>
            <span>btcdecoded-intelligence</span>
          </li>
          <li>
            <span className="intel-hero__k">Pay</span>
            <span>Lightning</span>
          </li>
          <li>
            <span className="intel-hero__k">Auth</span>
            <span>OAuth or Bearer</span>
          </li>
        </ul>
      </article>

      <nav className="intel-docs-toc" aria-label="On this page">
        <a href="#skill-usage">Usage</a>
        <a href="#skill-claude">Claude</a>
        <a href="#skill-claude-code">Claude Code</a>
        <a href="#skill-cursor">Cursor</a>
        <a href="#skill-codex">Codex</a>
        <a href="#skill-generic">Other clients</a>
      </nav>

      <section className="intel-docs-block" id="skill-usage">
        <h2>Usage</h2>
        <p>
          On Bitcoin Core, BIPs, a GitHub PR or issue, a contributor, consensus,
          spec versus implementation, a CVE or incident, soft fork activation,
          governance precedent, or a mailing-list or forum claim: call this MCP
          first. Search or a <code>find_*</code> tool, then{" "}
          <code>get_passage</code>{" "}
          before a quote, <code>verify_claim</code> before a specific fact,{" "}
          <code>analyze_pr</code> or <code>analyze_issue</code> for a GitHub
          URL. Cite snapshot ids and as_of dates. If the index has no passage,
          stop. Do not treat Bitcoin Core’s current behavior as the spec.
        </p>
        <p>
          Endpoint <code>{MCP_URL}</code>. After initialize, clients that
          support MCP prompts can run <code>review_pr</code>,{" "}
          <code>verify_governance_claim</code>,{" "}
          <code>find_proposal_precedent</code>,{" "}
          <code>profile_bip_discourse</code>. The skill is also{" "}
          <code>resources/read</code> at{" "}
          <code>intel://skill/btcdecoded-intelligence</code>. Files:{" "}
          <a href="/skills/SKILL.md">SKILL.md</a>,{" "}
          <a href="/skills/btcdecoded-intelligence.zip">zip</a>,{" "}
          <a href="/skills/AGENTS.md">AGENTS.md</a>.
        </p>
      </section>

      <section className="intel-docs-block" id="skill-claude">
        <h2>Claude</h2>
        <p>
          Custom skills are a ZIP of the skill folder, uploaded in Customize (
          <a href="https://support.claude.com/en/articles/12512180-how-to-create-custom-skills">
            Use skills in Claude
          </a>
          ).
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
            Settings → Capabilities: turn on Code execution and file creation.
          </li>
          <li>Customize → Skills → + → Create skill → Upload a skill.</li>
          <li>
            Toggle the skill on. Connect the MCP connector from Account (OAuth).
            Do not paste the Bearer key into Claude.ai.
          </li>
        </ol>
      </section>

      <section className="intel-docs-block" id="skill-claude-code">
        <h2>Claude Code</h2>
        <p>
          Add this site’s git repo as a marketplace, then install the plugin (
          <a href="https://code.claude.com/docs/en/plugin-marketplaces">
            plugin marketplaces
          </a>
          ). One install loads the skill and the MCP server. Paste the Bearer
          key from Account when asked.
        </p>
        <CopyField value={CLAUDE_CODE} label="Copy" multiline />
        <p>
          One step, Claude Code v2.1.292 or later in the shell (v2.1.275 in a
          session):
        </p>
        <CopyField value={CLAUDE_CODE_ONE} label="Copy" multiline />
      </section>

      <section className="intel-docs-block" id="skill-cursor">
        <h2>Cursor</h2>
        <p>
          Streamable HTTP in <code>mcp.json</code> (
          <a href="https://cursor.com/docs/context/mcp">Cursor MCP</a>
          ). Put the skill folder under <code>~/.cursor/skills/</code> or{" "}
          <code>.cursor/skills/</code> (
          <a href="https://cursor.com/docs/context/skills">Agent Skills</a>
          ).
        </p>
        <CopyField value={CURSOR_MCP} label="Copy mcp.json" multiline />
        <p>
          User-wide: <code>~/.cursor/mcp.json</code>. This repo:{" "}
          <code>.cursor/mcp.json</code>. Then unzip{" "}
          <a href="/skills/btcdecoded-intelligence.zip">the zip</a> into{" "}
          <code>~/.cursor/skills/</code> so the path is{" "}
          <code>~/.cursor/skills/btcdecoded-intelligence/SKILL.md</code>.
        </p>
      </section>

      <section className="intel-docs-block" id="skill-codex">
        <h2>Codex</h2>
        <p>
          MCP is a Streamable HTTP table in <code>~/.codex/config.toml</code> or
          project <code>.codex/config.toml</code> (
          <a href="https://developers.openai.com/codex/mcp">Codex MCP</a>
          ). Codex also reads <code>AGENTS.md</code> from the repo root (
          <a href="https://developers.openai.com/codex/guides/agents-md">
            AGENTS.md
          </a>
          ).
        </p>
        <CopyField value={CODEX_MCP} label="Copy config.toml" multiline />
        <p>
          Drop this snippet into the Bitcoin repo’s <code>AGENTS.md</code>, or
          download <a href="/skills/AGENTS.md">AGENTS.md</a>:
        </p>
        <CopyField value={AGENTS_SNIPPET} label="Copy AGENTS.md" multiline />
      </section>

      <section className="intel-docs-block" id="skill-generic">
        <h2>Other clients</h2>
        <p>
          JSON-RPC 2.0 over <code>POST {MCP_URL}</code>, protocol version{" "}
          <code>2024-11-05</code>. <code>initialize</code> returns{" "}
          <code>instructions</code> plus <code>capabilities.tools</code>,{" "}
          <code>prompts</code>, and <code>resources</code>.{" "}
          <code>tools/list</code> is public. Paid <code>tools/call</code> needs{" "}
          <code>Authorization: Bearer</code>. <code>hold</code> is public, cost
          0, and is not a record search.
        </p>
        <CopyField value={CURL_INIT} label="Copy curl" multiline />
      </section>
    </IntelChrome>
  );
}
