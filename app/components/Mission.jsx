'use client'
import { motion } from "framer-motion";



export default function HeroSection() {


    return (
    <div className="relative h-screen bg-white flex items-center justify-center overflow-hidden">

      {/* Vertical Line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "150px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 w-[2px] bg-black"
      />

      {/* Oval Reveal */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-[700px] h-[300px] rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <img
          src="/images/shoe1"
          alt="bg"
          className="absolute w-full h-full object-cover"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative text-center text-white px-6"
        >
          <p className="text-lg font-medium">
            We set out to create an entirely new category of shoes inspired by
            natural materials...
          </p>
        </motion.div>
      </motion.div>


      <motion.img
        src="/shoes1.png"
        alt="shoe"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-[120px] w-[400px]"
      />
    </div>
  );
}