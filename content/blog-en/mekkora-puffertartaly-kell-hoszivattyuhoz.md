---
title: "How Big a Buffer Tank Does a Heat Pump System Actually Need?"
description: "The role of buffer tank sizing, the failure modes of tanks that are too small or too large, manufacturer rules of thumb, and the control-engineering sizing formula."
publishDate: 2026-02-03
author: "BIMLine Gépész Kft."
tags: ["heat pump", "buffer tank", "sizing"]
category: "Heat Pumps"
draft: false
---

Buffer tank sizing is one of the most critical questions when designing heat pump systems. Many see it as an unnecessary cost, yet the buffer is what guarantees the system's hydraulic stability and long service life.

## What the buffer tank actually does in the system

The buffer provides hydraulic separation, decoupling the heat pump's primary circuit from the heating/cooling secondary circuits. It prevents short cycling, since it increases the system's total water volume and thereby protects the compressor from rapid on/off switching. And it supports defrosting: it stores the thermal mass the heat pump draws on in winter to de-ice the outdoor unit.

## The consequences of incorrect sizing

**If the buffer tank is too small**, the heat pump reaches its target flow temperature too quickly and then shuts down (short cycling). Frequent starts drastically shorten the lifespan of the expensive compressor. On top of that, in winter the unit can't find enough stored energy to defrost, leading to failed defrost cycles and heating outages.

**If the buffer tank is too large**, the system's thermal inertia becomes excessive and room-temperature control turns sluggish. The heat pump is forced to run at a higher temperature for longer to heat the enormous water mass, which hurts seasonal efficiency (COP). An oversized tank is also expensive and eats up valuable plant-room space.

## Determining the optimal size

For design purposes, we start from manufacturer minimum recommendations, which specify the minimum total system volume relative to the heat pump's output: 10–20 liters/kW for monobloc heat pumps, and 7–15 liters/kW for split heat pumps.

Engineering note: buffer sizing also takes into account the water content already held in the pipework and heat emitters. If the building has clean underfloor heating that isn't shut off by zone valves, that alone provides a large water volume, so the buffer tank size can reasonably be reduced.

**Control-engineering sizing formula.** To guarantee the heat pump's optimal minimum continuous runtime (t) of 10–15 minutes, we apply the following relationship:

V = (P × t) / (1.16 × ΔT)

where P is the unit's output in kW, t is the time in hours, and ΔT is the buffer's permitted temperature swing, typically 5–7 K.
