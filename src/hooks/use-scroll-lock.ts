// hooks/useScrollLock.ts
import { useEffect } from "react";

export const useScrollLock = () => {
  useEffect(() => {
    // Get current scroll position
    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Lock scroll
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Cleanup: unlock scroll and restore position
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);
};

// Usage in each modal component:
//
// import { useScrollLock } from "@/hooks/useScrollLock";
//
// const LoginModal = () => {
//   useScrollLock();
//
//   return (
//     <div>Your modal content</div>
//   );
// };
