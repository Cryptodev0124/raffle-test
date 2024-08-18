import React, { useEffect, useRef, useState } from 'react'
import linkIcon from '~/assets/link.svg'

export interface RoundData {
  roundNumber: number
  winnerAvatar: string
  winnerName: string
  prizePool: string
  winnersEntries: string
  winMultiplier: string
  yourEntries: string
  totalPlayers: number
  finishTime: string
  verifyLink: string
}

interface ModalTableProps {
  data: RoundData[]
  onClose: () => void
}

const ModalTable: React.FC<ModalTableProps> = ({ data, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageNumbers, setPageNumbers] = useState<(number | '...')[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 10

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const calculatePageNumbers = (
    totalPages: number,
    currentPage: number,
  ): (number | '...')[] => {
    let pages: (number | '...')[] = []

    if (totalPages <= 4) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      if (currentPage === 1) {
        pages = [1, 2, '...', totalPages - 1, totalPages]
      } else if (currentPage + 1 < totalPages) {
        if (currentPage + 1 === totalPages - 1) {
          pages = [currentPage - 1, currentPage, currentPage + 1, totalPages]
        } else {
          pages = [
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages,
          ]
        }
      } else if (currentPage < totalPages) {
        pages = [currentPage - 1, currentPage, currentPage + 1]
      } else {
        pages = [1, 2, '...', currentPage - 1, currentPage]
      }
    }

    return pages
  }

  const handlePageChange = (newPageNumber: number) => {
    setCurrentPage(newPageNumber)
    setPageNumbers(calculatePageNumbers(totalPages, newPageNumber))
  }

  useEffect(() => {
    if (data.length > 0) {
      setTotalPages(Math.ceil(data.length / itemsPerPage))
      setPageNumbers(calculatePageNumbers(totalPages, currentPage))
    }
  }, [data.length, itemsPerPage, currentPage])

  useEffect(() => {
    setPageNumbers(calculatePageNumbers(totalPages, currentPage))
  }, [totalPages, currentPage])

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg text-[16px] z-[210]">
      <div
        className="p-8 rounded-lg max-w-[90%] w-full bg-[#161432] yolo-card"
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="float-right mb-4 border-[2px] rounded-full p-2 border-white px-4"
        >
          Close
        </button>
        <h1 className="text-white text-[32px] font-bold text-center mb-2">
          History
        </h1>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-separate border-spacing-x-0 border-spacing-y-0.5 rounded-3xl table-auto">
            <thead>
              <tr className="bg-[#25224f]">
                <th className="p-2 uppercase text-left px-8 py-6 rounded-l-[10px]">
                  Round
                </th>
                <th className="p-2 uppercase text-left px-8 py-6">Winner</th>
                <th className="p-2 uppercase text-left px-8 py-6">
                  Prize Pool
                </th>
                <th className="p-2 uppercase text-left px-8 py-6">
                  Winner's Entries
                </th>
                <th className="p-2 uppercase text-left px-8 py-6">Win</th>
                <th className="p-2 uppercase text-left px-8 py-6">
                  Your Entries
                </th>
                <th className="p-2 uppercase text-left px-8 py-6">Players</th>
                <th className="p-2 uppercase text-left px-8 py-6">Finish</th>
                <th className="p-2 uppercase text-left px-8 py-6 rounded-r-[10px]">
                  Verify
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? 'bg-[#dadada11]' : 'bg-[#eaeaea11]'
                  }
                >
                  <td className="p-2 text-center px-8 py-4 lg:rounded-l-[10px]">
                    {row.roundNumber}
                  </td>
                  <td className="p-2 flex items-center text-center px-8 py-4">
                    <img
                      src={row.winnerAvatar}
                      alt="Winner Avatar"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    {row.winnerName}
                  </td>
                  <td className="p-2 text-center px-8 py-4">{row.prizePool}</td>
                  <td className="p-2 text-center px-8 py-4">
                    {row.winnersEntries}
                  </td>
                  <td className="p-2 text-center px-8 py-4">
                    {row.winMultiplier}
                  </td>
                  <td className="p-2 text-center px-8 py-4">
                    {row.yourEntries}
                  </td>
                  <td className="p-2 text-center px-8 py-4">
                    {row.totalPlayers}
                  </td>
                  <td className="p-2 text-center px-8 py-4">
                    {row.finishTime}
                  </td>
                  <td className="p-2 text-center px-8 py-4 lg:rounded-r-[10px]">
                    <a href={row.verifyLink}>
                      <img src={linkIcon} alt="Verify" width={32} height={32} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center my-4">
          <button
            className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
            onClick={() => handlePageChange(1)}
          >
            &lt;&lt;
          </button>
          <button
            className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          >
            &lt;
          </button>
          {pageNumbers.map((pageNumber, index) =>
            typeof pageNumber === 'number' ? (
              <button
                key={pageNumber}
                className={`px-2 py-1 mx-1 ${
                  currentPage === pageNumber
                    ? 'bg-purple-500 glow text-white'
                    : 'bg-[#FFFFFF33] text-white'
                } rounded`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ) : (
              <span
                key={pageNumber}
                className="px-2 py-1 mx-1 bg-transparent text-white rounded"
              >
                ...
              </span>
            ),
          )}
          <button
            className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
          >
            &gt;
          </button>
          <button
            className="px-2 py-1 mx-1 bg-[#FFFFFF33] text-white rounded"
            onClick={() => handlePageChange(totalPages)}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalTable
