import { useState, type ChangeEvent } from "react";
import "./ListJobs.css";
import type { Jobs, User } from "../../../types";
import { applyToJob } from "../../../services/api";

export function ListJobs({ list, user }: { list: Jobs[] | undefined, user: User | undefined }) {
  const [repositoryInput, setRepositoryInput] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, "idle" | "loading" | "success" | "error">>({});
  const [emptyInputs, setEmptyInputs] = useState<Record<string, boolean>>({});
  const BUTTON_LABELS: Record<string, string> = {
    loading: "Enviando...",
    success: "Postulado",
    error: "Reintentar",
  };

  async function handleSubmit(jobId: string) {
    if (!user) return;

    if (!repositoryInput[jobId]?.trim()) {
      setEmptyInputs(prev => ({ ...prev, [jobId]: true }));
      return;
    }
    setEmptyInputs(prev => ({ ...prev, [jobId]: false }));
    setSubmitted(prev => ({ ...prev, [jobId]: "loading" }));
    try {
      await applyToJob(user.uuid, jobId, user.candidateId, user.applicationId, repositoryInput[jobId] ?? "");
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
              <div className="inputAndError">
                <input
                  className={`input-repository ${emptyInputs[j.id] ? "input-error" : ""}`}
                  value={repositoryInput[j.id] ?? ""}
                  onChange={(e) => {
                    handleRepositoryInput(e, j.id);
                    setEmptyInputs(prev => ({ ...prev, [j.id]: false }));
                  }}
                  type="text" placeholder="Link del repositorio" />
                {emptyInputs[j.id] && <span className="input-msg">Ingresá la URL del repositorio</span>}
              </div>
              <button
                disabled={submitted[j.id] === "loading" || submitted[j.id] === "success"}
                className={`btn ${submitted[j.id] === "success" ? "btn-success" : ""} ${submitted[j.id] === "error" ? "btn-error" : ""}`
                }
                type="button"
                onClick={() => handleSubmit(j.id)}
              >
                {BUTTON_LABELS[submitted[j.id]] ?? "Postularse"}
              </button>
            </div>
          </div>
        ))
      }
    </div >
  )
}