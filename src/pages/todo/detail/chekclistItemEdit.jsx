import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from "../../../client/ApiClient";

function ChecklistItemEdit() {
  const { checklistId, itemId } = useParams();
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");

  const getDataItemCheklisById = async () => {
    try {
      const response = await apiClient.get(
        `/checklist/${checklistId}/item/${itemId}`
      );

      if (response?.data?.statusCode === 2110) {
        setItemName(response?.data?.data?.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataItemCheklisById();
  }, []);

  const handleUpdateItem = async (e) => {
    e.preventDefault();

    if (!itemName.trim()) {
      Swal.fire("Oops", "Nama item tidak boleh kosong", "warning");
      return;
    }

    try {
      const response = await apiClient.put(
        `/checklist/${checklistId}/item/rename/${itemId}`,
        {
          itemName,
        }
      );

      if (response?.data?.statusCode === 2200) {
        Swal.fire(response?.data?.message || "Berhasil diupdate", "success");
        navigate(`/checklist/${checklistId}/detail`);
      }
    } catch (error) {
      console.error(error);
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
        Update Name Item
      </h1>

      <form onSubmit={handleUpdateItem} className="space-y-4">
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
          Update Item
        </button>
      </form>
    </div>
  );
}

export default ChecklistItemEdit;
