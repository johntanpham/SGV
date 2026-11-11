# DATA-REVIEW.md: every number on the site and where it came from

Checked 2026-11-10. Re-check the dated items when their source updates.

## Loan limits (all cities: Los Angeles County), src/data/loan-limits.ts
| Fact | Value | Source | Update when |
|---|---|---|---|
| 2026 conforming limit, 1 unit | $1,249,125 | FHFA 2026 Conforming Loan Limit Values | FHFA announces 2027 limits (expected late Nov 2026) |
| 2026 FHA limit, 1 unit | $1,249,125 | HUD FHA Mortgage Limits | HUD announces 2027 limits |
| LACDA HOP80 / HOP120 max | $100,000 / $85,000 | lacda.org HOP eligibility page | Quarterly |
| HOP participating cities (47) | Arcadia, San Gabriel, Temple City yes; Alhambra, Monterey Park, Rosemead, El Monte, West Covina no | lacda.org "Find a Home Within an Eligible Area" | Quarterly |
| CalHFA MyHome | up to 3.5% | calhfa.ca.gov | Quarterly |
| Cash-out example | 80% of median value | General conventional guideline, shown as an illustration, not an offer | Bao to confirm wording |

## City facts, src/data/cities.ts (U.S. Census QuickFacts: population July 1 2025; housing/language ACS 2020-2024)
| City | Population | Owner-occupied | Median value | Median rent | Other language at home | Vietnamese (Neilsberg/ACS) | ZIPs (Claude, verify) |
|---|---|---|---|---|---|---|---|
| Alhambra | 79,820 | 41.1% | $857,800 | $1,939 | 67.5% | 5,164 (6.3%) | 91801, 91803 |
| Monterey Park | 57,457 | 51.6% | $863,000 | $1,888 | 70.3% | n/a | 91754, 91755 |
| San Gabriel | 38,186 | 50.4% | $945,700 | $1,915 | 70.7% | 4,886 (12.6%) | 91775, 91776 |
| Rosemead | 49,410 | 47.3% | $807,200 | $1,834 | 81.0% | 9,768 (19.4%) | 91770 |
| Temple City | 35,125 | 62.9% | $961,800 | $2,135 | 67.4% | n/a | 91780 |
| El Monte | 105,075 | 40.2% | $644,000 | $1,736 | 82.0% | 11,247 (10.5%) | 91731, 91732, 91733 |
| Arcadia | 54,117 | 58.1% | $1,441,800 | $2,191 | 61.1% | n/a | 91006, 91007 |
| West Covina | 105,301 | 60.3% | $779,800 | $2,245 | 59.8% | 4,580 (4.3%) | 91790, 91791, 91792 |

## Statements for Bao to confirm (☐ = not yet checked)
- ☐ "Many refinances close in about 30 to 45 days" (FAQ on every city page)
- ☐ City intro sentences (landmarks/streets) in src/data/cities.ts
- ☐ ZIP code lists above
