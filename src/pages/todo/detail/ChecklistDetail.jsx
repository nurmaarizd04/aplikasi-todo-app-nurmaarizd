import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from "../../../client/ApiClient";

function ChecklistDetail() {
  const { id } = useParams(); // ambil checklistId dari URL
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const fetchChecklistItems = async () => {
    try {
      const response = await apiClient.get(`/checklist/${id}/item`);

      console.log("item", response);

      if (response?.data?.statusCode === 2000) {
        setItems(response.data.data || []);
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
        className="mb-4 text-blue-600 hover:underline font-poppins"
      >
        ← Kembali
      </button>

      <div className="flex items-center justify-between mb-5 font-poppins">
        <h1 className="text-2xl font-bold  text-gray-800">Detail Checklist</h1>

        <button
          onClick={() => navigate(`/checklist/${id}/item/create`)}
          className="bg-blue-600  text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Item
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">Checklist ini belum memiliki item.</p>
      ) : (
        <ul className="space-y-2 font-roboto">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-3 border rounded space-y-2"
            >
              <div className="flex justify-between items-start w-full">
                <div>
                  <p className="font-medium mb-1">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    {item?.itemCompletionStatus ? "Selesai" : "Belum selesai"}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      navigate(`/checklist/${id}/item/edit/${item.id}`)
                    }
                    className="text-emerald-500 hover:text-emerald-700text-sm font-medium font-poppins"
                  >
                    Edit
                  </button>
                </div>
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
