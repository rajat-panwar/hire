import { Quote } from "../components/ui/quote"
import { AuthSignup } from "../components/ui/auth-sign-up"

export const Signup = () => {
    return (
        <div className="grid lg:grid-cols-2">
            <AuthSignup />
            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
    )
}