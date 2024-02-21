import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { LoginForm } from '../features/LoginForm';
import { Context } from './providers/StoreProvider';
import { IUser } from '../shared/types/user';
import UserService from '../shared/services/userServise';
import './App.css';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return (
      <>
        <LoginForm />
        <div>
          <button onClick={getUsers}>Users</button>
        </div>
      </>
    );
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : 'АВТОРИЗУЙТЕСЬ'}
      </h1>
      <h1>
        {store.user.isActivated
          ? 'Аккаунт подтвержден по почте'
          : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}
      </h1>
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={getUsers}>Users</button>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.email}>
            {user.email}: {user.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(App);
