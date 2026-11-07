---
title: Models
description: Model profiles for the assistant. The six provider kinds, the twelve presets, addresses, keys, extra headers, answer formats, Windows 7, tokens, cost and timeouts.
---

The assistant calls a model only after you choose one. A **Model Profile** names where and how Rajutara calls a model: the provider kind, the address, the model name, the sign-in header, where the key comes from, and limits. Preferences › Assistant lists the profiles under **Model profiles** and edits one at a time. A profile changes only when you press **Save** in its editor.

## Off by default

A new installation has no profile and **Default model** reads **Off**. The pane then shows **The assistant is off**. The first time it does, Rajutara asks Ollama on `127.0.0.1:11434` for its version and its models, with 2 s per request, and lists what it finds. **Use this model** makes a profile from the Ollama preset and sets it as the default. **Detect Ollama** in Preferences › Assistant asks again at any time.

## Provider kinds

Rajutara speaks six kinds of API. Many vendors share one kind: Groq, DeepSeek and LM Studio all speak the OpenAI-compatible kind.

| Kind | In the editor | Speaks |
|---|---|---|
| `ollama` | Ollama | Ollama's own API |
| `llama-cpp` | llama.cpp server | llama.cpp `llama-server` |
| `openai-compatible` | OpenAI-compatible (Chat Completions) | OpenAI Chat Completions and the servers that copy it |
| `openai-responses` | OpenAI Responses API | OpenAI's Responses API |
| `anthropic` | Anthropic Messages | Anthropic's Messages API |
| `gemini` | Google Gemini | Google's Gemini API |

## Presets

**Add profile…** starts from a **Preset**. A preset fills in the kind, the address, the sign-in header, the API version, the answer format, whether a temperature is sent, and the token field. You can change every field afterwards, and the profile does not follow later changes to the preset. Twelve presets ship:

| Preset | Kind | Address | Sign-in header | Starts with | Key variable |
|---|---|---|---|---|---|
| OpenAI | `openai-compatible` | `https://api.openai.com/v1` | Authorization: Bearer | Automatic, no temperature | `OPENAI_API_KEY` |
| Anthropic | `anthropic` | `https://api.anthropic.com` | `x-api-key` | JSON schema, no temperature | `ANTHROPIC_API_KEY` |
| Google Gemini | `gemini` | `https://generativelanguage.googleapis.com` | `x-goog-api-key` | Automatic | `GEMINI_API_KEY` |
| OpenRouter | `openai-compatible` | `https://openrouter.ai/api/v1` | Authorization: Bearer | Automatic | `OPENROUTER_API_KEY` |
| Groq | `openai-compatible` | `https://api.groq.com/openai/v1` | Authorization: Bearer | Automatic | `GROQ_API_KEY` |
| DeepSeek | `openai-compatible` | `https://api.deepseek.com` | Authorization: Bearer | Any JSON (DeepSeek has no JSON schema mode) | `DEEPSEEK_API_KEY` |
| Mistral | `openai-compatible` | `https://api.mistral.ai/v1` | Authorization: Bearer | Automatic | `MISTRAL_API_KEY` |
| Azure OpenAI | `openai-compatible` | `https://<resource>.openai.azure.com/openai/v1` | api-key (Azure) | Automatic, no temperature | `AZURE_OPENAI_API_KEY` |
| Ollama | `ollama` | `http://127.0.0.1:11434` | None | JSON schema | |
| llama.cpp server | `llama-cpp` | `http://127.0.0.1:8080/v1` | None | Grammar (llama.cpp) | |
| LM Studio | `openai-compatible` | `http://127.0.0.1:1234/v1` | None | Automatic | |
| Custom | `openai-compatible` | empty | Authorization: Bearer | Automatic | |

Use **Custom** for Together, vLLM, LiteLLM and any other server that copies the OpenAI Chat Completions API. The `openai-responses` kind has no preset: pick it in the **Provider** list of any profile.

## The profile editor

| Field | What it holds |
|---|---|
| **Profile name** | Lowercase letters, digits and dashes, up to 32 characters. It cannot change once saved. |
| **Provider** | One of the six kinds. |
| **Address** | The base URL. |
| **Model name** | Up to 200 characters. For Azure OpenAI, the deployment name. **List models** fills it from the provider. |
| **Sign-in header** | Authorization: Bearer, `x-api-key`, `x-goog-api-key`, api-key (Azure) or None. |
| **API key** | **Environment variable** or **Saved on this computer**. Never the key itself. |
| **API version** | For Azure, the `?api-version=` value; leave it empty for an address that ends in `/openai/v1`. For Anthropic, the `anthropic-version` header (`2026-10-21` by default; proxies that copy the Anthropic API may need `2023-06-01`). |
| **Extra headers** | Headers a provider or gateway asks for beyond the key. |
| **Constrain answers** | How the reply is held to the format Rajutara reads (see below). |
| **Context window (tokens)** | The model's context window. The prompt may use three quarters of it. New profiles start at 16,384. |
| **Timeout (s)** | 10 to 900 s, 120 by default. |
| Prices and **Currency** | **Price per million input tokens** and **Price per million output tokens**, both or neither, and a three-letter currency such as USD or IDR. |

Under **Advanced**: **Send temperature** (0 by default; when it is off, the provider's default applies), **Max answer tokens** (16 to 65,536, 1,024 by default) and **Token limit field** (`max_tokens` or `max_completion_tokens`, for the Chat Completions kinds).

### Addresses

An address starts with `https://`. Plain `http://` is accepted only for this computer and your own network: loopback, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16`, `fc00::/7`, `fe80::/10`, `.local` names and single-label names that start with a letter, such as `http://pc-potong:11434`. The editor marks such an address **Not encrypted**, because other computers on your network can read those requests. An address that still holds a part in angle brackets, such as Azure's `<resource>`, is refused until you replace it. An address cannot hold a user name, a query or a fragment.

### Keys

**API key** has two sources:

- **Environment variable**: the key is read from a variable, such as `OPENAI_API_KEY`, each time a request leaves. The editor says when the variable is not set for this program.
- **Saved on this computer**: type the key and press **Save key**. Rajutara writes it to `keys.toml` in the assistant folder and keeps only a reference in the preferences. **Test connection**, **List models** and **Save** save a typed key too. The editor then shows "Saved (ends in 1a2b)", with the last four characters of the key, and the typed text is cleared from the field.

**Cancel** in the editor puts back what its key writes replaced. **Remove** on a profile can **Also delete its saved key and secret headers**. [Privacy and consent](../privacy/) explains how `keys.toml` is protected.

### Extra headers

**Extra headers** carry what a provider or a gateway needs beyond the key, such as OpenRouter's attribution headers, `anthropic-workspace-id` or a gateway's own key. A header name uses letters, digits and dashes, up to 64 characters. Rajutara refuses the headers it sets itself: `host`, `content-length`, `content-type`, `transfer-encoding`, `connection`, `accept`, `accept-encoding` and `user-agent`.

Tick **Secret (saved like a key)** to keep a value in `keys.toml` instead of the preferences. A header whose name contains `authorization`, `cookie`, `key`, `token`, `secret`, `auth`, `password` or `session` is always saved like a key, and the editor says so.

## Test connection and List models

**List models** asks the provider for its models: `/api/tags` for Ollama, `/models` for the OpenAI kinds, `/v1/models` for Anthropic and `/v1beta/models` for Gemini. The list keeps up to 2,000 models, shows the context size where the provider gives one, and has a **Filter**. An Azure deployment address has no list: type the model name.

**Test connection** sends the same listing request where the kind has one. Otherwise it sends one short test message that asks for a one-word answer. A result reads "Connected. 42 models found." or "Connected. The model answered in 1.2 s."

Both requests carry the profile's sign-in header and extra headers and no document data. A profile on this computer is tested at once. For any other address, the probe window **Test the connection to** _host_ opens first, and nothing leaves until you press **Send** ([Privacy and consent](../privacy/#the-probe-window)).

## The model switch and the default

**Default model** in Preferences › Assistant is the profile a new window starts with. The **Model** switch in the pane header lists every profile with its badge, **On this computer** or **Leaves this computer**. A pick applies from the next goal for as long as the window is open; **Use as default** makes it the default. `rajutara eval` uses the default unless you pass `--model` ([Trace from photo and eval](../trace-and-eval/#eval-runner)).

## Answer formats

Rajutara expects one JSON action from the model on every turn. **Constrain answers** decides how the request holds the model to that shape:

| Setting | What the request carries |
|---|---|
| **JSON schema** | The action schema, in the provider's own form: Ollama's `format`, a `json_schema` response format, Anthropic's one forced tool, or Gemini's `responseJsonSchema` |
| **Any JSON** | A request for any JSON object (`json_object`, or Ollama's `format: "json"`) |
| **Grammar (llama.cpp)** | A GBNF grammar, for the llama.cpp server only |
| **None** | The prompt alone |
| **Automatic (the best the provider accepts)** | Starts at the strongest form the kind has and steps down when the provider refuses it |

Anthropic has no **Any JSON** mode. Under **Automatic**, llama.cpp starts with **Grammar** and every other kind with **JSON schema**. When a provider refuses the format it was sent, the profile settles one step lower and the editor shows "now: Any JSON". **Reset** forgets that setting, and so does a change of kind, address or model.

The same adaptation covers two other parameters. A provider that refuses a temperature no longer gets one. A Chat Completions provider that names the other token field gets that field from then on. A profile adapts at most twice per call. The thread shows an Adapted card such as "api.example.com does not accept JSON schema; my-profile now asks for Any JSON.", and the next request to another computer opens the preview again with the change named.

When a model answers twice in a row in a form Rajutara cannot use, the goal ends with "The model answered twice in a form Rajutara cannot use. Choose a larger model, or set Constrain answers to JSON schema or Grammar."

## Context window

A local model needs a context window of about 8,000 tokens or more for the assistant; 16,384 is recommended. The fixed part of the prompt takes 2,500 to 4,800 tokens per skill. Ollama receives the profile's context window as `num_ctx`. For llama.cpp and LM Studio, start the server with a context at least as large as the profile's.

## Windows 7

Ollama does not run on Windows 7. A Windows 7 PC has three routes:

- a llama.cpp server on the same PC, with the **llama.cpp server** preset;
- Ollama on another PC of your network, with an address such as `http://192.168.1.20:11434`. That address is another computer, so each request opens the preview first;
- a hosted provider.

## Tokens and cost

Each Answer card names the profile and shows the tokens of the exchange, marked "about" when the provider did not report them and Rajutara estimated them. A profile on this computer also shows "free". With both prices set, the preview window shows the estimated cost of each request before it goes to another computer. After the first model call, the status bar shows the tokens of this session; its tooltip adds the number of model calls, the tokens in and out, and how much was sent to other computers.

## Timeouts, limits and no streaming

Calls leave from one worker thread, one at a time, in order. A connection gets 5 s and the whole call the profile's **Timeout (s)**. A reply may be at most 4 MiB. When the time runs out, the card reads "The model did not answer within 120 s. Try a smaller model or a longer timeout."

Replies do not stream. The pane counts the seconds while it waits and shows the answer when it is complete. An answer that stopped at **Max answer tokens** says so, and raising that field lets the model finish.
