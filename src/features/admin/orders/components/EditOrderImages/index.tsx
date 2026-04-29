import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@src/constants/Dimensions";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useStyles } from "./EditOrderImages.styles";

interface ImageItem {
  url: string;
  public_id: string;
}

interface EditOrderImagesProps {
  selectedImages: ImageItem[];
  isLoading: boolean;
  onPickImage: () => void;
  onTakePhoto: () => void;
  onDeleteImage: (id: string) => void;
}

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/piincher/image/upload/v1676795950/s6mxvpjvd3ytguh7se8p.jpg";

export const EditOrderImages: React.FC<EditOrderImagesProps> = ({
  selectedImages,
  isLoading,
  onPickImage,
  onTakePhoto,
  onDeleteImage,
}) => {
  const { colors } = useAppTheme();
  const styles = useStyles();

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              selectedImages?.length > 0
                ? selectedImages[0].url
                : DEFAULT_IMAGE,
          }}
        />
      </View>
      <View style={styles.buttonRow}>
        <Pressable onPress={onTakePhoto} style={styles.imagePicker}>
          <AntDesign name="camera" size={24} color="black" />
        </Pressable>
        <Pressable onPress={onPickImage} style={styles.imagePicker}>
          <MaterialIcons name="perm-media" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary.main} />
        ) : (
          selectedImages?.map((image) => (
            <Pressable
              style={styles.thumbnailContainer}
              key={image.public_id}
              onPress={() => onDeleteImage(image.public_id)}
            >
              <Avatar.Image
                size={SCREEN_WIDTH * 0.13}
                source={{
                  uri: image.url ? image.url : DEFAULT_IMAGE,
                }}
              />
            </Pressable>
          ))
        )}
      </ScrollView>
    </>
  );
};
