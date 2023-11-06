import { title } from "@/components/primitives";

export default function AboutPage() {
	return (
		<main className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>About</h1>
			</section>
		</main>
	);
}
