---
title: MCP and the local socket
description: Let an MCP client or a script on this computer use the open Rajutara window, with rajutara mcp --gui, and how MCP clients ask their user before a guarded change.
---

`rajutara mcp` serves the command layer to an MCP client with no window and its own documents ([Headless and scripting](../../headless/#the-mcp-server)). From 2.1.0, a client can also work on the documents open in the window, and you approve its changes in the assistant pane ([ADR-0032](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0032-gui-socket-and-mcp-confirmations.md)).

## Turn on the socket

Preferences › Assistant › **Local programs** has the switch **Let programs on this computer use this window (MCP)**. It is off by default. **Port (0 = any)** sets the port; 0 lets the system pick a free one.

While it is on, the page shows "Listening on 127.0.0.1:_port_" and a button **Copy the connection command**, which copies `rajutara mcp --gui`. It also warns: "A program that can read your user folder can connect while this is on. Every change still needs your approval." Each time you turn the socket on, Rajutara makes a new token.

## How a program connects

The window listens on `127.0.0.1` only and writes `gui-socket.json` to the assistant folder with the port, a random 32-byte token and the window's process id. On Linux the file has mode 0600; on Windows it has the permissions of your `%APPDATA%` folder. The window deletes the file when the socket stops or the window closes.

`rajutara mcp --gui` reads that file, connects and relays its stdin and stdout to the window. Point an MCP client at it as you would at `rajutara mcp`:

```sh
rajutara mcp --gui
```

It takes no other option: the window's role and its operator decide what the program may do. With no window listening, it prints an error on stderr and exits 1.

A script can also speak to the socket itself:

- The connection must come from a loopback address, and one program connects at a time. A second gets `{"error":"busy"}`.
- The first line must be `{"token":"<64 hex characters>"}`, within 5 s and at most 256 bytes. Otherwise the program gets `{"error":"unauthorized"}` and the connection closes.
- After the token come MCP JSON-RPC messages, one per line of at most 1 MiB, as on stdio.
- A connection that sends nothing for 10 minutes closes.

While a program is connected, the pane shows "_client_ connected" with **Disconnect**, and the status bar shows "MCP: _client_". The name comes from the client's `clientInfo`.

## Approving a program's changes

The program works through a session of the window with the role from the status bar. It reads and changes the open documents, and every change goes through their undo history. A save, overwrite, delete, close without saving or playbook checkpoint does not run at once. The window holds the call, and a card in the pane reads "_client_ wants to: _operation_ _target_".

- **Approve** runs the call once with that approval.
- **Refuse** answers the program with a tool error whose code is `operator_declined`.

A call that meets a second guarded operation after your approval is held again. The lines the program sends after a held call wait in order until you answer.

## Confirmations in MCP clients

On stdio, `rajutara mcp` can ask the client's user instead of refusing. This needs a client that speaks MCP protocol 2026-07-28 and declares form elicitation in its capabilities. For a guarded call, or a `playbook_step` that passes a checkpoint or takes a choice, the server answers `input_required` with a form that has one yes-or-no field, `approve`, and a message naming the operation and the target. The client shows the form, then repeats the call with the answer and the `requestState` it received.

That state is signed by the server, works once and expires after 300 s. It names the tool, the arguments, the client, the operation and the target. A declined form refuses the call with `operator_declined`. Clients of the older protocol revisions get `confirmation_required`, as in 2.0.0, unless the server runs with `--yes`.

A state for a playbook checkpoint names the run, not the stage. Within its 300 s it could therefore pass a later checkpoint of the same run.
