export type ContactType = {
  id: string;
  first?: string;
  last?: string;
  createdAt: number;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactsType = {
  contacts: ContactType[];
};
