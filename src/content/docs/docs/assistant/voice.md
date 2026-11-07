---
title: Voice
description: Speak a goal in Indonesian or English. The optional rajutara-voice helper, which download fits your PC, where to put it, and its status on Windows 7.
---

Voice input is optional. A separate program, `rajutara-voice`, records the microphone and writes down what you said, offline, with whisper.cpp and the `ggml-base-q5_1` model. The transcript goes into the composer, where you check it and press **Send** yourself. Rajutara never sends a transcript by itself ([ADR-0033](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0033-offline-voice-helper.md)).

The main program has no audio code. Without the helper the composer has no mic button and nothing else changes.

## Download

Each release from 2.1.0 on its [releases page](https://github.com/madmouse17/rajutara/releases) has the helper beside the program:

| File | For |
|---|---|
| `rajutara-voice-<version>-linux-x86_64.tar.gz` | Linux x86_64 with a CPU that has AVX2 |
| `rajutara-voice-<version>-windows-x86_64.zip` | Windows 10 and 11, 64-bit, with a CPU that has AVX2 |
| `rajutara-voice-<version>-win7-x86_64.zip` | Windows 7 SP1 and later, 64-bit, any CPU |
| `rajutara-voice-<version>-win7-i686.zip` | Windows 7 SP1 and later, 32-bit, any CPU |

The Windows 7 zips also run on Windows 10 and 11. Use one of them on a PC whose CPU lacks AVX2. Each archive holds a `rajutara-voice` folder with the helper, the model, the licences and `THIRD-PARTY.html`.

## Install

Unpack the archive. Then either:

- put the `rajutara-voice` folder beside the Rajutara executable, so the helper is at `rajutara-voice/rajutara-voice` (`rajutara-voice\rajutara-voice.exe` on Windows); or
- set Preferences › Assistant › **Voice input** › **Helper program** to the helper's path.

The AppImage on Linux runs from a temporary mount, so set **Helper program** there. The page shows "Found: _path_" when Rajutara finds the helper, and "Not installed" otherwise.

## Speak a goal

Press **Speak** in the composer. The first press starts the helper; it then keeps running until the window closes. The pane shows "Listening…" with the input level, then "Writing down what you said…". Press **Stop listening** when you have finished. One utterance lasts at most 60 s.

**Language** in Preferences › Assistant › **Voice input** is **Automatic**, **Indonesian** or **English**. Automatic lets the model detect the language.

When something fails, the pane shows "Voice input failed:" with the reason: no microphone, no model file, a model that does not load, a capture error, or an utterance over 60 s.

## Privacy

The helper has no network code; its build bans the HTTP and async crates. Audio stays in its memory and is never written to disk or sent anywhere.

## Status on Windows 7

The Windows 7 builds pass the import check that keeps every Rajutara build loadable on Windows 7, but nobody has run the helper on a real Windows 7 PC yet. The memory budget of 600 MB while transcribing on a 32-bit PC has not been measured either. Report what you see on [GitHub](https://github.com/madmouse17/rajutara/issues), and see [Windows 7](../../windows-7/) for the program itself.
