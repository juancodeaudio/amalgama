
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import clsx from "clsx";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { title } from "../primitives";
import { toast } from "sonner";

import StarRating from "./star-rating";

import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";

import { HiPaperAirplane } from "react-icons/hi2";
import { CoursesWithClasses, DbResult } from "@/types/supabase";

type CourseFeedbackProps = {
  courseData: CoursesWithClasses
};

const CourseFeedback = ({courseData}: CourseFeedbackProps) => {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newFeedback, setNewFeedback] = useState<string>("");
  const { getToken, userId } = useAuth();
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const commentValue = event.target.value;
    setNewFeedback(commentValue);
  };
  const handleFeedbackSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      return;
    }
    const supabaseAccessToken = await getToken({
      template: "supabase",
    });
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
      }
    );

    const { data, error } = await supabase
      .from("feedbacks")
      .insert({ content: newFeedback, rating: rating, user_id: userId, course_id: courseData.id })
      .select()

    if(!error && data != null) {
      setIsSubmitted(true);
    } else {
      throw error;
    }
  };
  const sendFeedback = async (e: FormEvent<HTMLFormElement>) => {
    toast.promise(handleFeedbackSubmit(e), {
      loading: 'Enviando...',
      success: '¡Gracias por tu feedback!',
      error: '¡Ups! Parece que hubo un error al enviar tu feedback',
    });
  }

  return (
    <form
      className="flex flex-col gap-4 w-full items-center"
      onSubmit={sendFeedback}
    >
      <h3 className={clsx(title({ size: "xs"}), 'text-primary')}>¿Qué te pareció el curso?</h3>
      <Textarea
        isDisabled={isSubmitted}
        value={newFeedback}
        onChange={onChange}
        label="!Cuentanos tu experiencia!"
        variant="faded"
        className="w-full max-w-[400px]"
      />
      <div className="flex items-center gap-8">
        <StarRating isSubmitted={isSubmitted} rating={rating} setRating={setRating} />
        <Button
          isDisabled={rating === 0 || isSubmitted}
          type="submit"
          color="primary"
          className=""
          startContent={<HiPaperAirplane className="text-lg" />}
        >
          Enviar
        </Button>
      </div>  
    </form>
  )
}

export default CourseFeedback