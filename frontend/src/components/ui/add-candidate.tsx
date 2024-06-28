
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SelectTrigger, SelectContent, SelectItem, Select, SelectValue } from "@/components/ui/select"
import { useState, ChangeEvent } from "react"
import { CreateCandidate } from "@rajat-panwar/hire-common"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import { Loader2 } from "lucide-react"

export const AddCandidate = (props: any) => {
    const { type = '', name = '', username = '', experience = '0 0', status = 'Recruiter Screen', location = '', skills = '', title = '', onSuccess = () => {}, id = '' } = props;
    const [inputs, setInputs] = useState<CreateCandidate>({
        name,
        username,
        experience,
        status,
        location,
        title,
        skills
    });
    const [loader, setLoader] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const valueType = e.target.id;
        switch (valueType) {
            case "name": {
                setInputs(inputs => ({...inputs, name: value}));
                break;
            }
            case "email": {
                setInputs(inputs => ({...inputs, username: value}));
                break;
            }
            case "location": {
                setInputs(inputs => ({...inputs, location: value}));
                break;
            }
            case "skills": {
                setInputs(inputs => ({...inputs, skills: value}));
                break;
            }
            case "title": {
                setInputs(inputs => ({...inputs, title: value}));
                break;
            }
            case "experience-years": {
                const [, month] = inputs.experience.split(' ');
                setInputs(inputs => ({...inputs, experience: `${value} ${month}`}));
                break;
            }
            case "experience-months": {
                const [year] = inputs.experience.split(' ');
                setInputs(inputs => ({...inputs, experience: `${year} ${value}`}));
                break;
            }
        }
    }

    const onStatusChange = (val: string) => {
        setInputs(inputs => ({...inputs, status: val}));
    }

    async function createRequest () {
        setLoader(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/candidates`, inputs, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            const id = response.data;
            setOpenDialog(false);
            onSuccess({...inputs, id});
        } catch (e) {
            console.log("Not able to create a new candidate")
        } finally {
            setLoader(false);
        }
    }

    async function editRequest () {
        setLoader(true);
        try {
            const response = await axios.put(`${BACKEND_URL}/api/v1/candidates`, {...inputs, id}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setOpenDialog(false);
            onSuccess({...inputs, id})
        } catch (e) {
            console.log("Not able to create a new candidate")
        } finally {
            setLoader(false);
        }
    }


    return (
        <>
        {type === "edit" ? <Button variant="ghost" size="icon" className="rounded-md w-10 h-10" onClick={() => setOpenDialog(true)}>
      <PencilIcon className="h-5 w-5" />
      <span className="sr-only">Edit</span>
    </Button> :
      <Button className="ml-4" onClick={() => setOpenDialog(true)}>
      <PlusIcon className="h-5 w-5 mr-2" />
      Add Candidate
    </Button>}
    <Dialog open={openDialog} onOpenChange={() => {setOpenDialog(false)}}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{type === 'edit'? "Edit Candidate" : "Add Candidate"}</DialogTitle>
          <DialogDescription>Fill out the form to add a new candidate to the pipeline.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter candidate's name" required value={inputs.name} onChange={onChange}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" placeholder="Enter candidate's skills" required value={inputs.skills} onChange={onChange}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience-years">Years of Experience</Label>
              <Input id="experience-years" type="number" min="0" placeholder="Enter years of experience" required value={inputs.experience.split(' ')[0]} onChange={onChange}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience-months">Months of Experience</Label>
              <Input
                id="experience-months"
                type="number"
                min="0"
                max="11"
                placeholder="Enter months of experience"
                required
                value={inputs.experience.split(' ')[1]}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="itle">Job Title</Label>
            <Input id="title" placeholder="Enter candidate's job title" required value={inputs.title} onChange={onChange}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" type="email" onChange={onChange} value={inputs.username}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter candidate's location" required value={inputs.location} onChange={onChange}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="Recruiter Screen" required value={inputs.status} onValueChange={onStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recruiter Screen">Recruiter Screen</SelectItem>
                  <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                  <SelectItem value="Technical Interview">Technical Interview</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={type === 'edit' ? editRequest: createRequest} disabled={loader}>
            {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            {type === 'edit'? "Save Candidate" : "Add Candidate"}</Button>
          <Button variant="outline" onClick={() => {setOpenDialog(false)}}>
              Cancel
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </>
    )
}

function PlusIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }

  function PencilIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    )}