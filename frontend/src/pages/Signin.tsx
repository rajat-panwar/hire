import { Quote } from "../components/ui/quote"
import { AuthSignin } from "../components/ui/auth-sign-in"

export const Signin = () => {
    return (
        <div className="grid lg:grid-cols-2">
            <AuthSignin />
            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
    )
}