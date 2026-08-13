import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  addDoc,
  query, 
  where 
} from 'firebase/firestore';

// ==========================================
// 1. STUDENTS MANAGEMENT API
// ==========================================
export const getAllStudents = async () => {
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'student'));
    const querySnapshot = await getDocs(q);
    const students = [];
    querySnapshot.forEach((docSnap) => {
      students.push({ id: docSnap.id, ...docSnap.data() });
    });
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// ==========================================
// 2. STUDY MATERIAL / NOTES MANAGEMENT API
// ==========================================
export const uploadStudyMaterial = async (materialData) => {
  try {
    const docRef = doc(collection(db, 'study_materials'));
    
    const isPaidBoolean = String(materialData.isPaid) === 'true' || materialData.isPaid === true;
    const showOnHomeBoolean = materialData.showOnHome !== undefined ? Boolean(materialData.showOnHome) : true;

    const newMaterial = {
      id: docRef.id,
      title: materialData.title || '',
      subject: materialData.subject || '',
      board: materialData.board || 'UP Board',
      targetClass: materialData.targetClass || materialData.classTarget || 'Class 10th',
      pdfUrl: materialData.pdfUrl || '',
      description: materialData.description || '',
      isPaid: isPaidBoolean,
      showOnHome: showOnHomeBoolean,
      price: isPaidBoolean ? (materialData.price || '₹0') : '₹0',
      originalPrice: isPaidBoolean ? (materialData.originalPrice || '₹0') : '₹0',
      uploadedAt: new Date().toISOString()
    };

    await setDoc(docRef, newMaterial);
    return { success: true, data: newMaterial };
  } catch (error) {
    console.error("Error uploading material:", error);
    throw error;
  }
};

export const getAllStudyMaterials = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'study_materials'));
    const materials = [];
    querySnapshot.forEach((docSnap) => {
      materials.push({ id: docSnap.id, ...docSnap.data() });
    });
    return materials;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return [];
  }
};

export const deleteStudyMaterial = async (id) => {
  try {
    await deleteDoc(doc(db, 'study_materials', id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting material:", error);
    throw error;
  }
};

// ==========================================
// 3. NOTICES & ANNOUNCEMENTS API
// ==========================================
export const postNotice = async (noticeData) => {
  try {
    const docRef = doc(collection(db, 'notices'));
    const newNotice = {
      id: docRef.id,
      title: noticeData.title,
      message: noticeData.message,
      targetClass: noticeData.targetClass || 'All Classes',
      createdAt: new Date().toISOString()
    };
    await setDoc(docRef, newNotice);
    return { success: true, data: newNotice };
  } catch (error) {
    console.error("Error posting notice:", error);
    throw error;
  }
};

export const getAllNotices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'notices'));
    const notices = [];
    querySnapshot.forEach((docSnap) => {
      notices.push({ id: docSnap.id, ...docSnap.data() });
    });
    return notices;
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
};

export const deleteNotice = async (id) => {
  try {
    await deleteDoc(doc(db, 'notices', id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting notice:", error);
    throw error;
  }
};

// ==========================================
// 4. HOME BANNERS API (NEW)
// ==========================================
export const getHomeBanners = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'homeBanners'));
    const banners = [];
    querySnapshot.forEach((docSnap) => {
      banners.push({ id: docSnap.id, ...docSnap.data() });
    });
    return banners;
  } catch (error) {
    console.error("Error fetching home banners:", error);
    return [];
  }
};

export const addHomeBanner = async (bannerData) => {
  try {
    const docRef = await addDoc(collection(db, 'homeBanners'), {
      ...bannerData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding banner:", error);
    throw error;
  }
};

export const deleteHomeBanner = async (id) => {
  try {
    await deleteDoc(doc(db, 'homeBanners', id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw error;
  }
};