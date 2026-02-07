---
layout: '../../layouts/BlogLayout.astro'
title: 'Learning Astro'
pubDate: 2026-02-06
description: 'Writing a blog about creating a blog'
author: 'Jeremy Cavallo'
tags: ["astro"]
---

A few months ago, I started writing blogs. I always hated writing when I was in school, but now
I have a lot of thoughts about technology that I need to get out of my head and write them down somewhere.
I think it'll be interesting to look back and see what I was thinking about in the future.

A few months back, I started writing blogs on a service called [Ghost](https://ghost.org/). They're great, but also,
I don't feel like spending money on a blog. I think I'm good enough a programmer to build it
myself, and so today, I sat down and started to do just that.

## What is Astro?

Astro is a web framework specifically built for building statically hosted websites - perfect
for a blog. In fact, the initial tutorial in their documentation is all about building a personal
blog website, so I didn't have to dig very deep to get started!

Modern frameworks like [NextJS](https://nextjs.org), [Tanstack Start](https://tanstack.com/start/latest), [Svelte](https://svelte.dev/),
and many others are mostly focused on building web applications. These are perfect for highly-complex
sites, such as my company [Contractory](https://contractory-app.com). However, these frameworks are notorious
for slowing down the browser by loading a _lot_ of JavaScript.

Astro is built for the complete other side of the spectrum. It minimizes the amount of JavaScript sent
down to the client and renders the HTML markup on the server first, making the website incredibly
lightweight, responsive, and SEO-friendly. It even allows me to install by beloved React and render
React-based components directly from `.astro` files as "client islands"!

It all comes down to the classic debate of "where should I render?" Frameworks like React generally
sit in the single-page app (SPA) group, where the JS is sent down to the browser, and the browser
handles things on the client. Astro sits on the complete other side of the spectrum and focuses on
multi-page apps (MPAs), keeping the rendering on the server and sending down the markup.
