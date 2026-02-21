import { useState, type ChangeEvent } from "react";
import "./ListJobs.css";
import type { Jobs, User } from "../../../types";

export function ListJobs({ list, user }: { list: Jobs[] | undefined, user: User | undefined }) {
  const [repositoryInput, setRepositoryInput] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, "idle" | "loading" | "success" | "error">>({});

  async function handleSubmit(jobId: string) {
    if (!user) return;
    setSubmitted(prev => ({ ...prev, [jobId]: "loading" }));
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid: user.uuid,
          jobId: jobId,
          candidateId: user.candidateId,
          applicationId: user.applicationId,
          repoUrl: repositoryInput[jobId] ?? ""
        }),
      });
      if (!response.ok) throw new Error();
      setSubmitted(prev => ({ ...prev, [jobId]: "success" }));
    } catch (error) {
      console.error(error);
      setSubmitted(prev => ({ ...prev, [jobId]: "error" }));
    }
  }

  function handleRepositoryInput(e: ChangeEvent<HTMLInputElement>, jobId: string) {
    setRepositoryInput(prev => ({ ...prev, [jobId]: e.target.value }));
  }

  return (
    <div className="list-jobs">
      {
        list?.map((j) => (
          <div key={j.id} className="job">
            <p>{j.title}</p>
            <div className="input-group">
              <input
                className="input-repository"
                value={repositoryInput[j.id] ?? ""}
                onChange={(e) => handleRepositoryInput(e, j.id)}
                type="text" placeholder="Link del repositorio" />
              <button
                disabled={submitted[j.id] === "loading" || submitted[j.id] === "success"}
                className={`btn ${submitted[j.id] === "success" ? "btn-success" : ""}`}
                type="submit"
                onClick={() => handleSubmit(j.id)}>
                {submitted[j.id] === "loading" ? "Enviando..." :
                  submitted[j.id] === "success" ? "Postulado" :
                    submitted[j.id] === "error" ? "Reintentar" :
                      "Postularse"}
              </button>
            </div>
          </div>

        ))
      }
    </div>
  )
}