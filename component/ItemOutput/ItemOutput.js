import { FlatList, Text, View } from "react-native";
import ItemList from "./ItemList";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

function ItemOutput({ fav }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 가져오는 함수
  const fetchItems = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/items"); // 백엔드에서 아이템 데이터 가져오기
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json(); // JSON으로 응답 처리
      console.log("Fetched data:", data); // 응답 데이터 확인
      setItems(data); // 데이터 상태에 저장
      setIsLoading(false); // 로딩 상태 업데이트
    } catch (err) {
      setError(err.message); // 오류 발생 시 처리
      setIsLoading(false); // 로딩 상태 업데이트
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true); // 로딩 상태를 true로 설정
      fetchItems(); // 데이터 가져오기
    }, [])
  );

  // myFav가 true인 항목만 필터링
  const filteredItems = items.filter((item) => item.myFav === 1);
  console.log("Filtered Items:", filteredItems); // 필터링된 아이템 확인

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      {fav ? (
        filteredItems.length > 0 ? (
          <ItemList items={filteredItems} />
        ) : (
          <Text>No items in your wishlist.</Text>
        )
      ) : (
        <ItemList items={items} />
      )}
    </View>
  );
}

export default ItemOutput;
