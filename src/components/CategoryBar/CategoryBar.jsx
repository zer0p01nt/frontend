import React, { useState } from "react";
import * as S from "./CategoryBarStyle";

const defaultCategories = ["모든 알림", "참여", "공지", "고시/공고", "보고"];

// 스크랩 페이지에서만 "모든 알림"을 "모든 스크랩"으로 교체하기 위해 prop으로 카테고리명 배열을 받습니다
export default function CategoryBar({
  onCategoryChange,
  categories = defaultCategories,
}) {
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