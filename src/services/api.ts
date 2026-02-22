export async function fetchCandidateData(email: string) {
  const [userRes, jobsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_BASE_URL}/api/candidate/get-by-email?email=${email}`),
    fetch(`${import.meta.env.VITE_BASE_URL}/api/jobs/get-list`)
  ]);
  if (!userRes.ok) throw new Error(`Error al obtener Usuario: ${userRes.status}`);
  if (!jobsRes.ok) throw new Error(`Error al obtener listas de trabajo: ${jobsRes.status}`);

  const [userData, jobsList] = await Promise.all([
    userRes.json(),
    jobsRes.json()
  ]);

  return { user: userData, jobs: jobsList };

}


export async function applyToJob(
  uuid: string,
  jobId: string,
  candidateId: string,
  applicationId: string,
  repoUrl: string
) {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/candidate/apply-to-job`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uuid,
        jobId,
        candidateId,
        applicationId,
        repoUrl
      }),
    }
  );
  if (!response.ok) throw new Error(`Error al postularse: ${response.status}`);
}



