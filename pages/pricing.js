import { useState } from "react";
import Link from "next/link";
import { PLANS, USD_NOTE } from "../lib/api";
import IntelChrome from "../components/IntelChrome";

function PlanCard({ plan }) {
  const [sku, setSku] = useState(plan.options[0].id);
  const opt = plan.options.find((o) => o.id === sku) || plan.options[0];
  return (
    <article
      className={`intel-plan${plan.featured ? " intel-plan--featured" : ""}`}
    >
      {plan.featured ? <p className="intel-plan-badge">Includes PR review</p> : null}
      <h3>{plan.label}</h3>
      <p className="intel-plan-blurb">{plan.blurb}</p>
      <p className="intel-plan-price">
        <span className="intel-plan-sats">{opt.sats.toLocaleString()}</span>
        <span className="intel-plan-unit"> sats</span>
      </p>
      <p className="intel-plan-meta">
        {opt.days} days · {opt.usd} reference
      </p>
      <div className="intel-plan-toggle" role="group" aria-label="Term">
        {plan.options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={o.id === sku ? "is-on" : ""}
            onClick={() => setSku(o.id)}
          >
            {o.days}d
          </button>
        ))}
      </div>
      <ul className="intel-plan-list">
        {plan.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link href={`/subscribe/?plan=${encodeURIComponent(sku)}`} className="btn btn-primary">
        Continue to checkout
      </Link>
    </article>
  );
}

export default function PricingPage() {
  return (
    <IntelChrome
      title="Plans"
      lede="Time-limited access, paid in testnet sats. Same tools on every term; Developer adds an advisory PR scaffold."
    >
      <div className="intel-plan-grid">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <p className="intel-fineprint">
        {USD_NOTE} Lightning invoices are created by OpenNode (custodial until
        ops withdraw from the OpenNode dashboard). Trial is 15k sats if OpenNode
        accepts that charge; otherwise use Researcher. Included: joined findings,
        maps, Core history, selected source, informal channels. Already free: a
        single GitHub PR, Core <code>doc/</code>, published articles.
      </p>
    </IntelChrome>
  );
}
