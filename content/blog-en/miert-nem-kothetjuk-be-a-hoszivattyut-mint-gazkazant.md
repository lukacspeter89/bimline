---
title: "Why You Can't Pipe a Heat Pump the Same Way You'd Pipe a Gas Boiler"
description: "Gas boilers and heat pumps have fundamentally different hydraulic sizing needs. We cover the physics of the temperature differential, the classic pipe-sizing mistake, and the correct engineering solution."
publishDate: 2026-02-03
author: "BIMLine Gépész Kft."
tags: ["heat pump", "pipe sizing", "hydronics"]
category: "Heat Pumps"
draft: false
---

A common mistake in residential installations is when installers used to working with gas boilers instinctively apply the same pipe sizing to heat pumps, reasoning: "if a 24 kW gas boiler ran fine on 3/4-inch pipe, a 16 kW heat pump will be more than fine too." As MEP designers, we can say clearly: that's not true — the hydraulic sizing of the two types of equipment is fundamentally different.

## The physics behind it: the difference in temperature differential (ΔT)

The volume of water (mass flow) that needs to circulate through a heating system is determined by the equipment's operating temperature differential. A gas boiler runs at a high temperature with a large ΔT (20 K), while a heat pump operates at a low temperature with a distinctly small ΔT (5 K).

Let's look at an exact numerical example: for a 24 kW gas boiler (ΔT = 20 K) the required water flow is about 1.0 m³/h, while for a 16 kW heat pump (ΔT = 5 K) the required flow is about 2.7 m³/h. In other words, the lower-output heat pump needs nearly three times the volumetric flow (more water) than the larger boiler.

## The system faults caused by undersized piping

If you constrain the heat pump to the familiar 3/4-inch pipe, you'll run into the following serious problems:

1. **Critical flow velocity:** velocity reaches 2–3 m/s, causing noisy operation (whooshing, clicking) and internal pipe erosion.
2. **Massive pressure loss:** the built-in circulation pump becomes overloaded and can't deliver the water volume the unit critically needs.
3. **High-pressure cutout (fault code):** because the water can't carry heat away from the condenser fast enough, the unit overheats and shuts down on a safety trip.
4. **Degraded COP:** the compressor is forced to run at a higher pressure and temperature, which drastically hurts efficiency and drives up the electricity bill.
5. **Defrost faults:** in winter operation, the unit can't find enough thermal energy to defrost the outdoor coil, resulting in unstable operation.

## The correct engineering design

A heat pump isn't a "small boiler." For stable, economical operation, the following design rules must be followed: a larger pipe diameter (instead of the usual 3/4-inch (22×1.5 mm) pipe, a 16 kW heating output calls for DN25–DN32 internal diameter — e.g. 28 mm or 35 mm steel pipe), plus hydraulic separation (a buffer tank or hydraulic separator is mandatory so the unit's mass flow is decoupled from the instantaneous control state of the heating circuits).
