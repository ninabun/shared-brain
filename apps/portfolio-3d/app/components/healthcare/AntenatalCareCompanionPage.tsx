"use client";

import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Shell } from "./Shared";
import styles from "./Healthcare.module.css";

export default function AntenatalCareCompanionPage() {
  return (
    <Shell>
      <section className={styles.applicationHero}>
        <a className={styles.breadcrumb} href="/#platform">
          <ArrowLeft size={15} />
          Healthcare Intelligence · Workflow Products
        </a>
        <div className={styles.eyebrow}>Patient Experience / Maternity Care</div>
        <h1 className={styles.h1}>Personalised guidance throughout the antenatal journey.</h1>
        <p className={styles.lead}>
          A pregnancy-support app that provides gestation-specific information, investigation schedules,
          approved education and a governed pathway for raising clinical concerns.
        </p>
        <div className={styles.actions}>
          <a
            className={`${styles.button} ${styles.primary}`}
            href="https://antenatal-care-companion.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Open Live Demo
          </a>
        </div>
        <div className={styles.safetyControl}>
          <ShieldCheck />
          <strong>Safety boundary</strong>
          <p>
            The app supports information, communication and escalation. It does not replace maternity
            assessment, emergency services or clinical judgement.
          </p>
        </div>
      </section>
    </Shell>
  );
}
