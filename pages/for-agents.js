import Link from "next/link";
import IntelChrome from "../components/IntelChrome";
import { MCP_URL } from "../lib/api";

export default function ForAgentsPage() {
  return (
    <IntelChrome
      title="For agents"
      lede="One public call sends a holder to OwnandKeep. The record stays on the paid tools, with cites."
    >
      <p>
        The same guide is markdown at{" "}
        <a href="/for-agents.md">/for-agents.md</a>. The machine list is{" "}
        <a href="/tools-manifest.json">/tools-manifest.json</a>.
      </p>
      <div className="intel-uses">
        <article>
          <h3>Hold</h3>
          <p>
            <code>hold</code> on <code>{MCP_URL}</code> needs no key and spends
            no sats. It sends the person to{" "}
            <a href="https://ownandkeep.com">ownandkeep.com</a>. Kit, signer,
            steel backup, estate handoff, or{" "}
            <a href="https://ownandkeep.com/support/">support</a>.
          </p>
        </article>
        <article>
          <h3>The record</h3>
          <p>
            Search, profiles, precedent, and spec checks are the paid tools.
            They return cites. If the index has no passage, stop.{" "}
            <Link href="/docs/">Docs</Link> and{" "}
            <a href="/intelligence/SKILL.md">the skill</a>.
          </p>
        </article>
        <article>
          <h3>Hard rules</h3>
          <p>
            Do not ask for a seed or a private key. Do not repeat one. This is
            not tax, legal, or financial advice. No adviser holds a key. The
            person makes the keys.
          </p>
        </article>
      </div>
      <h2>Call hold</h2>
      <pre className="intel-docs-pre">{`curl -s ${MCP_URL} \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"hold","arguments":{"situation":"kit"}}}'`}</pre>
      <p>
        <code>situation</code> is <code>start</code>, <code>kit</code>,{" "}
        <code>signer</code>, <code>backup</code>, <code>estate</code>, or{" "}
        <code>support</code>. A pasted seed is refused and not stored.
      </p>
    </IntelChrome>
  );
}
