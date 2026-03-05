'use client';

import Image from 'next/image';
import { upvoteAction } from '@/actions';
import { useFormState, useFormStatus } from 'react-dom';

type UpvotePropsType = {
  voting: number;
  id: string;
};

export function UpvoteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-purple-951 min-w-[120px]"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <Image
          width="30"
          height="30"
          alt="loading"
          src="/static/icons/star.svg"
          className="animate-spin m-auto"
        />
      ) : (
        'Upvote!'
      )}
    </button>
  );
}

export default function Upvote({ voting, id }: UpvotePropsType) {
  const initialState = {
    id,
    voting,
  };

  const [state, dispatch] = useFormState(upvoteAction, initialState);

  return (
    <form action={dispatch}>
      <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{state?.voting}</p>
      </div>
      <UpvoteButton />
    </form>
  );
}
