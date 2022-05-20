---
layout: page
permalink: /research/
title: research
description: Analysis and PDE on manifolds
years: [preprint, 2022, 2021, 2020, note]
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
