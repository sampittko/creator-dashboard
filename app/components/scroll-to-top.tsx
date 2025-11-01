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
    const handleScroll = () => {
      if (window.scrollY > SHOW_AFTER_PX) {
        if (lockRef.current) {
          return;
        }

        if (!mountedRef.current) {
          setIsMounted(true);

          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }

          frameRef.current = requestAnimationFrame(() => {
            frameRef.current = null;
            setIsActive(true);
          });
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
      className={`scroll-to-top fixed right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#CEBAF4] px-4 py-2 text-sm font-semibold text-[#333] shadow-lg transition-colors hover:bg-[#bda3ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CEBAF4] ${
        isActive ? "scroll-to-top--visible" : ""
      }`}
    >
      Back to top
    </a>
  );
}
