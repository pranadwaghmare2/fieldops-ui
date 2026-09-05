1. fieldops-ui — a React Native component library

Built with react-native-builder-bob, styled with NativeWind, published as a
real, installable package.

Part 1 — The component library
Build exactly these five components. Not four, not eight.

Component Must handle
Button variants primary / secondary / ghost /
destructive; sizes sm / md / lg; loading
and disabled states; optional leading
icon

Text your typographic scale, driven by the

same tokens the app uses

TextField label, placeholder, helper text, error
state, optional right adornment; usable
with a controlled form library
Select single-select from a list of options;
works with a long list; error state
Badge one visual treatment per work-order

status

Requirements:
● TypeScript throughout. A consumer should get useful autocomplete on every
prop.

● Consumers must be able to pass className and have it override your
internal styles predictably. Decide and document your merge strategy.
● Ship a real build via react-native-builder-bob. Correct peerDependencies,
correct entry points, a working prepare step. A consumer must not need your
source tree.
● A short README.md with install steps and one usage example per
component. Ship at least one component that is genuinely composable — a
consumer should be able to reach past your defaults without you having
anticipated their case.



style: 
FieldOps — UI Spec
Read this first: we do not grade pixel fidelity.
This spec exists to remove ambiguity, not to set a bar for visual craft. We are looking
at whether your components consume the tokens below consistently and whether
every state below is accounted for. A plain, correct, consistent UI scores full marks
here. Do not spend your budget on polish.
Tokens
Put these in your Tailwind preset and ship the preset from the library.
Colour
Token Light Use
bg #FFFFFF screen background
surface #F6F7F9 cards, list rows
border #E3E6EA hairlines, input borders
fg #111827 primary text
fg-muted #6B7280 secondary text, helper

text

primary #1D4ED8 primary actions
primary-fg #FFFFFF text on primary
danger #DC2626 destructive actions,

error text
warning #D97706 overdue, blocked
success #15803D done

Status colours:

Status Token
open fg-muted
in_progress primary
blocked warning
done success

Priority is text only — no colour needed except urgent, which uses danger.
Spacing
4-point scale: 1 = 4px, 2 = 8, 3 = 12, 4 = 16, 6 = 24, 8 = 32.
● Screen horizontal padding: 4.
● Vertical rhythm between blocks: 4.

Typography
Name Size / weight Use

title 22 / 600 screen titles
heading 17 / 600 card titles, section

headers
body 15 / 400 body copy
label 13 / 500 field labels
caption 12 / 400 helper text, metadata

System font is fine. Do not load a custom font.
Radius &amp; elevation
Radius 10 on cards, inputs and buttons. No shadows — a border hairline instead.