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
import { GlobalStyles } from "../constants/styles";

const CreatePost = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageUri, setImageUri] = useState(null);

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
      image: imageUri,
    };
    console.log(postData); // Add logic here to send postData to your server
    // Send postData to server
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
});

export default CreatePost;
