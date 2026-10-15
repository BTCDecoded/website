import { useEffect, useState } from "react";
import Link from "next/link";
import { PLANS, activeSku, isUpgradeSku } from "../lib/api";
import { usdApprox, useBtcUsd } from "../lib/btcUsd";
import IntelChrome from "../components/IntelChrome";
import { consumeSessionFromHash, fetchMe } from "../lib/auth";

function PlanCard({ plan, btcUsd, current }) {
  const [sku, setSku] = useState(plan.options[0].id);
  const opt = plan.options.find((o) => o.id === sku) || plan.options[0];
  const many = plan.options.length > 1;
  const usd = usdApprox(opt.sats, btcUsd);
  const isCurrent = current && current === sku;
  const canUpgrade = current ? isUpgradeSku(current, sku) : true;
  const cta = isCurrent
    ? "Current plan"
    : current && canUpgrade
      ? `Upgrade to ${plan.label}`
      : current && !canUpgrade
        ? "Included"
        : `Get ${plan.label}`;
  return (
    <article
      className={`intel-plan${plan.featured ? " intel-plan--featured" : ""}`}
    >
      {isCurrent ? (
        <p className="intel-plan-badge">Your plan</p>
      ) : plan.featured ? (
        <p className="intel-plan-badge">PR review + automation</p>
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
      {isCurrent || (current && !canUpgrade) ? (
        <Link href="/account/" className="btn btn-secondary">
          {cta}
        </Link>
      ) : (
        <Link
          href={`/subscribe/?plan=${encodeURIComponent(sku)}`}
          className="btn btn-primary"
        >
          {cta}
        </Link>
      )}
    </article>
  );
}

export default function PricingPage() {
  const btcUsd = useBtcUsd();
  const [user, setUser] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await consumeSessionFromHash();
      try {
        const me = await fetchMe();
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) setUser(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const current = activeSku(user);
  return (
    <IntelChrome title="Plans">
      <p className="intel-lede">
        {current
          ? "This key already has a plan. An upgrade charges only the sat difference and adds those sats to the same balance. Top up on Account whenever you want more credits. The daily cap stays with the plan."
          : "Pay once, get a key, and the sats on the invoice become query credits. Every query spends a little of that balance. Each plan also has a daily cap, so heavy days pause even when credits remain."}
      </p>
      <div className="intel-plan-grid">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} btcUsd={btcUsd} current={current} />
        ))}
      </div>
      <h2>How usage works</h2>
      <div className="intel-uses">
        <article>
          <h3>The price is your balance</h3>
          <p>
            The sats on the card are loaded onto your key. A query spends a
            few of them after it runs. Account shows the balance and about
            how many queries that covers at your recent rate.
          </p>
        </article>
        <article>
          <h3>The daily cap is separate</h3>
          <p>
            Trial is 50 queries a day, Researcher 250, Developer 500. At the
            cap, queries wait until midnight UTC. A top-up does not raise
            the cap.
          </p>
        </article>
        <article>
          <h3>Out of sats, top up</h3>
          <p>
            At zero sats, queries stop until you pay a Lightning invoice on
            Account. That adds credits to this key. It does not add days or
            change the plan.
          </p>
        </article>
      </div>
      <p className="intel-lede">
        When the plan date ends, queries stop until you renew. Sats still on
        the key stay on it. Show the key on <Link href="/account/">Account</Link>{" "}
        to see credits, recent queries, and the top-up.
      </p>
    </IntelChrome>
  );
}
