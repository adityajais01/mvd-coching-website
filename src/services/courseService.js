import { db } from '../config/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  arrayUnion,
  arrayRemove,
  getDoc,
  query, 
  where 
} from 'firebase/firestore';

// Fetch All Batches
export const getAllBatches = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'batches'));
    const batches = [];
    querySnapshot.forEach((docSnap) => {
      batches.push({ id: docSnap.id, ...docSnap.data() });
    });
    return batches;
  } catch (error) {
    console.error("Error fetching batches:", error);
    return [];
  }
};

// Fetch Popular Batches for Home Page
export const getPopularBatches = async () => {
  try {
    const q = query(collection(db, 'batches'), where('isPopular', '==', true));
    const querySnapshot = await getDocs(q);
    const batches = [];
    querySnapshot.forEach((docSnap) => {
      batches.push({ id: docSnap.id, ...docSnap.data() });
    });
    return batches;
  } catch (error) {
    console.error("Error fetching popular batches:", error);
    return [];
  }
};

// Fetch Single Batch Details with Content
export const getBatchById = async (batchId) => {
  try {
    const docRef = doc(db, 'batches', batchId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching batch by ID:", error);
    return null;
  }
};

// Admin: Create New Batch
export const createBatch = async (batchData) => {
  try {
    const docRef = await addDoc(collection(db, 'batches'), {
      ...batchData,
      createdAt: new Date().toISOString(),
      isPopular: batchData.isPopular || false,
      lectures: [],
      dpps: []
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating batch:", error);
    return { success: false, error: error.message };
  }
};

// Admin: Delete Batch
export const deleteBatch = async (batchId) => {
  try {
    await deleteDoc(doc(db, 'batches', batchId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting batch:", error);
    return { success: false, error: error.message };
  }
};

// Admin: Toggle Popular Status
export const togglePopularBatch = async (batchId, currentStatus) => {
  try {
    const batchRef = doc(db, 'batches', batchId);
    await updateDoc(batchRef, {
      isPopular: !currentStatus
    });
    return { success: true };
  } catch (error) {
    console.error("Error toggling popular status:", error);
    return { success: false, error: error.message };
  }
};

// -------------------------------------------------------------
// NEW: Admin Batch Content Management (Lectures & DPPs)
// -------------------------------------------------------------

// YouTube URL parser to extract Video ID for clean embeds
export const extractYouTubeId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

// Add Video Lecture to Batch
export const addLectureToBatch = async (batchId, lectureData) => {
  try {
    const batchRef = doc(db, 'batches', batchId);
    const formattedLecture = {
      id: Date.now().toString(),
      chapterName: lectureData.chapterName || 'General',
      title: lectureData.title,
      videoUrl: lectureData.videoUrl,
      youtubeId: extractYouTubeId(lectureData.videoUrl),
      duration: lectureData.duration || '45 mins',
      addedAt: new Date().toISOString()
    };

    await updateDoc(batchRef, {
      lectures: arrayUnion(formattedLecture)
    });

    return { success: true, lecture: formattedLecture };
  } catch (error) {
    console.error("Error adding lecture:", error);
    return { success: false, error: error.message };
  }
};

// Delete Video Lecture from Batch
export const deleteLectureFromBatch = async (batchId, lectureObject) => {
  try {
    const batchRef = doc(db, 'batches', batchId);
    await updateDoc(batchRef, {
      lectures: arrayRemove(lectureObject)
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting lecture:", error);
    return { success: false, error: error.message };
  }
};

// Add DPP / PDF Note to Batch
export const addDPPToBatch = async (batchId, dppData) => {
  try {
    const batchRef = doc(db, 'batches', batchId);
    const formattedDPP = {
      id: Date.now().toString(),
      chapterName: dppData.chapterName || 'General',
      title: dppData.title,
      pdfUrl: dppData.pdfUrl,
      type: dppData.type || 'DPP', // 'DPP' or 'Class Notes'
      addedAt: new Date().toISOString()
    };

    await updateDoc(batchRef, {
      dpps: arrayUnion(formattedDPP)
    });

    return { success: true, dpp: formattedDPP };
  } catch (error) {
    console.error("Error adding DPP:", error);
    return { success: false, error: error.message };
  }
};

// Delete DPP / PDF Note from Batch
export const deleteDPPFromBatch = async (batchId, dppObject) => {
  try {
    const batchRef = doc(db, 'batches', batchId);
    await updateDoc(batchRef, {
      dpps: arrayRemove(dppObject)
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting DPP:", error);
    return { success: false, error: error.message };
  }
};

// Student: Enroll in Batch (With Duplicate Check)
export const enrollStudentInBatch = async (userId, batchData) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const existingBatches = userData.enrolledBatches || [];

      // Check if student is already enrolled in this batch ID
      const isAlreadyEnrolled = existingBatches.some((b) => b.id === batchData.id);

      if (isAlreadyEnrolled) {
        return { 
          success: false, 
          alreadyEnrolled: true, 
          error: "Aap pehle se is batch me enrolled hain!" 
        };
      }
    }

    await updateDoc(userRef, {
      enrolledBatches: arrayUnion({
        id: batchData.id,
        title: batchData.title,
        targetClass: batchData.targetClass || 'Academic',
        subject: batchData.subject || 'All Main Subjects',
        mode: batchData.mode || 'Online',
        enrolledAt: new Date().toISOString()
      })
    });
    return { success: true };
  } catch (error) {
    console.error("Error enrolling student:", error);
    return { success: false, error: error.message };
  }
};