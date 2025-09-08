Here i will maintain the documentation and the learning i have during the project.

# Tools Used

1. bun
2. next js
3. shadcn ui
4. drizzle orm
5. neon database
6. auth.js for authentication

# how to make my next app listen to keystrokes and respond ( like opening a modal and escaping from it ). I want a short answer with reference.

You can make your Next.js app listen to keystrokes by using a React `useEffect` hook to attach a `keydown` event listener to the `window` object. This allows you to capture key presses globally and update your component's state to perform actions like opening or closing a modal.

Here is a short example of a component that opens a modal when you press `Ctrl+K` (or `Cmd+K`) and closes it with the `Escape` key.

### Example Code (`components/CommandModal.tsx`)

```tsx
"use client";

import { useState, useEffect } from "react";

export function CommandModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open modal with Ctrl+K or Cmd+K
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault(); // Prevent browser's default find action
        setIsOpen(true);
      }

      // Close modal with Escape key
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{ padding: "2rem", background: "white", borderRadius: "8px" }}
      >
        <h2>Modal Open</h2>
        <p>Press 'Escape' to close.</p>
      </div>
    </div>
  );
}
```

### How it Works:

1.  **`useState`:** The `isOpen` state variable tracks whether the modal is visible.
2.  **`useEffect`:** This hook manages the lifecycle of our event listener.
    - It adds a `keydown` listener to the global `window` object when the component is first rendered.
    - The `handleKeyDown` function checks for the specific key combinations (`Ctrl/Cmd+K` and `Escape`) and updates the `isOpen` state accordingly.
    - The `return` function inside `useEffect` is a cleanup function. It removes the event listener when the component is unmounted to prevent memory leaks.

### References:

- **React `useEffect` Hook:** [Official React Documentation for `useEffect`](<https://www.google.com/search?q=%5Bhttps://react.dev/reference/react/useEffect%5D(https://react.dev/reference/react/useEffect)>)
- **React `useState` Hook:** [Official React Documentation for `useState`](<https://www.google.com/search?q=%5Bhttps://react.dev/reference/react/useState%5D(https://react.dev/reference/react/useState)>)
- **MDN Event reference for `keydown`:** [MDN Web Docs: `keydown` event](<https://www.google.com/search?q=%5Bhttps://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event%5D(https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)>)

# How to add a font to my project. I am using next js, tailwindcss, ts, shadcn ui. I want to add alkatra font to my project. How to use it??

Ah, I see\! Thank you for sharing your `global.css` file. This is a very important clue.

You are using a modern Next.js setup, likely based on a template that uses an advanced form of Tailwind CSS where the configuration is handled directly inside the CSS file using `@theme` syntax, instead of a separate `tailwind.config.ts` file. This is perfectly fine, and we can adapt the steps easily.

The core logic remains the same:

1.  Load the font in `layout.tsx` using `next/font`.
2.  Define a CSS variable for it.
3.  Tell your styling system about this new font.
4.  Use it.

Here is the updated guide tailored specifically to **your** project structure.

---

### Step 1: Set Up the Font in Your Layout

This step is nearly identical. You'll load your desired "Alkatra" font alongside the existing "Geist" fonts that your project uses.

1.  Find your root layout file, likely at `app/layout.tsx`.
2.  Import `Alkatra` from `next/font/google`.
3.  Instantiate it and give it a CSS variable.
4.  Apply that variable to your `<body>` tag.

Your `app/layout.tsx` should look something like this:

```tsx
// app/layout.tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// 1. Import your new font
import { Alkatra } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";

// 2. Configure the Alkatra font with a CSS variable
const fontAlkatra = Alkatra({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-alkatra", // This is the new variable we're creating
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)} // Keep existing fonts
    >
      <head />
      {/* 3. Add your new font's variable to the body class */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontAlkatra.variable, // Add this here
        )}
      >
        {children}
      </body>
    </html>
  );
}
```

**Note:** I've kept `GeistSans` and `GeistMono` as they are likely used by your project. We are simply _adding_ the Alkatra font variable to make it available everywhere.

---

### Step 2: Add the Font to Your `global.css` Theme

Since you don't have a `tailwind.config.ts` file, your `@theme inline` block in `global.css` is where you define your "theme" for Tailwind. We need to tell it about a new font family called `alkatra`.

Open your `global.css` file and add a `fontFamily` object inside the `@theme inline` block.

```css
/* global.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* This is the new part you will add */
  fontFamily: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
    alkatra: 'var(--font-alkatra)', /* Add your new font here */
  },

  /* The rest of your theme variables stay the same */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans); /* This line maps the default utility */
  --font-mono: var(--font-geist-mono);
  /* ... all your other color variables ... */
}

/* ... the rest of your global.css file (:root, .dark, @layer base) ... */
```

**What did we do here?**

- By adding `fontFamily: { alkatra: 'var(--font-alkatra)' }`, you've just created a new Tailwind utility class, `font-alkatra`, that will apply the CSS variable we defined in `layout.tsx`.

---

### Step 3: Use Your New Font

You are now ready to use the font in any of your components, just like any other Tailwind class.

```tsx
// In any component, e.g., app/page.tsx
export default function MyPage() {
  return (
    <div className="p-8">
      <h1 className="text-5xl font-alkatra">
        This heading uses the Alkatra font.
      </h1>
      <p className="mt-4 text-lg font-sans">
        This paragraph uses the default Geist Sans font.
      </p>
    </div>
  );
}
```

### How to Make Alkatra Your Default Font (Optional)

If you decide you want **Alkatra** to be the main font for your entire app instead of Geist Sans, the change is even simpler.

1.  **In `app/layout.tsx`:** Change the variable name for Alkatra to `--font-geist-sans` to "hijack" the existing default.

    ```tsx
    // app/layout.tsx
    const fontPrimary = Alkatra({
      subsets: ["latin"],
      weight: ["400", "500", "600", "700"],
      variable: "--font-geist-sans", // Use the variable name the CSS is already expecting for 'sans'
    });
    ```

    Then apply `fontPrimary.variable` to your `html` or `body` tag.

2.  **In `global.css`:** You don't need to do anything\! The line `--font-sans: var(--font-geist-sans);` will now automatically point to the Alkatra font you just configured. All your Shadcn UI components and text with the `font-sans` class will now use Alkatra.

# what is the difference between redirect and navigation by link in next js??

Excellent question. Understanding the difference between `redirect` and navigation with `<Link>` or `useRouter` is fundamental to building robust applications in Next.js, especially with the App Router.

The core difference is **Server-Side vs. Client-Side**.

Think of it like this:

- **`redirect()`** is like a bouncer at the club's door. Before you even get inside (before the page is rendered), the bouncer checks your ID and sends you to a different entrance if needed.
- **`<Link>` / `router.push()`** is like walking from the dance floor to the bar inside the club. You are already in, and you are just moving from one section to another without leaving the building (without a full page reload).

---

### Comparison Table

| Feature             | `redirect()`                                                                                                                        | `<Link>` or `useRouter().push()`                                              |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **Environment**     | **Server-Side**                                                                                                                     | **Client-Side**                                                               |
| **When it happens** | **Before** the page component is rendered.                                                                                          | **After** the page is loaded, in the browser.                                 |
| **Initiation**      | Programmatic / Automatic. Based on logic.                                                                                           | User Action (e.g., clicking a link or button).                                |
| **Use Case**        | Protecting routes, handling moved URLs, after server-side form submissions.                                                         | Standard user navigation (menus, buttons, internal links).                    |
| **Browser History** | Replaces the current URL in the browser's history. The user **cannot** press "Back" to get to the page that triggered the redirect. | Pushes a new URL to the browser's history. The user **can** press "Back".     |
| **Mechanism**       | Sends an HTTP 3xx status code to the browser.                                                                                       | Uses the JavaScript History API to change the URL without a full page reload. |

---

### 1\. `redirect()` (The Server-Side Redirect)

This function is imported from `next/navigation` and is used in **Server Components, Route Handlers, and Server Actions**. It stops the rendering of the current page and immediately tells the browser to go to a new URL.

**Key Characteristics:**

- **Stops Rendering:** The component's JSX is never sent to the browser. The server sends the redirect instruction instead.
- **SEO Friendly:** You can specify permanent (308) or temporary (307) redirects, which is important for search engines if a URL has changed.
- **Ideal for Logic Checks:** Perfect for checking permissions or conditions before showing a page.

**Most Frequent Use Case: Protecting a Route**

Imagine you have a dashboard page that only logged-in users should see. You can check for a user session at the top of your page component.

```tsx
// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth"; // Your function to get user session

export default async function DashboardPage() {
  const session = await getSession();

  // If there's no session, don't render the dashboard.
  // Redirect the user to the login page immediately.
  if (!session) {
    redirect("/login");
  }

  // If the code reaches here, it means the user is authenticated.
  return (
    <div>
      <h1>Welcome to your Dashboard, {session.user.name}!</h1>
      {/* ...dashboard content... */}
    </div>
  );
}
```

---

### 2\. `<Link>` and `useRouter` (Client-Side Navigation)

This is the standard way users navigate within your application. It provides a fast, single-page application (SPA) experience.

#### A. The `<Link>` Component

This is the preferred method for navigation. It's declarative, accessible, and highly optimized. Next.js automatically **prefetches** the code for linked pages in the background, making navigation feel instantaneous.

**Most Frequent Use Case: Navigation Bar or Internal Links**

```tsx
// components/Navbar.tsx
import Link from "next/link";

export function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}
```

#### B. The `useRouter()` Hook

This hook gives you programmatic control over navigation within **Client Components (`"use client"`)**. You use it when navigation needs to happen in response to an event, like a form submission.

- `router.push('/path')`: Navigates to the new page and adds it to the history stack (user can click "back").
- `router.replace('/path')`: Navigates to the new page but replaces the current entry in the history stack (like a redirect, the user cannot click "back").

**Most Frequent Use Case: Navigating After a Client-Side Action**

```tsx
// components/LoginButton.tsx
"use client";

import { useRouter } from "next/navigation";

export function LoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    // Perform login logic...
    const loginSuccess = true;

    if (loginSuccess) {
      // Programmatically navigate to the dashboard after successful login
      router.push("/dashboard");
    }
  };

  return <button onClick={handleLogin}>Log In</button>;
}
```

### Summary: When to Use Which?

- **Use `redirect()` when:**

  - A user is not authorized to see a page (authentication).
  - A URL has permanently moved and you need to inform search engines (`/old-about` -\> `/about`).
  - After a **Server Action** completes (e.g., creating a new post).
  - The requested content doesn't exist, and you need to send the user to a fallback page.

- **Use `<Link>` when:**

  - You are creating any standard navigation element like a menu, a list of articles, or a "Read More" button. This should be your default choice.

- **Use `useRouter()` when:**

  - You need to navigate programmatically from a **Client Component** after an event, like a button click or form submission that is handled on the client side.
