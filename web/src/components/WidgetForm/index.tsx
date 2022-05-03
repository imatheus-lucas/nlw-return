import { useState } from "react";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedBackContentStep } from "./Steps/FeedBackContentStep";
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep";
import { FeedBackTypeStep } from "./Steps/FeedBackTypeStep";

export const feedBackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lampada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export type FeedBackType = keyof typeof feedBackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedBackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  function handleResetFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl md-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedBackSuccessStep onFeedBackReset={handleResetFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedBackTypeStep onFeedBackTypeChanged={setFeedbackType} />
          ) : (
            <FeedBackContentStep
              feedbackType={feedbackType}
              onFeedBackReset={handleResetFeedback}
              onFeedBackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer>
        Feito com ❤️ pela{" "}
        <a
          href="https://rockeseat.com.br"
          target="_blank"
          className="underline underline-offset-2"
          rel="noopener noreferrer"
        >
          Rockeseat
        </a>
      </footer>
    </div>
  );
}
