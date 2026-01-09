

// RepositoryCardMinimal.tsx
import { Link } from "react-router-dom";

export interface RepositoryCardMinimalProps {
  name: string;
  description: string;
  author: string;
  slug: string;
}

export function RepositoryCardMinimal({
  name,
  description,
  author,
  slug,
}: RepositoryCardMinimalProps) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg hover:border-emerald-500/30 transition-all hover:bg-white/10">
      {/* Repository Name */}
      <h3 className="font-heading font-semibold text-white text-base sm:text-lg mb-1.5 sm:mb-2">
        {name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
        {description}
      </p>

      {/* Author and View Button Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-xs">
          by {author}
        </span>
        <Link
          to={`/repository/${slug}`}
          className="px-3 sm:px-4 py-1.5 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50 text-xs sm:text-sm font-medium transition-colors rounded-lg"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default RepositoryCardMinimal;