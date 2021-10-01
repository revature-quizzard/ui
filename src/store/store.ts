
/**
 * @Co-Author: Sean Taba
 */

import { configureStore } from "@reduxjs/toolkit";
import createStudySetReducer from "../state-slices/sets/create-study-sets-slice";
import flashcardsReducer from "../state-slices/flashcard/Set-slice";
import subjectsReducer from "../state-slices/subject/subject-slice";
import quizResultsReducer from "../state-slices/create-quiz/result-slice";
import authReducer from "../state-slices/auth/auth-slice";
import createQuizReducer from "../state-slices/create-quiz/create-quiz-slice";
import studySetReducer from "../state-slices/study-set/study-set-slice"
import gameReducer from "../state-slices/game/game-slice"
import errorReducer from "../state-slices/error/errorSlice";

export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        studySets: studySetReducer,
        createStudySet: createStudySetReducer,
        flashcards: flashcardsReducer,
        subjects: subjectsReducer,
        result: quizResultsReducer,
        auth: authReducer,
        game: gameReducer,
        error: errorReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;