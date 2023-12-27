import { memo, useState } from 'react';
//import cls from './LoginForm.module.css';

export const LoginForm = memo((): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
            <button>Login</button>
            <button>Signup</button>
        </div>
    );
});
