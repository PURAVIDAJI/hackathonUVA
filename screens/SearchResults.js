import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import ItemList from "../component/ItemOutput/ItemList";

function SearchResults() {
  const route = useRoute();
  const { searchTerm } = route.params;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터를 백엔드에서 가져오기
  const fetchItems = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/items"); // 백엔드에서 데이터 가져오기
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setItems(data); // 데이터 상태에 저장
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false); // 로딩 완료 처리
    }
  };

  useEffect(() => {
    fetchItems(); // 컴포넌트가 마운트되면 데이터 가져오기
  }, []);

  // searchTerm을 사용해 데이터를 필터링
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      {filteredItems.length === 0 ? (
        <Text>No items found for "{searchTerm}"</Text>
      ) : (
        <ItemList items={filteredItems} />
      )}
    </View>
  );
}

export default SearchResults;
