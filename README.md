# [oem](https://oem.js.org)

The Dependency-Free UI Framework

## Introduction

OEM is a dependency-free UI framework and design system. The code is simple and straight forward with virtually no coupling which makes it easy to understand and maintain.

## Quick Start

```
git clone https://github.com/kvnlnt/oem
npm i
npm start
```

### Features

- [x] - No Dependencies
- [x] - Typescript
- [x] - Templating Engine
- [x] - State Management
- [x] - Theming/Styling Engine
- [x] - Self Documented
- [x] - Secure

## The Own-Your-Framework Hypothesis

If you owned and understood 100% of your code and never had to "upgrade", would that not be ideal? To maintain control of a codebase you need a "framework". However installing ready-made frameworks and flavor-of-the-month libraries leads to an anti-pattern called "Continuous obsolescence". However, writing your own framework and/or libraries from scratch is no better as this is a large undertaking. So what's the solution? Adopt one as your own.

Adopting any ol' framework isn't going to solve much as most frameworks are fairly complicated and involve tightly coupled abstractions and transient dependencies that have nothing to do with your project. OEM on the other hand has been written with adoption in mind from the start. The structure is simple, the code is simple, the tests, the workflow, everything has been written with code adoption in mind. We want you to be able to be able to be so familiar with the framework's code that you feel as if you'd written it in the first place.. All this without losing the utility and power you find in other frameworks but without some blatant compromise in functionality.

### Goals

- A developer should be able to read the docs and source code and understand how it all works in one sitting.
- There should be no need to implement solutions for basic things like: handling css, implementing responsive design, having a rich set of components, routing, configuring bundlers, running tests...
- A write once, maintain forever philosophy supported by the architecture.
- Outstanding documentation that focuses on understanding the framework and creating great products vs a platform for spreading political propaganda and socioeconomic ideologies.
