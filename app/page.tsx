'use client'

import Link from "next/link";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/app/_config/site";
import { title, subtitle } from "@/app/_components/primitives";
import { motion as m } from "framer-motion";
import clsx from "clsx";
import Shapes from "./_components/home/shapes";

export default function Home() {
	return (
		<main className="flex flex-col h-screen items-center justify-center -mt-16 mx-auto w-screen px-40 bg-[rgb(186,189,244)]
      bg-[linear-gradient(135deg,rgba(186,189,244,1)0%,rgba(178,158,228,1)25%,rgba(229,150,225,1)50%,rgba(172,130,200,1)75%,rgba(216,131,187,1)100%)]">
      <section className="flex w-full h-screen justify-center">
        <div className="flex flex-col w-1/2 h-full justify-center items-center">
          {/* <m.div initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} className="h-[70vh] w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/50 to-transparent to-70%">
            <Shapes />
          </m.div> */}
        </div>
        <div className="flex flex-col w-1/2 h-full justify-center gap-6">
				  <m.h1 initial={{opacity: 0, y:20}} animate={{opacity: 1, y: 0}} className={clsx(title({ size: "xl"}), 'text-foreground/60')}>AMALGAMA</m.h1>
          <p>Algun super texto aquí para hablar de la plataforma</p>
          <Button as={Link} href="/courses" radius="full" className="bg-background w-48 text-foreground" size="lg">EMPIEZA AHORA</Button>
        </div>
			</section>
			{/* <section className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>
					websites regardless of your design experience.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Beautiful, fast and modern React UI library.
				</h2>
			</section> */}
			{/* <section className="flex gap-3">
				<Link
					isExternal
					as={NextLink}
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					GitHub
				</Link>
			</section> */}
		</main>
	);
}
