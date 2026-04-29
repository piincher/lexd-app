import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, View } from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { SCREEN_WIDTH } from "@src/constants/Dimensions";
import { useStyles } from "./AddOrder.styles";

interface Props {
  selectedImages: { url: string; public_id: string }[];
  isLoading: boolean;
  colors: { primary: { main: string }; text: { secondary: string } };
  onTakePhoto: () => void;
  onPickImage: () => void;
  onDeleteImage: (id: string) => void;
}

export const AddOrderImageSection: React.FC<Props> = ({
  selectedImages,
  isLoading,
  colors,
  onTakePhoto,
  onPickImage,
  onDeleteImage,
}) => {
  const styles = useStyles();
  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              selectedImages.length > 0
                ? selectedImages[0].url
                : "https://res.cloudinary.com/piincher/image/upload/v1676795950/s6mxvpjvd3ytguh7se8p.jpg",
          }}
        />
      </View>
      <View style={styles.imageActionsRow}>
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
              style={styles.thumbnailPressable}
              key={image.public_id}
              onPress={() => onDeleteImage(image.public_id)}
            >
              <Avatar.Image
                size={SCREEN_WIDTH * 0.13}
                source={{
                  uri: image.url
                    ? image.url
                    : "https://res.cloudinary.com/piincher/image/upload/v1676795950/s6mxvpjvd3ytguh7se8p.jpg",
                }}
              />
            </Pressable>
          ))
        )}
      </ScrollView>
    </>
  );
};
