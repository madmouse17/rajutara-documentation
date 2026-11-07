---
title: The Rajutara assistant
description: Type a goal, follow each tool call on a card, approve what writes files and undo any change. The assistant pane, its threads and cards, from Rajutara 2.1.0.
---

The assistant is a pane beside the workspaces. You type a goal, such as "add 1 cm seam allowance to every piece and save", and a model of your choice works towards it with the same tools that `rajutara batch` and `rajutara mcp` use ([Headless and scripting](../headless/)). Each tool call shows on a card in the pane. The model can read the open documents and change them; it cannot save, overwrite, delete or close an unsaved document until you press Approve, and you can undo each change it makes.

The assistant is new in Rajutara 2.1.0. Its pane stays closed until you open it, and the Supervisor role, the default, leaves every menu action enabled.

## Turn it on

The assistant is off until you choose a model. View › Assistant (`Ctrl+Shift+A`) opens the pane. With no model chosen it shows **The assistant is off**.

The first time the pane opens like this, Rajutara asks Ollama on this computer (`127.0.0.1:11434`) for its version and its models. If it answers, the pane lists the models: pick one and press **Use this model**. Rajutara makes a profile from the Ollama preset and sets it as the default. **Add another provider…** opens Preferences › Assistant instead, where you add a profile for llama.cpp, LM Studio, a hosted provider or a server on your network. [Models](models/) explains every field.

Quick actions, the playbook runner and Compare Scenarios… work without a model ([Roles, skills and playbooks](skills-and-playbooks/)).

## The pane

The pane opens on the right of every workspace, 380 pt wide. Drag its edge to make it 280 to 720 pt wide. The header holds:

- the thread picker, with **New thread**;
- the skill chip;
- the **Model** switch, which lists every profile with a badge: **On this computer**, or **Leaves this computer** (plus **Not encrypted** for an `http` address on your network);
- a menu with **Delete thread**, **Assistant Memory…**, **Playbook Runner…** and **Assistant Settings…**.

A model picked in the switch applies from the next goal and lasts while the window is open. **Use as default** writes it to the preferences.

At the bottom is the composer. Type the goal; Enter sends it and Shift+Enter starts a new line. **Attach file** adds a PNG, JPEG, PDF, CSV or XLSX file as an attachment. The **Skill** list chooses **Automatic** or one of the eight skills, and **Send** turns into **Stop** while a goal runs. When the optional voice helper is installed, a **Speak** button sits beside them ([Voice](voice/)).

While a request is out, a line above the composer counts the seconds. Replies do not stream: the answer appears when the model has finished it.

## Threads

A thread is one conversation with its goals, steps and answers. Each thread is a file on this computer, `threads/<thread-id>.jsonl` in the assistant folder (`~/.config/rajutara/assistant/` on Linux, `%APPDATA%\rajutara\config\assistant\` on Windows). **Delete thread** asks first and moves the file to the trash folder `threads/.rajutara-trash/`.

The model sees the earlier exchanges of the thread as context, each side cut to 300 characters. Preferences › Assistant › **Budget** sets **Tokens per thread** (0 = no limit). When a request needs more than the thread has left, a card reads "This thread used A of B tokens." and waits: **Continue** adds tokens, **Stop** ends the goal.

## Cards

Each message of a thread is a card, newest at the bottom. Every card has a status glyph and a word, so its status never depends on colour alone. Buttons appear only on the card the goal is waiting for, and only your click answers it.

| Card | What it shows | Buttons |
|---|---|---|
| Goal | Your text and attachments | |
| Answer | What the model said, the profile, the tokens (marked "about" when estimated), and "free" for a model on this computer | **Helpful**, **Not helpful** |
| Step | The tool, a sentence about its result and the time. **Details** shows the arguments, the result and the text that came from files. **Before** and **After** pictures when the tool gives one | **Undo this change** |
| Approval | "Approve: Overwrite kaos.rjx?", what keeps you safe (a backup copy, the trash folder or a recovery copy), and a warning when the name came from a file | **Approve**, **Cancel** |
| Plan | The steps of a plan whose dry run passed | **Approve plan**, **Cancel** |
| Question | The model's question with 2 to 6 choices | The choices, **Remember my choice** |
| Checkpoint, choice, run | A playbook stage with its checks, the files it writes and the values that need your confirmation | **Approve and go on**, the choices, **Stop run**, **Open in the runner** |
| Sent or not sent | The size sent and the host, or "Not sent. Nothing left this computer." | |
| Error | What went wrong and what to do, with the provider's own message below | **Retry**, or **Open Assistant Settings** |
| Adapted | What the provider refused and what the profile sends now | **Open Assistant Settings** |
| Budget | "This thread used A of B tokens." | **Continue**, **Stop** |
| What's new | The release notes of the running version | **Show all**, **Got it** |
| Program request | "_program_ wants to: _operation_ _target_" from a program on the local socket | **Approve**, **Refuse** |

The model's answer is shown as text with a small set of markdown: paragraphs, headings, bold, italic, code, lists and quotes. A link shows as "text (url)". Nothing in an answer is clickable, and Rajutara fetches nothing it names.

**Retry** appears for rate limits, an overloaded or failing server, a timeout and a host that does not answer, and it waits for the time the provider asked for. A refused or missing key, an exhausted quota, an unknown address or model, a request that is too long, a refused parameter, a redirect or two unusable answers in a row get **Open Assistant Settings** instead.

## Approvals and undo

The model works through tool calls, and only your click approves anything that writes or discards. Four operations wait on an Approval card: Save, Overwrite, Delete and Close without saving. The safety nets of the command layer apply as well: every overwrite first writes a dated `.bak` copy, a delete moves the file to `.rajutara-trash/` beside it, and a document closed unsaved gets a recovery copy.

A plan is a list of steps that Rajutara first runs as a dry run and rolls back. When the dry run passes, the Plan card lists the steps and **Approve plan** runs them.

**Undo this change** on a Step card takes back that one change while the document's undo history still holds the state before it. Once it does not, the card says "The earlier state is no longer in the undo history." The changes a goal makes between two of your answers also form one undo step, so `Ctrl+Z` takes them back together.

A goal ends when the model answers, when you press **Stop**, after 12 model calls, after two unusable replies in a row, when the provider fails, or when you do not send a request to another computer. **Stop** takes effect between two tool calls.

## What's new

After an update, the first thread shows a **What's new in 2.1.0** card with the release notes of the running version, once per version. It shows the first 12 lines; **Show all** shows the rest and **Got it** closes it. The notes come from the changelog built into the program and are in English, and the Indonesian interface says so. Later, the Teacher skill can fetch the same notes, or those of an earlier version, with the `release_notes` tool.

## Next

- [Models](models/): profiles, presets, keys and answer formats.
- [Privacy and consent](privacy/): what leaves the computer and the window that asks first.
- [Roles, skills and playbooks](skills-and-playbooks/): roles in the menus, the eight skills, quick actions and memory.
- [MCP and the local socket](mcp-and-socket/): let another program use the open window.
- [Voice](voice/): the optional helper for spoken goals.
- [Trace from photo and eval](trace-and-eval/): turn a photo into a draft piece, and test a model on your own cases.
