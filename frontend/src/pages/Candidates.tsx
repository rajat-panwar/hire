// @ts-nocheck
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AddCandidate } from "@/components/ui/add-candidate"
import { useEffect, useState, ChangeEvent, useRef } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { Skeleton } from "@/components/ui/skeleton"

export function Candidates() {
    const completeCandidatesList = useRef(null);
    const [candidates, setCandidates] = useState([]);
    const [loader, setLoader] = useState(false);

    async function getCandidates() {
        setLoader(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/candidates`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            completeCandidatesList.current = response.data
            setCandidates(response.data);

        } catch (e) {
            console.log(e, "error while fetching candidates");
        } finally {
            setLoader(false);
        }
    }
    useEffect(() => {
        getCandidates();
    }, [])

    const onSaveCandidate = (newValue: any) => {
        const { id = '' } = newValue;
        const originalList = completeCandidatesList.current || [];
        if(id) {
            let iv, io;
            for (iv =0; iv<candidates.length; iv++) {
                if(candidates[iv].id === id) {
                    break;
                }
            };

            for (io =0; io<originalList.length; io++) {
                if(originalList[io].id === id) {
                    break;
                }
            };

            if (io <originalList.length) {
                originalList[io] = newValue;
                completeCandidatesList.current = originalList;
            } else {
                completeCandidatesList.current = [...originalList, newValue];
            }

            setCandidates(candidates => {
                const oldlist = [...candidates];
                if(iv<candidates.length) {
                    oldlist[iv] = newValue;
                } else {
                    oldlist.push(newValue);
                }
                return oldlist;
            })
        }
    }

    const search = (e : ChangeEvent<HTMLInputElement>) => {
        const searchVal = e.target.value;
        const originalList = completeCandidatesList.current;
        const filteredList = originalList.filter(info => {
            return Object.values(info).some(value =>
                value.toString().toLowerCase().includes(searchVal.toLowerCase())
              );
        });
        setCandidates(filteredList);
    }
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DatabaseIcon className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Candidate Database</h1>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <header className="flex items-center justify-between h-16 px-6 border-b shrink-0">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by skills, name, location, job title, or status..."
            className="w-full pl-10 pr-12 rounded-md bg-muted focus:ring-primary focus:border-primary"
            onChange={search}
          />
        </div>
        <AddCandidate onSuccess={onSaveCandidate}/>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Candidates</CardTitle>
            <CardDescription>View and manage all candidates in your ATS.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loader &&   Array.from({ length: 4 }).map((_, index) => (
                                <TableRow key={index}>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-16" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-16" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-16" />
                                </TableCell>
                                </TableRow>
                ))}
                {candidates.length > 0 && candidates.map(candidate => {
                    const { title = '', skills = '', status = '', name = '', username = '', location = '', id = ''} = candidate;
                    const skillsSplitted = skills.split(" ");
                    return (
                        <TableRow key={`candidate-${id}`}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>R</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-muted-foreground text-sm">{username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{location}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                        {skillsSplitted.length > 0 && skillsSplitted.map((skill: string, index: number) => (<Badge variant="outline" key={`badge-${id}-${index}`}>{skill}</Badge>))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{status}</Badge>
                  </TableCell>
                  <TableCell>
                    <AddCandidate {...{...candidate, type: "edit"}} onSuccess={onSaveCandidate}/>
                  </TableCell>
                </TableRow>
                    )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function FilterIcon(props: any) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function DatabaseIcon(props: any) {
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
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    )
  }