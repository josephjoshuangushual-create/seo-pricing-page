

"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { CheckCircle2, Search, PenTool, TrendingUp, Rocket } from "lucide-react";

/**
 * SEO Pricing Landing Page (React + Tailwind) — JS version
 * - All sections included
 * - Growth card has green "Best Value" badge
 * - Final CTA "See Packages" anchors to #packages
 */

// ---------- shared helpers ----------
const btnPrimary =
  "rounded-2xl bg-[#1b2a4a] hover:bg-[#16233d] text-white shadow-sm transition-colors duration-200 active:scale-[.98]";
const btnSecondary =
  "rounded-2xl border border-[#1b2a4a] text-[#1b2a4a] hover:bg-[#e9f1ff] transition-colors duration-200 active:scale-[.98]";

const Section = ({ id, children, className = "" }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className={`scroll-mt-32 py-16 md:py-24 ${className}`}
  >
    {children}
  </motion.section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Divider = () => (
  <div className="mx-auto my-4 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-slate-300/60 to-transparent dark:via-slate-700/60" />
);

const ListItem = ({ children }) => (
  <li className="flex items-start gap-3 leading-relaxed">
    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
    <span>{children}</span>
  </li>
);

const Price = ({ amount }) => (
  <div className="text-3xl font-extrabold tracking-tight md:text-4xl">
    ${Number(amount).toLocaleString()}
    <span className="text-base font-medium text-muted-foreground"> / month</span>
  </div>
);

// ---------- typewriter hook (JS) ----------
function useTypewriter(phrases, opts = {}) {
  const { type = 70, erase = 45, pause = 1100, loop = true } = opts;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("type"); // "type" | "pause" | "erase"

  useEffect(() => {
    let t;
    const full = phrases[index];
    if (phase === "type") {
      if (text.length < full.length) t = setTimeout(() => setText(full.slice(0, text.length + 1)), type);
      else t = setTimeout(() => setPhase("pause"), pause);
    } else if (phase === "pause") {
      t = setTimeout(() => setPhase("erase"), 500);
    } else if (phase === "erase") {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), erase);
      else {
        setPhase("type");
        setIndex((i) => (loop ? (i + 1) % phrases.length : Math.min(i + 1, phrases.length - 1)));
      }
    }
    return () => t && clearTimeout(t);
  }, [text, phase, index, phrases, type, erase, pause, loop]);

  return { text, index, phase };
}

export default function SEOPricingLandingPage() {
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // smooth anchor scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // hero typing
  const heroPhrases = useMemo(() => ["Get Found.", "Get Leads.", "Grow Smarter with SEO."], []);
  const longest = useMemo(() => Math.max(...heroPhrases.map((s) => s.length)), [heroPhrases]);
  const { text: typed, index: typedIndex, phase: typedPhase } = useTypewriter(heroPhrases);

  // ROI modal
  const [showROI, setShowROI] = useState(false);
  const [visitors, setVisitors] = useState(1000);
  const [conversion, setConversion] = useState(2);
  const [value, setValue] = useState(100);
  const leads = Math.round(visitors * (conversion / 100));
  const revenue = leads * value;

  // process timeline (center line + single moving dot)
  const steps = useMemo(
    () => [
      { title: "1. Discover", body: "Audit, analytics, baseline KPIs, competitor research." },
      { title: "2. Plan", body: "Roadmap across technical, content, links, local. Prioritize by impact." },
      { title: "3. Build", body: "Implement fixes, publish and optimize content, run outreach." },
      { title: "4. Scale", body: "Monthly check-ins; quarterly deep-dives; double-down on winners." },
    ],
    []
  );
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [dotPos, setDotPos] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-index") || "0", 10);
            setActiveStep(idx);
            setDotPos(entry.target.offsetTop + entry.target.clientHeight / 2);
          }
        });
      },
      { threshold: 0.6 }
    );
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll("[data-index]");
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      {/* HERO */}
      <Section id="hero" className="relative text-white text-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_10%,rgba(59,130,246,0.25),transparent_60%),linear-gradient(to_bottom,#0B1224,rgba(11,18,36,0.92))]"
        />
        <Container>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="inline-block align-top whitespace-nowrap" style={{ minWidth: `${longest}ch` }}>
              {typedIndex === 2 && typedPhase !== "erase" ? (
                <>
                  <span className="text-[#4da3ff]">Grow Smarter</span> with SEO.
                </>
              ) : (
                typed
              )}
            </span>
            <span className="ml-1 inline-block h-[1.2em] w-[2px] bg-white/90 animate-pulse align-middle" />
          </h1>
          <p className="mb-8 text-lg md:text-xl text-slate-200/90">
            Transparent pricing, proven results, no long-term contracts.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className={btnPrimary}>
              <a href="https://calendly.com/josephjoshua/discovery-call">Book My Free SEO Call</a>
            </Button>
            <Button asChild size="lg" variant="outline" className={btnSecondary}>
              <a href="#packages" onClick={(e) => { e.preventDefault(); goTo('packages'); }}>See Packages</a>
            </Button>
          </div>
        </Container>
        <Divider />
      </Section>

      {/* PROBLEM & SOLUTION */}
      <Section
        id="problem-solution"
        className="bg-gradient-to-b from-white to-white/60 dark:from-slate-950 dark:to-slate-950/60"
      >
        <Container>
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">The Problem & Our Solution</h2>
          <p className="text-slate-700 dark:text-slate-300 max-w-3xl">
            Competitors outrank you. Ads get pricier every month. Without SEO, you’re invisible to buyers already
            searching for what you sell. We turn invisibility into discoverability with a compound-growth SEO system:
            fix what’s broken, publish what earns, and earn links that last.
          </p>
        </Container>
        <Divider />
      </Section>

      {/* PACKAGES */}
      <Section id="packages" className="bg-slate-50/70 dark:bg-slate-950/40">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">SEO Packages</h2>
        <div className="grid gap-8 md:grid-cols-3">
            {/* Growth */}
            <Card className="relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(2,6,23,0.25)]">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white shadow-[0_0_18px_rgba(22,163,74,0.45)]">
                Best Value
              </Badge>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Growth</h3>
                <Price amount={1500} />
                <ul className="mt-6 space-y-3 text-sm">
                  <ListItem>Streamlined audit + keyword research</ListItem>
                  <ListItem>On-page SEO (titles, metas, headers, internal links)</ListItem>
                  <ListItem>Content plan + 2–4 content pieces/mo</ListItem>
                  <ListItem>Basic Local SEO (GBP optimization + local targeting)</ListItem>
                  <ListItem>Ethical link outreach</ListItem>
                  <ListItem>Monthly check-ins + quarterly reports</ListItem>
                </ul>
                <div className="mt-6">
                  <Button asChild className={btnPrimary}>
                    <a href="https://calendly.com/josephjoshua/discovery-call">Choose Growth</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Authority */}
            <Card className="relative border-2 border-blue-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(30,64,175,0.35)]">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white shadow-[0_0_18px_rgba(37,99,235,0.45)]">
                Most Popular
              </Badge>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Authority</h3>
                <Price amount={3745} />
                <ul className="mt-6 space-y-3 text-sm">
                  <ListItem>Deep audit + competitor analysis</ListItem>
                  <ListItem>Technical SEO (speed, CWV, crawlability, indexing)</ListItem>
                  <ListItem>Content at scale + topic clusters/pillar pages</ListItem>
                  <ListItem>Multi-location Local SEO + review strategy</ListItem>
                  <ListItem>Link building + digital PR</ListItem>
                  <ListItem>Monthly check-ins + quarterly ROI reports</ListItem>
                </ul>
                <div className="mt-6">
                  <Button asChild className={btnPrimary}>
                    <a href="https://calendly.com/josephjoshua/discovery-call">Choose Authority</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Custom */}
            <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(2,6,23,0.25)]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Custom</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Flexible scope tailored to your business. Contact us to design a plan that fits your needs.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button asChild className={btnPrimary}>
                    <a href="https://calendly.com/josephjoshua/discovery-call">Start Custom</a>
                  </Button>
                  <Button asChild variant="outline" className={btnSecondary}>
                    <a href="#compare">Compare Plans</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
        <Divider />
      </Section>

      {/* COMPARE PLANS */}
      <Section id="compare" className="bg-white/70 dark:bg-slate-950/30">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Compare Plans</h2>
          <table className="w-full text-left border-collapse overflow-hidden rounded-xl">
            <thead className="border-b bg-slate-100/70 dark:bg-slate-800/70 backdrop-blur text-slate-900 dark:text-white">
              <tr>
                <th className="p-4">Feature</th>
                <th className="p-4">Growth</th>
                <th className="p-4">Authority</th>
                <th className="p-4">Custom</th>
              </tr>
            </thead>
            <tbody className="text-slate-800 dark:text-slate-200">
              <tr>
                <td className="p-4">SEO Audit & Strategy</td>
                <td className="p-4">Included</td>
                <td className="p-4">Included</td>
                <td className="p-4">Included</td>
              </tr>
              <tr className="bg-black/[.02] dark:bg-white/[.04]">
                <td className="p-4">On-Page SEO</td>
                <td className="p-4">Included</td>
                <td className="p-4">Included</td>
                <td className="p-4">Optional</td>
              </tr>
              <tr>
                <td className="p-4">Technical SEO</td>
                <td className="p-4">—</td>
                <td className="p-4">Included</td>
                <td className="p-4">Optional</td>
              </tr>
              <tr className="bg-black/[.02] dark:bg-white/[.04]">
                <td className="p-4">Content SEO</td>
                <td className="p-4">2–4/mo</td>
                <td className="p-4">Scale</td>
                <td className="p-4">As scoped</td>
              </tr>
              <tr>
                <td className="p-4">Local SEO</td>
                <td className="p-4">Basic</td>
                <td className="p-4">Multi-location</td>
                <td className="p-4">As scoped</td>
              </tr>
              <tr className="bg-black/[.02] dark:bg-white/[.04]">
                <td className="p-4">Off-Page SEO</td>
                <td className="p-4">Link outreach</td>
                <td className="p-4">PR + Links</td>
                <td className="p-4">As scoped</td>
              </tr>
              <tr>
                <td className="p-4">Reporting</td>
                <td className="p-4">Monthly + Quarterly</td>
                <td className="p-4">Monthly + Quarterly ROI</td>
                <td className="p-4">Flexible</td>
              </tr>
            </tbody>
          </table>
        </Container>
        <Divider />
      </Section>

      {/* WHAT TO EXPECT */}
      <Section id="journey" className="bg-slate-900 text-white">
        <Container>
          <h2 className="text-3xl font-bold mb-10 text-center">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <Search className="h-10 w-10 mx-auto text-blue-400" />, title: "Months 1–2", text: "Audit & foundation. Don’t expect big jumps yet." },
              { icon: <PenTool className="h-10 w-10 mx-auto text-green-400" />, title: "Months 3–4", text: "Early wins: keywords start moving, traffic stabilizes." },
              { icon: <TrendingUp className="h-10 w-10 mx-auto text-yellow-400" />, title: "Months 5–6", text: "Growth momentum. Rankings lift, leads start flowing." },
              { icon: <Rocket className="h-10 w-10 mx-auto text-red-400" />, title: "6+", text: "Compounding results. Your SEO snowball effect." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-slate-800/50 ring-1 ring-white/10 hover:bg-slate-800 transition-colors shadow-md hover:shadow-xl text-center"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
        <Divider />
      </Section>

      {/* WHY OUR PRICING WORKS */}
      <Section id="costs" className="bg-slate-50 dark:bg-slate-800">
        <Container className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Why Our Pricing Works</h2>
            <p className="text-slate-700 dark:text-slate-300">
              Our packages are built in line with U.S. benchmarks (Ahrefs, Backlinko) — competitive, transparent, and ROI-focused.
            </p>
          </div>
          <div className="text-center bg-white dark:bg-slate-900 rounded-2xl p-6 shadow">
            <p className="text-4xl font-bold text-blue-600">$1,000–$7,500/mo</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Average U.S. SEO pricing benchmark</p>
          </div>
        </Container>
        <Divider />
      </Section>

      {/* ROI */}
      <Section id="roi" className="bg-slate-900 text-white">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">See Your ROI</h2>
          <p className="text-center mb-6 text-slate-300">Estimate how SEO pays off vs paid ads.</p>
          <div className="text-center">
            <Button className={btnSecondary} onClick={() => setShowROI(true)}>Launch ROI Calculator</Button>
          </div>
          {showROI && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">ROI Calculator</h3>
                <label className="block mb-2 text-sm">Monthly Visitors</label>
                <input type="number" value={visitors} onChange={(e) => setVisitors(Number(e.target.value))} className="w-full mb-4 rounded border p-2" />
                <label className="block mb-2 text-sm">Conversion Rate (%)</label>
                <input type="number" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} className="w-full mb-4 rounded border p-2" />
                <label className="block mb-2 text-sm">Value per Lead ($)</label>
                <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full mb-4 rounded border p-2" />
                <p className="mt-2 text-slate-800 dark:text-slate-200">Estimated Leads: {leads}</p>
                <p className="mb-4 text-slate-800 dark:text-slate-200">Estimated Revenue: ${revenue}</p>
                <div className="flex justify-end gap-3">
                  <Button className={btnSecondary} onClick={() => setShowROI(false)}>Close</Button>
                </div>
              </div>
            </div>
          )}
        </Container>
        <Divider />
      </Section>

      {/* PROCESS TIMELINE */}
      <Section id="process" className="bg-[#0b1224]">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl text-white">Our Process</h2>
          <div className="relative mx-auto max-w-4xl" ref={containerRef}>
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-slate-700" />
            <div className="absolute left-1/2 z-20 hidden h-6 w-6 -translate-x-1/2 rounded-full border-4 border-[#0b1224] bg-blue-500 shadow-[0_0_0_6px_rgba(30,64,175,0.15)] md:block animate-pulse" style={{ top: `${dotPos}px`, transition: "top 400ms ease-in-out" }} />
            {steps.map((step, i) => (
              <div key={i} data-index={i} className={`mb-24 flex w-full items-center justify-between ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className="w-5/12">
                  <Card className={`rounded-2xl border p-6 shadow-md transition-all duration-300 ${activeStep === i ? "bg-blue-600 text-white border-blue-400 shadow-lg" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300"}`}>
                    <CardContent className="p-0">
                      <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm">{step.body}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </Container>
        <Divider />
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials" className="bg-slate-900 text-white">
        <Container>
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Results Our Clients Talk About</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Ava R.", role: "DTC Skincare", quote: "Within 6 months, organic revenue became our #1 channel. The quarterly ROI reviews keep us focused on what works." },
              { name: "Marcus T.", role: "B2B SaaS", quote: "Technical cleanup + content clusters unlocked rankings we chased for a year. Consistent leads every week now." },
              { name: "Lena K.", role: "Multi-location Clinic", quote: "Local pages + reviews strategy lifted calls across all locations. Transparent, methodical, effective." },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <Card className="rounded-2xl bg-white dark:bg-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                  <CardContent className="pt-6 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-content-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 dark:from-slate-700 dark:to-slate-600">{t.name.charAt(0)}</div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{t.name}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">{t.role}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-yellow-500" aria-label="5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg key={s} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      ))}
                    </div>
                    <p className="mt-3 italic text-slate-700 dark:text-slate-300">“{t.quote}”</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
        <Divider />
      </Section>

      {/* FAQS */}
      <Section id="faqs" className="bg-slate-900 text-white">
        <Container>
          <h2 className="text-3xl font-bold mb-6 text-center">Your Guide To Most Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="font-semibold text-lg">How long before I see results?</h3>
              <p className="mt-2 text-slate-300">SEO is a long-term investment. Early improvements often appear in <strong>2–3 months</strong> as we fix foundations and optimize your content. More consistent ranking lifts and traffic growth typically occur between <strong>months 4–6</strong>, with stronger compounding results beyond month 6. Unlike ads, SEO continues to pay off long after the work is done.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Do I need a contract?</h3>
              <p className="mt-2 text-slate-300">No. We don’t lock clients into long-term contracts. Our services are <strong>month-to-month</strong> so you have full flexibility. We aim to earn your trust with results, not paperwork.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Can I switch packages?</h3>
              <p className="mt-2 text-slate-300">Yes. Your business isn’t static, and neither is your SEO. You can upgrade, downgrade, or move to a custom plan anytime. We’ll recommend changes if we see a better fit for your goals.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Do you provide reports?</h3>
              <p className="mt-2 text-slate-300">Absolutely. We do <strong>monthly check-ins</strong> where we review progress, quick wins, and next steps with you. Every <strong>quarter</strong>, you’ll receive a comprehensive report covering rankings, traffic, conversions, and competitor movement — so you always know how your SEO investment is performing.</p>
            </div>
          </div>
        </Container>
        <Divider />
      </Section>

      {/* FINAL CTA */}
      <Section id="cta" className="relative text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_10%,rgba(59,130,246,0.18),transparent_60%),linear-gradient(to_bottom,#0B1224,rgba(11,18,36,0.96))]" />
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to grow smarter with SEO?</h2>
          <p className="mt-3 text-slate-200/90">Transparent pricing. No contracts. Real traction.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className={btnPrimary} asChild><a href="https://calendly.com/josephjoshua/discovery-call" target="_blank" rel="noreferrer">Book My Free SEO Call</a></Button>
            <Button size="lg" variant="outline" className={btnSecondary} asChild><a href="#packages" onClick={(e) => { e.preventDefault(); goTo('packages'); }}>See Packages</a></Button>
          </div>
        </Container>
      </Section>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-slate-900/80 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <Button asChild className="w-full rounded-2xl bg-[#1b2a4a] hover:bg-[#16233d] text-white"><a href="https://calendly.com/josephjoshua/discovery-call">Book My Free SEO Call</a></Button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-black/10 py-8 text-sm dark:border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-muted-foreground">© {new Date().getFullYear()} SEO Growth Studio</span>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a className="hover:text-[#1b2a4a] transition-colors" href="#packages">Packages</a>
            <a className="hover:text-[#1b2a4a] transition-colors" href="#compare">Compare</a>
            <a className="hover:text-[#1b2a4a] transition-colors" href="#faqs">FAQs</a>
          </div>
        </Container>
      </footer>
    </>
  );
}
