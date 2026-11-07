---
title: Roles, skills and playbooks
description: Roles in the menus, the assistant's name and tone, the eight knowledge skills, how a goal runs, quick actions, the playbook runner, scenario comparison, memory and feedback.
---

## Roles and menus

The status bar shows the current role, such as **Role: Supervisor**. Click it to pick another: Designer, Grader, Marker maker, Cutter or Supervisor. The choice is kept in the preferences, and Supervisor is the default.

An action outside the role stays visible and is disabled, with the reason "Not part of the Grader role. Switch the role in the status bar." This applies in the menus, the toolbars, the command palette and the shortcuts.

| Actions | Roles that may run them |
|---|---|
| Workspace tabs, File, Edit, View and canvas actions | Everyone |
| PDS | Designer |
| Grading | Grader |
| Marker | Marker maker. Cutter too for plots, cut files, reports, exports, printing and outputs |
| Cut Plan | Supervisor. Cutter for the same output actions |

Supervisor runs everything, so a 2.0.0 user sees no change. The assistant pane and the local socket run with the same role, so the model gets only the tools the menus allow. The role guides the work; it is not access control, since anyone at the PC can switch it.

## Name and tone

Preferences › Assistant › **Role and persona** sets the **Assistant name** (1 to 30 letters, digits, spaces, `.`, `-` and `'`; "Rajutara" by default) and the **Tone**: **Formal** (the default, "Anda" in Indonesian) or **Casual** ("kamu"). The tone changes the wording of the answers only, never which tools run.

## Knowledge skills

A skill tells the model what one goal is about: a short prompt file, a list of at most 16 tools, the knowledge tags searched first and the memory scope its lessons come from. Eight skills ship:

| Skill | Workspace | About | Tools |
|---|---|---|---|
| Pattern making | PDS | Pieces, seams, notches and checks of a Style | 14 |
| Grading | Grading | Sizes, grade rules and measurement charts | 14 |
| Marker | Marker | Placing and nesting pieces | 14 |
| Cutting room | Cut Plan | Cut Plans, lays, plots and cut files | 14 |
| Materials | | Fabric use, shrinkage and cost | 8 |
| Quality check | | Checks, tolerances and QC playbooks | 10 |
| File exchange | | DXF, RUL, plots and imports | 14 |
| Teacher | | Explains how to do things in Rajutara | 9 |

Rajutara picks the skill of each goal:

1. A goal that starts with `@` and a skill id names the skill: `@grading`, `@cutting-room`, `@teacher` and so on.
2. Otherwise the first keyword that matches a whole word of the goal decides. A how or why question ("bagaimana", "cara", "how", "jelaskan", "explain", "kenapa", "why", "apa itu", "what is") goes to Teacher. Then Grading, Marker, Cutting room, Materials, Quality check and File exchange are tried by their Indonesian and English keywords.
3. With no match, the skill of the active workspace applies, and Pattern making where no skill names the workspace.

The composer's **Skill** list overrides the pick; **Automatic** shows the skill it would choose, such as "Automatic (Grading)". Keywords match whole words only, so an inflected Indonesian word does not match: "memotong" does not pick Cutting room the way "potong" does. Choose the skill in the list or start with `@cutting-room` in that case.

A shop can replace a skill's prompt file or a tone's file with its own copy in `prompts/skills/` or `prompts/persona/` of the assistant folder. The shop's copy wins over the shipped one.

## How a goal runs

For each turn Rajutara assembles a prompt from the instructions (the core, the role, the skill and the persona), the skill's tools, the last six tool results, up to four hits from the knowledge index, the lessons of the skill's memory scope and the earlier exchanges of the thread. It sends the request, checks the one action in the reply, and runs it through the command layer as the current role. Then it goes on until the model answers, a playbook run it started finishes, or you must decide something.

The goal waits for you at a save, overwrite, delete or close without saving, at a plan, at a playbook checkpoint or choice, at a question from the model, at the thread budget, and at a provider error worth a retry. Only your click reaches the approval; a model's action never does.

The model can also start playbooks and quick actions. Inside a playbook run, it gets the stage's tools and the run's checkpoints still wait for you.

## Quick actions

The **Quick** strip after the workspace toolbars shows up to six quick actions of the active workspace's playbooks, and **More…** for the rest. A quick action is a playbook with its parameters filled in, such as `optimasi-cepat` for a fast marker optimisation. They work without a model.

A button whose playbook still needs values says so ("2 values needed") and opens the form **Start** _playbook_. The form marks the values taken **from the workshop profile** and those that **need the operator's confirmation**. **Start** begins the run.

## Playbook runner

**Playbook Runner…** (in the pane's menu or the command palette) shows a run stage by stage. For the current stage it shows the report, the checks with **Passed** or **Failed**, the files it writes and the values to confirm. The buttons are **Next stage**, **Approve and go on**, the choices of a choice stage, and **Stop**. **Recent runs** lists earlier runs and **Resume** continues one. Each stage status reads **Done**, **Failed**, **Waiting for approval**, **Waiting for a choice**, **Skipped** or **Not run yet**. A failed stage is rolled back.

The runner works through the window's session, one stage per frame. A long stage, such as a nesting run, holds the window until it ends.

## Compare scenarios

**Compare Scenarios…** runs one stage of a playbook with up to 12 sets of parameters and lists their results side by side. Pick the **Playbook** and the **Stage**, then **Add scenario**, **Duplicate** or **Remove** rows and set **Seconds per scenario**. **Run comparison** runs them one per frame. **Start a run with this scenario** starts a real run from the row you prefer. A stage that writes files cannot be compared, and its button says "This stage writes files, so it cannot be compared."

## Memory

The assistant keeps lessons, preferences, facts and corrections on this computer. When it builds a prompt, document and tool results come first, the workshop profile second and memory last. A lesson that contradicts the profile or a tool result is marked outdated and keeps both values.

The assistant remembers at three moments, and each shows "Remembered: …" with **Review**:

1. A playbook run finishes: its failed checks and the choices you made.
2. You mark an answer **Not helpful**, write what was wrong and leave **Remember this as a correction** on. The comment becomes a correction in the skill's memory scope.
3. You answer a question with **Remember my choice** on. "Question → choice" becomes a preference in the skill's memory scope.

**Assistant Memory…** opens a table of every entry with **Kind**, **Scope**, **Text**, **Source**, **Updated** and **Outdated** (with the reason). Filter it by scope and kind, tick **Outdated only**, or **Search**. Text that came from files shows as plain text. **Forget** asks "Forget 3 entries? They move to the trash folder." and moves them there. **Add lesson…** adds a lesson of your own.

## Feedback

Every answer has **Helpful** and **Not helpful**. **Not helpful** opens **What was wrong?** with **Remember this as a correction** and **Save**. The card then reads "Thanks. Kept on this computer only."

Ratings go into the thread and into `feedback.jsonl` in the assistant folder: the rating, the comment, and what answered (profile, role, skill and prompt file versions). The file never holds a key, a request or a prompt, and Rajutara sends it nowhere. A changed rating adds a line, and the newest line counts.
