/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import { useSession } from 'next-auth/react';
import styles from '../styles/manage.module.scss';

import { api } from '~/utils/api';

interface User {
  id: string;
  image?: string | null;
  name: string;
  email: string;
  role: string;
}

const Manage: NextPage = () => {
  const trpc = api.useContext()

  const users = api.user.getAllUsers.useQuery()

  const { mutate: promoteUser } = api.user.promoteUser.useMutation({
    onMutate: async () => await trpc.user.getAllUsers.cancel(),
    onSettled: async () => await trpc.user.getAllUsers.invalidate()
  })

  const { mutate: demoteUser } = api.user.demoteUser.useMutation({
    onMutate: async () => await trpc.user.getAllUsers.cancel(),
    onSettled: async () => await trpc.user.getAllUsers.invalidate()
  })

  const { data: sessionData, status: loading } = useSession();

  const isPermitted = sessionData?.user?.role === 'ARCHITECT'

  const handlePromoteUser = (user: User) => {
    if (isPermitted) {
      const { id } = user
      if (user.role === 'EDITOR') {
        if (confirm("Are you sure you want to demote this person?")) {
          demoteUser({ id });
        }
      }
      
      if (user.role !== 'EDITOR') {
        if (confirm("Are you sure you want to promote this person?")) {
          promoteUser({ id });
        }
      }
    }
  }

  if (loading === 'loading') {
    return <h2 className={styles.container}>Loading...</h2>
  }

  return (
    <>
    {
      isPermitted ? (
      <div className={styles.container}>
        <h1 className={styles.title}>Users</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.data?.map((user) => (
              <tr key={user.id}>
              <td className={styles.profilePic}>
                {
                  user.image && (
                    <img src={user.image} alt={user.name || user.email || "Profile Picture"} />
                  )
                }
              </td>
                <td className={styles.name}>{ user.name ? user.name : user.email }</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                {
                  isPermitted && user.role !== 'ARCHITECT' ? (
                    <button
                      className={styles.button}
                      disabled={!isPermitted || user.role === 'ARCHITECT'}
                      onClick={() => handlePromoteUser(user)}
                    >
                      { user.role === 'EDITOR' ? 'Demote' : 'Promote' }
                    </button>
                  ) : null
                }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>You are not permitted to view this page</h1>
        </div>
      )
    }
    </>
  );
};

export default Manage;
