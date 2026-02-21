import "./Loading.css";

export function Loading({ count = 10 }: { count?: number }) {
  return (
    <>
      <div className="list-jobs">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="loading-card">
            <div className="skeleton-line medium" />
            <div className="skeleton-input-group" />
          </div>
        ))}
      </div>
    </>
  )
}