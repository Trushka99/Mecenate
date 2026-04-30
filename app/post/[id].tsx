import { addComment, getPostsById } from "@/src/api/client";
import ErrorComp from "@/src/components/ErrorComp";
import PostComments from "@/src/components/postParts/PostComments";
import PostContent from "@/src/components/postParts/PostContent";
import PostFooter from "@/src/components/postParts/PostFooter";
import PostHeader from "@/src/components/postParts/PostHeader";
import PostImage from "@/src/components/postParts/PostImage";
import { useLikePost } from "@/src/hooks/useLikepost";
import { tokens } from "@/src/theme/tokens";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },

  keyboardView: {
    flex: 1,
  },

  listContent: {
    paddingBottom: tokens.spacing.xs,
  },

  inputContainer: {
    borderTopWidth: tokens.spacing.sm,
    borderColor: tokens.colors.background.secondary,
    backgroundColor: tokens.colors.background.primary,
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.lg,
    paddingBottom: tokens.spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: tokens.colors.background.button,
    borderRadius: 20,
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: 10,
    fontFamily: tokens.typography.fontFamily.medium,
    lineHeight: tokens.typography.lineHeight.md,
    color: tokens.colors.text.input,
    fontSize: tokens.typography.fontSize.md,
  },

  sendButton: {
    marginLeft: tokens.spacing.md,
    height: 30,
    width: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const likePost = useLikePost();
  const [inputHeight, setInputHeight] = useState(40);
  const [text, setText] = useState("");

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostsById(id),
    enabled: !!id,
  });
  const listRef = useRef<FlatList<any>>(null);

  const sendComment = async () => {
    if (!text.trim() || !id) return;
    addComment(id, text)
      .then((res) => {
        console.log(res);
        setText("");
      })
      .catch((err) => {
        console.error(err);
        setText("");
      })
      .finally(() => {
        Keyboard.dismiss();
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
      });
  };

  if (isLoading) return <ActivityIndicator />;
  if (!post)
    return (
      <ErrorComp
        text="Не удалось загрузить публикацию"
        buttonText="Повторить"
      />
    );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
      >
        <FlatList
          ref={listRef}
          data={[]}
          ListHeaderComponent={
            <View>
              <PostHeader post={post} />
              <PostImage post={post} />
              <PostContent post={post} />
              {post.tier === "free" && (
                <PostFooter onLike={likePost} post={post} />
              )}
            </View>
          }
          ListFooterComponent={<PostComments postId={id!} />}
          renderItem={null}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(val) => {
              setText(val);

              if (!val) {
                setInputHeight(40);
              }
            }}
            placeholder="Ваш комментарий"
            multiline
            style={[styles.input, { height: inputHeight }]}
            onContentSizeChange={(e) => {
              const h = e.nativeEvent.contentSize.height;
              setInputHeight(Math.max(40, Math.min(h, 120))); //
            }}
          />

          <TouchableOpacity
            onPress={sendComment}
            disabled={!text.trim()}
            style={styles.sendButton}
          >
            <Svg width="20" height="17" viewBox="0 0 20 17" fill="none">
              <Path
                d="M2.05266 0.126289C0.778242 -0.42669 -0.477861 0.942939 0.181319 2.16608L2.71916 6.87922C2.88029 7.18317 3.18059 7.38459 3.52116 7.42853L9.96647 8.2342C10.091 8.24885 10.1862 8.35505 10.1862 8.47956C10.1862 8.60407 10.091 8.71027 9.96647 8.72492L3.52116 9.53059C3.18059 9.57453 2.88029 9.77961 2.71916 10.0799L0.181319 14.8004C-0.477861 16.0235 0.778242 17.3931 2.05266 16.8402L18.2355 9.82722C19.4111 9.31818 19.4111 7.64826 18.2355 7.13923L2.05266 0.126289Z"
                fill="#D5C9FF"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
