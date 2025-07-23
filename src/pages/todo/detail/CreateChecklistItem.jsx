import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from "../../../client/ApiClient";

function CreateChecklistItem() {
  const { id: checklistId } = useParams(); // ambil checklistId dari URL
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName.trim()) {
      Swal.fire("Oops", "Nama item tidak boleh kosong", "warning");
      return;
    }

    try {
      const response = await apiClient.post(`/checklist/${checklistId}/item`, {
        itemName: itemName.trim(),
      });

      console.log(response);

      if (response?.data?.statusCode === 2000) {
        Swal.fire("Berhasil", "Item berhasil ditambahkan", "success");
        navigate(`/checklist/${checklistId}/detail`);
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan saat menambahkan item", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Tambah Item ke Checklist
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Item
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Contoh: Belanja sayur"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Tambah Item
        </button>
      </form>
    </div>
  );
}

export default CreateChecklistItem;
