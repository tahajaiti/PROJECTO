import { useState, useCallback } from "react";
import ProjectCard from "../components/project/ProjectCard";
import ProjectModal from "../components/project/ProjectModal";
import SearchBar from "../components/core/SearchBar";
import Pagination from "../components/core/Pagination";
import { useDeleteProject, useProjects } from "../hooks/useProject";
import { FaPlus } from "react-icons/fa";

const HomePage = () => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useProjects({ query }, page, 9);
  const { mutate: deleteProject } = useDeleteProject();


  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setPage(0);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white">Projects</h1>
        <div className="w-full flex items-center justify-between gap-4">
          <div className="w-full max-w-sm">
            <SearchBar onSearch={handleSearch} />
          </div>
          <FaPlus
            className="text-blue-600 w-8 h-8 cursor-pointer hover:text-blue-500"
            onClick={() => setIsModalOpen(true)}
          />
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
        <div className="text-center py-12">
          <p className="text-zinc-400">
            {query ? `No projects found for "${query}"` : "No projects available."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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