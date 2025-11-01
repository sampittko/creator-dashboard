'use client';

import { useEffect, useRef, useState } from "react";

const SHOW_AFTER_PX = 600;
const HIDE_DELAY_MS = 900;

export function ScrollToTop() {
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const mountedRef = useRef(isMounted);
  const activeRef = useRef(isActive);
  const frameRef = useRef<number | null>(null);
  const lockRef = useRef(false);

  useEffect(() => {
    mountedRef.current = isMounted;
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      lockRef.current = false;
    }
  }, [isMounted]);

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (
      !isMounted ||
      isActive ||
      lockRef.current ||
      window.scrollY <= SHOW_AFTER_PX
    ) {
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      if (
        lockRef.current ||
        window.scrollY <= SHOW_AFTER_PX
      ) {
        return;
      }

      setIsActive(true);
    });

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isActive, isMounted]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SHOW_AFTER_PX) {
        if (lockRef.current) {
          return;
        }

        if (!mountedRef.current) {
          setIsMounted(true);
          return;
        } else if (!activeRef.current) {
          setIsActive(true);
        }
      } else if (activeRef.current) {
        setIsActive(false);
        lockRef.current = false;
      } else if (lockRef.current) {
        lockRef.current = false;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isActive && isMounted) {
      const timeout = setTimeout(() => setIsMounted(false), HIDE_DELAY_MS);
      return () => clearTimeout(timeout);
    }
  }, [isActive, isMounted]);

  if (!isMounted) {
    return null;
  }

  const handleClick = () => {
    lockRef.current = true;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setIsActive(false);
  };

  return (
    <a
      href="#top"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={`fixed right-6 bottom-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#CEBAF4] px-4 py-2 text-sm font-semibold text-[#333] shadow-lg transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#bda3ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CEBAF4] ${isActive
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-[180%] opacity-0 pointer-events-none"
        }`}
    >
      Back to top
    </a>
  );
}
