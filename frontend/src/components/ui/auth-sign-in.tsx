import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import { useState } from "react"
import { SigninInput } from "@rajat-panwar/hire-common"
import { useToast } from "./use-toast"
import { Loader2 } from "lucide-react"

export const AuthSignin = () => {
    const { toast } = useToast();
    const navigate =  useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        username: "",
        password: ""
    })
    const [loader, setLoader] = useState(false);

    async function sendRequest () {
        setLoader(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/candidates");
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please check you username and password!", 
            })
        } finally {
            setLoader(false);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                <h1 className="text-2xl font-bold">Sign in</h1>
                <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="text-blue-600 underline">{"Sign up"}</Link>
                </p>
                </div>
                <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                    Email
                    </label>
                    <Input id="email" placeholder="m@example.com" type="email" onChange={(e) => {
                        setPostInputs(c => ({...c, username: e.target.value}))
                    }}/>
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">
                    Password
                    </label>
                    <Input id="password" placeholder="Enter your password" type="password" onChange={(e) => {
                        setPostInputs(c => ({...c, password: e.target.value}))
                    }}/>
                </div>
                <Button className="w-full bg-black text-white" onClick={sendRequest} disabled={loader}>
                    {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Login
                </Button>
                </div>
            </div>
    </div>
    )
}