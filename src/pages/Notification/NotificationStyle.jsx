// ... (import 및 함수 정의 부분은 동일)

export default function Notification() {
  // ... (핸들러 함수 등은 동일)

  return (
    <>
      <Header hasBack={false} title="알림" hasScrap={false} />
      <NotificationContainer>
        <CategoryBar onCategoryChange={handleCategoryChange}/>
        <FilterButton items={filterItems} onFilterChange={handleFilterChange} />

        {dummyNotifications.map((item) => (
          <CardList
            key={item.id}
            variant="notification" // variant를 "notification"으로 지정
            badges={[
              { text: item.region, color: "blue" },
              { text: item.keyword, color: "teal" },
            ]}
            title={item.title}
            date={item.date}
            isUnread={item.isUnread}
          />
        ))}
      </NotificationContainer>
      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}