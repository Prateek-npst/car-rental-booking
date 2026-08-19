function Pagination({
                        page,
                        totalPages,
                        totalElements,
                        onPageChange,
                    }) {
    if (totalPages <= 1) {
        return (
            <div className="pagination-single">
                {totalElements} booking
                {totalElements === 1 ? "" : "s"}
            </div>
        );
    }

    return (
        <div className="pagination">
            <div className="pagination-info">
                Page {page + 1} of {totalPages}
            </div>

            <div className="pagination-buttons">
                <button
                    className="pagination-button"
                    disabled={page === 0}
                    onClick={() => onPageChange(page - 1)}
                >
                    ← Previous
                </button>

                <span className="page-number">
          {page + 1}
        </span>

                <button
                    className="pagination-button"
                    disabled={page >= totalPages - 1}
                    onClick={() => onPageChange(page + 1)}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}

export default Pagination;