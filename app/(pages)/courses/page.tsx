import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';

import { title } from "@/app/_components/primitives";
import CourseCard from "@/app/_components/courses/course-card";
import { siteContent } from "@/app/_config/content";
import clsx from "clsx";

export default async function Courses() {
  // const supabase = createServerComponentClient({ cookies });
  // const { data: courses } = await supabase.from('courses').select('*, classes(*)');
	return (
		<main className="flex flex-col items-center justify-center w-screen px-10">
      <section className="flex flex-col w-full py-12 gap-10 items-center">
				<h1 className={clsx(title({ size: 'lg' }), 'text-primary')}>Cursos</h1>
        <div className="w-screen h-5/6 flex flex-col lg:flex-row gap-8 md:gap-10 xl:gap-20 py-5 px-10 xl:px-40 overflow-x-scroll">
          { siteContent.courses.map((course) => (
              <CourseCard
                key={course.slug}
                courseTitle={course.title}
                description={course.description}
                courseImage={course.image}
                href={`/courses/${course.slug}?class=${course.classes[0].slug}`}
              />
            ))
          }
        </div>
			</section>
		</main>
	);
}
