---
layout: "../../layouts/BlogLayout.astro"
title: "The Art of Code"
pubDate: 2026-03-14
description: "Building an MNIST classifier with no dependencies in Rust"
author: "Jeremy Cavallo"
tags: ["ml", "rust"]
---

![Header](../../assets/the-art-of-code/header.jpg)

In the era of AI, developers are shipping faster than ever, yet writing less
code themselves. It's easy to slip away from our roots. We started writing code
because we wanted to build something. Along the way, there were lots of
struggles. Late nights scrolling through StackOverflow forums, trying to find
the solution to some niche bug.

Why did we endure this pain?

**_Because eventually, we would solve the problem_**

That's the exciting part. That's the rewarding part. That's what brings us back.
Letting the agent solve all of our problems? Yes, it's much more efficient. But
that rewarding feeling is gone. And because of that, developers are burning out
and forgetting their roots.

## A Changing Industry

Over the past year, we've learned one thing: AI is here to stay. As developers,
we need to adapt to this new era of software. Years of working in the industry
has taught us that the "best" developers are the ones who write (1) a lot of
code, that (2) solves real problems, and (3) scales well and is easily
maintained. It's easy to associate your worth as a developer directly with the
amount of code you contribute to your company's codebase.

In the past, there has been a sort of "mythical creature" in the software world:
the 10x developer. This is the person who ships 10x more code than the average
dev, never makes mistakes, and solves every problem they touch. As it turns out,
in 2026, that developer has a name: Claude. And as such, every developer who has
access to Claude (or GPT) is now, themselves, a 10x developer. If you're still
writing code by hand, you _will_ fall behind.

This is a huge shift for developers. The best engineers, the old "10x
developers", are now being out-performed by the 22 year old new-hire and their 4
parallel agents. They're leaning in to agentic workflows, then burning out.
They're used to hand-crafting every feature and owning every line of code,
confidently filing PRs with a deep understanding of the thought process behind
every line. Now, they've lost the fun part of writing the code, and their whole
job is reviewing AI outputs.

## So what's the solution?

To be frank: I don't know. But I can tell you what works for me.

In my day-job, I can't use AI agents yet because of company policy. That means
all of the code I write at work is written by hand. of course, there are cases
where agents could save me _massive_ amounts of time. However, writing code and
hacking away at systems without having the option of just "letting the agent do
it" is, well, _refreshing_. It keeps me in touch with my 16-year-old self,
hacking away at my JavaScript canvas, solving issues the old fashioned way.

When I work on Contractory, it's the complete other side of the spectrum. I've
become more accustomed to agentic workflows and simply reviewing code rather
than writing it myself. I've learned everything I can about context management,
prompting, and understanding how agents work best. I still dive in and write a
few lines here and there, but most code these days is written by agents.

Despite having this inherent balance between coding by hand and letting the
agents fly, recently I've started to feel a bit of agent burnout. At work, I've
had the thought "why am I writing this by hand when an agent could do this in 30
seconds?" - even when that isn't an option. Before Claude, my favorite days were
when I had a UI drawing ready to go in Figma, and I could pop open NeoVim and
fly through implementing it. I haven't done that once since I bought my Claude
subscription in January.

That's why I started this project: to remember the struggle that I learned to
love many years ago.

I think it's important for every developer to have a project they can come back
to and just fiddle with. It doesn't have to be a billion-dollar startup idea, or
some open-source library with 50k stars. Just something small that they
thoroughly enjoy working on. Don't put pressure on yourself to meet deadlines
with it or force yourself to work on it. When you start to feel burnt out from
reviewing agent outputs all day, come back to it as a refreshing way to remember
where you came from.

In the rest of this article, I'll explain a project I've been working on in this
way over the past month.
