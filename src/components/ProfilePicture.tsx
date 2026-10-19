"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";


function ProfilePicture() {
  const [flipping, setFlipping] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
   const flipPic = () => {
    setFlipping(!flipping);
  };
  
  return (
    <div>
      <motion.div
      className="relative h-40 w-40 transform-3d sm:h-50 sm:w-50"
      animate={{ rotateY: flipping ? 180 : 0 }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      onClick={flipPic}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          flipPic();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Flip profile picture"
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-full border-4 border-platinum bg-jet text-3xl font-bold backface-hidden"
          initial="rest"
          whileHover="hover"
        >
          <motion.div
            className="absolute inset-0"
            variants={{
              rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
              hover: { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
            }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image className="rounded-full object-cover" fill sizes="200px" alt="Profile Picture" src="https://res.cloudinary.com/dihmbrhjw/image/upload/v1790558761/profile-normal_y3h9id.webp" />
          </motion.div>
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-full"
            variants={{
              rest: { clipPath: "polygon(101% 0%, 101% 0%, 101% 100%, 101% 100%)" },
              hover: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
            }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              className="absolute top-0 left-0 rounded-full object-cover"
              fill
              sizes="200px"
              alt=""
              aria-hidden="true"
              src="https://res.cloudinary.com/dihmbrhjw/image/upload/v1790558762/profile-ascii_kfk4w2.webp"
            />
          </motion.div>
        </motion.div>

        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-jet text-3xl font-bold backface-hidden transform-[rotateY(180deg)]">
          <Image className="absolute top-0 left-0 overflow-hidden object-cover" fill sizes="200px" alt="Profile Picture" src="https://res.cloudinary.com/dihmbrhjw/image/upload/v1764215536/Logo_mono_actlak.webp"/>
        </div>

        {/* Thickness */}
        <div className="absolute inset-0 rounded-full bg-platinum backface-hidden transform-[translateZ(-2px)]" />
        <div className="absolute inset-0 rounded-full bg-platinum backface-hidden transform-[translateZ(-4px)]" />
        <div className="absolute inset-0 rounded-full bg-platinum backface-hidden transform-[translateZ(-6px)]" />
        <div className="absolute inset-0 rounded-full bg-platinum backface-hidden transform-[translateZ(-8px)]" />

      </motion.div>
    </div>
  )
}


export default ProfilePicture
