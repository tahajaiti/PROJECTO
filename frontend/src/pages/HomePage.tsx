import { useState } from "react";
import ProjectCard from "../components/project/ProjectCard";
import ProjectModal from "../components/project/ProjectModal";
import SearchBar from "../components/core/SearchBar";
import Pagination from "../components/core/Pagination";
import { useDeleteProject, useProjects } from "../hooks/useProject";
import { useDebounce } from "../hooks/useDebounce";
import { FaPlus } from "react-icons/fa";

const HomePage = () => {
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data, isLoading, isError } = useProjects({ query: debouncedQuery }, page, 9);

  const { mutate: deleteProject } = useDeleteProject();

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white">Projects</h1>

        <div className="w-full sm:w-auto flex items-center gap-4 flex-1 justify-end">
          <div className="w-full max-w-sm">
            <SearchBar
              value={searchQuery}
              onSearch={(val) => {
                setPage(0);
                setSearchQuery(val);
              }}
              placeholder="Search projects..."
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white cursor-pointer"
            title="Create Project"
          >
            <FaPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <p className="text-red-400">Failed to load projects. Please try again.</p>
        </div>
      ) : data?.empty ? (
        <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
          <p className="text-lg mb-2">
            {debouncedQuery ? `No projects found for "${debouncedQuery}"` : "No projects available."}
          </p>
          {debouncedQuery && (
            <button
              onClick={() => {
                setPage(0);
                setSearchQuery("");
              }}
              className="text-sm text-blue-500 hover:text-blue-400 underline cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.content.map((project) => (
              <ProjectCard key={project.id} project={project} onDelete={deleteProject} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 0}
            onPageChange={setPage}
          />
        </>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;