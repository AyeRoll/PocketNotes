import { SQLiteProvider } from "expo-sqlite";
import NoteForm from "@/NoteForm";

export default function Index() {
  return (
      <SQLiteProvider
        databaseName="noteDatabase.db"
        onInit={async (db) => {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS notes (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              note TEXT NOT NULL
            );
            PRAGMA journal_mode=WAL;
            `);
        }}
        options={{ useNewConnection: false }}
      >
        <NoteForm />
      </SQLiteProvider>
  );
}