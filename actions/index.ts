'use server';

import { updateCoffeeStore } from '@/lib/airtable';

type UpvoteStateType = {
  id: string;
  voting: number;
};

export const upvoteAction = async (
  prevState: UpvoteStateType | null,
  formData: FormData,
): Promise<UpvoteStateType | null> => {
  const id = prevState?.id;
  if (!id) return null;
  const data = await updateCoffeeStore(id);
  if (data) {
    return {
      id,
      voting: data.length > 0 ? data[0].voting : 0,
    };
  }
  return prevState;
};
