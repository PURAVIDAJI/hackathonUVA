export const GlobalStyles = {
  colors: {
    primary50: "#FFFFFF", //white
    primary100: "#F2F2F2", //light gray
    primary200: "#F84C1E", //orange
    primary400: "#232D4B", //navy
    primary800: "#C5CBD5", //light gray
  },
  customButton: {
    position: "absolute", // 우하단에 위치하도록 설정
    bottom: 20,
    right: 20,
    backgroundColor: "#F84C1E", // 버튼 배경색
    paddingVertical: 15, // 버튼의 상하 패딩
    paddingHorizontal: 40, // 버튼의 좌우 패딩
    borderRadius: 20, // 버튼의 둥근 모서리
    elevation: 5, // 버튼의 그림자 (Android)
    shadowColor: "#000", // 버튼 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.8, // 그림자의 불투명도
    shadowRadius: 2, // 그림자의 크기
  },
  buttonText: {
    color: "#fff", // 텍스트 색상 (흰색)
    fontSize: 16, // 텍스트 크기
    fontWeight: "bold", // 텍스트 굵기
    textAlign: "center", // 텍스트 정렬
  },

  submitButton: {
    backgroundColor: "#F84C1E", // 버튼 배경색
    paddingVertical: 15, // 버튼의 상하 패딩
    paddingHorizontal: 40, // 버튼의 좌우 패딩
    borderRadius: 20, // 버튼의 둥근 모서리
    elevation: 5, // 버튼의 그림자 (Android)
    shadowColor: "#000", // 버튼 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.8, // 그림자의 불투명도
    shadowRadius: 2, // 그림자의 크기
  },
};
