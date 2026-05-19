import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";

interface Note {
  id: string;
  text: string;
  timestamp: number;
}

interface AdminNotesProps {
  userId: string;
}

export const AdminNotes: React.FC<AdminNotesProps> = ({ userId }) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");

  const addNote = useCallback(() => {
    if (!input.trim()) return;
    trigger("success");
    setNotes((prev) => [{ id: Math.random().toString(36), text: input.trim(), timestamp: Date.now() }, ...prev]);
    setInput("");
  }, [input, trigger]);

  const deleteNote = useCallback((id: string) => {
    trigger("light");
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, [trigger]);

  return (
    <Animated.View entering={FadeInUp.delay(700)} style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Notes Admin</Text>

      <View style={[styles.inputRow, { backgroundColor: colors.background.paper, borderColor: colors.neutral[200] }]}>
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholder="Ajouter une note..."
          placeholderTextColor={colors.text.disabled}
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity onPress={addNote} style={[styles.addBtn, { backgroundColor: colors.primary.main }]} accessibilityRole="button">
          <Ionicons name="add" size={20} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {notes.map((note) => (
          <View key={note.id} style={[styles.note, { backgroundColor: colors.background.paper, borderColor: colors.neutral[200] }]}>
            <Text style={[styles.noteText, { color: colors.text.primary }]}>{note.text}</Text>
            <View style={styles.noteFooter}>
              <Text style={[styles.noteDate, { color: colors.text.disabled }]}>
                {new Date(note.timestamp).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
              </Text>
              <TouchableOpacity onPress={() => deleteNote(note.id)} accessibilityRole="button" accessibilityLabel="Supprimer la note">
                <Ionicons name="trash-outline" size={16} color={colors.status.error} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {notes.length === 0 && (
          <Text style={[styles.empty, { color: colors.text.disabled }]}>Aucune note pour ce client</Text>
        )}
      </ScrollView>
    </Animated.View>
  );
};

const styles = {
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700" as const,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    borderRadius: 14,
    borderWidth: 1,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500" as const,
    maxHeight: 80,
    paddingVertical: 8,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  list: {
    maxHeight: 300,
  },
  note: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
  },
  noteText: {
    fontSize: 14,
    fontWeight: "500" as const,
    lineHeight: 20,
  },
  noteFooter: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginTop: 8,
  },
  noteDate: {
    fontSize: 11,
    fontWeight: "500" as const,
  },
  empty: {
    fontSize: 14,
    textAlign: "center" as const,
    paddingVertical: 20,
  },
};
