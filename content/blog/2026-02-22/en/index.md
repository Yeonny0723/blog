---
title: "AI Doesn't Know Your Design System: Wiring Our In-House FDS into an MCP Server"
date: "2026-03-01"
tags: ["ai", "mcp", "design-system", "frontend"]
description: "How I exposed an existing design system through an MCP server to cut the search cost and quality risk out of AI-assisted UI work."
lang: "en"
translation: "/2026-02-22/"
---

# AI Doesn't Know Your Design System: Why I Wired Our In-House FDS into an MCP Server

Having a design system doesn't mean AI can use it. Handing UI work to an AI agent from a Figma mockup has become common, but in practice the agent gets stuck less on writing the code than on finding and correctly applying in-house UI knowledge.

Part of building a stable product is how fast you can respond to what users need. In AI-assisted UI development, that speed doesn't always show up. The design system already exists. The AI just doesn't know it.

A human developer looks at a screen and makes the connections without thinking. Which shared component this button maps to, which token this background color maps to, what the icon is called, where a similar example lives in Storybook. AI has none of that: not the names, not the rules, not the examples, not the change history.

So when you hand a new screen to an AI, the real bottleneck is rarely "can it write code." It's "can it find and apply the right in-house UI knowledge." This post isn't about building a new design system. It's a record of how I connected FDS, our existing in-house design system, to an MCP server so that AI could read and use it.

## Why AI work slows down even when a design system exists

The problem doesn't stop at spending longer on search. When the AI doesn't know the component structure, it will improvise something that looks similar, or write code against props that don't exist. Then a human has to review it against FDS, fix what's wrong, and fill in the missing tokens. You delegated the implementation and got a larger review bill back.

The cost is highest on new screens. If a similar page already exists, you can point at it. When a new design comes in, someone has to re-explain the candidate components, how they compose, the color tokens, the icon names. Storybook examples exist, but the AI can't reliably find the right one at the moment it needs it.

Say you get a Figma mockup for a delete-confirmation modal. A human developer immediately thinks `Modal`, `Button`, `Typography`, and connects the rest quickly: which type the confirm button takes, which spacing pattern the body follows, which color token a destructive action uses. Without those internal rules, AI will invent a lookalike modal, pass props that don't exist, or mix colors and icons that don't match the standard.

Two risks compound here:

1. The context a human has to hand the AI keeps getting longer.
2. The longer that explanation gets, the more room there is for the AI to mix in something wrong.

When the design system keeps changing, hand-written docs can't stay current either. Code changes, docs lag, and the product developer using AI has to keep tracking the gap. What was needed wasn't one more document. It was a layer that keeps FDS code and guidelines as the single source of truth while letting AI query them on demand.

## The core problem: AI needs a queryable knowledge layer, not documentation

(FDS refers to our in-house design system.)

The goal was never to build a new design system. It was to make the existing FDS something AI could use accurately.

The important call was not to duplicate FDS into another human-readable document. README and Storybook are still useful, but AI needs a different interface: it has to pull only what it needs, at the moment it needs it, and what it pulls can't drift from the current code.

So I exposed FDS as a queryable tool rather than a document. Instead of a human explaining "use this component for this button, here are the props, use this color token," the AI calls for what it needs mid-task.

That led to three principles:

1. The single source of truth stays the FDS source code.
2. The knowledge is generated from source, not maintained by hand.
3. The runtime server stays light; heavy analysis happens at build time.

Taken together, these principles point away from writing better explanations and toward making current information retrievable at the moment it's needed.

## The approach: exposing FDS through an MCP server

The structure I ended up with is a pipeline: `FDS source code -> generated-registry.json -> MCP server -> AI agent`.

The point isn't to stuff all of FDS into the prompt. It's to analyze the source into a registry that's easy to query, then expose that through MCP tools. Given a natural-language request, the AI calls a tool when it needs component, hook, color, or icon information.

The flow looks like this:

1. Pull clues from the Figma screen: layer names, color values, icon tokens.
2. Search FDS for candidate components based on those clues.
3. Look up component details, props, and examples.
4. Re-map color tokens and icon names to FDS equivalents.
5. Write the actual UI code against those results.

The MCP server doesn't do the implementation. It supplies the FDS knowledge the implementation needs. State management, data flow, performance, consistency, browser compatibility, E2E verification: none of that goes away. What changes is that there's now a point of intervention for the search and translation cost that came from the AI not knowing FDS.

In practice I expected a query flow like this:

1. "Find me the FDS components for a delete confirmation dialog."
2. `search_fds_components` narrows the candidates.
3. `get_fds_component` returns props, imports, and examples for `Modal` and `Button`.
4. `search_fds_colors` and `search_fds_icons` handle button colors or icons as needed.
5. The UI code gets written against what came back.

Rather than pushing one long explanation into the prompt up front, the AI fetches what it needs when it needs it.

## Why a static-analysis registry

The part that mattered most was generating AI-usable knowledge from FDS source automatically.

The information already existed, scattered. Props interfaces lived in component files, descriptions in JSDoc, real usage examples in Storybook. Icons were in a separate map, colors in token files. It was all readable by humans and none of it was in a shape AI could use directly.

So I added a build step that statically analyzes the TypeScript AST and produces `generated-registry.json`. No repeated heavy parsing at runtime. The server reads a structured result that was generated once.

That gave me:

- Components: props, descriptions, usage examples, related subcomponents
- Hooks: parameters, return types, descriptions
- Icons: label lists per variant
- Colors: tokens by category, with searchable values

This shifts the model from "update the docs" to "the source is the knowledge base." When FDS code changes, you regenerate the registry, and the AI always queries the current structure.

It wasn't all smooth. Extracting information automatically requires the FDS code structure, export conventions, and Storybook example quality to be reasonably consistent. Differences that look harmless when a human reads them turn into exception cases the moment you point static analysis at them.

The other thing I noticed: what matters to AI is being given the *right* information, not more of it. My first instinct was to expose more at once. Splitting things into list, search, and detail lookups, so it pulls only what the current step needs, turned out to be more reliable.

Connecting Figma tokens to code tokens was touchier than expected. A human compensates for a slightly different name using context; AI accuracy drops immediately on that kind of gap. Shaping the data so it searches and maps well mattered more than collecting it.

## Storybook as an example source for AI, not just humans

One of the more interesting parts was redefining what Storybook is for.

Storybook usually reads as documentation for humans browsing components. From the AI's side, it's also a repository of verified examples showing how something should be used. Props definitions alone don't lift code generation quality much. You need examples of what it composes with and what state flow it sits in.

So I extract both args-based and render-based examples from `index.stories.tsx`, preferring examples that include state changes where possible. For dialog-type components, an example with `useState` opening and closing it is more useful than a static one-liner.

That way the AI carries more than "this component takes these props." It gets "this is the pattern it's actually used in."

## A translation layer between Figma tokens and code tokens

Another recurring problem in real screen work: Figma and code speak different languages.

The design shows `ic/fill/check circle`, `--Color-bg-interactive-brand-secondary`, `#E8F3FF`. The code needs those as FDS icon names and color tokens. A human can infer the mapping by eye. Without a translation layer, AI accuracy falls off sharply.

So the icon and color tools are built for search and conversion rather than plain lookup:

- Icon search handles both Figma token forms and ordinary keywords.
- Color search accepts CSS variable names, hex codes, and property values.
- Clues from the Figma MCP feed straight into FDS lookup.

Because of this, the AI can land close to the in-house standard from on-screen clues and intent, without knowing the exact component name.

## Separating lookup from search in the tool design

There are ten MCP tools. Components, hooks, colors, and icons are separate domains, and within each domain, list, detail, and search are separate tools.

The reason is simple: the AI doesn't always start out knowing the exact name.

Sometimes it has only intent, like "delete confirmation dialog," and needs search first. Other times it already knows the name is `Modal`, and a detail lookup is the faster path. Same with colors and icons: sometimes you want to see the whole system, sometimes you want to convert one on-screen clue into a token immediately.

Splitting the tools up lets the AI pick only the action it needs right now:

- Scan the full list.
- Narrow candidates by keyword.
- Look up details by exact name.

This worked better than a long prompt. Instead of injecting every explanation up front, information gets called as the work requires it.

## Adding a read layer without changing the design system

One thing I deliberately avoided: redesigning FDS itself to be MCP-friendly.

Overhauling a design system already in production to suit AI is expensive and destabilizes the whole team's workflow. So I left the existing export structure, component files, Storybook, icon map, and color tokens alone, and added a layer on top that AI can read.

The upside was clear:

- The existing developer workflow barely changes.
- FDS source stays the single source of truth.
- No separate long-lived document to maintain for AI's benefit.

So this wasn't a design system rebuild. It extended how the existing assets can be reached.

## Why MCP instead of a skill

I get this question a lot: "couldn't this be a skill?"

To some degree, yes. But the deciding factor wasn't which explanation you hand the AI. It was how you keep it supplied with the current state.

Skills are good at static guidance and procedure. This problem needed direct access to the current FDS code, current props, current examples, current tokens. Given how fast a design system changes, reading current information at execution time fits better than an explanation maintained by hand.

So MCP suited this problem better than a skill. Both help the AI; this case needed an interface for querying current state more than a document explaining usage.

## Closing

Having a design system doesn't mean AI can use it. Connections that are obvious to a person are missing context for AI. The real bottleneck is often not code generation but how accurately in-house standards get connected.

The goal here wasn't a new FDS. It was turning the existing FDS into an asset AI can also use. Instead of writing more documentation, I read the code, examples, and tokens automatically and exposed them as MCP tools. What used to depend on a human explaining things became something the AI queries directly when it needs to.

The users of a design system are unlikely to stay human developers only. If AI is part of the team using the same system, what matters isn't writing more explanation. It's reshaping existing knowledge into something AI can consume.
