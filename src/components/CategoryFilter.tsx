import * as React from "react"

interface CategoryFilterProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const categories = ["전체", "개발", "오픈소스", "회고"]

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="category-filter">
      <div className="category-filter-wrapper">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => onCategoryChange(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
