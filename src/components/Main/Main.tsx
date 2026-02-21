import { useEffect, useState } from "react";
import "./Main.css";
import { ListJobs } from "./ListJobs/ListJobs";
import { Loading } from "../Loading/Loading";
import type { Jobs, User } from "../../types";
import { ErrorCard } from "../Error/ErrorCard";

export function Main({ email }: { email: string }) {
  const [user, setUser] = useState<User | undefined>();
  const [jobs, setJobs] = useState<Jobs[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, jobsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/api/candidate/get-by-email?email=${email}`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/jobs/get-list`)
        ]);
        if (!userRes.ok) throw new Error(`Error al obtener Usuario: ${userRes.status}`);
        if (!jobsRes.ok) throw new Error(`Error al obtener listas de trabajo: ${jobsRes.status}`);

        const [userData, jobsList] = await Promise.all([
          userRes.json(),
          jobsRes.json()
        ])

        setUser(userData);
        setJobs(jobsList);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [email]);

  if (error) {
    return <ErrorCard />
  }

  return (
    <main>
      {
        isLoading ? <Loading /> :
          <ListJobs list={jobs} user={user} />
      }
    </main>
  )
}