import { Link, Navigate } from "react-router-dom";
import { 
  HomepageNavbar, 
  WhySection, 
  RepositoryCardMinimal, 
  MinimalFooter 
} from "@/components/homepage";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";

const Index = () => {
  const { isAuthenticated, ready } = useAuth();
  const { projects: featuredProjects, isLoading } = useProjects({ 
    featured: true, 
    limit: 6 
  });

  // Wait for auth to be ready before redirecting
  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F0D] via-[#050A08] to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect authenticated users to Explore page
  if (isAuthenticated) {
    return <Navigate to="/repositories" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F0D] via-[#050A08] to-black">
      {/* Navbar */}
      <HomepageNavbar />

      {/* Hero Section */}
      <section className="w-full">
        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-28 lg:py-36">
          <div className="max-w-4xl mx-auto text-center">
            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6">
              Discover Premium Code
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">
                Repositories
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
              The marketplace for high-quality repositories. Find production-ready templates, 
              UI kits, and starter projects from top developers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/repositories"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors text-center shadow-lg shadow-emerald-500/20"
              >
                Explore repositories
              </Link>
              <Link
                to="/repositories/new"
                className="w-full sm:w-auto px-6 py-3 border border-emerald-500/30 text-emerald-400 font-medium rounded-lg hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-colors text-center"
              >
                Add your codebase
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle design element - horizontal line */}
        <div className="container mx-auto px-4">
          <div className="border-t border-white/10" />
        </div>
      </section>

      {/* Why Section */}
      <WhySection />

      {/* Featured Repositories Section */}
      <section className="w-full py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
            Featured Repositories
          </h2>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredProjects.map((project) => (
                <RepositoryCardMinimal
                  key={project._id}
                  name={project.title}
                  description={project.shortDescription}
                  author={project.ownerName}
                  slug={project.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No featured projects yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12">
            {/* Heading */}
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Share Your Work?
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2">
              Join thousands of developers showcasing their projects on CodeVault. 
              Get discovered, earn recognition, and connect with potential clients.
            </p>

            {/* CTA Button */}
            <Link
              to="/signup"
              className="inline-block px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MinimalFooter />
    </div>
  );
};

export default Index;