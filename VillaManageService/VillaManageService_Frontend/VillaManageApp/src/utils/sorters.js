export const orderByImportanceAndDateDesc = listData => {
  if (listData !== undefined) {
    listData.sort((a, b) => {
      // noticeType에 따른 우선 순위 정렬
      if (a.noticeType === 'important' && b.noticeType !== 'important')
        return -1;
      if (a.noticeType !== 'important' && b.noticeType === 'important')
        return 1;

      // createdAt에 따른 시간순 정렬
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return listData;
  }
};
