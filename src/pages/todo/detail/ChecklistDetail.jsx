import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from "../../../client/ApiClient";

function ChecklistDetail() {
  const { id } = useParams(); // ambil checklistId dari URL
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [checklistName, setChecklistName] = useState("");

  const fetchChecklistItems = async () => {
    try {
      const response = await apiClient.get(`/checklist/${id}/item`);

      console.log(response);

      if (response?.data?.statusCode === 2000) {
        setItems(response.data.data || []);
        setChecklistName(response.data.data?.name || "");
      }
    } catch (error) {
      Swal.fire("Error", "Gagal mengambil data", "error");
    }
  };

  useEffect(() => {
    fetchChecklistItems();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/list-checklist")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Detail Checklist: {checklistName || `ID ${id}`}
      </h1>

      <button
        onClick={() => navigate(`/checklist/${id}/item/create`)}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-4"
      >
        Tambah Item
      </button>

      {items.length === 0 ? (
        <p className="text-gray-500">Checklist ini belum memiliki item.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-3 border rounded"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  {item.itemCompletionStatus ? "Selesai" : "Belum selesai"}
                </p>
              </div>
              {/* Tambah action edit/status kalau perlu */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChecklistDetail;
