import { ArrowLeft } from "phosphor-react";
import { useState } from "react";
import { FeedBackType, feedBackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenShotButton } from "../ScreenShotButton";

type FeedBackContentStepProps = {
  feedbackType: FeedBackType;
  onFeedBackReset: () => void;
  onFeedBackSent: () => void;
};
export function FeedBackContentStep({
  feedbackType,
  onFeedBackReset,
  onFeedBackSent,
}: FeedBackContentStepProps) {
  const feedBackTypeInfo = feedBackTypes[feedbackType];

  const [screenshot, setScrenshot] = useState<string | null>(null);

  const [comment, setComment] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(feedbackType, comment, screenshot);

    onFeedBackSent();
  }
  return (
    <>
      <header>
        <button
          onClick={onFeedBackReset}
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedBackTypeInfo.image.source}
            alt={feedBackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedBackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:outline-none focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin "
          placeholder="Conte com detalhes o que está acontecendo..."
        />
        <footer className="flex gap-2 mt-2">
          <ScreenShotButton
            screenshot={screenshot}
            onScreenshotTook={setScrenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500
            "
          >
            Enviar FeedBack
          </button>
        </footer>
      </form>
    </>
  );
}
