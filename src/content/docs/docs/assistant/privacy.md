---
title: Privacy and consent
description: What the assistant sends, where, and when. Local and remote models, the preview window, redaction, keys, and the files the assistant keeps on this computer.
---

Rajutara has no telemetry and no cloud account. The assistant sends a prompt only to the model you chose, and before a request goes to any computer other than this one, you see it as it will be sent and decide. The repository's [`SECURITY.md`](https://github.com/madmouse17/rajutara/blob/main/SECURITY.md) lists every connection the program opens; this page covers the assistant's part ([ADR-0031](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0031-egress-consent-and-secrets.md)).

## Local and remote

Only this computer counts as local: the loopback addresses `127.0.0.0/8`, `::1` and `localhost`. Every other host is remote, a PC on your own network included. The model switch and the profile list show each profile's badge: **On this computer** or **Leaves this computer**.

| Data | Leaves this computer | When |
|---|---|---|
| A prompt to a model on this computer | No | |
| A prompt to a model on another computer | Yes, exactly as the preview shows it | Only after **Send** for that request. A retry or an adapted request asks again |
| The bytes of an attachment | Never to a model. The model sees only tool results about the file | |
| API keys and secret header values | Only in the headers of their own profile's requests | Each request of that profile |
| **Test connection** and **List models** to another computer | The sign-in header, the extra headers and a model-list request or a one-word test message; no document data | Only after **Send** in the probe window |
| Threads, ratings, memory, the knowledge index, eval results, run records | No | |
| Traffic on the local socket | No, it stays on `127.0.0.1` | While the socket is on |
| Voice audio | No. The voice helper has no network code | |
| Release notes | No. They are built into the program | |
| `rajutara eval` requests to a model on another computer | Yes, and each body is saved first | Only with `--allow-remote` |

A request to a model on this computer goes out at once and never through a proxy.

## The preview window

Every request to another computer opens the window **Before sending to** _host_. It holds the keyboard until you decide. It shows:

- "This request leaves your computer and goes to _host_ (model _model_).", the size, and the estimated tokens;
- **Estimated cost**, when the profile has prices;
- "Not encrypted: other computers on your network can read this request." for an `http` address;
- "It goes through the proxy _proxy_." when the environment sets a proxy (`HTTPS_PROXY`, `HTTP_PROXY` or `ALL_PROXY`, unless `NO_PROXY` covers the host);
- a note when the request repeats one the host refused, or changed after the profile adapted.

The window has three tabs:

- **Summary** lists the parts of the request with their sizes (**Instructions**, **Tools**, **Lessons**, **Knowledge hits**, **Document summary**, tool results, **Text from files**, **Earlier messages** and **Your goal**), the parts that are new since the last request you sent, and the replacements made by redaction with their originals. The originals stay on this computer.
- **Exact request** shows the body exactly as it will be sent. **Copy** copies it.
- **Headers** shows the method, the full address and every header. A secret shows as `•••• (key saved as openai)` or `•••• (from OPENAI_API_KEY)`, never its value.

The checkbox **Replace names, PO codes, prices and paths** turns redaction on or off for this request. The request is then assembled again and the window shows the new version.

**Send** sends this one request. **Don't send** and Esc decline it, and the goal ends with "Not sent. Nothing left this computer." Enter presses nothing until a button has the keyboard focus. There is no "always allow": a goal that needs five model calls asks five times, and so do retries and adapted requests.

Rajutara checks the consent against the host it connects to and the exact bytes it sends. A request to another computer without a matching **Send** is refused before any name lookup.

## The probe window

**Test connection** and **List models** for a profile on another computer open **Test the connection to** _host_. It says what the request holds: the profile's key if it has one, no document data, and either a request for the list of models or one short test message that asks for a one-word answer. Nothing leaves until you press **Send**.

## http only on your own network

A provider on the internet needs `https`. Plain `http` is accepted only for this computer and the private address ranges and local names of your own network ([Models](../models/#addresses)), and the editor and the preview both mark it **Not encrypted**.

## Redirects and proxies

Rajutara never follows a redirect, because a redirect could carry a body you approved for one host to another. The card reads "_host_ sent the request on to _target_. Rajutara does not follow redirects: put that address in the profile if you trust it."

A request to another computer uses the proxy of the environment when one is set, and the preview names it. A request to this computer never uses a proxy.

## Redaction

Redaction is on by default for every request to another computer: Preferences › Assistant › **Privacy** › **Replace names, PO codes, prices and paths before sending to another computer**. It replaces:

- buyer names with `⟦BUYER_1⟧`, `⟦BUYER_2⟧` and so on;
- PO codes with `⟦PO_1⟧`;
- prices, every value with a money unit and numbers of three characters or more in free text, with `⟦PRICE_1⟧`;
- your home folder with `⟦PATH_1⟧`, while paths inside the session folder become relative;
- secrets written as `password: …` or as a PEM private key with `⟦SECRET_1⟧`.

The map back stays on this computer and is never part of the request. Redaction matches exact strings: a buyer name spelled differently in free text can still pass. The Summary tab of the preview lists every replacement, so check it before you press **Send**.

## Keys and secret headers

A key or a secret header value comes from an environment variable, read just before the request leaves, or from `keys.toml` in the assistant folder. On Linux Rajutara writes `keys.toml` with mode 0600, so only your user can read it. On Windows the file has the permissions of your `%APPDATA%` folder. Rajutara never reads or writes the file through a link.

Keys never enter the preferences, the threads, the logs, the action logs, the previews, the run records or the error texts. When a provider's error message repeats a secret of the request, Rajutara removes it before the message is shown.

## Files on this computer

The assistant folder is `~/.config/rajutara/assistant/` on Linux and `%APPDATA%\rajutara\config\assistant\` on Windows. Nothing in it leaves the computer. Deleting it loses history and recall, never documents.

| File | Holds |
|---|---|
| `preferences.json`, section `assistant` | The pane's state and width, the default model, the profiles (key references only), role, persona, redaction, thread budget, the socket switch and port, the voice helper path and language, and the last version whose notes were shown |
| `keys.toml` | API keys and secret header values |
| `threads/<thread-id>.jsonl` | One thread. Each preview decision is recorded with the host, the size, a SHA-256 of the request and whether it was sent. Deleted threads move to `threads/.rajutara-trash/` |
| `feedback.jsonl` | Ratings and comments, with the profile, role, skill and prompt versions that answered. Never a key, a request or a prompt |
| `memory/memory.jsonl` | Assistant memory (a project's own memory goes to `.rajutara/memory/` in the project) |
| `kb/` | The knowledge index. Your own files are read and never changed |
| `runs/<run>/` | Playbook runs and their records |
| `playbooks/`, `prompts/`, `profil-bengkel.toml` | Managed playbooks, the shop's own prompt files and the workshop profile |
| `gui-socket.json` | The local socket's port, token and process id, only while the socket listens |
| `evals/` | `rajutara eval` results, and for a remote model the request bodies |

Beside each document the command layer keeps its safety nets: the action log `<stem>.agent-log.jsonl`, dated `.bak` copies, the trash folder `.rajutara-trash/` and recovery copies.
