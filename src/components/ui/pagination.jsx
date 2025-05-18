import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return (
        <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="pagination-wrapper">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>&lt;</button>
                    </li>
                    {pages.map(page => (
                        <li key={page} className="page-item">
                            <button
                                className={`page-link${page === currentPage ? ' active' : ''}`}
                                onClick={() => onPageChange(page)}
                                disabled={page === currentPage}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button className="page-link" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>&gt;</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Pagination