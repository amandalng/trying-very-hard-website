// scripts/seed-blog-cache.mjs
// Seeds .blog-cache/ with blog posts for all current episodes
// Run: node scripts/seed-blog-cache.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = path.join(__dirname, '..', '.blog-cache');

if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

const posts = {

"you-dont-have-to-be-broken-to-go-to-therapy-on-mental-health-stigma-and-what-weve-learned": `On this episode, we sat with a question that kept circling back to us: why do so many people — ourselves included — wait until they're in crisis to consider therapy? Not because they don't believe in it. Because somewhere along the way, they absorbed the idea that therapy is for people who are broken, and they're not broken enough to qualify.

We talked about the stigma around mental health in Asian families — not the dramatic, door-slamming kind, but the quieter version. The kind where no one ever says "don't go to therapy," they just never mention it as an option. Where struggling is something you handle privately, ideally by working harder or being more grateful.

**The performing wellness trap**

Something that came up that we haven't stopped thinking about: the difference between doing wellness and actually being well. It's possible to have a therapist, a journaling practice, a morning routine, and still be quietly self-sabotaging — showing up to sessions with a curated version of yourself, saying the right things, keeping the harder stuff locked away.

We talked about how easy it is to perform the motions of healing without ever letting the process actually reach you. And how that performance can become its own form of avoidance — one that's socially rewarded because it looks like you're doing the work.

**Finding the right therapist**

We also got into the practical side: how do you even find the right therapist? We talked about the fact that the first one you try might not be the fit, and that's not a failure — it's part of the process. The therapeutic relationship matters more than the method. If you don't feel safe enough to be honest, the modality doesn't matter.

And we touched on something Amanda sees in her practice: people who come in already apologizing for being there. Already qualifying their pain. Already making the case that they deserve to take up space — as if the default answer is no.

**What we're still sitting with**

What does it actually look like to show up fully in a space designed for you? Not the version of you that has it together, not the version that already knows what to say, but the one that's confused and contradictory and doesn't have a neat narrative.

We don't think we've figured this out. We're still learning how to stop curating and start being honest — in therapy and outside of it. And maybe that's the thing nobody tells you: therapy isn't a place you go when you're broken. It's a place you go to practice being whole, over and over, badly, until it starts to feel less foreign.

What would it look like if you stopped waiting to be broken enough?`,

"if-you-care-for-me-one-bankers-journey-from-shower-singer-to-releasing-original-music": `We sat down with Kelvin Kuan for this one — a banker who spent years keeping his music a secret from most of the people in his life. The question that pulled us into this conversation: what happens when the thing you love doesn't fit neatly into the life you've built?

Kelvin talked about being "the practical one" for most of his life. The one who followed the expected path — the stable career, the logical choices. Music was always there, but it lived in the margins. The shower. The car. Never the main stage.

**When the cost of not trying shifts**

Something Kelvin said that stuck with us: there's a moment where the fear of never trying becomes bigger than the fear of being judged. He described spending years weighing the risk of putting himself out there against the comfort of keeping music private. And then, at some point, the equation flipped. Not because the fear went away. Because the regret of silence started to weigh more.

He talked about the specific terror of self-promotion — of telling your colleagues, your friends, your family that you made something and you'd like them to listen. The vulnerability of that ask. The way it strips away every professional credential and leaves you standing there with nothing but a song you care about.

**Asian family expectations and "the backup plan"**

We got into the family dynamics around this — the very specific pressure of growing up in an Asian household where passion is something you're allowed to have as long as it doesn't interfere with your real career. Where "what's your backup plan?" isn't a question about logistics, it's a statement about what's considered legitimate.

Kelvin didn't frame his family as villains in this. He talked about it with real tenderness — the understanding that their concern came from love, from their own experiences, from wanting to protect him from instability. And the difficulty of honoring that concern while also honoring the thing inside him that needed to make music.

**What we're still thinking about**

This conversation left us with a question we keep returning to: does your passion have to become your career to matter? Kelvin is still a banker. He's also a musician. Those two things coexist — messily, imperfectly, but honestly.

Maybe the bravest thing isn't quitting your day job to follow your dreams. Maybe it's letting the dream exist alongside the practical life, without needing anyone's permission, without needing it to be profitable, without needing it to make sense to anyone but you.

What's the thing you've been keeping in the shower?`,

"friendship-after-30-why-its-harder-why-its-better-and-how-to-actually-keep-it": `We've been thinking about this one for a while — the way friendships change in your 30s. Not the dramatic falling outs, but the quieter shifts. The way someone who was your everyday person becomes someone you see twice a year. Not because anything went wrong. Because life just... moved.

On the episode, we talked about the shift from convenient friendships to intentional ones. In your 20s, proximity does a lot of the work — you're in the same office, the same apartment building, the same group chat making spontaneous plans. In your 30s, that scaffolding disappears. The friendships that survive are the ones where someone picks up the phone and says "when are we doing this?"

**The effort problem**

We got into something that felt important: why does scheduling a hangout with your best friend feel like booking a business meeting? And why does that feel like a failure?

We talked about how milestones reshape closeness — marriage, kids, moves, career pivots. Not because the love changes, but because the logistics do. Someone's availability shifts and suddenly the relationship requires a kind of effort it didn't before. And that effort can feel like evidence that something is wrong, when actually it's just evidence that you're both living full lives.

**Directness takes years**

Something else that came up: how long it takes to get to a place where you can be truly direct with a friend. In your 20s, there's a lot of dancing around things — not wanting to rock the boat, not wanting to be "too much." In your 30s, if the friendship has lasted, you've earned the right to say the hard thing. And that directness, uncomfortable as it is, is what makes the friendship actually sustaining.

We talked about our own friendship in this context. The things we've learned to say to each other. The conversations that were uncomfortable in the moment but became load-bearing walls in the relationship.

**What we keep coming back to**

The friendships worth keeping in your 30s aren't the easy ones. They're the deliberate ones. The ones where both people show up, not because it's convenient, but because they've decided this person matters enough to be inconvenienced for.

We're still figuring out what that looks like in practice — the balance between protecting your own time and investing in the people who make your life feel full. It's not a problem to be solved. It's a tension to be held.

Who's the friend you've been meaning to call?`,

"booktok-brain-are-reading-challenges-ruining-reading": `Raissa Smarasista read 84 books in a year. She told us about the moment she realized she'd been choosing books by page count instead of interest — optimizing for the number, not the experience. That's the sentence that launched this whole conversation.

We talked about reading challenges, Goodreads goals, BookTok, and the way productivity culture has quietly colonized one of the last truly unproductive pleasures. When did finishing a book become a metric? When did a hobby start needing a KPI?

**The performance of reading**

Raissa was honest about something a lot of readers probably recognize: the difference between reading because you love it and reading because you're tracking it. The way a Goodreads goal can turn a lazy Sunday book into a task with a deadline. The way posting about books on social media can shift the experience from private to performative without you noticing.

We talked about BookTok specifically — how it's genuinely expanded access to books and reading culture, and also how it's created a new kind of pressure. The "books I read this month" haul. The aesthetic shelfie. The sense that your reading life is also content.

**Hobby burnout is real**

This connected to something bigger that we keep circling back to: the way our generation turns everything into optimization. Exercise becomes data. Cooking becomes content. Travel becomes curation. And reading — one of the few activities that asks nothing of you except your attention — becomes a challenge to be completed.

Raissa talked about the point where she stepped back from her reading goal and asked herself: am I even enjoying this? That question — simple, obvious, and somehow radical in a culture that equates more with better.

**What we're sitting with**

We left this conversation thinking about our own hobbies and whether we've let productivity culture in through the back door. The things we do "for fun" that have quietly become things we do for performance, for numbers, for the feeling of accomplishment rather than the feeling of joy.

What would it look like to do something — anything — without tracking it, sharing it, or optimizing it? To read a book slowly, badly, with no goal except the pleasure of the page?

Raissa reminded us that the best book you read this year might be the one you never finish. And that maybe that's fine.`,

"this-was-supposed-to-feel-better-on-inherited-ambition-quarter-life-doubt-and-redefining-success": `The question that started this episode: why does career success sometimes feel underwhelming, even when you've hit the milestones?

We talked about quarter-life doubt — that specific brand of confusion that shows up in your late 20s and 30s, when you've done the things you were supposed to do and the satisfaction doesn't arrive on schedule. The degree, the job, the title, the salary. All present. All accounted for. And underneath all of it, a quiet voice asking: is this it?

**Inherited ambition**

We got into something we've been calling inherited ambition — the goals you carry that were never actually yours. The career path your parents modeled or expected. The definition of success you absorbed from your school, your culture, your social circle. The scorecards you've been measuring yourself against that were handed to you, not chosen.

The tricky part: inherited ambition doesn't feel inherited. It feels like your own desire. You only notice the seam when the achievement lands and the feeling doesn't match. You got the thing, but the thing doesn't feel the way it was supposed to.

**The identity crisis nobody talks about**

We talked about how this kind of doubt can feel like an identity crisis, even though it doesn't look like one from the outside. From the outside, you're successful. From the inside, you're standing in a room full of achievements wondering who put them there and whether any of them are actually yours.

This isn't a crisis of failure. It's a crisis of success — of waking up inside a life that looks right and feeling wrong in it. And the disorientation of that is hard to talk about, because who complains about having a good career?

**What we're not pretending to have figured out**

We didn't land on answers here. We talked about what it might look like to build your own scorecard — one that measures things like presence, alignment, rest, joy. But we're honest that we're still in the middle of that process. Redefining success is easier to say than to do, especially when you're surrounded by people still using the old definitions.

The thing we keep coming back to: the doubt isn't a sign that something is broken. It might be a sign that something is working — that some part of you is rejecting a script that was never written for you.

What would your own scorecard measure?`,

"introducing-trying-very-hard-why-we-started-a-podcast-in-our-30s": `We started a podcast. This is the part where we're supposed to tell you why in a way that sounds inspiring and certain, but the truth is messier than that.

On the first episode, we talked about who we are — Amanda, a therapist; Monica, a startup founder — how our friendship started, and what we're each trying very hard at right now. We shared the stories that shaped us, the things we're currently wrestling with, and the reason we felt like now was the time to press record.

**The tryhard reclamation**

We called the podcast "Trying Very Hard" because we wanted to take back a word that's been used as an insult for most of our lives. Tryhard. The person who cares too much, tries too openly, hasn't mastered the art of looking effortless. We've both been that person. We've both felt the sting of being told — directly or indirectly — that the effort was showing and that was embarrassing.

We talked about why effortlessness became the cultural ideal in the first place. Who benefits from a world where the highest compliment is "she makes it look easy"? What do we lose when effort becomes something to hide?

**Why now**

We're in our 30s. We have careers, responsibilities, and a deeply internalized fear of being perceived. Starting a podcast at this stage of life is not the strategic move — it's the honest one. We talked about the conversations we'd been having for years — over dinner, over voice notes, over long walks — and the realization that those conversations might be useful to more people than just us.

Not because we have answers. Because we're willing to ask the questions out loud and let other people hear us stumbling through them.

**What this space is for**

We talked about what we want this podcast to be: a place where caring deeply isn't cringe. Where effort is celebrated, not hidden. Where two friends can think out loud about the hard, weird, beautiful parts of being alive and trying to do it well.

We're not experts in most of the things we talk about. We're just two people who think a lot, feel a lot, and have decided to stop being embarrassed about it.

If you've ever felt like you're trying very hard at something — your career, your relationships, your healing, your identity, your hobbies, your life — and wondered if anyone else was doing the same: we are. Pull up a chair.

What are you trying very hard at right now?`

};

// Write each post to cache
let count = 0;
for (const [slug, body] of Object.entries(posts)) {
  const cachePath = path.join(CACHE_DIR, `${slug}.json`);
  fs.writeFileSync(cachePath, JSON.stringify({ slug, body, generatedAt: Date.now() }));
  count++;
  console.log(`  ✨ ${slug.substring(0, 60)}...`);
}

console.log(`\n  Done! ${count} blog posts cached in .blog-cache/`);
console.log(`  Push to deploy: git add . && git commit -m "Add blog posts" && git push`);
