import { motion } from 'framer-motion';

function AnimatedButton({ e }: {e: string}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className='bg-accent-dark shadow-md shadow-text'
      style={{
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      {e}
    </motion.button>
  );
}

export default AnimatedButton;
