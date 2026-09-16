import { useState } from "react";
import Link from "next/link";
import { PLANS } from "../lib/api";
import { usdApprox, useBtcUsd } from "../lib/btcUsd";
import IntelChrome from "../components/IntelChrome";

function PlanCard({ plan, btcUsd }) {
  const [sku, setSku] = useState(plan.options[0].id);
  const opt = plan.options.find((o) => o.id === sku) || plan.options[0];
  const many = plan.options.length > 1;
  const usd = usdApprox(opt.sats, btcUsd);
  return (
    <article
      className={`intel-plan${plan.featured ? " intel-plan--featured" : ""}`}
    >
      {plan.featured ? (
        <p className="intel-plan-badge">Includes PR review</p>
      ) : (
        <p className="intel-plan-badge intel-plan-badge--quiet" aria-hidden="true">
          &nbsp;
        </p>
      )}
      <h3>{plan.label}</h3>
      <p className="intel-plan-blurb">{plan.blurb}</p>
      <p className="intel-plan-price">
        <span className="intel-plan-sats">{opt.sats.toLocaleString()}</span>
        <span className="intel-plan-unit"> sats</span>
      </p>
      <p className="intel-plan-meta">
        {opt.days} days{usd ? ` · ${usd}` : ""}
      </p>
      {many ? (
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
      ) : (
        <div className="intel-plan-toggle intel-plan-toggle--spacer" />
      )}
      <ul className="intel-plan-list">
        {plan.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link
        href={`/subscribe/?plan=${encodeURIComponent(sku)}`}
        className="btn btn-primary"
      >
        Get {plan.label}
      </Link>
    </article>
  );
}

export default function PricingPage() {
  const btcUsd = useBtcUsd();
  return (
    <IntelChrome title="Plans">
      <div className="intel-plan-grid">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} btcUsd={btcUsd} />
        ))}
      </div>
    </IntelChrome>
  );
}
