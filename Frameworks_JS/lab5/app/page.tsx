import UserList from '@/components/UserList';
import { users } from '@/data/users';

export default function Home() {
    return (
        <main>
            <UserList users={users} />
        </main>
    );
}
