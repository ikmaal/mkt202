import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { StudyListPage } from "./pages/StudyListPage";
import { UnitDetailPage } from "./pages/UnitDetailPage";
import { QuizPage } from "./pages/QuizPage";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { PracticePage } from "./pages/PracticePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="study" element={<StudyListPage />} />
        <Route path="study/:unitId" element={<UnitDetailPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="flashcards" element={<FlashcardsPage />} />
        <Route path="practice" element={<PracticePage />} />
      </Route>
    </Routes>
  );
}
