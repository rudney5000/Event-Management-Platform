import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next';

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const { t } = useTranslation();

    if (totalPages <= 1) return null

    const getVisiblePages = () => {
        const pages: (number | string)[] = []
        const delta = 1

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i)
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...')
            }
        }
        return pages
    }

    return (
        <nav className="flex items-center justify-center" aria-label={t('pagination.previous')}>
            <div className="flex items-center gap-2">
                <button
                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                        currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                            : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:shadow-md'
                    }`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label={t('pagination.previous')}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {getVisiblePages().map((page, idx) =>
                    typeof page === 'string' ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="flex items-center justify-center w-10 h-10 text-gray-400"
                            aria-hidden="true"
                        >
                            {'...'}
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 font-medium ${
                                page === currentPage
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-lg'
                                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:shadow-md'
                            }`}
                            onClick={() => onPageChange(page)}
                            aria-label={t('pagination.page', { page })}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                        currentPage === totalPages
                            ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                            : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:shadow-md'
                    }`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label={t('pagination.next')}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </nav>
    )
}