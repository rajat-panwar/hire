import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const Quote = () => {
    return (
        <div className="bg-slate-200 h-screen flex justify-center items-center flex-col">
            <div className="max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>XYZ</CardTitle>
                        <CardDescription>Rizman | Director of Human Resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <p className="font-semibold">"Hire is easy to use. You can customize different parts of the process to make it work for your company and your work flows."</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}