'use client'

import clsx from "clsx";
import Link from "next/link";
import { motion as m } from "framer-motion";

import { title } from "@/components/primitives";
import FloatingShapes from "@/components/home/floating-shapes";

import { Button } from "@nextui-org/button";

export default function Home() {
	return (
		<main className="flex flex-col relative items-center justify-center -mt-16 mx-auto w-screen px-40 bg-[rgb(186,189,244)]
      bg-[linear-gradient(135deg,rgba(186,189,244,1)0%,rgba(178,158,228,1)25%,rgba(229,150,225,1)50%,rgba(172,130,200,1)75%,rgba(216,131,187,1)100%)]">
      <m.section initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 0.8}}} className="absolute flex w-2/3 left-0 h-screen justify-center opacity-80">
        <FloatingShapes />
      </m.section>
      <section className="flex w-full h-screen justify-end z-30">
        <div className="flex flex-col w-1/2 h-full justify-center gap-6 items-end">
				  <m.h1 initial={{opacity: 0, y:20}} animate={{opacity: 1, y: 0}} className={clsx(title({ size: "xl"}), 'text-foreground/60')}>AMALGAMA</m.h1>
          <m.p initial={{opacity: 0, y:-20}} animate={{opacity: 1, y: 0}} >Algun super texto aquí para hablar de la plataforma</m.p>
          <Button as={Link} href="/courses" radius="full" className="bg-background w-48 text-foreground" size="lg">EMPIEZA AHORA</Button>
        </div>
			</section>
		</main>
	);
}
