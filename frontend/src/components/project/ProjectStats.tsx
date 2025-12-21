interface ProjectStatsProps {
    totalTasks: number;
    completedTasks: number;
    progressPercentage: number;
}

const ProjectStats = ({ totalTasks, completedTasks, progressPercentage }: ProjectStatsProps) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-400">Total:</span>
                    <span className="text-white font-medium">{totalTasks}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-zinc-400">Completed:</span>
                    <span className="text-white font-medium">{completedTasks}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-zinc-400">Progress:</span>
                    <span className="text-white font-medium">{progressPercentage.toFixed(2)}%</span>
                </div>
            </div>

            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProjectStats;