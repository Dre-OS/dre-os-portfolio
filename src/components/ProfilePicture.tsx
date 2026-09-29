"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";


function ProfilePicture() {
  const [flipping, setFlipping] = useState(false);
  
   const flipPic = () => {
    setFlipping(!flipping);
  };
  
  return (
    <div>
      <motion.div
      className="relative h-50 w-50 transform-3d"
      animate={{ rotateY: flipping ? 180 : 0 }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      onClick={flipPic}
      >
        {/* Front */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-platinum bg-jet text-3xl font-bold backface-hidden">
          <Image className="absolute top-0 left-0 rounded-full object-cover" fill alt="Profile Picture" src="https://res.cloudinary.com/dihmbrhjw/image/upload/v1790558761/profile-normal_y3h9id.webp"/>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-jet text-3xl font-bold backface-hidden transform-[rotateY(180deg)]">
          <Image className="absolute top-0 left-0 overflow-hidden object-cover" fill alt="Profile Picture" src="https://res.cloudinary.com/dihmbrhjw/image/upload/v1764215536/Logo_mono_actlak.webp"/>
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