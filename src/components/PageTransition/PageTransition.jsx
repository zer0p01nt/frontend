import { motion } from "framer-motion";

/**
 * 페이지 전환 애니메이션 컴포넌트
 * @param {object} props
 * @param {React.ReactNode} props.children - 페이지 콘텐츠
 * @param {number} props.direction - 전환 방향 (1: 오른쪽에서 왼쪽, -1: 왼쪽에서 오른쪽)
 */
export default function PageTransition({ children, direction }) {
  const variants = {
    initial: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </motion.div>
  );
}
