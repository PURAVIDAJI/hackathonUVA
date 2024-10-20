import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "react-native-image-picker";
import { Picker } from "@react-native-picker/picker";
import { GlobalStyles } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";

const CreatePost = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageUri, setImageUri] = useState(null);
  const [category, setCategory] = useState("furniture");

  const navigation = useNavigation();
  // Function to pick an image
  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImageUri(response.assets[0].uri); // Store image URI
      }
    });
  };

  // Function to handle form submission
  const onSubmit = (data) => {
    const postData = {
      ...data,
      category,
      image: imageUri,
      user_id: "11",
      date: new Date().toISOString().split("T")[0],
    };
    console.log(postData);

    fetch("http://10.0.2.2:3000/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Post submitted successfully!");
          navigation.navigate("AllItems");
        } else {
          response.json().then((data) => {
            console.log("Error response:", data);
            alert("Error submitting post: " + response.status);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Button to pick an image and image preview */}
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {/* Title input */}
      <Text>Title</Text>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Please enter a title" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}

      {/* Price input */}
      <Text>Price</Text>
      <Controller
        control={control}
        name="price"
        rules={{ required: "Please enter a price" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
          />
        )}
      />
      {errors.price && (
        <Text style={styles.errorText}>{errors.price.message}</Text>
      )}
      {/*category*/}

      <Text>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Furniture" value="furniture" />
          <Picker.Item label="Electronics" value="electronics" />
          <Picker.Item label="Clothing" value="clothing" />
          <Picker.Item label="Books" value="books" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Description input */}
      <Text>Description</Text>
      <Controller
        control={control}
        name="description"
        rules={{ required: "Please enter a description" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      {errors.description && (
        <Text style={styles.errorText}>{errors.description.message}</Text>
      )}

      {/* Submit button */}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={({ pressed }) => [
          GlobalStyles.submitButton,
          { backgroundColor: pressed ? "#e64b2f" : "#F84C1E" },
        ]}
      >
        <Text style={GlobalStyles.buttonText}>Submit Post</Text>
      </Pressable>
    </ScrollView>
  );
};

// Styles for the form
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1, // Makes the form take up the entire screen
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default CreatePost;
