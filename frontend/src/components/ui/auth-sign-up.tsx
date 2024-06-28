import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import { useState, ChangeEvent } from "react"
import { SignupInput } from "@rajat-panwar/hire-common"

export const AuthSignup = () => {
    const navigate =  useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest () {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/candidates");
        } catch (e) {

        }
    }

    function onChange (e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        switch (e.target.id) {
            case "name": {
                setPostInputs(postInputs => ({...postInputs, name: value}));
                break;
            }
            case "email": {
                setPostInputs(postInputs => ({...postInputs, username: value}));
                break;
            }
            case "password": {
                setPostInputs(postInputs => ({...postInputs, password: value}));
                break;
            }
        }
    ;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <Link to={"/signin"} className="text-blue-600 underline">{"Login"}</Link>
                </p>
                </div>
                <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                    Name
                    </label>
                    <Input id="name" placeholder="Enter your name" onChange={onChange}/>
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                    Email
                    </label>
                    <Input id="email" placeholder="m@example.com" type="email" onChange={onChange}/>
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">
                    Password
                    </label>
                    <Input id="password" placeholder="Enter your password" type="password" onChange={onChange}/>
                </div>
                <Button className="w-full bg-black text-white" onClick={sendRequest}>Sign Up</Button>
                </div>
            </div>
    </div>
    )
}