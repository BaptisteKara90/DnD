import { UserFieldsFragment } from '@/graphql/generated';

export function mapUser(user: UserFieldsFragment) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    isConfirmed: user.isConfirmed,
  };
}