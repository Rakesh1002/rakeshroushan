# Personal Story: The Day Scale Broke Us (Lessons from Paytm)

**Hook:**
Scale is a liar.
It tells you "it works" at 1 million users.
Then it punches you in the face at 10 million.

**Body:**
I remember the early days at Paytm when we hit our first massive peak (35,000 transactions per second).
We thought we were ready. We had tested. We had sharded our databases.

But reality doesn't care about your test environment.

**What broke?**
It wasn't the code. It was the _consensus_.
We were using distributed systems that needed to agree on "who paid whom" in real-time.
At 35k TPS, the "agreement" (Paxos algorithm) became the bottleneck. The computers were spending more time talking to each other than processing the payments.

**The Fix:**
We didn't just "add more servers." That would have made it worse (more chatter).
We had to fundamentally rethink our data pipelines. We moved to asynchronous processing. We accepted that "eventual consistency" was okay for some parts of the system (like history) as long as the "balance" was strictly consistent.

**The Lesson:**
If you are building for "India Scale," your biggest enemy isn't bugs. It's physics.
Latency adds up. Locks add up.
What works for a silicon valley startup with 10k users will melt under the pressure of a billion Indians.

**Takeaway:**
Don't optimize for the scale you have. Architect for the scale that will break you.

#Paytm #Engineering #Scale #India #Startups
