import { useEffect, useState } from "react";
import type { Repository } from "@/lib/github";
import { registerCommand } from "@/lib/terminal";

function ProjectItem({
  name,
  url,
  weeklyCommits,
  description,
  command,
  pinned,
}: {
  name: string;
  url: string;
  weeklyCommits: number;
  description: string;
  command: string;
  pinned?: boolean;
}) {
  return (
    <li className="flex flex-row justify-between items-center group my-4 gap-2">
      <a href={url} target="_blank" className="flex flex-col">
        <h3 className="text-xl text-teal italic font-bold group-hover:text-purple ease-in-out transition duration-500">
          {pinned && <i className="nf nf-oct-pin mr-4" />}
          {name}
        </h3>
        <p className="text-md text-fg-muted group-hover:text-fg ease-in-out transition duration-500">
          {weeklyCommits} {weeklyCommits === 1 ? "commit" : "commits"} this week
          &bull; {description}
        </p>
        <h4 className="text-md text-fg-muted italic group-hover:text-fg ease-in-out transition duration-500">
          {url}
          <i className="nf nf-fa-arrow_right"></i>
        </h4>
      </a>
      <p className="italic text-purple">{command}</p>
    </li>
  );
}

function LoadingSkeleton() {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className="flex flex-row justify-between items-center my-4 gap-2"
        >
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-6 w-48 bg-dark-gray rounded animate-pulse" />
            <div className="h-4 w-96 bg-dark-gray rounded animate-pulse" />
            <div className="h-4 w-64 bg-dark-gray rounded animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function FullProjectsList() {
  const [repos, setRepos] = useState<Repository[] | null>(null);

  useEffect(() => {
    fetch("/api/repos")
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, []);

  useEffect(() => {
    registerCommand({
      command: "p0",
      help: "Go to Contractory",
      run: () => window.open("https://contractory-app.com", "_blank"),
    });

    if (!repos) return;

    repos.forEach((repo, idx) => {
      registerCommand({
        command: `p${idx + 1}`,
        help: `Go to ${repo.name}`,
        run: () => window.open(repo.url, "_blank"),
      });
    });
  }, [repos]);

  return (
    <>
      <ul>
        <ProjectItem
          name="contractory"
          url="https://contractory-app.com"
          description="Platform for connecting homeowners with contractors for home improvement projects"
          weeklyCommits={0}
          command="p0"
          pinned
        />
      </ul>
      {repos === null ? (
        <LoadingSkeleton />
      ) : (
        <ul className="animate-fade-in">
          {repos.map((repo, idx) => (
            <ProjectItem
              key={repo.name}
              name={repo.name}
              url={repo.url}
              description={repo.description ?? ""}
              weeklyCommits={repo.weeklyCommits}
              command={`p${idx + 1}`}
            />
          ))}
        </ul>
      )}
    </>
  );
}
