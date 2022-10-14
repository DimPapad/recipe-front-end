const Pagination2 = ({ nPages, currentPage, setCurrentPage }) => {


    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    return (
        <ul className="pagination pagination-md justify-content-start">
            <li className="page-item">
                <button className="page-link" onClick={prevPage}>Previous</button>
            </li>
            {pageNumbers.map(pgNumber => (
                <li key={pgNumber} className={`page-item ${currentPage === pgNumber ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => { setCurrentPage(pgNumber) }}>{pgNumber}</button>
                </li>
            ))}
            <li className="page-item">
                <button className="page-link" onClick={nextPage}>Next</button>
            </li>
        </ul>
    );
};

export default Pagination2