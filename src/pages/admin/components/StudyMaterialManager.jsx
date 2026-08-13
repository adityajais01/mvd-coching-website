import React, { useState } from 'react';
import Button from '../../../components/common/Button';
import { storage } from '../../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const StudyMaterialManager = ({ materials, onUpload, onDelete }) => {
  const [materialForm, setMaterialForm] = useState({
    title: '',
    subject: '',
    board: 'UP Board',
    targetClass: 'Class 10th',
    pdfUrl: '',
    description: '',
    isPaid: false,
    price: '',
    originalPrice: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  // File Upload State
  const [pdfProgress, setPdfProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // 📂 DIRECT FILE UPLOAD HANDLER
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please select a valid PDF file!');
      return;
    }

    if (!storage) {
      alert('Firebase Storage bucket disabled. Please paste Google Drive URL directly!');
      return;
    }

    setIsUploading(true);
    setPdfProgress(0);

    try {
      const storageRef = ref(storage, `study_materials/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPdfProgress(progress);
        },
        (error) => {
          console.error('Upload Error:', error);
          alert('Firebase Upload failed! Use Google Drive Link option below.');
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setMaterialForm((prev) => ({ ...prev, pdfUrl: downloadURL }));
          setIsUploading(false);
          alert('PDF uploaded successfully to Storage!');
        }
      );
    } catch (err) {
      console.error("Storage Error:", err);
      alert("Direct upload error. Please paste Google Drive link directly.");
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materialForm.pdfUrl) {
      alert('Please upload a PDF file or enter a valid Google Drive PDF URL.');
      return;
    }

    setFormLoading(true);

    const payload = {
      ...materialForm,
      isPaid: Boolean(materialForm.isPaid),
      price: materialForm.isPaid ? materialForm.price : '₹0',
      originalPrice: materialForm.isPaid ? materialForm.originalPrice : '₹0'
    };

    await onUpload(payload);

    setMaterialForm({
      title: '',
      subject: '',
      board: 'UP Board',
      targetClass: 'Class 10th',
      pdfUrl: '',
      description: '',
      isPaid: false,
      price: '',
      originalPrice: ''
    });
    setPdfProgress(0);
    setFormLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* UPLOAD FORM */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl h-fit">
        <h2 className="text-lg font-bold mb-4 text-amber-400">📤 Upload New Study Material</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Title / Chapter Name</label>
            <input
              type="text"
              required
              value={materialForm.title}
              onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
              placeholder="e.g. Chapter 1: Chemical Reactions"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Subject</label>
            <input
              type="text"
              required
              value={materialForm.subject}
              onChange={(e) => setMaterialForm({ ...materialForm, subject: e.target.value })}
              placeholder="e.g. Science / Physics"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Target Board</label>
              <select
                value={materialForm.board}
                onChange={(e) => setMaterialForm({ ...materialForm, board: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="UP Board">UP Board</option>
                <option value="CBSE">CBSE Board</option>
                <option value="Computer Division">Computer Center</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Target Class</label>
              <select
                value={materialForm.targetClass}
                onChange={(e) => setMaterialForm({ ...materialForm, targetClass: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Class 9th">Class 9th</option>
                <option value="Class 10th">Class 10th</option>
                <option value="Class 11th">Class 11th</option>
                <option value="Class 12th">Class 12th</option>
                <option value="ADCA / DCA">ADCA / DCA</option>
                <option value="Tally / Coding">Tally / Coding</option>
              </select>
            </div>
          </div>

          {/* FREE vs PAID SELECTOR */}
          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3">
            <label className="block text-xs font-bold text-zinc-400">Pricing Type</label>
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pricing"
                  checked={!materialForm.isPaid}
                  onChange={() => setMaterialForm({ ...materialForm, isPaid: false, price: '', originalPrice: '' })}
                />
                🎁 100% Free
              </label>

              <label className="text-xs font-bold text-amber-400 flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pricing"
                  checked={materialForm.isPaid}
                  onChange={() => setMaterialForm({ ...materialForm, isPaid: true })}
                />
                ⭐ Paid / Premium
              </label>
            </div>

            {materialForm.isPaid && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1">Selling Price</label>
                  <input
                    type="text"
                    required
                    value={materialForm.price}
                    onChange={(e) => setMaterialForm({ ...materialForm, price: e.target.value })}
                    placeholder="e.g. ₹149"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1">Original Price (MRP)</label>
                  <input
                    type="text"
                    value={materialForm.originalPrice}
                    onChange={(e) => setMaterialForm({ ...materialForm, originalPrice: e.target.value })}
                    placeholder="e.g. ₹399"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 📂 DIRECT FILE UPLOAD + GOOGLE DRIVE SECTION */}
          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
            <label className="block text-xs font-bold text-cyan-400">Choose PDF File 📁</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="w-full text-xs text-zinc-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
            />

            {isUploading && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-cyan-400">
                  <span>Uploading...</span>
                  <span>{pdfProgress}%</span>
                </div>
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                  <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${pdfProgress}%` }} />
                </div>
              </div>
            )}

            <div className="text-center text-[10px] text-zinc-500 uppercase font-bold pt-1">— OR PASTE LINK BELOW —</div>

            <input
              type="url"
              value={materialForm.pdfUrl}
              onChange={(e) => setMaterialForm({ ...materialForm, pdfUrl: e.target.value })}
              placeholder="Google Drive / Direct PDF URL"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Description (Optional)</label>
            <textarea
              rows="2"
              value={materialForm.description}
              onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })}
              placeholder="Short note about this PDF..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={formLoading || isUploading}
            className="w-full py-2.5 text-xs cursor-pointer"
          >
            {formLoading ? 'Publishing...' : 'Publish Material 🚀'}
          </Button>
        </form>
      </div>

      {/* LIST OF UPLOADED MATERIALS */}
      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-cyan-400">📚 Published Study Materials</h2>

        <div className="space-y-3">
          {materials.length > 0 ? (
            materials.map((item) => (
              <div key={item.id} className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-md border border-cyan-500/20">
                      {item.board} • {item.targetClass}
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md border border-amber-500/20">
                      {item.subject}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                      item.isPaid ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {item.isPaid ? `Paid (${item.price})` : 'Free'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white mt-2">{item.title}</h4>
                  {item.description && <p className="text-xs text-zinc-400 mt-0.5">{item.description}</p>}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-cyan-400 px-3 py-1.5 rounded-xl font-bold transition"
                  >
                    View PDF 🔗
                  </a>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs text-red-400 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer"
                  >
                    Delete 🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-zinc-500 py-8">No study materials published yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialManager;