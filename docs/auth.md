# jwt and session callbacks

You've got the database logic handled, which is the most critical part. Nicely done.

Now, let's connect that to the callbacks. The key thing to remember is that the `jwt` and `session` callbacks run automatically whenever an authentication check happens. This occurs when a user signs in, or, more importantly for us, when they navigate to a page that is protected by your middleware.

So the flow is:

1.  Your `createNewSellerAccount` function updates the database.
2.  You redirect the user to a new page (like their dashboard).
3.  The middleware catches this new page request and runs the `auth()` check.
4.  This check triggers your `jwt` callback, which reads the fresh "Seller" role from the database.

So, how can we be sure this is all happening? What's a simple tool we can add inside the `jwt` callback in your `auth.ts` file to see if it's running and check the data it's handling?

# middleware

Excellent. The middleware acts as the gatekeeper 🚪 for your routes. It checks a user's credentials before they're even allowed to see a page.

To build this, we'll need to do three things:

1.  Tell the middleware which specific routes it should protect.
2.  Get the current user's role from the request.
3.  Redirect users with the "Buyer" role if they try to access a protected route.

Let's start with the first step. In the same `middleware.ts` file, we can export a `config` object. This object has a property called `matcher`, which is just a list of the paths we want to protect.

What path (or paths) do you want to protect from "Buyer" accounts?

# auth.js

## My query: Yes, as I know, the middleware.ts file export 2 main things. that are middleware function and config object. Here now we are only exporting the auth function. what about he middleware function? Is auth.js managing that??

That is an excellent and very sharp observation. You are absolutely right.

Normally, you would define your own `middleware` function from scratch. But in this case, your intuition is correct: **Auth.js is managing it for us.**

Think of the `auth` function you import from `@/auth` as a "middleware factory" 🏭.

It's a special function that already knows how to do all the complicated security work:

- Find the session cookie 🍪
- Decrypt and verify the JWT 🎟️
- Handle session expiration

It then takes our simple logic (like checking the user's role) and wraps it inside its own powerful, pre-built middleware function. So when we write `export default auth(...)`, we are essentially saying: "Hey Auth.js, use your expert middleware, but here are a few custom rules I want you to follow."

Thinking about this design, what do you see as the main advantage of letting a specialized library like Auth.js handle the core security logic for us?
