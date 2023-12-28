import { memo, useContext, useState } from 'react';
import { Context } from '../../../../app/providers/StoreProvider';
//import cls from './LoginForm.module.css';

export const LoginForm = memo((): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { store } = useContext(Context);

    return (
        <div>
            <input
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>
                Signup
            </button>
        </div>
    );
});
