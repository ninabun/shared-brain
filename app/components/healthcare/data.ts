export type WorkflowStatus = "pending" | "running" | "completed" | "waiting" | "escalated" | "failed";

export interface WorkflowStep { id: string; label: string; detail: string; }
export interface ApplicationConfig {
  slug: string; title: string; statement: string; description: string; objective: string;
  problem: string; ai: string[]; n8n: string[]; workflow: string[]; roles: string[];
  risk: string; scenario: string; color: string;
}

export const applications: Record<string, ApplicationConfig> = {
  "medication-verification": {
    slug: "medication-verification", title: "Medication Consistency Verification",
    statement: "Compare across systems. Direct clinicians to the difference.",
    description: "A real-time workflow that compares medication information in e-documentation and IPMOE, identifies inconsistencies and coordinates human review.",
    objective: "Reduce repetitive side-by-side medication comparison while preserving nursing and medical responsibility.",
    problem: "Doctors may document a medication plan and separately create medication orders. Nurses may need two devices or two staff members to compare complete lists across two systems.",
    ai: ["Explain a detected discrepancy", "Convert approved free text into a structured draft", "Summarise the comparison", "Classify a clarification reason"],
    n8n: ["Receive documentation and order events", "Retrieve and normalise approved data", "Invoke deterministic comparison", "Route review and start timers", "Escalate and record resolution"],
    workflow: ["Retrieve current versions", "Validate context", "Normalise medication data", "Compare fields", "Flag discrepancy", "Nurse review", "Clinician clarification", "Resolution logged"],
    roles: ["Nurse", "Doctor", "Pharmacist"], risk: "High", color: "#8b7bff",
    scenario: "A dose in the medication plan differs from the active IPMOE order. The workflow highlights the field and requests authorised review."
  },
  "discharge-intelligence": {
    slug: "discharge-intelligence", title: "Discharge Workflow Intelligence",
    statement: "Turn fragmented discharge work into one coordinated pathway.",
    description: "A shared readiness view that coordinates outstanding discharge work across professions without deciding clinical fitness for discharge.",
    objective: "Create a shared readiness view and coordinate outstanding discharge tasks across multiple professions.",
    problem: "Discharge depends on tasks distributed across medical, nursing, pharmacy, clerical and allied-health teams. Ownership and dependencies are often fragmented.",
    ai: ["Explain approved discharge instructions", "Translate information", "Summarise outstanding tasks", "Answer non-clinical process questions"],
    n8n: ["Create a discharge case", "Generate pathway-specific tasks", "Assign owners and dependencies", "Remind and escalate blockers", "Activate follow-up after confirmation"],
    workflow: ["Potential discharge", "Create task set", "Assign owners", "Monitor dependencies", "Detect delay", "Escalate blocker", "Clinician confirms", "Follow-up activated"],
    roles: ["Doctor", "Nurse", "Pharmacist", "Ward clerk", "Discharge coordinator"], risk: "High", color: "#43d7c5",
    scenario: "A patient is expected home today, but pharmacy reconciliation is late. The workflow makes the blocker visible and escalates it by policy."
  },
  "critical-result-escalation": {
    slug: "critical-result-escalation", title: "Critical Result Escalation",
    statement: "Validated result. Correct team. Closed-loop acknowledgement.",
    description: "A controlled notification workflow that routes a validated critical result to the current responsible team and escalates when acknowledgement is overdue.",
    objective: "Ensure a validated critical result reaches the current responsible team and is escalated if not acknowledged.",
    problem: "The responsible team can change during transfer or handover. Delivery alone does not prove acknowledgement, clinical review or documented action.",
    ai: ["Summarise communication status", "Translate an approved patient explanation", "Classify non-clinical response text"],
    n8n: ["Receive a validated result event", "Apply approved threshold rules", "Resolve the current clinical team", "Send and monitor secure alert", "Escalate and record every outcome"],
    workflow: ["Result released", "Validate rule", "Identify current team", "Send alert", "Start timer", "Escalate if unanswered", "Acknowledge", "Record final communication"],
    roles: ["Laboratory", "Responsible doctor", "Backup clinician", "Duty manager"], risk: "Critical", color: "#ff8c73",
    scenario: "A critical potassium result is released after the patient transfers wards. The first alert expires and the policy routes it to the backup clinician."
  }
};

export const landscape = [
  ["Medication consistency checking","Repetitive comparison across documentation and IPMOE.","Retrieve, normalise, compare and route exceptions.","Directs clinicians to differences.","Missed or false discrepancy","Coded data, deterministic rules and mandatory review","medication-verification"],
  ["Smart reception","Patients may not know which team should respond.","Validate category, route, time and escalate.","Reduces interruptions.","Urgent request misrouted","Emergency pathways and human fallback",null],
  ["Rostering","Managers balance coverage, skills, leave and fairness manually.","Collect, validate, approve, publish and version.","Makes exceptions visible.","Valid but unsafe roster","Skill-mix constraints and manager approval",null],
  ["Incident reporting","Reports may be incomplete or delayed.","Validate, assign, remind and track closure.","Improves accountability.","Wrong severity","Rule screening and human confirmation",null],
  ["Appointment reminders","Patients miss visits or preparation.","Send approved reminders and route responses.","Reduces non-attendance.","Wrong recipient","Consent, identity and neutral messaging",null],
  ["Bed management","Availability and transfer status become stale.","Coordinate events, tasks and delay escalation.","Improves flow visibility.","Stale status","Freshness display and bed-manager confirmation",null],
  ["Discharge coordination","Tasks and dependencies span many teams.","Create tasks, monitor owners and escalate blockers.","Reduces avoidable delay.","Readiness mistaken for fitness","Final authorisation remains clinical","discharge-intelligence"],
  ["Critical laboratory notification","Results may not reach the current team.","Route, monitor acknowledgement and escalate.","Creates closed-loop communication.","Alert fatigue or wrong team","Approved thresholds and role escalation","critical-result-escalation"],
  ["AI-assisted documentation","Clinicians convert conversations into structured notes.","Call an approved drafting service and route review.","Reduces repetitive typing.","Unsupported content","Source context, draft labels and signature",null],
  ["KPI dashboards","Operational data is manually combined and stale.","Validate, transform and refresh governed datasets.","Improves timely visibility.","Incorrect metrics","Data owners, reconciliation and freshness",null]
] as const;

export const adapterNote = `Future N8nWebhookAdapter implements the same contract as MockWorkflowAdapter; no clinical connection is present in this concept.`;
