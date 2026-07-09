import './Pagination.css'

interface PaginationProps {
  totalItems: number
  currentPage: number
  onPageChange: (page: number) => void
}

const ITEMS_PER_PAGE = 20

export function Pagination({
  totalItems,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  if (totalPages <= 1) {
    return null
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  const getPageNumbers = () => {
    const maxVisiblePages = 7
    const pages: (number | string)[] = []

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 4) {
        pages.push('...')
      }

      const startPage = Math.max(2, currentPage - 2)
      const endPage = Math.min(totalPages - 1, currentPage + 2)

      for (let i = startPage; i <= endPage; i += 1) {
        pages.push(i)
      }

      if (currentPage < totalPages - 3) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__button pagination__button--prev"
        onClick={handlePreviousPage}
        disabled={isFirstPage}
        aria-label="Página anterior"
      >
        Anterior
      </button>

      <div className="pagination__numbers">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="pagination__ellipsis">
                ...
              </span>
            )
          }

          return (
            <button
              key={`page-${page}`}
              type="button"
              className={`pagination__page ${currentPage === page ? 'pagination__page--active' : ''}`}
              onClick={() => handlePageClick(page as number)}
              disabled={currentPage === page}
              aria-label={`Ir para página ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className="pagination__button pagination__button--next"
        onClick={handleNextPage}
        disabled={isLastPage}
        aria-label="Próxima página"
      >
        Próxima
      </button>

      <div className="pagination__info">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  )
}
