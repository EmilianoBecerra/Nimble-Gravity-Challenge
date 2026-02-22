import { useEffect, useState } from "react";
import "./Main.css";
import { ListJobs } from "./ListJobs/ListJobs";
import { Loading } from "../Loading/Loading";
import type { Jobs, User } from "../../types";
import { ErrorCard } from "../Error/ErrorCard";
import { fetchCandidateData } from "../../services/api";

export function Main({ email }: { email: string }) {
  const [user, setUser] = useState<User | undefined>();
  const [jobs, setJobs] = useState<Jobs[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user, jobs } = await fetchCandidateData(email);
        setUser(user);
        setJobs(jobs);
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

  if (isLoading) {
    return <Loading />
  }

  return (
    <main>
      <ListJobs
        list={jobs}
        user={user}
      />
    </main>
  )
}