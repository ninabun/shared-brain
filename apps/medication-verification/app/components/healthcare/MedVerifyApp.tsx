"use client";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  FileText,
  Info,
  Pill,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { demoCases } from "./medication-cases";
import {
  medicationCatalogue,
  medicationCatalogueByName,
} from "./medication-catalogue";
import styles from "./MedVerifyApp.module.css";

const statusLabel = {
  MATCH: "Matched",
  REVIEW: "Review",
  MISMATCH: "Mismatch",
} as const;
type Result = "MATCH" | "REVIEW" | "MISMATCH";
type WorkflowState =
  | "DRAFT"
  | "COMPARING"
  | "MATCHED"
  | "DOCTOR_AMENDMENT"
  | "NURSE_ACKNOWLEDGED"
  | "PHARMACY_VETTED"
  | "PHARMACY_ESCALATED"
  | "CLOSED";
type Patient = {
  id: string;
  name: string;
  mrn: string;
  hn: string;
  sex: string;
  dob: string;
  ward: string;
  bed: string;
  generated: string;
  medications: (typeof demoCases)[number][];
};
type OrderInput = {
  medication: string;
  dose: string;
  route: string;
  frequency: string;
  prn: string;
  specialInstructions: string;
  prnCondition: string;
  courseDuration: string;
};
type LiveRun = {
  key: string;
  patientId: string;
  eDoc: OrderInput;
  ipmoe: OrderInput;
  result: Result;
  created: string;
  nurseAcknowledged?: boolean;
  workflowState: WorkflowState;
};
type PharmacyEscalation = {
  key: string;
  patientId: string;
  medId: string;
  medication: string;
  note: string;
  created: string;
  forwardedToDoctor?: boolean;
};
type AppView =
  | "ordering"
  | "doctor"
  | "overview"
  | "dashboard"
  | "pharmacy"
  | "rules";
const governanceVersions={ruleSet:"MCV-RULES-0.2",n8n:"N8N-MEDVERIFY-0.2",ai:"EXPLANATION-DEMO-1",terminology:"HA-DEMO-TERM-2026.07"} as const;
const patients: Patient[] = [
  {
    id: "P001",
    name: "CHAN Tai Man",
    mrn: "MRN-100238",
    hn: "HN-310482-1",
    sex: "Male",
    dob: "22 Jan 1949",
    ward: "8A",
    bed: "03",
    generated: "18 min ago",
    medications: [
      demoCases[0],
      demoCases[11],
      demoCases[22],
      demoCases[3],
      demoCases[14],
      demoCases[25],
    ],
  },
  {
    id: "P002",
    name: "LEE Mei Ling",
    mrn: "MRN-104891",
    hn: "HN-284019-4",
    sex: "Female",
    dob: "08 Sep 1966",
    ward: "8A",
    bed: "07",
    generated: "32 min ago",
    medications: [
      demoCases[16],
      demoCases[7],
      demoCases[18],
      demoCases[9],
      demoCases[0],
    ],
  },
  {
    id: "P003",
    name: "WONG Ka Wai",
    mrn: "MRN-109472",
    hn: "HN-204981-7",
    sex: "Male",
    dob: "14 Mar 1958",
    ward: "8A",
    bed: "12",
    generated: "2 h ago",
    medications: [
      demoCases[20],
      demoCases[1],
      demoCases[12],
      demoCases[23],
      demoCases[4],
      demoCases[15],
    ],
  },
  {
    id: "P004",
    name: "LAM Siu Ming",
    mrn: "MRN-112605",
    hn: "HN-390156-2",
    sex: "Male",
    dob: "30 Nov 1974",
    ward: "8B",
    bed: "02",
    generated: "48 min ago",
    medications: [demoCases[2], demoCases[13], demoCases[14], demoCases[5]],
  },
  {
    id: "P005",
    name: "HO Wing Yan",
    mrn: "MRN-118033",
    hn: "HN-401873-5",
    sex: "Female",
    dob: "19 Jun 1981",
    ward: "8B",
    bed: "09",
    generated: "1 h ago",
    medications: [
      demoCases[26],
      demoCases[7],
      demoCases[18],
      demoCases[29],
      demoCases[0],
    ],
  },
  {
    id: "P006",
    name: "CHEUNG Pui Shan",
    mrn: "MRN-120984",
    hn: "HN-448210-8",
    sex: "Female",
    dob: "03 Feb 1992",
    ward: "9A",
    bed: "16",
    generated: "12 min ago",
    medications: [demoCases[6], demoCases[7], demoCases[8], demoCases[9]],
  },
];
const clinicalProfiles: Record<
  string,
  {
    allergies: string;
    eGfr: string;
    hepatic: string;
    interaction: string;
    duplicate: string;
  }
> = {
  P001: {
    allergies: "Penicillin",
    eGfr: "68 mL/min/1.73m²",
    hepatic: "No recorded impairment",
    interaction: "Demo screening: no new alert",
    duplicate: "No duplicate therapy found",
  },
  P002: {
    allergies: "NKDA",
    eGfr: "42 mL/min/1.73m²",
    hepatic: "No recorded impairment",
    interaction: "Renal dose review suggested",
    duplicate: "No duplicate therapy found",
  },
  P003: {
    allergies: "NSAIDs",
    eGfr: "81 mL/min/1.73m²",
    hepatic: "Mild impairment flag",
    interaction: "Demo interaction review required",
    duplicate: "Potential duplicate analgesia",
  },
  P004: {
    allergies: "NKDA",
    eGfr: "96 mL/min/1.73m²",
    hepatic: "No recorded impairment",
    interaction: "Demo screening: no new alert",
    duplicate: "No duplicate therapy found",
  },
  P005: {
    allergies: "Sulfonamides",
    eGfr: "55 mL/min/1.73m²",
    hepatic: "No recorded impairment",
    interaction: "Renal dose review suggested",
    duplicate: "No duplicate therapy found",
  },
  P006: {
    allergies: "NKDA",
    eGfr: "73 mL/min/1.73m²",
    hepatic: "No recorded impairment",
    interaction: "Demo screening: no new alert",
    duplicate: "No duplicate therapy found",
  },
};
const alphabeticalPatients = [...patients].sort((a, b) =>
  a.name.localeCompare(b.name),
);
const resultPriority: Record<Result, number> = {
  MISMATCH: 0,
  REVIEW: 1,
  MATCH: 2,
};
patients.forEach((patient) =>
  patient.medications.sort(
    (a, b) =>
      resultPriority[a.comparison.overallResult] -
      resultPriority[b.comparison.overallResult],
  ),
);
const bedSortedPatients = [...patients].sort(
  (a, b) => Number(a.bed) - Number(b.bed) || a.name.localeCompare(b.name),
);
const wardBedSortedPatients = [...patients].sort(
  (a, b) =>
    a.ward.localeCompare(b.ward) ||
    Number(a.bed) - Number(b.bed) ||
    a.name.localeCompare(b.name),
);
function patientStatus(p: Patient): Result {
  return p.medications.some((m) => m.comparison.overallResult === "MISMATCH")
    ? "MISMATCH"
    : p.medications.some((m) => m.comparison.overallResult === "REVIEW")
      ? "REVIEW"
      : "MATCH";
}
function medicationMatches(m: (typeof demoCases)[number], query: string) {
  return (
    !query ||
    `${m.title} ${m.eDocumentation.medicationName} ${m.ipmoe.medicationName}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );
}
function PatientSidebar({
  items,
  selected,
  onSelect,
  title,
  pharmacy = false,
}: {
  items: Patient[];
  selected: Patient;
  onSelect: (p: Patient) => void;
  title: string;
  pharmacy?: boolean;
}) {
  const [ward, setWard] = useState(""),
    [bed, setBed] = useState("");
  const wards = [...new Set(items.map((p) => p.ward))].sort(),
    beds = ward
      ? items
          .filter((p) => p.ward === ward)
          .map((p) => p.bed)
          .sort((a, b) => Number(a) - Number(b))
      : [];
  const visible = items.filter(
    (p) => (!ward || p.ward === ward) && (!bed || p.bed === bed),
  );
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideTitle}>
        <span>{title}</span>
        <b>{visible.length}</b>
      </div>
      <div className={styles.sideFilters}>
        <label>
          Select ward
          <select
            value={ward}
            onChange={(e) => {
              setWard(e.target.value);
              setBed("");
            }}
          >
            <option value="">All wards</option>
            {wards.map((x) => (
              <option key={x} value={x}>
                Ward {x}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select bed number
          <select
            value={bed}
            disabled={!ward}
            onChange={(e) => {
              const next = e.target.value;
              setBed(next);
              const found = items.find(
                (p) => p.ward === ward && p.bed === next,
              );
              if (found) onSelect(found);
            }}
          >
            <option value="">
              {ward ? "Select bed" : "Select ward first"}
            </option>
            {beds.map((x) => (
              <option key={x} value={x}>
                Bed {x}
              </option>
            ))}
          </select>
        </label>
      </div>
      {visible.map((p) => (
        <button
          key={p.id}
          className={selected.id === p.id ? styles.active : ""}
          onClick={() => onSelect(p)}
        >
          <div>
            <span className={styles.locationRow}>
              {pharmacy ? (
                <>
                  <b>Ward {p.ward}</b>
                  <b>Bed {p.bed}</b>
                </>
              ) : (
                <>
                  <b>Bed {p.bed}</b>
                  <b>Ward {p.ward}</b>
                </>
              )}
            </span>
            <strong>{p.name}</strong>
            <small>
              {p.hn}
              {pharmacy
                ? ` · ${p.medications.filter((m) => m.comparison.overallResult !== "MATCH").length} items`
                : ""}
            </small>
          </div>
          {pharmacy && (
            <span data-state={patientStatus(p)}>
              {statusLabel[patientStatus(p)]}
            </span>
          )}
          <ChevronRight />
        </button>
      ))}
    </aside>
  );
}

export default function MedVerifyApp() {
  const [selected, setSelected] = useState(patients[2]);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [actions, setActions] = useState<Record<string, "ack" | "escalate">>(
    {},
  );
  const [view, setView] = useState<AppView>("ordering");
  const [runs, setRuns] = useState<Record<string, number>>({});
  const [liveRuns, setLiveRuns] = useState<LiveRun[]>([]);
  const [pharmacyEscalations, setPharmacyEscalations] = useState<
    PharmacyEscalation[]
  >([]);
  const [amendment, setAmendment] = useState<LiveRun | null>(null);
  const [demoKey, setDemoKey] = useState(0);
  const [catalogueSeed, setCatalogueSeed] = useState(1707);
  const filtered = useMemo(
    () =>
      bedSortedPatients.filter((p) =>
        `${p.name} ${p.mrn} ${p.hn} ward ${p.ward} bed ${p.bed} ${p.medications.map((m) => `${m.title} ${m.eDocumentation.medicationName} ${m.ipmoe.medicationName}`).join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  useEffect(() => {
    if (query && filtered.length) setSelected(filtered[0]);
  }, [query, filtered]);
  const recordAction = (medId: string, value: "ack" | "escalate") =>
    setActions((a) => ({ ...a, [`${selected.id}-${medId}`]: value }));
  const acceptRun = (run: LiveRun) => {
    setRuns((r) => ({ ...r, [run.key]: (r[run.key] || 0) + 1 }));
    setLiveRuns((old) => [run, ...old.filter((x) => x.key !== run.key)]);
    setSelected(patients.find((p) => p.id === run.patientId) ?? patients[0]);
    setAmendment(null);
  };
  const resetDemo = () => {
    setActions({});
    setRuns({});
    setLiveRuns([]);
    setPharmacyEscalations([]);
    setAmendment(null);
    setSelected(bedSortedPatients[0]);
    setQuery("");
    setSearchInput("");
    setView("ordering");
    setCatalogueSeed(Math.floor(Math.random() * 100000));
    setDemoKey((k) => k + 1);
  };
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <form
          className={styles.search}
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(searchInput);
          }}
        >
          <Search />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search patient or medication…"
          />
          <button type="submit">Search</button>
        </form>
        <nav className={styles.roleNav}>
          <button
            type="button"
            aria-pressed={view === "ordering"}
            onClick={() => setView("ordering")}
          >
            Ordering
          </button>
          <button
            type="button"
            aria-pressed={view === "doctor"}
            onClick={() => setView("doctor")}
          >
            Doctor
          </button>
          <button
            type="button"
            aria-pressed={view === "overview"}
            onClick={() => setView("overview")}
          >
            Dashboard
          </button>
          <button
            type="button"
            aria-pressed={view === "dashboard"}
            onClick={() => setView("dashboard")}
          >
            Nurse
          </button>
          <button
            type="button"
            aria-pressed={view === "pharmacy"}
            onClick={() => setView("pharmacy")}
          >
            Pharmacy
          </button>
        </nav>
        <button
          type="button"
          className={styles.rulesButton}
          aria-pressed={view === "rules"}
          onClick={() => setView("rules")}
        >
          <Settings />
          Rules
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={resetDemo}
        >
          <RotateCcw />
          Reset Demo
        </button>
        <div className={styles.user}>
          <b>{view === "doctor" || view === "ordering" ? "CW" : "WY"}</b>
          <span>
            <strong>
              {view === "doctor" || view === "ordering"
                ? "Doctor CW Chan"
                : view === "pharmacy"
                  ? "Pharmacist WY Lee"
                  : "Nurse WY Lee"}
            </strong>
            <small>
              {view === "doctor" || view === "ordering"
                ? "Medical team"
                : view === "pharmacy"
                  ? "Pharmacy review"
                  : "Ward 8A · RN"}
            </small>
          </span>
        </div>
      </header>
      <aside className={styles.clinicalBoundary} role="note">
        <AlertTriangle />
        <span>
          <b>Demo only · not clinically validated.</b> Front-end role controls,
          synthetic screening and local audit are demonstrations. Production
          requires backend RBAC, tamper-evident audit, approved terminology,
          downtime procedures and formal hazard validation.
        </span>
      </aside>
      {view === "rules" ? (
        <RulesSettings key={demoKey} />
      ) : view === "overview" ? (
        <OverviewDashboard
          actions={actions}
          liveRuns={liveRuns}
          pharmacyEscalations={pharmacyEscalations}
          onNavigate={setView}
        />
      ) : view === "ordering" ? (
        <OrderingWorkspace
          key={`${demoKey}-${catalogueSeed}-${amendment?.key ?? "new"}`}
          catalogueSeed={catalogueSeed}
          query={query}
          runs={runs}
          amendment={amendment}
          onRun={acceptRun}
          onGoDoctor={() => setView("doctor")}
        />
      ) : view === "doctor" ? (
        <DoctorWorkspace
          key={demoKey}
          query={query}
          liveRuns={liveRuns}
          pharmacyEscalations={pharmacyEscalations}
          onModify={(run) => {
            setAmendment(run);
            setView("ordering");
          }}
        />
      ) : view === "pharmacy" ? (
        <PharmacyWorkspace
          key={demoKey}
          query={query}
          actions={actions}
          liveRuns={liveRuns}
          escalations={pharmacyEscalations}
          onEscalate={(item) =>
            setPharmacyEscalations((old) => [
              item,
              ...old.filter((x) => x.key !== item.key),
            ])
          }
        />
      ) : (
        <div className={styles.layout}>
          <PatientSidebar
            items={filtered}
            selected={selected}
            onSelect={setSelected}
            title="Nurse patients · by bed"
          />
          <main className={styles.main}>
            <div className={styles.crumb}>
              Patient alerts <ChevronRight /> {selected.id}
            </div>
            <label className={styles.patientSelect}>
              Select patient
              <select
                value={selected.id}
                onChange={(e) =>
                  setSelected(
                    patients.find((p) => p.id === e.target.value) ??
                      patients[0],
                  )
                }
              >
                {filtered.map((p) => (
                  <option key={p.id} value={p.id}>
                    Bed {p.bed} · Ward {p.ward} · {p.name}
                  </option>
                ))}
              </select>
            </label>
            <section className={styles.patient}>
              <div className={styles.avatar}>
                <UserRound />
              </div>
              <div>
                <h1>{selected.name}</h1>
                <p>
                  {selected.mrn} · {selected.hn} · {selected.sex} · DOB{" "}
                  {selected.dob}
                </p>
                <small>
                  Ward {selected.ward} · Bed {selected.bed}
                </small>
              </div>
              <span className={styles.pendingBadge}>
                Pending nurse acknowledgement
              </span>
            </section>
            {pharmacyEscalations
              .filter((e) => e.patientId === selected.id)
              .map((alert) => (
                <article className={styles.pharmacyAlert} key={alert.key}>
                  <header>
                    <div>
                      <span>ALERT SOURCE · PHARMACY</span>
                      <b>{alert.medication}</b>
                      <small>{alert.created} · Pharmacist escalation</small>
                    </div>
                    <AlertTriangle />
                  </header>
                  <p>
                    {alert.note ||
                      "Pharmacy identified a medication issue requiring prescriber review."}
                  </p>
                  <button
                    disabled={alert.forwardedToDoctor}
                    onClick={() =>
                      setPharmacyEscalations((old) =>
                        old.map((x) =>
                          x.key === alert.key
                            ? { ...x, forwardedToDoctor: true }
                            : x,
                        ),
                      )
                    }
                  >
                    {alert.forwardedToDoctor ? (
                      <>
                        <CheckCircle2 />
                        Passed to Doctor amendment queue
                      </>
                    ) : (
                      <>
                        <ChevronRight />
                        Pass to Doctor for prescription modification
                      </>
                    )}
                  </button>
                </article>
              ))}
            {liveRuns
              .filter((r) => r.patientId === selected.id)
              .map((run) => (
                <article className={styles.liveAlert} key={run.key}>
                  <header>
                    <div>
                      <b>Live order from Doctor workspace</b>
                      <small>{run.created} · {run.workflowState.replaceAll("_", " ")} · {governanceVersions.n8n}</small>
                    </div>
                    <Status state={run.result} />
                  </header>
                  <div className={styles.sources}>
                    <OrderReadout name="E-DOCUMENTATION" value={run.eDoc} />
                    <OrderReadout name="IPMOE" value={run.ipmoe} />
                  </div>
                  {run.result === "MATCH" ? (
                    <>
                      <p>
                        Matched order routed through the dashboard to Nurse WY
                        LEE.
                      </p>
                      <button
                        className={styles.liveAck}
                        onClick={() =>
                          setLiveRuns((old) =>
                            old.map((x) =>
                              x.key === run.key
                                ? { ...x, nurseAcknowledged: true, workflowState:"NURSE_ACKNOWLEDGED" }
                                : x,
                            ),
                          )
                        }
                      >
                        <CheckCircle2 />
                        {run.nurseAcknowledged
                          ? "Acknowledged · sent to Pharmacy for vetting"
                          : "Acknowledge matched order"}
                      </button>
                    </>
                  ) : (
                    <p className={styles.doctorReviewing}>
                      Doctor is reviewing and modifying this{" "}
                      {statusLabel[run.result].toLowerCase()} order. No nurse
                      action is required yet.
                    </p>
                  )}
                </article>
              ))}
            <NurseMedicationQueue
              patient={selected}
              query={query}
              actions={actions}
              onAction={recordAction}
            />
            <section className={styles.audit}>
              <h2>Audit trail</h2>
              <div>
                <i />
                <span>
                  <b>Comparison generated</b>
                  <small>
                    System · Automated
                    <br />
                    {selected.generated}
                  </small>
                </span>
              </div>
              {Object.entries(actions)
                .filter(([k]) => k.startsWith(`${selected.id}-`))
                .map(([k, value]) => {
                  const med = selected.medications.find((m) =>
                    k.endsWith(m.id),
                  );
                  return (
                    <div key={k}>
                      <i />
                      <span>
                        <b>
                          {med?.title}:{" "}
                          {value === "ack"
                            ? "acknowledged · sent to pharmacy for vetting"
                            : "review escalation created"}
                        </b>
                        <small>Nurse WY LEE · just now</small>
                      </span>
                    </div>
                  );
                })}
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

function Status({ state }: { state: "MATCH" | "REVIEW" | "MISMATCH" }) {
  return (
    <span className={styles.status} data-state={state}>
      {state === "MATCH" ? <CheckCircle2 /> : <AlertTriangle />}
      {statusLabel[state]}
    </span>
  );
}
function EducationTip({
  title = "Education",
  children,
}: {
  title?: string;
  children: string;
}) {
  return (
    <span className={styles.educationTip}>
      <button type="button" aria-label={`${title}: ${children}`}>
        <Info />
        <span>{title}</span>
      </button>
      <span role="tooltip">
        <b>{title}</b>
        {children}
      </span>
    </span>
  );
}
function NurseMedicationQueue({
  patient,
  query,
  actions,
  onAction,
}: {
  patient: Patient;
  query: string;
  actions: Record<string, "ack" | "escalate">;
  onAction: (medId: string, value: "ack" | "escalate") => void;
}) {
  const [filter, setFilter] = useState<"pending" | "completed">("pending"),
    all = patient.medications.filter(
      (m) =>
        medicationMatches(m, query) ||
        `${patient.name} ${patient.mrn} ${patient.hn}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    ),
    sorted = [...all].sort(
      (a, b) =>
        Number(isHighAlertName(b.title)) - Number(isHighAlertName(a.title)) ||
        { MISMATCH: 0, REVIEW: 1, MATCH: 2 }[a.comparison.overallResult] -
          { MISMATCH: 0, REVIEW: 1, MATCH: 2 }[b.comparison.overallResult],
    ),
    visible = sorted.filter((m) =>
      filter === "completed"
        ? Boolean(actions[`${patient.id}-${m.id}`])
        : !actions[`${patient.id}-${m.id}`],
    ),
    exceptions = visible.filter((m) => m.comparison.overallResult !== "MATCH"),
    matched = visible.filter((m) => m.comparison.overallResult === "MATCH");
  const render = (med: (typeof demoCases)[number], i: number) => (
    <MedicationCard
      key={`${patient.id}-${med.id}`}
      selected={med}
      number={i + 1}
      action={actions[`${patient.id}-${med.id}`]}
      onAction={(v) => onAction(med.id, v)}
    />
  );
  return (
    <section className={styles.medQueue}>
      <div className={styles.queueOwnership}>
        <b>My queue · Nurse WY Lee</b>
        <span>Priority: high-alert first · SLA acknowledgement 30 min</span>
      </div>
      <div className={styles.queueToolbar}>
        <div>
          <button
            aria-pressed={filter === "pending"}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            aria-pressed={filter === "completed"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <span>{visible.length} medications</span>
      </div>
      {exceptions.map(render)}
      {matched.length > 0 && (
        <details className={styles.matchedGroup} open={filter === "completed"}>
          <summary>
            <CheckCircle2 />
            {matched.length} matched medication{matched.length === 1 ? "" : "s"}
            <span>
              {filter === "pending"
                ? "Show acknowledgement queue"
                : "Completed"}
            </span>
          </summary>
          {matched.map((m, i) => render(m, exceptions.length + i))}
        </details>
      )}
      {!visible.length && (
        <div className={styles.emptyState}>
          <CheckCircle2 />
          <h2>No {filter} medications</h2>
        </div>
      )}
    </section>
  );
}
const highAlertPattern = /enoxaparin|insulin|opioid|warfarin|heparin/i;
function isHighAlertName(name: string) {
  return (
    highAlertPattern.test(name) ||
    Boolean(medicationCatalogueByName.get(name)?.risk)
  );
}
function displayFrequency(r: {
  frequencyType?: string;
  intervalMinutes?: number;
  scheduledTime?: string;
}) {
  if (r.frequencyType === "SCHEDULED" && r.scheduledTime)
    return `Scheduled ${r.scheduledTime}`;
  if (r.intervalMinutes) return `Every ${r.intervalMinutes / 60} hours`;
  return r.scheduledTime || "Review";
}
function MedicationCard({
  selected,
  number,
  action,
  onAction,
}: {
  selected: (typeof demoCases)[number];
  number: number;
  action?: "ack" | "escalate";
  onAction: (v: "ack" | "escalate") => void;
}) {
  const canAcknowledge = selected.comparison.overallResult === "MATCH",
    explanation = `${selected.comparison.message} ${selected.comparison.fields.find((f) => f.result !== "MATCH")?.explanation ?? ""}`,
    diffFields = new Set(
      selected.comparison.fields
        .filter((f) => f.result !== "MATCH")
        .map((f) => f.field.toLowerCase()),
    );
  return (
    <article className={styles.medCard} data-exception={!canAcknowledge}>
      <header>
        <div>
          <h3>
            {number}. {selected.title}
          </h3>
          <small>
            Current owner · {canAcknowledge ? "Nurse WY Lee" : "Doctor CW Chan"}{" "}
            · SLA {canAcknowledge ? "30 min" : "Doctor amendment"}
          </small>
        </div>
        <div className={styles.cardTools}>
          {isHighAlertName(selected.title) && (
            <span className={styles.highAlert}>
              <AlertTriangle />
              High alert
            </span>
          )}
          <Status state={selected.comparison.overallResult} />
          <EducationTip title="AI explanation">{explanation}</EducationTip>
        </div>
      </header>
      <div className={styles.sources}>
        <Source
          name="E-DOCUMENTATION"
          r={selected.eDocumentation}
          diffFields={diffFields}
        />
        <Source name="IPMOE" r={selected.ipmoe} diffFields={diffFields} />
      </div>
      {canAcknowledge && !action && (
        <p className={styles.ackStatement}>
          Acknowledge confirms: “I have reviewed the comparison result.” It does
          not approve or modify the prescription.
        </p>
      )}
      <div className={styles.medActions}>
        {canAcknowledge ? (
          <>
            <button className={styles.ack} onClick={() => onAction("ack")}>
              <CheckCircle2 />
              {action === "ack" ? "Acknowledged" : "Acknowledge status"}
            </button>
            <details className={styles.overflowMenu}>
              <summary aria-label="More actions">•••</summary>
              <button onClick={() => onAction("escalate")}>
                Escalate instead
              </button>
            </details>
          </>
        ) : (
          <button className={styles.awaitingDoctor} disabled>
            <AlertTriangle />
            Awaiting Doctor {selected.comparison.overallResult === "REVIEW" ? "review" : "amendment"}
          </button>
        )}
        {action && (
          <small data-action={action}>
            {action === "ack"
              ? "Sent to Pharmacy for vetting."
              : "Escalated for clinical review."}
          </small>
        )}
      </div>
    </article>
  );
}
function Source({
  name,
  r,
  diffFields = new Set<string>(),
}: {
  name: string;
  r: any;
  diffFields?: Set<string>;
}) {
  return (
    <section className={styles.source}>
      <header>
        <FileText />
        <b>{name}</b>
        <span>◷ 2 h ago</span>
      </header>
      <h4
        data-diff={
          diffFields.has("medication") || diffFields.has("medication name")
        }
      >
        {r.medicationName}
      </h4>
      <dl>
        {[
          [
            "Dose",
            r.doseValue == null
              ? "Not supplied"
              : `${r.doseValue} ${r.doseUnit}`,
          ],
          ["Route", r.route || "Not supplied"],
          ["Frequency", displayFrequency(r)],
          ["PRN", r.specialInstructions === "PRN" ? "Yes" : "No"],
          [
            "Duration",
            r.isIntravenousFluid
              ? `${r.infusionDurationMinutes || "—"} minutes`
              : "Ongoing",
          ],
          ["Special instructions", r.specialInstructions || "—"],
        ].map(([a, b]) => (
          <div
            key={a}
            data-diff={
              diffFields.has(a.toLowerCase()) ||
              (a === "Frequency" && diffFields.has("timing / frequency"))
            }
          >
            <dt>{a}</dt>
            <dd>{b}</dd>
          </div>
        ))}
      </dl>
      <footer>
        ♧ Dr. Leung K.H. · {name === "IPMOE" ? "IPMOE" : "e-Documentation"}
      </footer>
    </section>
  );
}
function OrderReadout({ name, value }: { name: string; value: OrderInput }) {
  return (
    <section className={styles.source}>
      <header>
        <FileText />
        <b>{name}</b>
        <span>Confirmed</span>
      </header>
      <h4>{value.medication}</h4>
      <dl>
        {[
          ["Dose", value.dose],
          ["Route", value.route],
          ["Frequency", value.frequency],
          ["PRN", value.prn],
          ["PRN condition", value.prnCondition || "—"],
          ["Course duration", value.courseDuration || "—"],
          ["Special instructions", value.specialInstructions || "—"],
        ].map(([a, b]) => (
          <div key={a}>
            <dt>{a}</dt>
            <dd>{b}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function OverviewDashboard({
  onNavigate,
  actions,
  liveRuns,
  pharmacyEscalations,
}: {
  onNavigate: (view: AppView) => void;
  actions: Record<string, "ack" | "escalate">;
  liveRuns: LiveRun[];
  pharmacyEscalations: PharmacyEscalation[];
}) {
  const all = patients.flatMap((p) => p.medications),
    matched = all.filter((m) => m.comparison.overallResult === "MATCH").length,
    review = all.filter((m) => m.comparison.overallResult === "REVIEW").length,
    mismatch = all.filter(
      (m) => m.comparison.overallResult === "MISMATCH",
    ).length;
  const matchedRuns = liveRuns.filter((r) => r.result === "MATCH"),
    pendingBaseline = patients
      .flatMap((p) => p.medications.map((m) => ({ p, m })))
      .filter(
        ({ p, m }) =>
          m.comparison.overallResult === "MATCH" && !actions[`${p.id}-${m.id}`],
      ).length,
    latest = matchedRuns.find((r) => !r.nurseAcknowledged);
  return (
    <main className={styles.overview}>
      <div className={styles.overviewHead}>
        <div>
          <p>Medication consistency verification</p>
          <h1>Clinical workflow dashboard</h1>
          <span>Demo overview · Synthetic data only</span>
        </div>
        <div>
          <i />
          n8n workflow operational
        </div>
      </div>
      {pharmacyEscalations
        .filter((x) => !x.forwardedToDoctor)
        .map((alert) => (
          <button
            className={styles.dashboardPharmacyAlert}
            key={alert.key}
            onClick={() => onNavigate("dashboard")}
          >
            <AlertTriangle />
            <span>
              <strong>Alert source · Pharmacy</strong>
              <b>
                {patients.find((p) => p.id === alert.patientId)?.name} ·{" "}
                {alert.medication}
              </b>
              <small>
                Nurse review required — pass to Doctor if prescription
                modification is needed
              </small>
            </span>
            <ChevronRight />
          </button>
        ))}
      {latest && (
        <div className={styles.liveBanner}>
          <b>New matched order · Nurse action required</b>
          <span>
            {patients.find((p) => p.id === latest.patientId)?.name} ·{" "}
            {latest.eDoc.medication} ·{" "}
            {latest.nurseAcknowledged
              ? "Acknowledged"
              : "Pending acknowledgement"}
          </span>
        </div>
      )}
      <section className={styles.kpis}>
        <article data-colour="teal">
          <span>Patients with active workflows</span>
          <b>{patients.length}</b>
          <small>
            {matchedRuns.length} matched workflow(s) created during this demo
          </small>
        </article>
        <button
          className={styles.nurseAlertKpi}
          onClick={() => onNavigate("dashboard")}
        >
          <span>My queue · Nurse WY Lee</span>
          <b>
            {pendingBaseline +
              matchedRuns.filter((r) => !r.nurseAcknowledged).length +
              pharmacyEscalations.filter((x) => !x.forwardedToDoctor).length}
          </b>
          <small>
            <i />
            Pending acknowledgements + Pharmacy alerts · SLA 30 min
          </small>
        </button>
      </section>
      <section className={styles.overviewGrid}>
        <article className={styles.queueCard}>
          <h2>Role queues</h2>
          <p>Select a workspace to play through the product demo.</p>
          <button onClick={() => onNavigate("doctor")}>
            <UserRound />
            <span>
              <b>Doctor workspace</b>
              <small>
                {review +
                  mismatch +
                  pharmacyEscalations.filter((x) => x.forwardedToDoctor)
                    .length}{" "}
                exceptions require review or amendment
              </small>
            </span>
            <ChevronRight />
          </button>
          <button onClick={() => onNavigate("dashboard")}>
            <Bell />
            <span>
              <b>Nurse dashboard</b>
              <small>
                {pendingBaseline +
                  matchedRuns.filter((r) => !r.nurseAcknowledged).length}{" "}
                pending acknowledgements +{" "}
                {pharmacyEscalations.filter((x) => !x.forwardedToDoctor).length}{" "}
                Pharmacy alert(s)
              </small>
            </span>
            <ChevronRight />
          </button>
          <button onClick={() => onNavigate("pharmacy")}>
            <Pill />
            <span>
              <b>Pharmacy review</b>
              <small>Vetting queue and escalation to Nurse</small>
            </span>
            <ChevronRight />
          </button>
        </article>
        <article className={styles.flowCard}>
          <h2>End-to-end workflow</h2>
          <p>Current routing logic across clinical roles.</p>
          <div className={styles.bigFlow}>
            {[
              ["Doctor", "Arrange and confirm medication"],
              ["n8n", "Compare e-Documentation and IPMOE"],
              ["Route", "Match to Nurse · Exception stays with Doctor"],
              [
                "Close",
                "Nurse acknowledges → Pharmacy · Pharmacy issues → Nurse → Doctor",
              ],
            ].map(([a, b], i) => (
              <div key={a}>
                <strong>{i + 1}</strong>
                <span>
                  <b>{a}</b>
                  <small>{b}</small>
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className={styles.activity}>
        <h2>Recent workflow activity</h2>
        {pharmacyEscalations.map((a) => (
          <div key={a.key}>
            <i data-state="MISMATCH" />
            <span>
              <b>Pharmacy alert · {a.medication}</b>
              <small>
                {patients.find((p) => p.id === a.patientId)?.name} ·{" "}
                {a.forwardedToDoctor
                  ? "forwarded to Doctor"
                  : "awaiting Nurse action"}
              </small>
            </span>
            <time>just now</time>
          </div>
        ))}
        {matchedRuns.map((r) => {
          const p = patients.find((x) => x.id === r.patientId)!;
          return (
            <div key={r.key}>
              <i data-state={r.result} />
              <span>
                <b>
                  {p.name} · {r.eDoc.medication}
                </b>
                <small>
                  {p.hn} ·{" "}
                  {r.nurseAcknowledged
                    ? "nurse acknowledged · sent to Pharmacy"
                    : "awaiting nurse acknowledgement"}
                </small>
              </span>
              <time>just now</time>
            </div>
          );
        })}
        {patients.slice(0, 5).map((p, i) => (
          <div key={p.id}>
            <i
              data-state={
                i % 3 === 0 ? "MATCH" : i % 3 === 1 ? "REVIEW" : "MISMATCH"
              }
            />
            <span>
              <b>{p.name}</b>
              <small>{p.hn} · automated comparison completed</small>
            </span>
            <time>{p.generated}</time>
          </div>
        ))}
      </section>
    </main>
  );
}

function PharmacyWorkspace({
  query,
  actions,
  liveRuns,
  escalations,
  onEscalate,
}: {
  query: string;
  actions: Record<string, "ack" | "escalate">;
  liveRuns: LiveRun[];
  escalations: PharmacyEscalation[];
  onEscalate: (item: PharmacyEscalation) => void;
}) {
  const filteredPatients = useMemo(
    () =>
      wardBedSortedPatients
        .filter(
          (p) =>
            p.medications.some(
              (m) =>
                m.comparison.overallResult === "MATCH" &&
                actions[`${p.id}-${m.id}`] === "ack",
            ) ||
            liveRuns.some(
              (r) =>
                r.patientId === p.id &&
                r.result === "MATCH" &&
                r.nurseAcknowledged,
            ),
        )
        .filter((p) =>
          `${p.name} ${p.mrn} ${p.hn} ward ${p.ward} bed ${p.bed} ${p.medications.map((m) => m.title).join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        ),
    [actions, liveRuns, query],
  );
  const [patient, setPatient] = useState(
      filteredPatients[0] ?? wardBedSortedPatients[0],
    ),
    [medId, setMedId] = useState(""),
    [note, setNote] = useState(""),
    [reason, setReason] = useState("CONTRAINDICATION"),
    [vetting, setVetting] = useState<
      "" | "VETTED" | "ESCALATED" | "CLARIFICATION_REQUIRED"
    >("");
  useEffect(() => {
    if (filteredPatients.length) setPatient(filteredPatients[0]);
  }, [query, filteredPatients]);
  if (!filteredPatients.length)
    return (
      <div className={styles.pharmacyLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>
            <span>Pharmacy active queue</span>
            <b>0</b>
          </div>
        </aside>
        <main className={styles.main}>
          <div className={styles.emptyState}>
            <CheckCircle2 />
            <h2>No acknowledged Match medication awaiting vetting</h2>
            <p>
              This active queue only displays medication after Nurse WY Lee has
              acknowledged the comparison result.
            </p>
          </div>
        </main>
      </div>
    );
  const meds = patient.medications.filter(
    (m) =>
      m.comparison.overallResult === "MATCH" &&
      actions[`${patient.id}-${m.id}`] === "ack" &&
      (medicationMatches(m, query) ||
        `${patient.name} ${patient.mrn} ${patient.hn}`
          .toLowerCase()
          .includes(query.toLowerCase())),
  );
  const med =
    meds.find((m) => m.id === medId) ??
    meds[0] ??
    patient.medications.find((m) => m.comparison.overallResult === "MATCH")!;
  const key = `${patient.id}-${med.id}`;
  const readyRuns = liveRuns.filter(
    (r) =>
      r.patientId === patient.id && r.result === "MATCH" && r.nurseAcknowledged,
  );
  const existingEscalation = escalations.find((x) => x.key === key),
    isEligible =
      actions[key] === "ack" ||
      readyRuns.some((r) => r.eDoc.medication === med.title),
    profile = clinicalProfiles[patient.id],
    catalogueItem = medicationCatalogueByName.get(med.title);
  if (!isEligible)
    return (
      <div className={styles.pharmacyLayout}>
        <PatientSidebar
          items={filteredPatients}
          selected={patient}
          pharmacy
          title="Pharmacy · ward / bed"
          onSelect={(p) => {
            setPatient(p);
            setMedId("");
            setNote("");
          }}
        />
        <main className={styles.main}>
          <div className={styles.crumb}>
            Pharmacy review <ChevronRight /> {patient.name}
          </div>
          <label className={styles.patientSelect}>
            Select patient
            <select
              value={patient.id}
              onChange={(e) => {
                setPatient(
                  patients.find((p) => p.id === e.target.value) ?? patients[0],
                );
                setMedId("");
              }}
            >
              {filteredPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  Ward {p.ward} · Bed {p.bed} · {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.patientSelect}>
            Select medication
            <select value={med.id} onChange={(e) => setMedId(e.target.value)}>
              {meds.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </label>
          <section className={styles.patient}>
            <div className={styles.avatar}>
              <Pill />
            </div>
            <div>
              <h1>{med.title}</h1>
              <p>
                {patient.name} · {patient.hn}
              </p>
              <small>
                Ward {patient.ward} · Bed {patient.bed}
              </small>
            </div>
            <span className={styles.doctorBadge}>Awaiting Nurse</span>
          </section>
          <div className={styles.emptyState}>
            <Bell />
            <h2>Not yet available for pharmacy vetting</h2>
            <p>
              This matched medication becomes available only after Nurse WY Lee
              acknowledges it.
            </p>
          </div>
        </main>
      </div>
    );
  return (
    <div className={styles.pharmacyLayout}>
      <PatientSidebar
        items={filteredPatients}
        selected={patient}
        pharmacy
        title="Pharmacy · ward / bed"
        onSelect={(p) => {
          setPatient(p);
          setMedId("");
          setNote("");
        }}
      />
      <main className={styles.main}>
        <div className={styles.crumb}>
          Pharmacy review <ChevronRight /> {patient.name}
        </div>
        <label className={styles.patientSelect}>
          Select patient
          <select
            value={patient.id}
            onChange={(e) => {
              setPatient(
                patients.find((p) => p.id === e.target.value) ?? patients[0],
              );
              setMedId("");
            }}
          >
            {filteredPatients.map((p) => (
              <option key={p.id} value={p.id}>
                Ward {p.ward} · Bed {p.bed} · {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.patientSelect}>
          Select medication
          <select value={med.id} onChange={(e) => setMedId(e.target.value)}>
            {meds.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title} · {statusLabel[m.comparison.overallResult]}
              </option>
            ))}
          </select>
        </label>
        <section className={styles.patient}>
          <div className={styles.avatar}>
            <Pill />
          </div>
          <div>
            <h1>{med.title}</h1>
            <p>
              {patient.name} · {patient.mrn} · {patient.hn}
            </p>
            <small>
              Ward {patient.ward} · Bed {patient.bed}
            </small>
          </div>
          <Status state={med.comparison.overallResult} />
        </section>
        {readyRuns.map((run) => (
          <div className={styles.pharmacyReady} key={run.key}>
            <CheckCircle2 />
            <div>
              <b>{run.eDoc.medication} ready for pharmacy vetting</b>
              <p>
                n8n matched · Nurse WY Lee acknowledged · continue medication
                arrangement.
              </p>
            </div>
          </div>
        ))}
        <div className={styles.pharmacyNotice}>
          <Pill />
          <div>
            <b>Pharmacy vetting interface</b>
            <p>
              Pharmacy cannot edit the prescription. If a problem is found,
              escalate to Nurse for coordination and onward referral to the
              Doctor.
            </p>
          </div>
        </div>
        <section className={styles.pharmacySafetyGrid}>
          <article>
            <span>Allergies</span>
            <b>{profile.allergies}</b>
          </article>
          <article>
            <span>Renal function</span>
            <b>{profile.eGfr}</b>
          </article>
          <article>
            <span>Hepatic status</span>
            <b>{profile.hepatic}</b>
          </article>
          <article data-review={profile.interaction.includes("required")}>
            <span>Interaction screening</span>
            <b>{profile.interaction}</b>
          </article>
          <article data-review={profile.duplicate.includes("Potential")}>
            <span>Duplicate therapy</span>
            <b>{profile.duplicate}</b>
          </article>
        </section>
        {catalogueItem && (
          <section className={styles.productDetail}>
            <header>
              <b>Medication master details</b>
              {catalogueItem.risk && (
                <span className={styles.highAlert}>
                  <AlertTriangle /> High alert
                </span>
              )}
            </header>
            <dl>
              <div>
                <dt>Formulation</dt>
                <dd>{catalogueItem.forms.join(" / ")}</dd>
              </div>
              <div>
                <dt>Route / method</dt>
                <dd>{catalogueItem.routes.join(" / ")}</dd>
              </div>
              <div>
                <dt>Brand / salt</dt>
                <dd>{catalogueItem.alias || "No alias recorded"}</dd>
              </div>
              <div>
                <dt>Carrier / infusion</dt>
                <dd>{catalogueItem.carrier || "Not applicable"}</dd>
              </div>
            </dl>
          </section>
        )}
        <article className={styles.medCard}>
          <header>
            <div>
              <h3>Source comparison</h3>
              <small>{med.id} · n8n comparison complete</small>
            </div>
            <Status state={med.comparison.overallResult} />
          </header>
          <div className={styles.sources}>
            <Source name="E-DOCUMENTATION" r={med.eDocumentation} />
            <Source name="IPMOE" r={med.ipmoe} />
          </div>
          <div className={styles.ai}>
            <Sparkles />
            <div>
              <b>AI EXPLANATION</b>
              <p>
                {med.comparison.message}{" "}
                {
                  med.comparison.fields.find((f) => f.result !== "MATCH")
                    ?.explanation
                }
              </p>
            </div>
          </div>
          <div className={styles.pharmacyAction}>
            <div className={styles.vettingOutcomes}>
              <button
                type="button"
                data-selected={vetting === "VETTED"}
                onClick={() => setVetting("VETTED")}
              >
                Vetted
              </button>
              <button
                type="button"
                data-selected={vetting === "CLARIFICATION_REQUIRED"}
                onClick={() => setVetting("CLARIFICATION_REQUIRED")}
              >
                Clarification required
              </button>
              <button
                type="button"
                data-selected={vetting === "ESCALATED"}
                onClick={() => setVetting("ESCALATED")}
              >
                Escalate
              </button>
            </div>
            {vetting === "VETTED" && (
              <div className={styles.vettedState}>
                <CheckCircle2 /> Pharmacy vetting completed. Workflow may close.
              </div>
            )}
            {vetting === "CLARIFICATION_REQUIRED" && (
              <div className={styles.clarificationState}>
                <Info /> Clarification requested without changing the prescription.
              </div>
            )}
            {vetting === "ESCALATED" && (
              <>
                <label>
                  Escalation reason
                  <select value={reason} onChange={(e) => setReason(e.target.value)}>
                    <option value="CONTRAINDICATION">Contraindication</option>
                    <option value="ALLERGY">Allergy concern</option>
                    <option value="INTERACTION">Drug interaction</option>
                    <option value="DUPLICATE_THERAPY">Duplicate therapy</option>
                    <option value="DOSE_REVIEW">Renal / hepatic dose review</option>
                    <option value="FORMULATION">Formulation / route concern</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>
            <label>
                  Clinical note
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Describe the issue for Nurse WY Lee…"
              />
            </label>
            <button
              disabled={Boolean(existingEscalation)}
              onClick={() =>
                onEscalate({
                  key,
                  patientId: patient.id,
                  medId: med.id,
                  medication: med.title,
                  note:
                        `${reason}: ${note || "Pharmacy identified a medication issue requiring prescriber review."}`,
                  created: "just now",
                })
              }
            >
              {existingEscalation
                ? "Escalated to Nurse · dashboard alert created"
                : "Escalate issue to Nurse"}
            </button>
              </>
            )}
            {existingEscalation && (
              <small>
                Alert source is labelled Pharmacy. Nurse must review and pass it
                to the Doctor for modification.
              </small>
            )}
          </div>
        </article>
        <section className={styles.audit}>
          <h2>Audit trail</h2>
          <div>
            <i />
            <span>
              <b>Medication available for pharmacy vetting</b>
              <small>Workflow · Automated · {patient.generated}</small>
            </span>
          </div>
          {existingEscalation && (
            <div>
              <i />
              <span>
                <b>Pharmacy issue escalated to Nurse</b>
                <small>Pharmacist WY LEE · just now</small>
              </span>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const catalogue = medicationCatalogue.map((item) => item.name);
function shuffledCatalogue(seed: number) {
  const values = [...catalogue];
  let state = seed || 1;
  for (let i = values.length - 1; i > 0; i--) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const j = state % (i + 1);
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}
function catalogueOrder(name: string): OrderInput {
  const item = medicationCatalogueByName.get(name) ?? medicationCatalogue[0];
  return {
    medication: item.name,
    dose: item.doses[0] ?? "Not supplied",
    route: item.routes[0] ?? "Not supplied",
    frequency: item.frequencies[0] ?? "Review",
    prn: item.prnObserved ? "Yes" : "No",
    specialInstructions: item.instructions ?? "",
    prnCondition: item.prnObserved ? (item.instructions ?? "As required") : "",
    courseDuration: "",
  };
}
const blankOrder: OrderInput = catalogueOrder(catalogue[0]);
function recordToInput(r: any): OrderInput {
  return {
    medication: r.medicationName || "Not supplied",
    dose: r.doseValue == null ? "Not supplied" : `${r.doseValue} ${r.doseUnit}`,
    route: r.route || "Not supplied",
    frequency: displayFrequency(r),
    prn: r.specialInstructions === "PRN" ? "Yes" : "No",
    specialInstructions: r.specialInstructions || "",
    prnCondition: r.specialInstructions === "PRN" ? "As required" : "",
    courseDuration: "",
  };
}
function compareInputs(a: OrderInput, b: OrderInput): Result {
  const values = (Object.keys(a) as (keyof OrderInput)[]).map(
    (k) => a[k] === b[k],
  );
  return values.every(Boolean)
    ? "MATCH"
    : a.medication === b.medication && values.filter(Boolean).length >= 3
      ? "REVIEW"
      : "MISMATCH";
}
function OrderEditor({
  title,
  value,
  onChange,
  confirmed,
  onConfirm,
  diffFields = new Set(),
}: {
  title: string;
  value: OrderInput;
  onChange: (v: OrderInput) => void;
  confirmed: boolean;
  onConfirm: () => void;
  diffFields?: Set<keyof OrderInput>;
}) {
  const [medicationSearch, setMedicationSearch] = useState(""),
    set = (key: keyof OrderInput, v: string) =>
      onChange({ ...value, [key]: v }),
    item = medicationCatalogueByName.get(value.medication),
    search = medicationSearch.trim().toLowerCase();
  const matches = medicationCatalogue.filter(
      (m) =>
        !search ||
        `${m.id} ${m.name} ${m.alias ?? ""}`.toLowerCase().includes(search),
    ),
    options = matches.some((m) => m.name === value.medication)
      ? matches
      : ([item, ...matches].filter(Boolean) as typeof medicationCatalogue);
  const routes = [
      ...new Set([
        ...(item?.routes ?? []),
        "ORAL",
        "IV",
        "IM",
        "SUBCUTANEOUS",
        "RECTAL",
        "PER_VAGINAL",
        "Not supplied",
      ]),
    ],
    frequencies = [
      ...new Set([
        ...(item?.frequencies ?? []),
        "DAILY",
        "Q4H",
        "Q6H",
        "Q8H",
        "Q12H",
        "Q24H",
        "BD",
        "TDS",
        "QID",
        "OM",
        "PM",
        "NOCTE",
        "Review",
      ]),
    ],
    doses = item?.doses.length ? item.doses : ["Not supplied"];
  const field = (key: keyof OrderInput, label: string, control: ReactNode) => (
    <label data-diff={diffFields.has(key)}>
      {label}
      {control}
    </label>
  );
  return (
    <section className={styles.orderEditor} data-confirmed={confirmed}>
      <header>
        <FileText />
        <b>{title}</b>
        {confirmed && (
          <span>
            <CheckCircle2 />
            Confirmed
          </span>
        )}
      </header>
      <label>
        Search medication
        <input
          value={medicationSearch}
          onChange={(e) => setMedicationSearch(e.target.value)}
          placeholder="Generic, brand or MED code"
        />
      </label>
      <label data-diff={diffFields.has("medication")}>
        Medication
        <select
          value={value.medication}
          onChange={(e) => onChange(catalogueOrder(e.target.value))}
        >
          {options.map((x) => (
            <option key={x.id} value={x.name}>
              {x.name}
              {x.alias ? ` (${x.alias})` : ""}
            </option>
          ))}
        </select>
      </label>
      {item && (
        <small className={styles.catalogueMeta}>
          {item.id} · {item.alias && `${item.alias} · `}
          {item.forms.join(" / ")}
        </small>
      )}
      {item?.risk && (
        <div className={styles.highRiskOrder}>
          <AlertTriangle />
          <b>High-risk marker</b>
          <span>Permanent clinical review indicator</span>
        </div>
      )}
      <div>
        {field(
          "dose",
          "Dose",
          <select
            value={value.dose}
            onChange={(e) => set("dose", e.target.value)}
          >
            {!doses.includes(value.dose) && <option>{value.dose}</option>}
            {doses.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>,
        )}
        {field(
          "route",
          "Route",
          <select
            value={value.route}
            onChange={(e) => set("route", e.target.value)}
          >
            {routes.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>,
        )}
        {field(
          "frequency",
          "Frequency",
          <select
            value={value.frequency}
            onChange={(e) => set("frequency", e.target.value)}
          >
            {!frequencies.includes(value.frequency) && (
              <option>{value.frequency}</option>
            )}
            {frequencies.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>,
        )}
        {field(
          "prn",
          "PRN",
          <select
            value={value.prn}
            onChange={(e) => set("prn", e.target.value)}
          >
            <option>No</option>
            <option>Yes</option>
          </select>,
        )}
      </div>
      {field(
        "specialInstructions",
        "Special instructions",
        <textarea
          value={value.specialInstructions}
          onChange={(e) => set("specialInstructions", e.target.value)}
          placeholder="Prescriber instruction"
        />,
      )}
      {value.prn === "Yes" &&
        field(
          "prnCondition",
          "PRN condition",
          <input
            value={value.prnCondition}
            onChange={(e) => set("prnCondition", e.target.value)}
            placeholder="Clinical condition for PRN use"
          />,
        )}
      {field(
        "courseDuration",
        "Course duration",
        <input
          value={value.courseDuration}
          onChange={(e) => set("courseDuration", e.target.value)}
          placeholder="e.g. 5 days / ongoing"
        />,
      )}
      <details className={styles.orderPreview}>
        <summary>Review compact prescription summary</summary>
        <dl>
          <div>
            <dt>Medication</dt>
            <dd>{value.medication}</dd>
          </div>
          <div>
            <dt>Dose / route</dt>
            <dd>
              {value.dose} · {value.route}
            </dd>
          </div>
          <div>
            <dt>Frequency</dt>
            <dd>
              {value.frequency}
              {value.prn === "Yes" ? " · PRN" : ""}
            </dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{value.courseDuration || "Not specified"}</dd>
          </div>
        </dl>
      </details>
      <button type="button" onClick={onConfirm}>
        <CheckCircle2 />
        {confirmed ? `${title} confirmed` : `Confirm ${title}`}
      </button>
    </section>
  );
}

function OrderingWorkspace({
  runs,
  onRun,
  onGoDoctor,
  query,
  amendment,
  catalogueSeed,
}: {
  runs: Record<string, number>;
  onRun: (run: LiveRun) => void;
  onGoDoctor: () => void;
  query: string;
  amendment: LiveRun | null;
  catalogueSeed: number;
}) {
  const initialPatient =
    patients.find((p) => p.id === amendment?.patientId) ?? bedSortedPatients[0];
  const orderOptions = useMemo(
      () => shuffledCatalogue(catalogueSeed),
      [catalogueSeed],
    ),
    initialOrder = catalogueOrder(orderOptions[0]);
  const [patient, setPatient] = useState(initialPatient),
    [eDoc, setEDoc] = useState<OrderInput>(
      amendment ? { ...amendment.eDoc } : { ...initialOrder },
    ),
    [ipmoe, setIpmoe] = useState<OrderInput>(
      amendment ? { ...amendment.ipmoe } : { ...initialOrder },
    ),
    [eConfirmed, setEConfirmed] = useState(false),
    [iConfirmed, setIConfirmed] = useState(false),
    [submitted, setSubmitted] = useState<LiveRun[]>([]),
    [systemStatus,setSystemStatus]=useState<"OPERATIONAL"|"SOURCE_STALE"|"COMPARISON_UNAVAILABLE">("OPERATIONAL");
  const filteredPatients = useMemo(
    () =>
      bedSortedPatients.filter((p) =>
        `${p.name} ${p.mrn} ${p.hn} ward ${p.ward} bed ${p.bed} ${p.medications.map((m) => m.title).join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  useEffect(() => {
    if (query && filteredPatients.length) setPatient(filteredPatients[0]);
  }, [query, filteredPatients]);
  const resetConfirm = () => {
    setEConfirmed(false);
    setIConfirmed(false);
  };
  const differingFields = new Set(
    (Object.keys(eDoc) as (keyof OrderInput)[]).filter(
      (key) => eDoc[key] !== ipmoe[key],
    ),
  );
  const run = () => {
    const result=compareInputs(eDoc,ipmoe),key = amendment?.key ?? `LIVE-${patient.id}-${Date.now()}`,
      item: LiveRun = {
        key,
        patientId: patient.id,
        eDoc: { ...eDoc },
        ipmoe: { ...ipmoe },
        result,
        created: "just now",
        workflowState:result==="MATCH"?"MATCHED":"DOCTOR_AMENDMENT",
      };
    setSubmitted([item]);
    onRun(item);
  };
  return (
    <div className={styles.doctorLayout}>
      <PatientSidebar
        items={filteredPatients}
        selected={patient}
        title="Medication ordering · by bed"
        onSelect={(p) => {
          setPatient(p);
          resetConfirm();
        }}
      />
      <main className={styles.main}>
        <div className={styles.crumb}>
          Medication ordering <ChevronRight />{" "}
          {amendment ? "Amend order" : "New order"}
        </div>
        <label className={styles.patientSelect}>
          Select patient
          <select
            value={patient.id}
            onChange={(e) => {
              setPatient(
                patients.find((p) => p.id === e.target.value) ?? patients[0],
              );
              resetConfirm();
            }}
          >
            {filteredPatients.map((p) => (
              <option key={p.id} value={p.id}>
                Bed {p.bed} · Ward {p.ward} · {p.name}
              </option>
            ))}
          </select>
        </label>
        <section className={styles.patient}>
          <div className={styles.avatar}>
            <UserRound />
          </div>
          <div>
            <h1>{patient.name}</h1>
            <p>
              {patient.mrn} · {patient.hn} · {patient.sex} · DOB {patient.dob}
            </p>
            <small>
              Ward {patient.ward} · Bed {patient.bed}
            </small>
          </div>
          <span className={styles.doctorBadge}>
            {amendment ? "Doctor amendment" : "Source system simulation"}
          </span>
        </section>
        <section
          className={styles.workflowStrip}
          tabIndex={0}
          aria-label="Interface workflow information"
        >
          <b>Interface 1 of 5</b>
          <span>1. e-Documentation</span>
          <ChevronRight />
          <span>2. IPMOE</span>
          <ChevronRight />
          <span>3. n8n automation</span>
          <ChevronRight />
          <span>4. Doctor result</span>
        </section>
        {amendment && (
          <div className={styles.amendmentBanner}>
            <AlertTriangle />
            <div>
              <b>Amendment requested</b>
              <p>
                The previous comparison was{" "}
                {statusLabel[amendment.result].toLowerCase()}. Update either
                source, reconfirm both sessions, and run n8n again.
              </p>
            </div>
          </div>
        )}
        <div className={styles.orderingStage}>
          <div className={styles.stageHeading}>
            <span>Upper layer · two source sessions</span>
            <b>Enter each order independently</b>
          </div>
          <div className={styles.composer}>
            <OrderEditor
              title="E-DOCUMENTATION SESSION"
              value={eDoc}
              onChange={(v) => {
                setEDoc(v);
                setEConfirmed(false);
              }}
              confirmed={eConfirmed}
              onConfirm={() => setEConfirmed(true)}
              diffFields={differingFields}
            />
            <OrderEditor
              title="IPMOE SESSION"
              value={ipmoe}
              onChange={(v) => {
                setIpmoe(v);
                setIConfirmed(false);
              }}
              confirmed={iConfirmed}
              onConfirm={() => setIConfirmed(true)}
              diffFields={differingFields}
            />
          </div>
        </div>
        <div className={styles.automationStage}>
          <div className={styles.stageHeading}>
            <span>Lower layer · automated safety check</span>
            <b>n8n workflow automation</b>
          </div>
          <div className={styles.integrationControl} data-state={systemStatus}>
            <label>Integration demo state<select value={systemStatus} onChange={e=>setSystemStatus(e.target.value as typeof systemStatus)}><option value="OPERATIONAL">Operational</option><option value="SOURCE_STALE">Source data stale</option><option value="COMPARISON_UNAVAILABLE">Comparison unavailable</option></select></label>
            <span>Last successful synchronisation · just now</span>
            {systemStatus!=="OPERATIONAL"&&<button type="button" onClick={()=>setSystemStatus("OPERATIONAL")}>Retry connection</button>}
          </div>
          {systemStatus!=="OPERATIONAL"&&<div className={styles.systemFailure}><AlertTriangle/><div><b>{systemStatus.replaceAll("_"," ")}</b><p>Result cannot be classified as Match. Follow the manual contingency workflow until both sources are current.</p></div></div>}
          <button
            type="button"
            className={styles.runComparison}
            disabled={!eConfirmed || !iConfirmed || systemStatus!=="OPERATIONAL"}
            aria-disabled={!eConfirmed || !iConfirmed || systemStatus!=="OPERATIONAL"}
            onClick={run}
          >
            <Sparkles />
            {eConfirmed && iConfirmed
              ? "Run n8n workflow comparison now"
              : "Run n8n workflow comparison"}
          </button>
          <small className={styles.runHint}>
            {eConfirmed && iConfirmed
              ? "Ready — click the button above to start all six n8n nodes."
              : "Confirm both e-Documentation and IPMOE to enable comparison."}
          </small>
          {submitted.map((item) => (
            <div key={`${item.key}-${runs[item.key]}`}>
              <N8nDemoFlow result={item.result} />
              <button className={styles.nextInterface} onClick={onGoDoctor}>
                Open Doctor result interface <ChevronRight />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function DoctorWorkspace({
  liveRuns,
  pharmacyEscalations,
  onModify,
  query,
}: {
  liveRuns: LiveRun[];
  pharmacyEscalations: PharmacyEscalation[];
  onModify: (run: LiveRun) => void;
  query: string;
}) {
  const filteredPatients = useMemo(
    () =>
      bedSortedPatients.filter((p) =>
        `${p.name} ${p.mrn} ${p.hn} ward ${p.ward} bed ${p.bed} ${p.medications.map((m) => m.title).join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const [patient, setPatient] = useState(
    filteredPatients[0] ?? bedSortedPatients[0],
  );
  useEffect(() => {
    if (query && filteredPatients.length) setPatient(filteredPatients[0]);
  }, [query, filteredPatients]);
  const patientRuns = liveRuns.filter((r) => r.patientId === patient.id);
  return (
    <div className={styles.doctorLayout}>
      <PatientSidebar
        items={filteredPatients}
        selected={patient}
        title="Doctor result queue · by bed"
        onSelect={setPatient}
      />
      <main className={styles.main}>
        <div className={styles.crumb}>
          Doctor workspace <ChevronRight /> Comparison results
        </div>
        <label className={styles.patientSelect}>
          Select patient
          <select
            value={patient.id}
            onChange={(e) =>
              setPatient(
                patients.find((p) => p.id === e.target.value) ?? patients[0],
              )
            }
          >
            {filteredPatients.map((p) => (
              <option key={p.id} value={p.id}>
                Bed {p.bed} · Ward {p.ward} · {p.name}
              </option>
            ))}
          </select>
        </label>
        <section className={styles.patient}>
          <div className={styles.avatar}>
            <UserRound />
          </div>
          <div>
            <h1>{patient.name}</h1>
            <p>
              {patient.mrn} · {patient.hn} · {patient.sex} · DOB {patient.dob}
            </p>
            <small>
              Ward {patient.ward} · Bed {patient.bed}
            </small>
          </div>
          <span className={styles.doctorBadge}>n8n results only</span>
        </section>
        <section
          className={styles.workflowStrip}
          tabIndex={0}
          aria-label="Interface workflow information"
        >
          <b>Interface 2 of 5</b>
          <span>Doctor reviews automated outcome</span>
          <ChevronRight />
          <span>Match routes to Nurse</span>
          <ChevronRight />
          <span>Exceptions stay with Doctor</span>
        </section>
        {pharmacyEscalations
          .filter((a) => a.patientId === patient.id && a.forwardedToDoctor)
          .map((alert) => {
            const med = patient.medications.find((m) => m.id === alert.medId);
            return (
              <article className={styles.doctorEscalation} key={alert.key}>
                <header>
                  <span>PHARMACY → NURSE → DOCTOR</span>
                  <Status state="REVIEW" />
                </header>
                <h3>{alert.medication}</h3>
                <p>{alert.note}</p>
                <button
                  disabled={!med}
                  onClick={() =>
                    med &&
                    onModify({
                      key: `AMEND-${alert.key}`,
                      patientId: patient.id,
                      eDoc: recordToInput(med.eDocumentation),
                      ipmoe: recordToInput(med.ipmoe),
                      result: "REVIEW",
                      created: "just now",
                      workflowState:"DOCTOR_AMENDMENT",
                    })
                  }
                >
                  <AlertTriangle />
                  Modify prescribed medication now
                </button>
              </article>
            );
          })}
        <div className={styles.sectionTitle}>
          <h2>New n8n comparison results</h2>
          <span>{patientRuns.length} result(s)</span>
        </div>
        {!patientRuns.length && (
          <div className={styles.emptyState}>
            <Sparkles />
            <h2>No new comparison for this patient</h2>
            <p>
              Use Medication Ordering to complete both source sessions and run
              the n8n workflow.
            </p>
          </div>
        )}
        {patientRuns.map((item) => (
          <article className={styles.doctorOrder} key={item.key}>
            <header>
              <div>
                <h3>{item.eDoc.medication}</h3>
                <small>n8n compared both source records · {item.created}</small>
              </div>
              <Status state={item.result} />
            </header>
            {item.result === "MATCH" ? (
              <div className={styles.sendNurse}>
                <CheckCircle2 />
                <b>Automatically sent to Nurse for acknowledgement</b>
                <span>Dashboard notification created.</span>
              </div>
            ) : (
              <button
                type="button"
                className={styles.pleaseModify}
                onClick={() => onModify(item)}
              >
                <AlertTriangle />
                <span>
                  <b>{item.result === "REVIEW" ? "Review" : "Modify"}</b>
                  <small>
                    {item.result === "REVIEW"
                      ? "Review the difference, confirm the intended order or amend and rerun the comparison."
                      : "Return to the source-system interface to amend and rerun the comparison."}
                  </small>
                </span>
              </button>
            )}
            <div className={styles.sources}>
              <OrderReadout name="E-DOCUMENTATION" value={item.eDoc} />
              <OrderReadout name="IPMOE" value={item.ipmoe} />
            </div>
          </article>
        ))}
        <div className={styles.sectionTitle}>
          <h2>Exceptions first</h2>
          <span>Matched results follow</span>
        </div>
        {patient.medications
          .filter(
            (m) =>
              medicationMatches(m, query) ||
              `${patient.name} ${patient.mrn} ${patient.hn}`
                .toLowerCase()
                .includes(query.toLowerCase()),
          )
          .map((med, i) => {
            const exceptionKey = `EXCEPTION-${patient.id}-${med.id}`,
              superseded = liveRuns.some(
                (r) => r.key === exceptionKey && r.result === "MATCH",
              ),
              diffFields = new Set(
                med.comparison.fields
                  .filter((field) => field.result !== "MATCH")
                  .map((field) => field.field.toLowerCase()),
              );
            return (
              <article className={styles.doctorOrder} key={med.id}>
                <header>
                  <div>
                    <h3>
                      {i + 1}. {med.title}
                    </h3>
                    <small>
                      Completed n8n comparison · source details retained for
                      audit
                    </small>
                  </div>
                  {superseded ? (
                    <span className={styles.superseded}>
                      <CheckCircle2 />
                      Superseded
                    </span>
                  ) : (
                    <Status state={med.comparison.overallResult} />
                  )}
                </header>
                {med.comparison.overallResult !== "MATCH" &&
                  (superseded ? (
                    <div className={styles.sendNurse}>
                      <CheckCircle2 />
                      <b>Exception resolved by amended order</b>
                      <span>
                        Original comparison retained for immutable audit.
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className={styles.doctorReviewing}>
                        {med.comparison.overallResult === "REVIEW"
                          ? "Doctor confirmation is required because the source expressions are not automatically equivalent."
                          : "Mismatch returned to Doctor CW Chan for amendment."}
                        Nurse can view the status but cannot acknowledge or edit
                        it.
                      </div>
                      <button
                        type="button"
                        className={styles.pleaseModify}
                        onClick={() =>
                          onModify({
                            key: exceptionKey,
                            patientId: patient.id,
                            eDoc: recordToInput(med.eDocumentation),
                            ipmoe: recordToInput(med.ipmoe),
                            result: med.comparison.overallResult,
                            created: "existing comparison",
                            workflowState:"DOCTOR_AMENDMENT",
                          })
                        }
                      >
                        <AlertTriangle />
                        <span>
                          <b>
                            {med.comparison.overallResult === "REVIEW"
                              ? "Review"
                              : "Modify"}
                          </b>
                          <small>
                            {med.comparison.overallResult === "REVIEW"
                              ? "Review the highlighted difference, confirm the intended order or amend and rerun n8n."
                              : "Open this medication in both source sessions, amend, confirm and rerun n8n."}
                          </small>
                        </span>
                      </button>
                    </>
                  ))}
                <div className={styles.sources}>
                  <Source
                    name="E-DOCUMENTATION"
                    r={med.eDocumentation}
                    diffFields={diffFields}
                  />
                  <Source name="IPMOE" r={med.ipmoe} diffFields={diffFields} />
                </div>
              </article>
            );
          })}
      </main>
    </div>
  );
}

function N8nDemoFlow({ result }: { result: Result }) {
  const nodes = [
      "Receive order",
      "Validate patient",
      "Normalise fields",
      "Compare records",
      "Classify result",
      "Route alert",
    ],
    [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () =>
        setProgress((p) => {
          if (p >= nodes.length) {
            clearInterval(timer);
            return p;
          }
          return p + 1;
        }),
      450,
    );
    return () => clearInterval(timer);
  }, []);
  const complete = progress >= nodes.length;
  return (
    <>
      <div className={styles.n8nFlow}>
        <div className={styles.n8nFlowHead}>
          <b>n8n workflow execution</b>
          <span>
            {complete ? (
              <>
                <CheckCircle2 />
                All nodes completed
              </>
            ) : (
              <>
                Running node {Math.min(progress + 1, nodes.length)} of{" "}
                {nodes.length}…
              </>
            )}
          </span>
        </div>
        <div className={styles.n8nNodes}>
          {nodes.map((node, i) => (
            <div key={node}>
              <article
                data-node-state={
                  i < progress ? "done" : i === progress ? "running" : "waiting"
                }
              >
                {i < progress ? <CheckCircle2 /> : <i />}
                <b>{node}</b>
                <small>
                  Node {i + 1} ·{" "}
                  {i < progress
                    ? "completed"
                    : i === progress
                      ? "running"
                      : "waiting"}
                </small>
              </article>
              {i < nodes.length - 1 && (
                <span className={styles.nodeConnector} />
              )}
            </div>
          ))}
        </div>
      </div>
      {complete && (
        <div className={styles.routeResult} data-state={result}>
          <Sparkles />
          <div>
            <b>n8n comparison complete</b>
            <p>
              {result === "MATCH"
                ? "Matched. Nurse alert created and sent to the clinical dashboard for acknowledgement."
                : result === "REVIEW"
                  ? "Further review required. Automatically returned to the doctor amendment queue."
                  : "Mismatch detected. Automatically escalated to the doctor for amendment."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function RulesSettings() {
  const [normalise, setNormalise] = useState(true),
    [strictRoute, setStrictRoute] = useState(true),
    [explain, setExplain] = useState(true),
    [threshold, setThreshold] = useState(85);
  return (
    <main className={styles.settingsPage}>
      <div className={styles.settingsHead}>
        <div>
          <h1>Rules &amp; settings</h1>
          <p>
            Prototype configuration for how comparisons are generated and
            flagged.
          </p>
        </div>
        <span>Prototype · Nursing Informatics access</span>
      </div>
      <div className={styles.settingsGrid}>
        <section className={styles.settingsCard}>
          <h2>Matching rules</h2>
          <p>How the system compares records across systems.</p>
          <Toggle
            label="Normalize terminology"
            text="Treat PO = Oral, BD = twice daily, 1 g = 1000 mg, etc."
            on={normalise}
            set={setNormalise}
          />
          <Toggle
            label="Strict route matching"
            text="IV, IM, SC and PO must match exactly to be considered a match."
            on={strictRoute}
            set={setStrictRoute}
          />
          <Toggle
            label="AI explanation panel"
            text="Show a plain-language summary for each discrepancy."
            on={explain}
            set={setExplain}
          />
        </section>
        <section className={styles.settingsCard}>
          <h2>Alert thresholds</h2>
          <p>Controls when a partial match becomes an alert.</p>
          <div className={styles.rangeLabel}>
            <b>Match confidence threshold</b>
            <strong>{threshold}%</strong>
          </div>
          <input
            className={styles.range}
            type="range"
            min="50"
            max="100"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
          <small>
            Comparisons below this score are surfaced as alerts for review.
          </small>
        </section>
        <section className={styles.settingsCard}>
          <h2>Risk categories</h2>
          <p>High-alert drug classes get elevated severity.</p>
          <div className={styles.risks}>
            {[
              "Anticoagulants",
              "Insulin",
              "Opioids",
              "Chemotherapy",
              "Concentrated electrolytes",
              "Neuromuscular blockers",
            ].map((x) => (
              <button key={x}>{x}</button>
            ))}
          </div>
        </section>
        <section className={`${styles.settingsCard} ${styles.terminologyCard}`}>
          <h2>Terminology mapping · SOP form</h2>
          <p>
            Standard expressions treated as equivalent by the comparison
            workflow.
          </p>
          <div className={styles.mappingSections}>
            <MappingTable
              title="1. Routes"
              rows={[
                ["PO", "Oral"],
                ["IV", "Intravenous"],
                ["ID", "Intradermal"],
                ["SC", "Subcutaneous"],
                ["PR", "Per rectum"],
                ["PV", "Per vagina"],
              ]}
            />
            <MappingTable
              title="2. Frequency"
              rows={[
                ["QH", "Every hour"],
                ["Q4H", "Every 4 hours"],
                ["Q6H", "Every 6 hours"],
                ["Q8H", "Every 8 hours"],
                ["Q12H", "Every 12 hours"],
              ]}
            />
            <MappingTable
              title="3. Dosage"
              rows={[
                ["1 g", "1,000 mg"],
                ["0.5 g", "500 mg"],
                ["0.25 g", "250 mg"],
              ]}
            />
          </div>
        </section>
        <section className={styles.settingsCard}>
          <h2>User roles</h2>
          <p>Example role permissions in this prototype.</p>
          <div className={styles.roles}>
            {[
              [
                "Doctor",
                "Prescribe and amend; cannot complete Nurse or Pharmacy actions",
              ],
              [
                "Registered Nurse",
                "Acknowledge eligible Match only; triage Pharmacy alerts; cannot edit prescriptions",
              ],
              [
                "Pharmacist",
                "Vet, request clarification or escalate; cannot edit prescriptions",
              ],
              [
                "Administrator",
                "Configure terminology and rules; cannot perform clinical actions",
              ],
              [
                "Quality & Safety",
                "Read-only governance, audit and hazard oversight",
              ],
            ].map(([a, b]) => (
              <article key={a}>
                <b>{a}</b>
                <small>{b}</small>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.settingsCard}>
          <h2>Governance</h2>
          <p>Configuration changes require approved ownership.</p>
          <dl className={styles.governance}>
            <div>
              <dt>Rule set</dt>
              <dd>{governanceVersions.ruleSet}</dd>
            </div>
            <div>
              <dt>n8n workflow</dt>
              <dd>{governanceVersions.n8n}</dd>
            </div>
            <div>
              <dt>Terminology</dt>
              <dd>{governanceVersions.terminology}</dd>
            </div>
            <div>
              <dt>AI explanation</dt>
              <dd>{governanceVersions.ai}</dd>
            </div>
            <div>
              <dt>Last reviewed</dt>
              <dd>Not clinically approved</dd>
            </div>
            <div>
              <dt>Change control</dt>
              <dd>Dual approval required</dd>
            </div>
            <div>
              <dt>Audit logging</dt>
              <dd>Demo event trail · immutable backend required</dd>
            </div>
          </dl>
          <button className={styles.saveRules}>Save prototype settings</button>
        </section>
        <ClinicalReadiness />
      </div>
    </main>
  );
}
function ClinicalReadiness() {
  const priorities = [
    [
      "1",
      "Backend-enforced RBAC",
      "Doctor prescribes/amends; Nurse acknowledges eligible Match only; Pharmacy vets/escalates; Administrator configures rules without clinical authority.",
      "Production gate",
    ],
    [
      "2",
      "Formal workflow state machine",
      "DRAFT → COMPARING → MATCHED → NURSE_ACKNOWLEDGED → PHARMACY_VETTED → CLOSED. Exceptions route through DOCTOR_AMENDMENT → RECOMPARISON.",
      "Demo implemented",
    ],
    [
      "3",
      "Immutable audit trail",
      "Store user, role, hospital, ward, patient, medication, before/after values, timestamps and n8n/rule/AI versions.",
      "Production gate",
    ],
    [
      "4",
      "Deterministic clinical decisions",
      "AI explains, normalises terminology, highlights risk and supports sorting; it never modifies or approves a prescription.",
      "Demo implemented",
    ],
    [
      "5",
      "Action-led dashboard",
      "Prioritise by clinical risk, alert source, ward/bed, waiting time, owner, SLA overdue and high-alert medication.",
      "Demo implemented",
    ],
    [
      "6",
      "Alert fatigue controls",
      "Deduplication key, grouping, snooze with reason, escalation timeout, acknowledgement deadline and resolved filters.",
      "Partial",
    ],
    [
      "7",
      "Integration failure handling",
      "Show unavailable/stale sources, retry state, last successful sync and manual contingency. Failure can never be classified as Match.",
      "Demo implemented",
    ],
    [
      "8",
      "Scenario-based demo data",
      "Normal Match, dose mismatch, route mismatch, frequency review, PRN discrepancy and Pharmacy contraindication escalation.",
      "Included",
    ],
    [
      "9",
      "Clinical validation & hazard analysis",
      "Independent pharmacy and clinical validation, usability testing, downtime drills, risk acceptance and formal hazard log are mandatory before pilot use.",
      "Production gate",
    ],
  ];
  return (
    <section className={`${styles.settingsCard} ${styles.readinessCard}`}>
      <header>
        <div>
          <span>CTO REVIEW</span>
          <h2>Clinical deployment readiness</h2>
          <p>
            Priority controls required before an HA production implementation.
          </p>
        </div>
        <b>Prototype roadmap</b>
      </header>
      <div className={styles.stateMachine}>
        <strong>Core state model</strong>
        <code>
          DRAFT → COMPARING → MATCHED → NURSE_ACKNOWLEDGED → PHARMACY_VETTED →
          CLOSED
        </code>
        <code>REVIEW / MISMATCH → DOCTOR_AMENDMENT → RECOMPARISON</code>
        <code>PHARMACY_ESCALATED → NURSE_TRIAGED → DOCTOR_AMENDMENT</code>
      </div>
      <div className={styles.readinessGrid}>
        {priorities.map(([n, title, text, status]) => (
          <article key={n}>
            <strong>{n}</strong>
            <div>
              <header>
                <b>{title}</b>
                <span>{status}</span>
              </header>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <footer>
        <AlertTriangle />
        <span>
          <b>Clinical safety boundary</b> Front-end controls demonstrate
          intended permissions only. Production enforcement must exist in
          authenticated APIs, workflow services and the clinical data layer.
        </span>
      </footer>
    </section>
  );
}
function Toggle({
  label,
  text,
  on,
  set,
}: {
  label: string;
  text: string;
  on: boolean;
  set: (v: boolean) => void;
}) {
  return (
    <div className={styles.toggleRow}>
      <span>
        <b>{label}</b>
        <small>{text}</small>
      </span>
      <button role="switch" aria-checked={on} onClick={() => set(!on)}>
        <i />
      </button>
    </div>
  );
}
function MappingTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Standard term</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              <th>{r[0]}</th>
              <td>{r[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
