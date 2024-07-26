---
key: 3
title: "ovo – GitHub drag and drop"
kicker: "Human interface design"
name: "Accessible drag and drop"
caption: "Exploring the challenges in creating an accessible sortable list (drag-and-drop) for GitHub."
subtitle: "Creating an accessible sortable list (drag-and-drop) for GitHub"
date: "2023"
poster: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721673338/ovo-3.7/gh-dnd/poster_2x_viczpd.webp"
video: "https://res.cloudinary.com/dn1q8h2ga/video/upload/v1722015849/ovo-3.7/gh-dnd/gh-dnd-01_iyentd.mp4"
background: "linear-gradient(180deg, #24292F 0%, #0C0C0C 100%)"
---

<!-- ❶ ❷ ❸ ❹ ❺ ❻ ❼ ❽ ❾ ⓿ -->
<!-- ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⓪ -->

### Drag-and-drop interfaces offer a vibrant, interactive user experience that’s both intuitive and utilitarian. Whether you're uploading files with a simple flick of your mouse or effortlessly moving a card in a game of solitaire, drag-and-drop makes these tasks not just easy but also fun. At GitHub I helped to develop solutions for a more accessible drag and drop experience.

:Illustration{.crop backgroundUrl="https://ik.imagekit.io/ohiosveryown/ovo--3.7/work/backgrounds/field-01.webp" altText="Drag and drop abstract illustration" imgSrc="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721673335/ovo-3.7/gh-dnd/gh-dnd-hero_2x_ps7ars.webp" caption="❶ Drag and drop abstract"}

#### ↬ What prompted us to invest in this experience?

① Drag and drop is a core experience for most user interfaces, with most people being familiar with the paradigm. At GitHub, we’ve seen more investment from different product teams trying to leverage drag and drop.

Working with the GitHub Platform team, we wanted to develop a scalable solution that was highly considerate of different accessibility needs – both in terms of design philosophy and implementation – that teams could leverage across different surface areas.

:Illustration{.tight backgroundUrl="https://ik.imagekit.io/ohiosveryown/ovo--3.7/work/backgrounds/field-02.webp" altText="Orientation prompt illustration one" imgSrc="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721670523/ovo-3.7/gh-dnd/gh-dnd-01_2x_hxe2pu.webp" caption="❷ Orientation prompt № 1"}

:Illustration{.tight backgroundUrl="https://ik.imagekit.io/ohiosveryown/ovo--3.7/work/backgrounds/field-02.webp" altText="Orientation prompt illustration two" imgSrc="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721670664/ovo-3.7/gh-dnd/gh-dnd-02_2x_lhraoh.webp" caption="❸ Orientation prompt № 2"}

#### ↬ Where did we start?

② We first focused on defining the specific instances of drag and drop by abstracting experiences to their basic levels, starting with orientation, to use as a guide stone.

Following that definition, one of the very first challenges we faced involved setting up an interaction model for moving an item through keyboard navigation. We chose to use arrow keys as we wanted keyboard operation to feel natural for a visual keyboard user.

:Illustration{.tight backgroundUrl="https://ik.imagekit.io/ohiosveryown/ovo--3.7/work/backgrounds/field-02.webp" altText="Decision tree illustration" imgSrc="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721670511/ovo-3.7/gh-dnd/gh-dnd-03_2x_rc6m8u.webp" caption="❹ Abbreviated decision tree"}

:Reel{ backgroundUrl="https://ik.imagekit.io/ohiosveryown/ovo--3.7/work/backgrounds/field-03.webp?updatedAt=1717347265097" videoSrc="https://res.cloudinary.com/dn1q8h2ga/video/upload/v1721671170/ovo-3.7/gh-dnd/specificity_yufadd.mp4#t=0.1" caption="❻ Peek behing the curtain – async discussion video"}

#### ↬ What difference did we make?

③ At the conclusion of our epic, we designed, developed, and documented our accessible drag and drop package for different product teams to leverage. We also shipped the first implementation of the package as a team in the field settings feature in GitHub projects.

In addition, we also began drafted documentation to be included in WCAG as a web standard, something we hadn’t originally set out to do but were encouraged based off of user feedback and internal adoption.

:Reel{ backgroundUrl="https://ik.imagekit.io/ohiosveryown/ovo--3.7/work/backgrounds/field-03.webp?updatedAt=1717347265097" videoSrc="https://res.cloudinary.com/dn1q8h2ga/video/upload/v1721671413/ovo-3.7/gh-dnd/dnd_gjcjkt.mp4#t=0.1" caption="❼ Vertical list prototype"}

:Illustration{.tight backgroundUrl="https://ik.imagekit.io/ohiosveryown/ovo--3.7/work/backgrounds/field-02.webp" altText="Decision tree illustration" imgSrc="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721670510/ovo-3.7/gh-dnd/gh-dnd-04_2x_srvqfg.webp" caption="❽ Package Readme"}

#### ↬ Teamwork makes the dream work

④ A huge shoutout to my peers ([Alexis](https://github.com/alexislucio), [Kendall](https://github.com/kendallgassner), [Hussam](https://github.com/hussam-i-am), and [Aarya](https://github.com/ayy-bc)) on the team that were invaluable in developing this experience. If you’d like to learn more about the technical implementation, my colleague Kendall [published a post](https://github.blog/2024-07-09-exploring-the-challenges-in-creating-an-accessible-sortable-list-drag-and-drop/) on the GitHub blog (where a lot of this information was referenced from).
