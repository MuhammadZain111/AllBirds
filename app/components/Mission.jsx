'use client'
import { motion } from "framer-motion";
import Image from "next/image";






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
        className="w-[1000px] h-[500px] rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden bg-[url('/images/about_hero1.png')] bg-cover bg-center"
      >
      

      
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative text-center text-white px-6"
        >
          <p className="text-lg  text-white  font-black   ">
          We set out to create an entirely new category of shoes inspired by natural materials, guided by an ethos to create better things in a better way. We’ve made a lot of progress, but we’re just getting started.
          </p>
        </motion.div>
      </motion.div>


      <motion.img
        src="/images/aboutshoe1.png"
        alt="shoe"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-[-50px] w-[700px]"
      />
    </div>
  );
}