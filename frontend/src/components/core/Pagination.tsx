import { memo, useMemo, useCallback } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ELLIPSIS = '...' as const;
const VISIBLE_PAGES = 5;
const EDGE_THRESHOLD = 3;

type PageItem = number | typeof ELLIPSIS;

const PageButton = memo(({ page, isActive, onClick }: { page: number, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 text-sm rounded-lg transition-all ${isActive ? "bg-blue-600 text-white" : "text-zinc-300 hover:bg-zinc-800"
            }`}
    >
        {page + 1}
    </button>
));

const Ellipsis = memo(() => (
    <span className="px-3 py-2 text-zinc-500">{ELLIPSIS}</span>
));

const NavButton = memo(({ direction, disabled, onClick }: {
    direction: 'prev' | 'next', disabled: boolean, onClick: () => void
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="px-3 py-2 text-sm rounded-lg text-zinc-300 hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {direction === 'prev' ? '<' : '>'}
    </button>
));

const Pagination = memo(({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    const pageItems = useMemo((): PageItem[] => {
        if (totalPages <= VISIBLE_PAGES) {
            return Array.from({ length: totalPages }, (_, i) => i);
        }

        const items: PageItem[] = [0];

        if (currentPage > EDGE_THRESHOLD - 1) {
            items.push(ELLIPSIS);
        }

        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages - 2, currentPage + 1);

        for (let i = start; i <= end; i++) {
            items.push(i);
        }

        if (currentPage < totalPages - EDGE_THRESHOLD) {
            items.push(ELLIPSIS);
        }

        items.push(totalPages - 1);

        return items;
    }, [currentPage, totalPages]);

    const handlePrev = useCallback(() => onPageChange(currentPage - 1), [currentPage, onPageChange]);
    const handleNext = useCallback(() => onPageChange(currentPage + 1), [currentPage, onPageChange]);
    const handlePageClick = useCallback((page: number) => () => onPageChange(page), [onPageChange]);

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2">
            <NavButton direction="prev" disabled={isFirstPage} onClick={handlePrev} />

            <div className="flex items-center gap-1">
                {pageItems.map((item, idx) =>
                    item === ELLIPSIS ? (
                        <Ellipsis key={`ellipsis-${idx}`} />
                    ) : (
                        <PageButton
                            key={item}
                            page={item}
                            isActive={currentPage === item}
                            onClick={handlePageClick(item)}
                        />
                    )
                )}
            </div>

            <NavButton direction="next" disabled={isLastPage} onClick={handleNext} />
        </div>
    );
});

export default Pagination;