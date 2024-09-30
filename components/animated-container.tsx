import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export const AnimatedComponent = ({
  children,
  className,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  // Set up the in-view observer
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when it comes into view
    threshold: 0.5, // Trigger when 10% of the element is in view
  });

  // Define the spring animation based on inView state
  const style = useSpring({
    opacity: inView ? 1 : 0, // Fade in effect
    transform: inView ? "translateY(0)" : "translateY(100px)", // Slide in effect
    config: { tension: 280, friction: 60 }, // Spring config
  });

  return (
    <animated.div ref={ref} className={className} style={style}>
      {children}
    </animated.div>
  );
};
