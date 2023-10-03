'use client'

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/app/_config/site";
import { title, subtitle } from "@/app/_components/primitives";
import { motion as m } from "framer-motion";
import clsx from "clsx";
import Shapes from "./_components/home/shapes";

export default function Home() {
	return (
		<main className="flex flex-col h-screen items-center justify-center mx-auto w-screen px-40">
      <section className="flex w-full h-screen justify-center">
        <div className="flex flex-col w-1/2 h-full justify-center items-center">
          <m.div initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} className="h-[70vh] w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/50 to-transparent to-70%">
            <Shapes />
          </m.div>
        </div>
        <div className="flex flex-col w-1/2 h-full text-center justify-center gap-0">
				  <m.h1 initial={{opacity: 0, y:20}} animate={{opacity: 1, y: 0}} className={clsx(title({ size: "xl"}), 'text-primary')}>AMAL</m.h1>
				  <m.h1 initial={{opacity: 0, y:20}} animate={{opacity: 1, y: 0}} className={clsx(title({ size: "xl"}), 'text-primary')}>GAMA</m.h1>
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
