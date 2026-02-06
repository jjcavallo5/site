const GithubGraph = () => {
  return (
    <div className="mt-4">
      <p className="text-fg-muted mb-2">1234 contributions in the past year</p>
      <div className="flex flex-col flex-wrap gap-[4px] h-[140px]">
        {Array.from({ length: 365 }, (_, index) => index + 1).map(() => (
          <div className="h-[16px] w-[16px] bg-light-gray rounded-sm" />
        ))}
      </div>
    </div>
  );
};

export default GithubGraph;
