import './Paginator.css'
import {
  LeftIcon,
  DoubleLeftIcon,
  RightIcon,
  DoubleRightIcon,
} from '../Icons.jsx'
import { useAppContext } from '../../hooks/useAppContext.js'
import { useContent } from '../../hooks/useContent.js'

export function Paginator() {
  const { theme } = useAppContext()
  const {
    page,
    visibleButtons,
    setPage,
    goToLastPage,
    goToFirstPage,
    goToNextPage,
    goToPreviousPage,
  } = useContent()

  return (
    <div className={`paginator ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <button className="paginator-btn" onClick={goToFirstPage}>
        <DoubleLeftIcon />
      </button>
      <button className="paginator-btn" onClick={goToPreviousPage}>
        <LeftIcon />
      </button>
      {visibleButtons.map((pageBtn, index) => {
        return (
          <button
            key={index}
            onClick={() => setPage(pageBtn)}
            className={`paginator-btn ${pageBtn === page ? 'selected' : ''}`}
          >
            {pageBtn}
          </button>
        )
      })}
      <button className="paginator-btn" onClick={goToNextPage}>
        <RightIcon />
      </button>
      <button className="paginator-btn" onClick={goToLastPage}>
        <DoubleRightIcon />
      </button>
    </div>
  )
}
