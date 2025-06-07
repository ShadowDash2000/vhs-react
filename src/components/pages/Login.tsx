import {LoginForm} from "../LoginForm";
import {Suspense} from "react";

const Login = () => {
    return (
        <Suspense>
            <LoginForm/>
        </Suspense>
    )
}

export default Login;