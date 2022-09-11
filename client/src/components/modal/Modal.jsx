import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ children, setIsModalOpen, isModalOpen }) => {
  const closeHandler = (e) => {
    if (!e.target.closest(".modal-inner")) {
      setIsModalOpen(false);
    }
  };
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{ opacity: 0 }}
          className="modal-outer"
          onClick={closeHandler}
        >
          <motion.div
            initial={{
              opacity: 0,
              top: "47%",
            }}
            animate={{
              opacity: 1,
              top: "50%",
              transition: {
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0, top: "47%" }}
            className="modal-inner"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
