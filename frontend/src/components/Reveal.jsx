import { motion } from "framer-motion";
export const Reveal = ({ children, delay = 0, y = 28, className = "", testId }) => (
  <motion.div
    data-testid={testId}
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
