import { useProgress } from '../../hooks/useProgress';

export default function ProgressBar() {
  const { completedTopics, progressPercentage, totalTopics } = useProgress();

  return (
    <div className="w-full mb-10">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
          Sua Jornada
        </span>
        <span className="font-mono text-[10px] text-accent/70">
          {completedTopics.length}/{totalTopics} tópicos lidos
        </span>
      </div>
      <div className="w-full h-px bg-borderLine/40 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent/60 transition-all duration-700 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
