import { useEffect, useRef, ReactNode, HTMLAttributes } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export function AnimatedContent({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0,
  duration = 1,
  ...rest
}: AnimatedContentProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Define initial state based on direction
    const initialState: gsap.TweenVars = {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    };

    // Set initial state
    gsap.set(element, initialState);

    // Create scroll trigger animation
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay, duration]);

  return (
    <div
      ref={elementRef}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}
