// src/services/studentService.js
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Helper function to check flexible class matching
const isClassMatching = (studentClass, targetClass) => {
  if (!targetClass || targetClass === 'All Classes' || targetClass === 'All') return true;
  if (!studentClass) return true;

  const normalize = (str) => str.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
  const sClass = normalize(studentClass);
  const tClass = normalize(targetClass);

  return sClass.includes(tClass) || tClass.includes(sClass);
};

// Fetch Study Materials for Student
export const getStudentMaterials = async (studentClass) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'study_materials'));
    const materials = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const targetClass = data.targetClass || data.classTarget;

      if (isClassMatching(studentClass, targetClass)) {
        materials.push({ id: docSnap.id, ...data });
      }
    });

    return materials;
  } catch (error) {
    console.error("Error fetching student materials:", error);
    return [];
  }
};

// Fetch Notices for Student
export const getStudentNotices = async (studentClass) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'notices'));
    const notices = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const targetClass = data.targetClass || data.classTarget;

      if (isClassMatching(studentClass, targetClass)) {
        notices.push({ id: docSnap.id, ...data });
      }
    });

    return notices;
  } catch (error) {
    console.error("Error fetching student notices:", error);
    return [];
  }
};