import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from '../firebase'; 
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';

export interface IdeaFormData {
  ideaName: string;
  oneLinePitch: string;
  problemStatement: string;
  targetAudience: string;
  proposedSolution: string;
  revenueModel: string;
  currentStage: 'student' | 'mvp' | 'startup';
  brutallyHonest: boolean;
}

export interface AnalysisResult {
  id: string;
  ideaName: string;
  createdAt: string;
  sanity_score: number;
  category_scores: any;
  key_assumptions: any[];
  major_risks: any[];
  improvement_suggestions: string[];
  overall_feedback: string;
}

export function useIdea() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeIdea = useCallback(async (formData: IdeaFormData): Promise<AnalysisResult | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      const prompt = `Analyze: ${formData.ideaName}. Pitch: ${formData.oneLinePitch}. Return JSON only.`;

      const resultObj = await model.generateContent(prompt);
      const response = await resultObj.response;
      const aiData = JSON.parse(response.text());

      const analysisResult: AnalysisResult = {
        id: crypto.randomUUID(),
        ideaName: formData.ideaName,
        createdAt: new Date().toISOString(),
        ...aiData
      };

      // 1. Save to Firestore
      if (auth.currentUser) {
        await addDoc(collection(db, "analyses"), {
          ...analysisResult,
          userId: auth.currentUser.uid,
          timestamp: serverTimestamp()
        });
      }

      // 2. Save to LocalStorage
      const history = JSON.parse(localStorage.getItem('ideaHistory') || '[]');
      history.unshift(analysisResult);
      localStorage.setItem('ideaHistory', JSON.stringify(history.slice(0, 20)));

      setResult(analysisResult);
      return analysisResult;
    } catch (err: any) {
      setError(err.message || 'Failed to analyze');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteIdea = useCallback(async (id: string) => {
    try {
      // Remove from LocalStorage
      const localHistory = JSON.parse(localStorage.getItem('ideaHistory') || '[]');
      const filtered = localHistory.filter((item: any) => item.id !== id);
      localStorage.setItem('ideaHistory', JSON.stringify(filtered));

      // Remove from Firestore
      if (auth.currentUser) {
        const q = query(
          collection(db, "analyses"), 
          where("userId", "==", auth.currentUser.uid),
          where("id", "==", id)
        );
        const snapshot = await getDocs(q);
        const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, "analyses", d.id)));
        await Promise.all(deletePromises);
      }
      return filtered;
    } catch (err) {
      console.error("Delete failed", err);
      return null;
    }
  }, []);

  const getHistory = useCallback(() => {
    return JSON.parse(localStorage.getItem('ideaHistory') || '[]');
  }, []);

  return { isLoading, error, result, analyzeIdea, getHistory, deleteIdea, setResult };
}