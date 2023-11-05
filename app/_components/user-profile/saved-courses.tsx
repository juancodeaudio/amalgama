import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { auth } from '@clerk/nextjs';

const SavedCourses = async () => {
  const { userId } : { userId: string | null } = auth();
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const { data: courses } = await supabase.from('courses').select('*, classes(*)');
  const { data: likes } = await supabase.from('likes').select('*').eq('user_id', userId);
  const likedCourses = courses?.filter((course) => likes?.some((like) => like.course_id === course.id));
  console.log(likedCourses)
  return (
    <section className='pt-10'>
      <h1>Saved Courses</h1>
      <div className="mt-6 h-5/6 flex flex-col gap-4">
      { likedCourses && 
        likedCourses.map((course) => (
          <div key={course.slug}>
            <h2 className='uppercase'>{course.title}</h2>
            <p className='text-foreground/60'>{course.description}</p>
          </div>
        ))
      }
      </div>
    </section>
  )
}

export default SavedCourses