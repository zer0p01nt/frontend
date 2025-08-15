import React, { useState } from "react";
import * as S from "./CategoryBarStyle";

const categories = ["모든 알림", "참여", "공지", "고시/공고", "보고"];

export default function CategoryBar({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <S.CategoryContainer>
      {categories.map((category) => (
        <S.CategoryItem
          key={category}
          $isSelected={selectedCategory === category}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </S.CategoryItem>
      ))}
    </S.CategoryContainer>
  );
}