import React, { useState } from 'react';
import * as S from "./FilterButtonStyle";

export default function FilterButton({ items = [], onFilterChange }) {
  // 첫 번째 아이템을 기본 선택값으로 설정
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (onFilterChange) {
      onFilterChange(item);
    }
  };

  return (
    <S.FilterContainer>
      {items.map((item) => (
        <S.Button
          key={item}
          $isSelected={selectedItem === item}
          onClick={() => handleItemClick(item)}
        >
          {item}
        </S.Button>
      ))}
    </S.FilterContainer>
  );
}